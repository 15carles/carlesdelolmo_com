# Banner Contextual - Fase 11 (Hardening Runtime Warnings)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Eliminar warnings de runtime detectados en landings de servicio ya integradas
(` /diseno-web/alicante` y `/diseno-web/castellon`) causados por rutas de imagen inexistentes.

## Contexto

Durante validaciones previas de fase, `next dev` mostraba errores en consola:

- `GET /assets/images/stock/puerto-alicante-nocturno.webp 404`
- `GET /assets/images/stock/plaza-santa-clara-castellon.webp 404`
- `The requested resource isn't a valid image ...`

## Cambios aplicados

- Reutilizacion de assets existentes (sin dependencias nuevas) para crear los dos recursos faltantes en:
  - `public/assets/images/stock/puerto-alicante-nocturno.webp`
  - `public/assets/images/stock/plaza-santa-clara-castellon.webp`
- Se mantienen las rutas actuales usadas por las landings, evitando tocar copy/estructura/componentes.

## Validaciones de fase

- `npx eslint app/(site)/diseno-web/alicante/page.tsx app/(site)/diseno-web/castellon/page.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /diseno-web/alicante` -> `200`
  - `GET /diseno-web/castellon` -> `200`
  - `GET /assets/images/stock/puerto-alicante-nocturno.webp` -> `200`
  - `GET /assets/images/stock/plaza-santa-clara-castellon.webp` -> `200`
- Verificacion de logs en `next dev`:
  - sin nuevos `404` ni warnings de imagen en rutas objetivo.

## Mini checklist de cierre

- [x] Scope controlado: deuda directa del area tocada (imagenes de landings integradas)
- [x] Diff claro y atomico
- [x] Responsive mobile/tablet/desktop sin cambios estructurales de layout
- [x] Accesibilidad basica mantenida (sin cambios en semantica/foco)
- [x] Lint + typecheck + build en verde
- [x] Runtime sin warnings en la seccion objetivo
