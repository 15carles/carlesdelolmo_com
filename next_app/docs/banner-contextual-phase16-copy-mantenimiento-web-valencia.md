# Banner Contextual - Fase 16 (Copy /mantenimiento-web-valencia)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Aplicar copy final del banner contextual en:

- `/mantenimiento-web-valencia`

## Copy aplicado

- Eyebrow: `AYUDA CONTEXTUAL`
- Titulo: `¿Tu web necesita mantenimiento o algo más?`
- Texto: `Cuéntame tu caso y te orientaré sobre si encaja un mantenimiento recurrente o si conviene plantear otra intervención.`
- Boton: `Solicitar revisión`

## Validaciones de fase

- `npx eslint lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /mantenimiento-web-valencia` -> `200`
  - verificacion de render HTML con eyebrow/titulo/texto/boton exactos -> OK

## Mini checklist de cierre

- [x] Scope controlado: solo copy de seccion objetivo
- [x] Diff claro y atomico
- [x] Responsive sin cambios estructurales
- [x] Accesibilidad basica mantenida
- [x] Lint + typecheck + build en verde
- [x] Runtime sin warnings en ruta objetivo
