# Banner Contextual - Fase 6 (Piloto Posicionamiento SEO + GEO)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Extender el banner contextual a la landing
`/servicio-seo/posicionamiento-seo-geo` manteniendo el despliegue incremental.

## Cambios aplicados

- Activacion de `enabled: true` para:
  - `/servicio-seo/posicionamiento-seo-geo`
- Rutas activas acumuladas tras esta fase:
  - `/diseno-web/valencia`
  - `/mantenimiento-web-valencia`
  - `/servicio-seo/auditoria-seo-geo`
  - `/servicio-seo/posicionamiento-seo-geo`
- Marcado de CTA principal con `data-primary-cta="true"` en:
  - `Empezar ahora`
  - `Solicitar propuesta`
- Limpieza de deuda directa en el archivo tocado:
  - eliminados imports no usados (`Target`, `Users`)

## Validaciones de fase

- `npx eslint app/(site)/servicio-seo/posicionamiento-seo-geo/page.tsx lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /servicio-seo/posicionamiento-seo-geo` -> `200`
  - `GET /servicio-seo/auditoria-seo-geo` -> `200`

