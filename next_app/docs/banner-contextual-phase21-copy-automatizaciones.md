# Banner Contextual - Fase 21 (Copy /automatizaciones)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Aplicar copy del banner contextual para:

- `/automatizaciones` (preparado para futura activacion)

## Copy aplicado

- Eyebrow: `AYUDA CONTEXTUAL`
- Titulo: `¿No tienes claro si conviene automatizar?`
- Texto: `Cuéntame tu caso y te orientaré sobre si merece la pena automatizar parte del proceso o si antes conviene resolver otra base.`
- Boton: `Solicitar valoración`

## Estado de activacion

- La ruta `/automatizaciones` no existe actualmente en `app/`.
- Se mantiene `enabled: false` para evitar mostrar el banner en una ruta inexistente y conservar comportamiento estable.

## Validaciones de fase

- `npx eslint lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx next.config.ts` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK

## Incidencia de entorno resuelta

- `tsc` detecto artefactos duplicados en `.next/types` (`routes.d 6.ts`, `routes.d 7.ts`, `validator 6.ts`, `validator 7.ts`); se eliminaron para restaurar validacion estable.

## Mini checklist de cierre

- [x] Scope controlado: solo copy de seccion objetivo
- [x] Diff claro y atomico
- [x] Responsive sin cambios estructurales
- [x] Accesibilidad basica mantenida
- [x] Lint + typecheck + build en verde
- [x] Runtime estable (sin activacion en ruta inexistente)
