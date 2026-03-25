# Banner Contextual - Fase 7 (Piloto Autoridad Digital para IAs)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Extender el banner contextual a la landing
`/servicio-seo/autoridad-digital-ias` manteniendo la integracion incremental y atomica.

## Cambios aplicados

- Activacion de `enabled: true` para:
  - `/servicio-seo/autoridad-digital-ias`
- Rutas activas acumuladas tras esta fase:
  - `/diseno-web/valencia`
  - `/mantenimiento-web-valencia`
  - `/servicio-seo/auditoria-seo-geo`
  - `/servicio-seo/posicionamiento-seo-geo`
  - `/servicio-seo/autoridad-digital-ias`
- Marcado de CTA principal con `data-primary-cta="true"` en:
  - `Consultar disponibilidad`
  - `Agendar consultoria tecnica`
- Limpieza de deuda directa en el archivo tocado:
  - escape de comillas en JSX para cumplir `react/no-unescaped-entities`

## Validaciones de fase

- `npx eslint app/(site)/servicio-seo/autoridad-digital-ias/page.tsx lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /servicio-seo/autoridad-digital-ias` -> `200`
  - `GET /diseno-web/valencia` -> `200`

## Mini checklist de cierre

- [x] Responsive (mobile/tablet/desktop): sin cambios estructurales en layout de pagina; banner reutiliza comportamiento responsive ya validado en fases previas.
- [x] Accesibilidad basica: HTML semantico intacto, CTA primarios etiquetados, cierre de banner y foco teclado ya cubiertos por el componente compartido.
- [x] Lint + typecheck + build: en verde para esta fase.
- [x] Runtime sin errores funcionales: rutas objetivo y control responden correctamente en localhost.
