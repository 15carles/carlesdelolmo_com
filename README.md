# carlesdelolmo.com

Plataforma digital profesional de Carles del Olmo, enfocada en diseño web estratégico, SEO técnico y GEO (Generative Engine Optimization), desarrollada con Next.js App Router.

## Estado del proyecto

- Entorno de producción: `https://carlesdelolmo.com`
- Versión vigente: `v4.2.0`
- Fecha de versión: `2026-07-22`
- Stack principal: Next.js 16, React 19, TypeScript
- Gestión editorial: Keystatic (local en desarrollo, GitHub en producción)
- Captación de leads: Supabase (`leads_contacto`)
- Base de investigación del Laboratorio de visibilidad en IA: Supabase (`ai_visibility_lab_*`, región UE)

## Alcance funcional

El sitio cubre actualmente:

- Home corporativa modular con narrativa orientada a conversión.
- Landings de servicios y posicionamiento local por ubicación.
- Blog dinámico con pipeline editorial por estado (`draft`, `scheduled`, `published`).
- Taxonomía controlada de clusters de contenido con hubs en `/blog/categoria/*`.
- Laboratorio de visibilidad en IA (`/laboratorio-visibilidad-ia`) con base de investigación en Supabase.
- Portafolio/casos de estudio con render enriquecido desde CMS.
- SEO técnico integrado: metadatos, JSON-LD, Open Graph, sitemap y RSS.
- Capa de cumplimiento y medición: Consent Mode v2, banner de cookies y GA4.
- Endurecimiento de acceso para panel Keystatic en producción mediante Basic Auth.

## Arquitectura técnica

- Framework: `next@16.1.6`
- UI Runtime: `react@19.2.3`
- Lenguaje: `TypeScript`
- CMS Git-based: `@keystatic/core`, `@keystatic/next`
- Datos de contacto: `@supabase/supabase-js`
- Estilos: arquitectura CSS modular en `styles/main.css`, `styles/shared.css` y `styles/components.css`, importados desde `app/(site)/globals.css`
- Tipografía: fuentes variables auto-alojadas (Fraunces e Instrument Sans) vía `next/font/local`
- Capa SEO: utilidades centralizadas en `lib/seo/*`, con `constructMetadata()` como punto único de metadatos
- Taxonomía de contenido: `lib/content/clusters.ts` como fuente de verdad de clusters y temas

## Estructura del repositorio

```text
carlesdelolmo_com/
├── next_app/
│   ├── app/                    # Rutas del sitio público, panel keystatic y API
│   ├── components/             # Componentes de interfaz y secciones
│   ├── content/                # Contenido editorial (posts, proyectos, autores)
│   ├── data/                   # Datos estáticos (demos, reseñas de Google)
│   ├── docs/                   # Fichas de fase e histórico técnico (ver docs/README.md)
│   ├── lib/                    # SEO, clusters, visibilidad y laboratorio de IA
│   ├── scripts/                # Scripts de migración, diagnóstico y generación de OG
│   ├── styles/                 # Sistema de estilos global y componentes
│   ├── supabase/migrations/    # Esquema SQL del laboratorio de visibilidad en IA
│   ├── public/                 # Assets y archivos públicos (robots, humans, llms)
│   ├── keystatic.config.tsx    # Configuración del CMS
│   └── middleware.ts           # Protección de /keystatic
├── .github/workflows/          # Automatización editorial (publicación programada)
├── CHANGELOG.md
├── CLAUDE.md
├── VERSION
└── README.md
```

No existe `package.json` en la raíz: todos los comandos npm se ejecutan desde `next_app/`.

## Operación local

```bash
cd next_app
npm install --legacy-peer-deps
npm run dev
```

Aplicación disponible en `http://localhost:3000`.

El flag `--legacy-peer-deps` es necesario: `@cloudflare/next-on-pages@1.13.16` declara el peer `next >=14.3.0 && <=15.5.2` y el proyecto usa `next@16.1.6`, por lo que `npm install` sin el flag falla con `ERESOLVE`. El `.npmrc` de la raíz no cubre este caso porque npm resuelve la configuración de proyecto desde `next_app/`.

## Scripts operativos

Scripts principales (`next_app/package.json`):

- `npm run dev`: entorno de desarrollo.
- `npm run build`: build de producción.
- `npm run start`: ejecución de build local.
- `npm run lint`: validación estática.
- `npm run pages:build`: build para Cloudflare Pages + generación de imágenes Open Graph.
- `npm run og`: generación de imágenes Open Graph (salida en `public/og/`, no versionada).
- `npm run keystatic:strict:check`: validación integral de contenido de proyectos.
- `npm run keystatic:phase2:gate`: gate editorial + build.

Scripts de mantenimiento editorial:

- `npm run keystatic:migrate:posts:status`
- `npm run keystatic:migrate:posts:status:check`
- `npm run keystatic:migrate:projects:strict`
- `npm run keystatic:diagnose:projects`

## Configuración de entorno

Protección del panel Keystatic en producción:

```env
KEYSTATIC_BASIC_AUTH_USER=...
KEYSTATIC_BASIC_AUTH_PASS=...
KEYSTATIC_CANONICAL_HOST=carlesdelolmo.com
```

Si no existen credenciales en producción, el middleware bloquea acceso con `503`.

Autenticación de Keystatic contra GitHub en producción (`storage: github`). Estas variables las consume `@keystatic/next` internamente, por lo que no aparecen en el código del proyecto:

```env
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...
```

Acceso a Supabase, usado por `/api/contact` (leads) y `/api/lab-research` (laboratorio de visibilidad en IA):

```env
SUPABASE_URL=...
SUPABASE_PUBLISHABLE_KEY=...
```

## Flujo editorial recomendado

- Panel de edición: `/keystatic`
- Fuentes de contenido: `content/posts/*.mdoc` y `content/projects/*.mdoc`
- Cada post requiere `cluster` y `topics`, definidos en `next_app/lib/content/clusters.ts` como fuente de verdad única.
- Verificación previa a publicación de proyectos:

```bash
npm run keystatic:strict:check
```

### Publicación programada

El workflow `.github/workflows/publish-scheduled-posts.yml` se ejecuta cada hora, aplica `scripts/migrate-posts-status.mjs` y hace commit y push automático sobre `next_app/content/posts` cuando un post con estado `scheduled` alcanza su `isoDate`.

Implicaciones operativas:

- Aparecen commits automáticos `chore(content): publish scheduled posts`.
- Conviene hacer `git pull` antes de editar `content/posts`.
- Las rutas de blog usan `revalidate = 3600`, por lo que un cambio publicado puede tardar hasta una hora en reflejarse.

## Despliegue

- Dominio de producción servido desde Cloudflare (`next_app/public/CNAME`).
- Build específico de plataforma: `npm run pages:build`.
- Cabeceras de seguridad (HSTS, `X-Frame-Options`, `Permissions-Policy`) y CSP en modo `Report-Only` definidas en `next_app/next.config.ts`.
- Pendientes manuales de plataforma documentados en `SECURITY-TODO.md`.

## Gobernanza de versión

- `VERSION` define la versión y fecha oficiales, con formato `vX.Y.Z - AAAA-MM-DD - [descripción]`.
- `CHANGELOG.md` documenta cambios funcionales y técnicos.
- Al cerrar una versión se sincronizan seis ficheros: `VERSION`, `CHANGELOG.md`, `README.md`, `next_app/package.json`, `next_app/public/llms.txt` y `next_app/public/humans.txt`.

## Documentación adicional

- `CLAUDE.md`: guía técnica de trabajo en el repositorio (arquitectura, convenciones y comandos).
- `next_app/docs/README.md`: índice de documentación técnica, con separación entre documentos vigentes e histórico.
- `SECURITY.md` y `SECURITY-TODO.md`: postura de seguridad y acciones manuales pendientes.

## Autor

Carles del Olmo  
[LinkedIn](https://www.linkedin.com/in/delolmocarles/) · [Web](https://carlesdelolmo.com)

## Licencia

Proyecto personal. Todos los derechos reservados.
