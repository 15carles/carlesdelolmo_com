# Banner Contextual - Fase 2 (Infraestructura Reutilizable)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Cambios realizados

- Se creo la configuracion central en `lib/contextualLeadBanner.ts`.
- Se creo el componente reusable en `components/ContextualLeadBanner.tsx`.
- Se integraron estilos globales en `styles/components.css` (sin inline styles).
- Se monto el componente en el layout global de sitio:
  - `app/(site)/layout.tsx`

## Estado de activacion

- Todas las rutas del banner estan preparadas, pero `enabled: false` en esta fase.
- No hay activacion efectiva en produccion/local todavia.
- La activacion piloto se dejara para Fase 3.

## Contrato tecnico implementado en infraestructura

- Claves namespaced de sesion:
  - `cdo:contextual-lead-banner:shown`
  - `cdo:contextual-lead-banner:dismissed`
  - `cdo:contextual-lead-banner:cta-interacted`
  - `cdo:contextual-lead-banner:form-interacted`
- Triggers definidos:
  - `45s` por tiempo
  - `55%` por scroll
  - Exit intent preparado por config (`enableExitIntent`) y apagado por defecto
- Exclusiones por interaccion:
  - `data-primary-cta=\"true\"` (click)
  - Interaccion con `form` (`focusin`, `input`, `change`, `submit`)

## Preparacion para UX y accesibilidad

- Banner flotante discreto tipo slide-in.
- Sin overlay ni bloqueo de pantalla.
- Boton de cierre accesible.
- Foco visible por teclado.
- Ajuste de posicion cuando cookie banner esta visible.
- Soporte de `prefers-reduced-motion`.

## Validacion tecnica de esta fase

- `npx eslint components/ContextualLeadBanner.tsx lib/contextualLeadBanner.ts app/(site)/layout.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK

Nota de alcance:

- `npm run lint` global del repo no esta en verde por deuda previa fuera del area de esta fase
  (incluye errores/warnings historicos en rutas y artefactos de `.next`).
- El smoke runtime con `next dev` + `curl` no ha sido estable en este entorno por restricciones/errores de ejecucion local,
  por lo que la validacion principal de cierre se apoya en `build` + `typecheck` + lint focalizado del diff.
