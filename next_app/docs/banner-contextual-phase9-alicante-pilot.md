# Banner Contextual - Fase 9 (Piloto Diseno Web Alicante)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Extender el banner contextual a la landing
`/diseno-web/alicante` manteniendo integracion incremental y cambios atomicos.

## Baseline previo (antes de cambios)

Capturas previas guardadas en:

- `reports/banner-contextual/baseline/mobile/diseno-web__alicante.png`
- `reports/banner-contextual/baseline/tablet/diseno-web__alicante.png`
- `reports/banner-contextual/baseline/desktop/diseno-web__alicante.png`

## Cambios aplicados

- Activacion de `enabled: true` para:
  - `/diseno-web/alicante`
- Rutas activas acumuladas tras esta fase:
  - `/diseno-web/valencia`
  - `/diseno-web/castellon`
  - `/diseno-web/alicante`
  - `/mantenimiento-web-valencia`
  - `/servicio-seo/auditoria-seo-geo`
  - `/servicio-seo/posicionamiento-seo-geo`
  - `/servicio-seo/autoridad-digital-ias`
- Marcado de CTA principal con `data-primary-cta="true"` en:
  - `Pide presupuesto`
  - `Contacto`
  - `Hablemos de tu web`
- Limpieza de deuda directa en el archivo tocado:
  - eliminado import no usado `ArrowRight`

## Validaciones de fase

- `npx eslint app/(site)/diseno-web/alicante/page.tsx lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /diseno-web/alicante` -> `200`
  - `GET /diseno-web/castellon` -> `200`

## Validacion visual rapida (cierre)

- Capturas post-cambio generadas temporalmente en:
  - `/tmp/diseno-web__alicante_after_mobile.png`
  - `/tmp/diseno-web__alicante_after_tablet.png`
  - `/tmp/diseno-web__alicante_after_desktop.png`
- Verificacion rapida:
  - dimensiones iguales y tamano de archivo en rango cercano al baseline por viewport.
  - sin cambios estructurales esperados en la landing (solo atributos de CTA + config de banner).

## Incidencias de entorno resueltas en fase

- `tsc` detecto artefactos duplicados en `.next/types` (`* N.ts`); se limpiaron para restaurar validacion estable.
- `build` encontro cache inconsistente en `.next`; se regenero `.next` completo antes de validar.
- Runtime local quedo en `200` tras reinicio del proceso `dev` en `127.0.0.1:3000`.

## Mini checklist de cierre

- [x] Scope controlado: solo seccion objetivo + deuda directa
- [x] Diff claro y atomico
- [x] Responsive validado (mobile/tablet/desktop) con baseline + comprobacion rapida post-cambio
- [x] Accesibilidad basica mantenida (semantica y foco teclado via componente compartido)
- [x] Lint + typecheck + build en verde
- [x] Runtime de ruta objetivo/control en `200`
