# Banner Contextual - Fase 4 (Piloto Mantenimiento)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Extender de forma incremental el banner contextual a la landing
`/mantenimiento-web-valencia`, manteniendo el enfoque de entrega atomica.

## Cambios aplicados

- Activacion de `enabled: true` para:
  - `/mantenimiento-web-valencia`
- Se mantiene tambien activa la ruta piloto previa:
  - `/diseno-web/valencia`
- Marcado de CTA principal con `data-primary-cta="true"` en la pagina de mantenimiento:
  - `Solicitar mantenimiento`
  - `Revisar mi web`
  - `contarme tu caso`

## Validaciones de fase

- `npx eslint app/(site)/mantenimiento-web-valencia/page.tsx lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /diseno-web/valencia` -> `200`
  - `GET /mantenimiento-web-valencia` -> `200`

