# Banner Contextual - Fase 10 (Piloto Diseno Web Principal)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Extender el banner contextual a la landing principal de servicio
`/diseno-web` con cambios atomicos y cierre validable.

## Baseline previo (antes de cambios)

Capturas previas guardadas en:

- `reports/banner-contextual/baseline/mobile/diseno-web.png`
- `reports/banner-contextual/baseline/tablet/diseno-web.png`
- `reports/banner-contextual/baseline/desktop/diseno-web.png`

## Cambios aplicados

- Activacion de `enabled: true` para:
  - `/diseno-web`
- Rutas activas acumuladas tras esta fase:
  - `/diseno-web`
  - `/diseno-web/valencia`
  - `/diseno-web/castellon`
  - `/diseno-web/alicante`
  - `/mantenimiento-web-valencia`
  - `/servicio-seo/auditoria-seo-geo`
  - `/servicio-seo/posicionamiento-seo-geo`
  - `/servicio-seo/autoridad-digital-ias`
- Marcado de CTA principal con `data-primary-cta="true"` en:
  - `Cuentame tu proyecto` (hero)
  - `Consulta tu proyecto`
  - `Cuentame tu proyecto` (bloque final)
- Limpieza de deuda directa en la pagina objetivo:
  - escape de comillas en snippet JSX para cumplir `react/no-unescaped-entities`
  - reemplazo de `img` por `Image` (elimina warning `@next/next/no-img-element`)
  - eliminacion de estilo inline `style={{ transform: 'scale(1.3)' }}` y sustitucion por clase CSS reutilizable `diseno-web__mockup-scale`

## Validaciones de fase

- `npx eslint app/(site)/diseno-web/page.tsx lib/contextualLeadBanner.ts components/ContextualLeadBanner.tsx` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK
- Runtime local:
  - `GET /diseno-web` -> `200`
  - `GET /diseno-web/valencia` -> `200`

## Validacion visual rapida (cierre)

- Capturas post-cambio generadas temporalmente en:
  - `/tmp/diseno-web_after_mobile.png`
  - `/tmp/diseno-web_after_tablet.png`
  - `/tmp/diseno-web_after_desktop.png`
- Verificacion rapida:
  - sin cambios estructurales en layout de la landing.
  - diferencias puntuales esperables por normalizacion de renderizado de imagen al migrar de `img` a `Image`.

## Mini checklist de cierre

- [x] Scope controlado: seccion objetivo + deuda directa
- [x] Diff claro y atomico
- [x] Responsive validado (mobile/tablet/desktop) con baseline + comprobacion post-cambio
- [x] Accesibilidad basica mantenida (semantica, foco teclado, contraste y cierre de banner)
- [x] Lint + typecheck + build en verde
- [x] Runtime en verde sin warnings para la ruta objetivo y ruta control de fase
