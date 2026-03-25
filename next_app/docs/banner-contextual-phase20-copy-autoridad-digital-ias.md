# Banner Contextual - Fase 20 (Copy /servicio-seo/autoridad-digital-ias)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Aplicar copy final del banner contextual en:

- `/servicio-seo/autoridad-digital-ias`

## Copy aplicado

- Eyebrow: `AYUDA CONTEXTUAL`
- Titulo: `¿No tienes claro si este servicio aplica a tu negocio?`
- Texto: `Cuéntame tu caso y te orientaré sobre si tiene sentido trabajar tu autoridad digital para entornos de IA o si conviene otro enfoque antes.`
- Boton: `Solicitar valoración`

## Validaciones de fase

- `npx eslint lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx next.config.ts` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /servicio-seo/autoridad-digital-ias` -> `200`
  - Banner controlado por logica cliente del layout (validado via configuracion de ruta y compilacion en verde)

## Mini checklist de cierre

- [x] Scope controlado: solo copy de seccion objetivo
- [x] Diff claro y atomico
- [x] Responsive sin cambios estructurales
- [x] Accesibilidad basica mantenida
- [x] Lint + typecheck + build en verde
- [x] Runtime sin errores de ruta objetivo
