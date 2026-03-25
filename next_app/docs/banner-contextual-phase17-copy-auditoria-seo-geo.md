# Banner Contextual - Fase 17 (Copy /servicio-seo/auditoria-seo-geo)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Aplicar copy final del banner contextual en:

- `/servicio-seo/auditoria-seo-geo`

## Copy aplicado

- Eyebrow: `AYUDA CONTEXTUAL`
- Titulo: `¿No tienes claro qué está frenando tu visibilidad?`
- Texto: `Cuéntame tu caso y te orientaré sobre si conviene hacer una auditoría o si necesitas otro tipo de intervención.`
- Boton: `Solicitar revisión`

## Validaciones de fase

- `npx eslint lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /servicio-seo/auditoria-seo-geo` -> `200`
  - verificacion de render HTML con eyebrow/titulo/texto/boton exactos -> OK

## Mini checklist de cierre

- [x] Scope controlado: solo copy de seccion objetivo
- [x] Diff claro y atomico
- [x] Responsive sin cambios estructurales
- [x] Accesibilidad basica mantenida
- [x] Lint + typecheck + build en verde
- [x] Runtime sin warnings en ruta objetivo
