# SECURITY-TODO.md

Pasos manuales pendientes tras la auditoría de 2026-04-18. Casi ninguno requiere tocar código: son acciones en plataformas externas o decisiones operativas.

## Estado

Última revisión del documento: **2026-08-03**.

Ninguna de las acciones de plataforma externa (Supabase, Cloudflare, GitHub OAuth) es verificable desde el repositorio, así que su estado se marca como *sin verificar* hasta que alguien lo confirme manualmente. Cuando completes una, cámbiale el estado y añade la fecha.

| # | Acción | Prioridad | Estado |
|---|---|---|---|
| 0 | Borrar `public/assets/js/form.js` | **ALTA** | **Pendiente y bloqueante del punto 1** — ver aviso abajo |
| 1 | Rotar la `SUPABASE_PUBLISHABLE_KEY` | ALTA | Sin verificar; inútil hasta cerrar el punto 0 |
| 2 | Rate-limit / WAF en Cloudflare | ALTA | Sin verificar |
| 3 | Actualizar Next.js | MEDIA | **Pendiente** — el proyecto sigue en `16.1.6`; el objetivo `16.2.4` ya quedó atrás, la estable actual es `16.3.0` |
| 4 | Endurecer la CSP (Report-Only → Enforce) | MEDIA | **Pendiente** — `next.config.ts` sigue emitiendo `Content-Security-Policy-Report-Only` |
| 5 | ERP: rotar `.env` antes de desplegar | MEDIA | Fuera del alcance de este repositorio |
| 6 | ERP: separar de Supabase del sitio público | MEDIA | Fuera del alcance de este repositorio |
| 7 | Monitorizar rotación del token de GitHub de Keystatic | BAJA | Sin verificar |
| 8 | Revisión periódica | BAJA | Recurrente |

Los puntos 5 y 6 se refieren a un proyecto ERP distinto que no vive en este repositorio; se conservan aquí como registro de la auditoría original.

---

## 0. [ALTA] Borrar `next_app/public/assets/js/form.js`

**Por qué:** el punto 1 describe la exposición de la clave en este fichero en pasado, pero **el fichero sigue en el repositorio y se sigue sirviendo** en `https://carlesdelolmo.com/assets/js/form.js`. Contiene en claro:

```js
const supabaseUrl = 'https://<proyecto>.supabase.co';
const supabaseKey = 'sb_publishable_<clave en claro>';
```

Era la misma clave que usaban como valor por defecto `app/api/contact/route.ts` y `app/api/lab-research/route.ts`.

Es un resto de la web anterior a Next.js: usa `window.supabase.createClient`, inserta directamente en `leads_contacto` y redirige a `gracias.html`. **Ningún componente ni ruta de la aplicación lo referencia** — está huérfano, pero al vivir en `public/` Next.js lo publica igualmente.

Consecuencias:

- Anula el proxy `/api/contact`, construido precisamente para que la clave no llegara al navegador.
- **Bloquea el punto 1:** rotar la clave sin borrar antes este fichero solo consigue publicar la clave nueva.

Matiz de severidad: una publishable key de Supabase está diseñada para ser pública y la protección real la aporta RLS, que está activo con denegación total. No es una fuga de credenciales crítica, pero sí una contradicción entre la arquitectura declarada y lo que el sitio sirve.

**Cómo:**
1. `git rm next_app/public/assets/js/form.js`.
2. Revisar los demás restos huérfanos del mismo directorio (`components.js`, `cookie-manager.js`, `main.js`, `pricing.js`, `theme-toggle.js`): ninguno contiene credenciales, pero tampoco los referencia la aplicación.
3. Desplegar y confirmar que `/assets/js/form.js` devuelve 404.
4. Solo entonces, ejecutar la rotación del punto 1.

---

## 1. [ALTA] Rotar la `SUPABASE_PUBLISHABLE_KEY` (recomendable)

**Por qué:** la clave anónima estuvo expuesta en el frontend y, más grave, en `public/assets/js/form.js` que se sirvió públicamente. Aunque ahora la app usa `/api/contact` como proxy y RLS está activo, rotar la clave invalida cualquier copia cacheada/exfiltrada.

**Cómo:**
1. Dashboard de Supabase → Project `gzrgxkjvxaflteilmjuq` → Settings → API.
2. "Reset publishable key".
3. Copiar la nueva clave.
4. Actualizar el valor por defecto en `next_app/app/api/contact/route.ts` (línea con `SUPABASE_PUBLISHABLE_KEY`) y, si defines la variable de entorno `SUPABASE_PUBLISHABLE_KEY` en el hosting, actualizarla también.
5. Commit + deploy.

**Riesgo si lo dejas sin hacer:** bajo (RLS cubre el riesgo real), pero es higiene básica.

---

## 2. [ALTA] Configurar rate-limit/WAF en Cloudflare para rutas sensibles

**Por qué:** el rate-limit en memoria de `/api/contact` solo cuenta dentro de la misma instancia Edge. Un atacante distribuyendo peticiones entre regiones puede pasarlo. Lo mismo con el basic-auth de `/keystatic`: nada impide intentos de fuerza bruta.

**Cómo (Cloudflare Dashboard → Security → WAF → Rate limiting rules):**

1. **Regla para `/api/contact`:**
   - Expression: `(http.request.uri.path eq "/api/contact")`
   - Characteristics: IP source address
   - Period: 1 minute
   - Requests per period: 10
   - Action: Block (1 hour) o Managed Challenge

2. **Regla para `/keystatic` y `/api/keystatic`:**
   - Expression: `(starts_with(http.request.uri.path, "/keystatic") or starts_with(http.request.uri.path, "/api/keystatic"))`
   - Period: 10 minutes
   - Requests per period: 30 fallidos (HTTP 401)
   - Action: Block (24 hours)

3. Opcional: activar "Super Bot Fight Mode" en modo "Managed Challenge" para bots desconocidos.

---

## 3. [MEDIA] Actualizar Next.js a `16.2.4` (fix de CVEs)

**Por qué:** la versión actual tiene tres CVEs:
- DoS en Server Components (GHSA-q4gf-8mx6-v5v3)
- null origin bypass de CSRF en Server Actions (GHSA-mq59-m269-xvcx)
- null origin bypass de HMR websocket CSRF (GHSA-jcc7-9wpm-mj36)

**Cómo:**
```bash
cd next_app
npm install next@16.2.4 --legacy-peer-deps
npm run build   # verificar que Turbopack + keystatic siguen funcionando
npm run dev     # smoke-test local
```

Si todo OK, commit + deploy.

---

## 4. [MEDIA] Endurecer la CSP (pasar de Report-Only a Enforce)

**Por qué:** la CSP actual está en modo `Content-Security-Policy-Report-Only`: monitoriza pero no bloquea. Sirve para detectar falsos positivos antes de activarla.

**Cómo:**
1. Con la web en producción, abrir DevTools → Console durante 1-2 semanas y anotar cualquier `Refused to load ... because it violates the following Content Security Policy directive` legítimo (GA, Supabase, algún subrecurso olvidado).
2. Añadir los dominios faltantes a la lista en `next_app/next.config.ts` → constante `CSP_REPORT_ONLY`.
3. Cuando el log quede limpio, renombrar el header de `Content-Security-Policy-Report-Only` a `Content-Security-Policy` para activarlo.
4. Como refuerzo, idealmente sustituir `'unsafe-inline'` de `script-src` por nonces/hashes. Eso requiere mover los inline scripts de `layout.tsx` (GA, Consent Mode, anti-FOUC) a un patrón `<Script nonce={...}>`. Tarea de mayor calado, no urgente.

---

## 5. [MEDIA] ERP: no desplegar sin rotar `.env`

**Por qué:** el repo `/Users/carles/erp` local tiene en `.env`:
- `DATABASE_URL` con credenciales reales a Supabase postgres.
- `OPENAI_API_KEY` real.
- `SMTP_PASSWORD` real.
- `NEXTAUTH_SECRET` con valor placeholder.

No está en git ni compartido, pero antes de desplegar:
1. Generar `NEXTAUTH_SECRET` real: `openssl rand -base64 48`.
2. Rotar `OPENAI_API_KEY` y `SMTP_PASSWORD` si se sospecha que alguna vez han sido copiadas a otro sitio.
3. Confirmar que `.gitignore` excluye `.env` (ya lo hace).
4. Usar variables de entorno del hosting, nunca commitear `.env`.

---

## 6. [MEDIA] ERP: separar de Supabase del sitio público (recomendado a medio plazo)

**Por qué:** compartir proyecto Supabase entre la web pública y el ERP es un multiplicador de riesgo: cualquier error de RLS en una tabla ERP la expone con la misma anon key que el frontend público conoce. RLS está activo ahora, pero una nueva tabla creada sin policies quedaría bloqueada por la policy por defecto (bien) pero cualquier policy mal escrita en el futuro exponería datos del ERP.

**Cómo:** cuando el ERP tenga tráfico o datos reales, migrarlo a un proyecto Supabase propio. El plan gratuito permite 2 proyectos.

---

## 7. [BAJA] Monitorizar la rotación del token de GitHub que usa Keystatic

**Por qué:** Keystatic se autentica contra GitHub usando un OAuth app (`KEYSTATIC_GITHUB_CLIENT_ID/SECRET`). Si esos secrets se filtran, cualquiera puede hacer push al repo de contenido.

**Cómo:**
- Verificar que el OAuth app tenga permisos mínimos (solo el repo de contenido).
- Rotar el `CLIENT_SECRET` al menos una vez al año.
- Revisar cada 6 meses el log de commits de `github-actions[bot]` para detectar actividad anómala.

---

## 8. [BAJA] Revisión periódica

- Correr `npm audit --json` mensualmente y aplicar `audit fix` cuando haya parches.
- Revisar `supabase advisors` tras cualquier cambio de schema (MCP: `get_advisors security|performance`).
- Revisar los logs de Cloudflare WAF una vez a la semana para detectar patrones de ataque.
