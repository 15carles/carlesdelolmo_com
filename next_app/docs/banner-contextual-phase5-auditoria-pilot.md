# Banner Contextual - Fase 5 (Piloto Auditoria SEO + GEO)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Extender el banner contextual a la landing
`/servicio-seo/auditoria-seo-geo` manteniendo la integracion incremental.

## Cambios aplicados

- Activacion de `enabled: true` para:
  - `/servicio-seo/auditoria-seo-geo`
- Rutas activas acumuladas tras esta fase:
  - `/diseno-web/valencia`
  - `/mantenimiento-web-valencia`
  - `/servicio-seo/auditoria-seo-geo`
- Marcado de CTA principal con `data-primary-cta="true"` en:
  - `Reservar Auditoria`
  - `Solicitar presupuesto personalizado`
- Limpieza de deuda directa en el archivo tocado:
  - eliminados imports no usados (`BarChart3`, `Shield`, `ArrowRight`)

## Validaciones de fase

- `npx eslint app/(site)/servicio-seo/auditoria-seo-geo/page.tsx lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /servicio-seo/auditoria-seo-geo` -> `200`
  - `GET /mantenimiento-web-valencia` -> `200`

