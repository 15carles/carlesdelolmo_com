# Banner Contextual - Fase 22 (Navbar Servicios: opacidad)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de la fase

Ajustar la opacidad del desplegable de `Servicios` en la navbar para hacerlo mas opaco sin alterar estructura ni comportamiento.

## Cambio aplicado

- En `styles/components.css`, se incrementa la opacidad de fondo de:
  - `.navbar .dropdown__menu`
  - `.navbar .dropdown__submenu`
- Valores actualizados:
  - tema claro: `rgba(255, 255, 255, 0.93)`
  - tema oscuro: `rgba(15, 23, 42, 0.93)`

## Validaciones de fase

- `npx eslint components/Navbar.tsx --max-warnings 0` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK

## Nota de lint global

- `npm run lint` global sigue reportando incidencias preexistentes fuera de scope (incluyendo artefactos de `.next/`), por lo que se mantiene validacion acotada al area tocada, como en fases anteriores.

## Mini checklist de cierre

- [x] Scope controlado: solo estilos del desplegable de `Servicios`
- [x] Diff claro y atomico
- [x] Responsive sin cambios estructurales
- [x] Accesibilidad basica mantenida
- [x] Lint + typecheck + build en verde (acotado al area tocada para lint)
