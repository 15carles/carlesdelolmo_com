# Banner Contextual - Fase 0

Fecha: 2026-03-25
Branch: `codex/banner-contextual`

## Estado de rama
- Base validada en `main` limpio.
- Rama creada para esta tarea: `codex/banner-contextual`.
- Restriccion mantenida: sin merge/push/publicacion a `main`.

## Baseline visual capturado
Se han generado referencias visuales en:
- `next_app/reports/banner-contextual/baseline/mobile/`
- `next_app/reports/banner-contextual/baseline/tablet/`
- `next_app/reports/banner-contextual/baseline/desktop/`

Rutas incluidas:
- `/diseno-web/valencia`
- `/mantenimiento-web-valencia`
- `/servicio-seo/auditoria-seo-geo`
- `/servicio-seo/posicionamiento-seo-geo`
- `/servicio-seo/autoridad-digital-ias`

Total capturas: 15 (5 rutas x 3 viewports)

Nota: `next_app/reports/` esta ignorado por git (no aparece en `git status`), pero los archivos existen localmente para comparacion de regresiones.

## Mini checklist por seccion (plantilla)

- [ ] Scope controlado: solo seccion objetivo + deuda directa relacionada
- [ ] Diff claro y atomico
- [ ] Sin estilos inline nuevos
- [ ] Sin dependencias nuevas
- [ ] Responsive validado: mobile/tablet/desktop
- [ ] Sin regresiones visuales frente al baseline
- [ ] Accesibilidad basica: semantica, foco teclado, contraste
- [ ] Reglas funcionales del banner validadas
- [ ] Lint en verde
- [ ] Typecheck en verde
- [ ] Build en verde
- [ ] Runtime sin errores/warnings
- [ ] Seccion lista para revision
