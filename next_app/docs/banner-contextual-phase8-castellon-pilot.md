# Banner Contextual - Fase 8 (Piloto Diseno Web Castellon)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Extender el banner contextual a la landing
`/diseno-web/castellon` manteniendo integracion incremental y cambios atomicos.

## Baseline previo (antes de cambios)

Capturas previas guardadas en:

- `reports/banner-contextual/baseline/mobile/diseno-web__castellon.png`
- `reports/banner-contextual/baseline/tablet/diseno-web__castellon.png`
- `reports/banner-contextual/baseline/desktop/diseno-web__castellon.png`

## Cambios aplicados

- Activacion de `enabled: true` para:
  - `/diseno-web/castellon`
- Rutas activas acumuladas tras esta fase:
  - `/diseno-web/valencia`
  - `/diseno-web/castellon`
  - `/mantenimiento-web-valencia`
  - `/servicio-seo/auditoria-seo-geo`
  - `/servicio-seo/posicionamiento-seo-geo`
  - `/servicio-seo/autoridad-digital-ias`
- Marcado de CTA principal con `data-primary-cta="true"` en:
  - `Solicitar auditoria`
  - `Contacto`
  - `Empezar mi proyecto`
- Limpieza de deuda directa en el archivo tocado:
  - eliminado import no usado `ArrowRight`

## Validaciones de fase

- `npx eslint app/(site)/diseno-web/castellon/page.tsx lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /diseno-web/castellon` -> `200`
  - `GET /diseno-web/valencia` -> `200`

## Validacion visual rapida (cierre)

- Capturas post-cambio generadas temporalmente en:
  - `/tmp/diseno-web__castellon_after_mobile.png`
  - `/tmp/diseno-web__castellon_after_tablet.png`
  - `/tmp/diseno-web__castellon_after_desktop.png`
- Verificacion rapida:
  - mismas dimensiones y peso de archivos en rango muy cercano al baseline por viewport.
  - no se observan cambios estructurales esperados en la landing (solo atributos de CTA + config de banner).

## Mini checklist de cierre

- [x] Scope controlado: solo seccion objetivo + deuda directa
- [x] Diff claro y atomico
- [x] Responsive validado (mobile/tablet/desktop) con baseline + comprobacion rapida post-cambio
- [x] Accesibilidad basica mantenida (semantica y foco teclado via componente compartido)
- [x] Lint + typecheck + build en verde
- [x] Runtime de ruta objetivo/control en `200`
