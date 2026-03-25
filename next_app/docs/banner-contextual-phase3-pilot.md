# Banner Contextual - Fase 3 (Piloto Valencia)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Activar el banner contextual unicamente en la landing piloto `/diseno-web/valencia`,
manteniendo el resto de rutas en estado no activo.

## Cambios aplicados

- Activacion de la ruta piloto en `lib/contextualLeadBanner.ts`:
  - `/diseno-web/valencia` -> `enabled: true`
- Resto de rutas del banner permanecen en `enabled: false`.
- Marcado de CTA principal en la landing piloto con `data-primary-cta="true"`:
  - botones de `/contacto` en `app/(site)/diseno-web/valencia/page.tsx`
- Limpieza de deuda directa del archivo tocado:
  - eliminada importacion no usada (`ArrowRight`) en la misma pagina.

## Validaciones de fase

- `npx eslint components/ContextualLeadBanner.tsx lib/contextualLeadBanner.ts app/(site)/layout.tsx app/(site)/diseno-web/valencia/page.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK

## Runtime local para revision

- Servidor dev levantado en `http://127.0.0.1:3000`
- Ruta piloto para revisar:
  - `http://127.0.0.1:3000/diseno-web/valencia`

