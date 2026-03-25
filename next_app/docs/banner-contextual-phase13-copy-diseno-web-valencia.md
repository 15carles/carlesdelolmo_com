# Banner Contextual - Fase 13 (Copy /diseno-web/valencia)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Aplicar copy final del banner contextual en:

- `/diseno-web/valencia`

## Copy aplicado

- Eyebrow: `AYUDA CONTEXTUAL`
- Titulo: `¿No tienes claro si necesitas una web nueva?`
- Texto: `Cuéntame tu caso y te orientaré sobre si conviene crear una nueva web, mejorar la actual o replantear su base.`
- Boton: `Solicitar valoración`

## Ajuste tecnico para escalabilidad

- Se habilita `eyebrow` opcional por ruta en la interfaz de configuracion del banner.
- El componente usa fallback estable (`Ayuda contextual`) cuando la ruta no define eyebrow.

## Validaciones de fase

- `npx eslint lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /diseno-web/valencia` -> `200`
  - verificacion de render HTML con eyebrow/titulo/texto/boton exactos -> OK

## Mini checklist de cierre

- [x] Scope controlado: copy de seccion objetivo + ajuste tecnico directo relacionado
- [x] Diff claro y atomico
- [x] Responsive sin cambios estructurales
- [x] Accesibilidad basica mantenida
- [x] Lint + typecheck + build en verde
- [x] Runtime sin warnings en ruta objetivo
