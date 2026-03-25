# Banner Contextual - Fase 14 (Copy /diseno-web/castellon)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Aplicar copy final del banner contextual en:

- `/diseno-web/castellon`

## Copy aplicado

- Eyebrow: `AYUDA CONTEXTUAL`
- Titulo: `¿No tienes claro si necesitas una web nueva?`
- Texto: `Cuéntame tu caso y te orientaré sobre si conviene crear una nueva web, mejorar la actual o replantear su base.`
- Boton: `Solicitar valoración`

## Validaciones de fase

- `npx eslint lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /diseno-web/castellon` -> `200`
  - verificacion de render HTML con eyebrow/titulo/texto/boton exactos -> OK

## Incidencia de entorno resuelta

- `tsc` detecto artefactos duplicados en `.next/types` (`* N.ts`); se limpiaron para restaurar validacion estable.

## Mini checklist de cierre

- [x] Scope controlado: solo copy de seccion objetivo
- [x] Diff claro y atomico
- [x] Responsive sin cambios estructurales
- [x] Accesibilidad basica mantenida
- [x] Lint + typecheck + build en verde
- [x] Runtime sin warnings en ruta objetivo
