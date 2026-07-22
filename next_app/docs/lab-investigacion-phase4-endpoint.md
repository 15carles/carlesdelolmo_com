# Laboratorio de visibilidad en IA — Fase 4: endpoint /api/lab-research

- **Estado:** implementado y probado localmente (2026-07-22)
- **Archivo:** `next_app/app/api/lab-research/route.ts` (runtime `edge`, compatible con Cloudflare Pages)

## Diseño

Mismo patrón que `/api/contact`:

- Clave publishable de Supabase leída en servidor (no viaja en el bundle), con
  el mismo fallback temporal documentado.
- Cap de tamaño de cuerpo: 32 KB (un snapshot completo ocupa ~6 KB).
- Rate limit en memoria por IP: 120 peticiones/hora (un análisis completo genera
  ~15-25 snapshots). Best-effort por isolate; se recomienda regla WAF de
  Cloudflare como refuerzo (igual que `/api/contact`).
- Validación estricta espejo de la RPC: UUID, hash `^[0-9a-f]{64}$`, formato de
  slugs, listas cerradas para todos los enums, topes de arrays, coherencias de
  §13 y rangos de fechas. La pertenencia de los slugs a los catálogos la valida
  la RPC contra la base (única fuente autoritativa).
- El payload reenviado a la RPC se **reconstruye** con únicamente los campos
  permitidos: cualquier clave extra del cliente se descarta. Nunca hay texto
  libre en el payload.
- Errores sin fugas: detalle de Supabase solo en `console.error`; el cliente
  recibe mensajes genéricos (400 validación / 413 tamaño / 429 ráfaga /
  502 fallo de backend).
- La IP solo se usa en memoria para el rate limit; no se registra como dato de
  investigación.

## Pruebas realizadas (servidor `next start` local)

| Caso | Resultado |
|---|---|
| GET | 405 |
| JSON inválido | 400 `JSON inválido` |
| Payload con campos ajenos y sin estructura | 400 (rechazado antes de tocar Supabase) |
| Hash inválido | 400 `domain_hash inválido` |
| Ráfaga de 125 POST | Exactamente 120 aceptadas y el resto 429 |
| Lint | Sin avisos en el archivo nuevo (los 19 problemas existentes del repo están en 3 archivos ajenos y se corrigen en la fase 10) |
| Build | `next build` completo en verde (con variables dummy de Keystatic, requisito del entorno local ajeno a este cambio) |

## Limitación del entorno de desarrollo (pendiente de re-verificación)

El sandbox de esta sesión bloquea el egreso HTTPS hacia `*.supabase.co`
(allowlist del proxy), por lo que el camino feliz endpoint→RPC devolvió 502
con `Host not in allowlist` — un fallo de red del entorno, no del código. Las
piezas están verificadas por separado:

- La RPC funciona y es idempotente (fase 2, vía MCP).
- `anon` tiene `EXECUTE` sobre la RPC y ningún privilegio sobre tablas/vistas
  (`has_function_privilege` / `has_table_privilege`).
- Se envió `NOTIFY pgrst, 'reload schema'` para garantizar que PostgREST expone
  la función.
- En producción este mismo camino de red ya existe: `/api/contact` habla con el
  mismo host de Supabase desde Cloudflare Pages.

**Acción para el despliegue:** tras publicar, realizar una prueba real con datos
ficticios y borrarlos (checklist en la fase 10).
