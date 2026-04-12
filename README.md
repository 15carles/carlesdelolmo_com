# carlesdelolmo.com

Plataforma digital profesional de Carles del Olmo, enfocada en diseño web estratégico, SEO técnico y GEO (Generative Engine Optimization), desarrollada con Next.js App Router.

## Estado del proyecto

- Entorno de producción: `https://carlesdelolmo.com`
- Versión vigente: `v3.3.0`
- Fecha de versión: `2026-03-29`
- Stack principal: Next.js 16, React 19, TypeScript
- Gestión editorial: Keystatic (local en desarrollo, GitHub en producción)
- Captación de leads: Supabase (`leads_contacto`)

## Alcance funcional

El sitio cubre actualmente:

- Home corporativa modular con narrativa orientada a conversión.
- Landings de servicios y posicionamiento local por ubicación.
- Blog dinámico con pipeline editorial por estado (`draft`, `scheduled`, `published`).
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
- Estilos: arquitectura CSS modular en `styles/main.css`, `styles/components.css`, `styles/shared.css`
- Capa SEO: utilidades centralizadas en `lib/seo/*`

## Estructura del repositorio

```text
carlesdelolmo_com/
├── next_app/
│   ├── app/                    # Rutas del sitio público, panel keystatic y API
│   ├── components/             # Componentes de interfaz y secciones
│   ├── content/                # Contenido editorial (posts, proyectos, autores)
│   ├── lib/                    # SEO, visibilidad de contenido y utilidades
│   ├── scripts/                # Scripts de migración y diagnóstico editorial
│   ├── styles/                 # Sistema de estilos global y componentes
│   └── public/                 # Assets y archivos públicos (robots, humans, llms)
├── CHANGELOG.md
├── VERSION
└── README.md
```

## Operación local

Desde la raíz del proyecto:

```bash
cd next_app
npm install
npm run dev
```

Aplicación disponible en `http://localhost:3000`.

## Scripts operativos

Scripts principales (`next_app/package.json`):

- `npm run dev`: entorno de desarrollo.
- `npm run build`: build de producción.
- `npm run start`: ejecución de build local.
- `npm run lint`: validación estática.
- `npm run pages:build`: build para Cloudflare Pages.
- `npm run keystatic:strict:check`: validación integral de contenido de proyectos.
- `npm run keystatic:phase2:gate`: gate editorial + build.

Scripts de mantenimiento editorial:

- `npm run keystatic:migrate:posts:status`
- `npm run keystatic:migrate:posts:status:check`
- `npm run keystatic:migrate:projects:strict`
- `npm run keystatic:diagnose:projects`

## Configuración de entorno

Variables requeridas para proteger Keystatic en producción:

```env
KEYSTATIC_BASIC_AUTH_USER=...
KEYSTATIC_BASIC_AUTH_PASS=...
KEYSTATIC_CANONICAL_HOST=carlesdelolmo.com
```

Si no existen credenciales en producción, el middleware bloquea acceso con `503`.

## Flujo editorial recomendado

- Panel de edición: `/keystatic`
- Fuentes de contenido: `content/posts/*.mdoc` y `content/projects/*.mdoc`
- Verificación previa a publicación de proyectos:

```bash
npm run keystatic:strict:check
```

## Gobernanza de versión

- `VERSION` define la versión y fecha oficiales.
- `CHANGELOG.md` documenta cambios funcionales y técnicos.
- `README.md`, `next_app/public/llms.txt` y `next_app/public/humans.txt` deben mantenerse alineados con `VERSION`.

## Autor

Carles del Olmo  
[LinkedIn](https://www.linkedin.com/in/delolmocarles/) · [Web](https://carlesdelolmo.com)

## Licencia

Proyecto personal. Todos los derechos reservados.
