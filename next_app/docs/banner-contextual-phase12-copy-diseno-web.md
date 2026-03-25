# Banner Contextual - Fase 12 (Copy /diseno-web)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Aplicar copy final del banner contextual en la ruta:

- `/diseno-web`

## Copy aplicado

- Titulo: `¿No tienes claro si necesitas una web nueva?`
- Texto: `Cuéntame tu caso y te orientaré sobre si conviene crear una nueva web, replantear la actual o mejorar su base con criterio.`
- Boton: `Solicitar valoración`

## Validaciones de fase

- `npx eslint lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /diseno-web` -> `200`
  - verificacion de render HTML con el copy exacto -> OK

## Mini checklist de cierre

- [x] Scope controlado: solo copy de la seccion objetivo
- [x] Diff claro y atomico
- [x] Responsive sin cambios estructurales
- [x] Accesibilidad basica mantenida
- [x] Lint + typecheck + build en verde
- [x] Runtime sin warnings en ruta objetivo
