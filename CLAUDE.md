# CLAUDE.md

Guía de trabajo para agentes en este repositorio. Todo el proyecto, el contenido y los commits están en español.

## Qué es esto

`carlesdelolmo.com`: web profesional de Carles del Olmo (diseño web, SEO técnico y GEO). Next.js App Router + Keystatic como CMS git-based + Supabase para captación de leads y para el Laboratorio de visibilidad en IA.

No es un sitio genérico: el propio sitio es la demostración del servicio que vende. Por eso el SEO estructurado, el rendimiento y la arquitectura de enlaces internos no son "detalles" — son el producto.

## Estructura de dos capas

El repositorio tiene la raíz y la aplicación separadas. **No hay `package.json` en la raíz.**

```text
carlesdelolmo_com/
├── CLAUDE.md, README.md, CHANGELOG.md, VERSION   # gobernanza del proyecto
├── SECURITY.md, SECURITY-TODO.md                 # postura de seguridad y pendientes
├── .github/workflows/                            # automatización editorial
└── next_app/                                     # ← la aplicación; todo npm se ejecuta AQUÍ
    ├── app/                # rutas (site), api y panel keystatic
    ├── components/         # componentes React
    ├── content/            # posts, projects, authors (.mdoc)
    ├── data/               # datos estáticos (demos, reseñas de Google)
    ├── docs/               # fichas de fase e histórico → ver docs/README.md
    ├── lib/                # SEO, clusters, visibilidad, laboratorio IA
    ├── public/             # assets, robots.txt, llms.txt, humans.txt, sw.js
    ├── scripts/            # migraciones editoriales y generación de OG
    ├── styles/             # main.css, shared.css, components.css
    ├── supabase/migrations/# esquema SQL del laboratorio
    ├── keystatic.config.tsx# configuración del CMS (~59 KB, fichero denso)
    └── middleware.ts       # protección de /keystatic
```

## Instalación: usa `--legacy-peer-deps`

`npm install` a secas **falla** con `ERESOLVE`. `@cloudflare/next-on-pages@1.13.16` declara el peer `next >=14.3.0 && <=15.5.2` y el proyecto usa `next@16.1.6`:

```bash
cd next_app
npm install --legacy-peer-deps   # o npm ci --legacy-peer-deps
npm run dev                      # http://localhost:3000
```

Hay un `.npmrc` con `legacy-peer-deps=true` en la raíz, pero **no aplica**: npm resuelve el `.npmrc` de proyecto desde `next_app/`, que no tiene uno. Verificable con `npm config get legacy-peer-deps` desde `next_app` (devuelve `false`).

Deuda conocida: `@cloudflare/next-on-pages` está deprecado y su sucesor es el adaptador OpenNext. Solo lo usa `npm run pages:build`. Migrarlo eliminaría el conflicto de peers, pero es una decisión de despliegue: no lo cambies sin pedirlo.

## Comandos

Todos desde `next_app/`:

| Comando | Para qué |
|---|---|
| `npm run dev` | desarrollo |
| `npm run build` | build de producción |
| `npm run lint` | ESLint (no hay tests automatizados en el repo) |
| `npm run pages:build` | build Cloudflare Pages + generación de imágenes OG |
| `npm run og` | generar solo las imágenes Open Graph |
| `npm run keystatic:strict:check` | validación integral de proyectos (obligatoria antes de publicar) |
| `npm run keystatic:phase2:gate` | `strict:check` + `build` |
| `npm run keystatic:migrate:posts:status` | sincronizar `scheduled` → `published` según fecha |
| `npm run keystatic:migrate:posts:status:check` | igual, en modo lectura |
| `npm run keystatic:diagnose:projects` | diagnóstico de contenido de proyectos |

## Pipeline editorial (importante)

Los posts tienen un campo `status` con tres valores: `draft`, `scheduled`, `published`. La visibilidad se resuelve en `next_app/lib/contentVisibility.ts` (`isPostVisible`), no en las queries.

**Un workflow de GitHub Actions (`.github/workflows/publish-scheduled-posts.yml`) corre cada hora**, ejecuta `scripts/migrate-posts-status.mjs` y hace commit+push directo a `next_app/content/posts`. Consecuencias:

- Aparecerán commits `chore(content): publish scheduled posts` que nadie escribió a mano. Es normal.
- Antes de tocar `content/posts`, haz `git pull` — el bot puede haber movido ficheros.
- Para programar un post: `status: scheduled` + `isoDate` futura. El cron lo publica solo.

Las páginas de blog usan `revalidate = 3600`, así que un cambio de contenido tarda hasta una hora en verse en producción.

## Taxonomía de clusters

`next_app/lib/content/clusters.ts` es la **fuente de verdad única** de los clusters de contenido. Lo importan tanto `keystatic.config.tsx` como componentes y rutas, así que no tiene dependencias de servidor: solo constantes y funciones puras. No dupliques esos valores en ningún otro sitio.

Cuatro clusters, cada uno con su hub en `/blog/categoria/[slug]` y su página pillar:

| Cluster | Hub | Pillar |
|---|---|---|
| `geo-ia` | `/blog/categoria/geo-y-visibilidad-en-ia` | `/servicio-seo/autoridad-digital-ias` |
| `diseno-desarrollo` | `/blog/categoria/diseno-y-desarrollo-web` | `/diseno-web` |
| `diseno-web-local` | `/blog/categoria/diseno-web-local` | `/diseno-web/valencia` |
| `mantenimiento-mejora` | `/blog/categoria/mantenimiento-y-mejora-web` | `/mantenimiento-web-valencia` |

Todo post debe llevar `cluster` y `topics`. Las categorías libres antiguas se eliminaron a propósito: no las reintroduzcas.

## Arquitectura técnica

**Rutas.** Grupo `app/(site)/` para todo el sitio público, más `app/api/` y `app/keystatic/`. `app/(site)/[...missing]` es el catch-all de 404 (con juego runner). Los endpoints (`/api/contact`, `/api/lab-research`, `/api/keystatic`) y el panel corren en `runtime = 'edge'`.

**CSS.** Sin Tailwind ni CSS-in-JS. El punto de entrada es `app/(site)/globals.css`, que importa en orden `styles/main.css` (tokens y base), `styles/shared.css` y `styles/components.css`. El sistema visual es «minimalismo cálido» sobre fondo `#FDFCFA`, modo claro único. **El glassmorphism se purgó en v4.0.0 — no lo reintroduzcas.**

**Tipografía.** Fuentes variables auto-alojadas vía `next/font/local`: Fraunces (display) e Instrument Sans (texto), subset latin, ~97 KB.

**SEO.** Todo centralizado en `lib/seo/`: `constructMetadata()` para metadatos (nunca escribas objetos `Metadata` a mano), `schemas.ts` y `jsonLd.ts` para JSON-LD, `ogImage.ts` para las tarjetas. Las imágenes OG se generan en el build hacia `public/og/` (gitignored) — no las commitees.

**Contenido.** Se lee con el reader de Keystatic (`lib/keystatic.ts`). Ficheros `.mdoc` en `content/posts` (41), `content/projects` y `content/authors`.

**Banner contextual.** `lib/contextualLeadBanner.ts` mapea rutas a configuraciones de captación, con reglas de disparo (45 s o 55 % de scroll) y claves `cdo:*` en localStorage. Añadir una ruta de servicio implica decidir su entrada aquí.

## Keystatic

- En local (`isLocalDev`): `storage: { kind: 'local' }`, escribe en el sistema de ficheros.
- En producción: `storage: { kind: 'github', repo: '15carles/carlesdelolmo_com', pathPrefix: 'next_app' }`.
- `middleware.ts` protege `/keystatic` y `/api/keystatic` con Basic Auth y `X-Robots-Tag: noindex`. **Sin credenciales en producción, el middleware responde `503` a propósito** — no es un bug.

## Supabase

Dos usos independientes, mismo proyecto:

1. **Leads** — `/api/contact` escribe en `leads_contacto`. La clave nunca llega al cliente: el endpoint hace de proxy.
2. **Laboratorio de visibilidad en IA** — `/api/lab-research` reenvía snapshots estadísticos a la RPC `ai_visibility_lab_submit_snapshot`. Siete tablas `ai_visibility_lab_*` en región UE, RLS con denegación total, escritura solo vía RPC. El dominio se seudonimiza con SHA-256 **en el navegador**; el dominio en claro nunca se transmite. Migraciones en `next_app/supabase/migrations/`.

Cualquier cambio en el laboratorio toca privacidad: revisa `next_app/docs/lab-investigacion-lia.md` (evaluación de interés legítimo, **en estado borrador pendiente de revisión profesional**) y mantén alineadas las políticas de privacidad y cookies.

## Variables de entorno

```env
# Protección del panel Keystatic en producción (sin ellas → 503)
KEYSTATIC_BASIC_AUTH_USER=...
KEYSTATIC_BASIC_AUTH_PASS=...
KEYSTATIC_CANONICAL_HOST=carlesdelolmo.com

# Supabase (leads y laboratorio); hay valores por defecto en el código
SUPABASE_URL=...
SUPABASE_PUBLISHABLE_KEY=...

# OAuth de Keystatic en modo github (producción)
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...
```

Las tres últimas **no aparecen en ningún `process.env` del proyecto**: las consume `@keystatic/next` internamente desde `makeRouteHandler`. Un `grep` por el repositorio no las encuentra, pero sin ellas el panel no puede autenticarse contra GitHub en producción.

## Seguridad

`next.config.ts` define HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` y una **CSP en modo Report-Only** (aún no bloquea: hay scripts inline de Consent Mode, GA4 y anti-FOUC). Si añades un origen externo, actualiza la CSP en el mismo commit.

`SECURITY-TODO.md` lista acciones manuales pendientes en plataformas externas (rotación de clave, reglas WAF). No requieren tocar código.

## Gobernanza de versión

Al cerrar una versión hay que sincronizar **seis ficheros**, y esta disciplina se ha mantenido en todas las releases:

`VERSION` · `CHANGELOG.md` · `README.md` · `next_app/package.json` · `next_app/public/llms.txt` · `next_app/public/humans.txt`

`VERSION` lleva el formato `vX.Y.Z - AAAA-MM-DD - [descripción]`.

## Convenciones de commits

`tipo(ámbito): descripción en español, imperativo y en minúscula`.

Tipos en uso: `feat`, `fix`, `content`, `style`, `perf`, `chore`, `docs`, `refactor`, `brand`. Ejemplos reales del historial:

```
feat(blog): cluster hub routes, linkable badges, breadcrumb + JSON-LD
content(posts): assign cluster + topics to all 41 posts
perf(movil): monta HeroCanvas solo en escritorio
fix(a11y): cumple el contraste AA en el texto secundario atenuado
```

## Cosas que conviene no hacer

- Ejecutar `npm` desde la raíz del repositorio (no hay `package.json` allí).
- Reintroducir glassmorphism o categorías libres de blog: ambos se eliminaron deliberadamente.
- Escribir objetos `Metadata` a mano en lugar de usar `constructMetadata()`.
- Duplicar la taxonomía de clusters fuera de `lib/content/clusters.ts`.
- Commitear `public/og/` (se genera en el build).
- Dar por buena una ficha de `next_app/docs/` sin mirar antes `next_app/docs/README.md`: la mayoría son histórico cerrado.
