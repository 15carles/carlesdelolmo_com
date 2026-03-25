# Banner Contextual - Fase 19 (Fix warning workspace root)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Eliminar warning global de Next.js sobre deteccion de workspace root por lockfiles duplicados.

## Cambio aplicado

- Se define `turbopack.root` en `next.config.ts` para fijar explicitamente el root del proyecto y evitar inferencia por lockfiles fuera del repo.

## Validaciones de fase

- `npx eslint next.config.ts` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Resultado esperado:
  - warning `Next.js inferred your workspace root` -> no aparece

## Mini checklist de cierre

- [x] Scope controlado: solo configuracion de root en Next
- [x] Diff claro y atomico
- [x] Lint + typecheck + build en verde
- [x] Warning global resuelto
