# REDESIGN_PHASE_1_HANDOFF.md

## Current phase
Phase 1 — Visual tokens. Completada.

---

## Completed changes

### `next_app/styles/main.css`
- Reemplazado el bloque `:root` / `[data-theme="light"]` entero con la paleta 2026 aprobada.
- Nuevos tokens introducidos:
  - Fondos cálidos: `--color-bg-primary: #F7F3EA`, `--color-bg-secondary: #EFE8DC`, `--color-surface`, `--color-surface-soft`
  - Marca: `--color-brand-primary: #123C55`, `--color-brand-secondary: #1F5F6B`
  - Acento: `--color-accent: #B9D94A`, `--color-accent-soft: #E7F2B8`
  - Texto: `--color-text-primary: #172026`, `--color-text-secondary`, `--color-text-muted`
  - Bordes: `--color-border: #DDD4C8`, `--color-border-strong: #C7BAAA`
  - Foco: `--color-focus`, `--color-focus-ring`, `--color-focus-outline`
  - Estados semánticos: `--color-success`, `--color-warning`, `--color-error`, `--color-info` (y variantes soft)
  - Sombras sutiles sin resplandor: `--shadow-xs/sm/md/lg`, `--shadow-glow` neutralizado
- Gradientes visibles eliminados de la capa de tokens:
  - `--gradient-primary`, `--gradient-button`, `--gradient-bg` → aliases a colores planos
- Aliases de compatibilidad mantenidos para no romper `components.css` y `shared.css`:
  - `--color-accent-blue`, `--color-accent-cyan`, `--color-accent-purple` → redirigidos a nueva paleta
  - `--color-bg-card`, `--color-bg-card-strong` → alias a `--color-surface`
- Modo oscuro neutralizado como capa de compatibilidad: gradientes aplanados, glow eliminado
- `body`: eliminado el stack de `background-image` (SVG waves animadas + gradient-bg), sustituido por `background-color: var(--color-bg-primary)`
- Canvas del juego 404: `linear-gradient` hardcoded reemplazado por `var(--color-surface)`
- `a:focus-visible`: `--color-accent-cyan` sustituido por `--color-focus`

### `next_app/app/(site)/globals.css`
- Eliminada referencia rota a `var(--bg-dark)` (variable que nunca existió)
- `--background` y `--foreground` ahora apuntan a los nuevos tokens en lugar de valores hardcoded oscuros

---

## Files modified
- `next_app/styles/main.css`
- `next_app/app/(site)/globals.css`

---

## Checks already run
- Búsqueda de gradientes visibles en archivos modificados → limpio
- Búsqueda de colores hardcoded fuera de tokens → solo en clases de utilidad `.bg-dark` / `.bg-gradient` (aceptable)
- `npm run lint` → no ejecutable (dependencias no instaladas en el entorno)
- `npm run build` → no ejecutable (dependencias no instaladas en el entorno)

---

## Known issues
1. **`components.css` tiene ~20 `linear-gradient()` hardcoded** con colores de la paleta antigua (purpuras, cyan, azules de DevGEO). Ejemplos:
   - Líneas 931–939, 1017–1025: gradientes de iconos de servicio
   - Líneas 1211–1295: overlays de tarjetas con gradientes neon
   - Líneas 1341–1357: `--scope-card-accent` con gradientes visibles
   - Líneas 1427–1469: fondos de bloques ORBITA con gradientes
   - Estos no se tocaron porque Phase 1 tiene scope solo en la capa de tokens
2. **`.bg-dark` en `main.css`** usa `#0a0e1a` hardcoded — intencional como clase de utilidad, pero podría mapearse a una variable en limpieza posterior
3. **Navbar logo en `components.css`** usa `background: var(--gradient-primary)` con `-webkit-background-clip: text` — ahora mostrará el color sólido `#123C55` (ink blue), que es correcto, pero no fue verificado visualmente
4. **`floating-waves` keyframe** sigue definido en `main.css` pero ya no se usa (el `body` no tiene `animation`). Es CSS muerto, no causa problemas pero puede limpiarse en Phase 5

---

## Pending tasks (según el prompt original, lo que NO se hizo)

### No completado en Phase 1 (fuera de scope intencional):

| Tarea | Por qué no se hizo |
|---|---|
| Neutralizar gradientes en `components.css` | Phase 1 es solo capa de tokens globales. Los componentes son Phase 2/3 (skill 03) |
| Rediseñar Navbar, Footer, botones, cards | Scope de Phase 2 — skill `03-global-components-redesign` |
| Rediseñar Hero, homepage, secciones de servicio, blog | Scope de Phase 3 — skill `04-page-sections-redesign` |
| Verificar visualmente en browser | No hay entorno de preview disponible sin `npm install` |
| `npm run lint` y `npm run build` | Dependencias no instaladas en el entorno de ejecución |
| Limpiar CSS muerto (`floating-waves`, SVG wave variables en dark mode) | Puede hacerse en Phase 5 (`safe-redesign-workflow`) para no mezclar limpieza con tokens |
| Modo oscuro completo y cohesionado con la nueva paleta | El prompt pide preservarlo solo como compatibilidad; una revisión completa de dark mode es trabajo separado |

---

## Recommended next phase

**Phase 2 — Componentes globales** usando skill `03-global-components-redesign`:

Cargar el skill `03` y trabajar en `next_app/styles/components.css`:
1. Neutralizar los `linear-gradient()` hardcoded en tarjetas de servicio, cards ORBITA, scope cards, iconos
2. Actualizar el logo de la navbar para que use `var(--color-brand-primary)` directamente
3. Actualizar hover states de botones para que usen los nuevos tokens de borde y superficie
4. Pasar QA con skill `06` antes de continuar

Prompt sugerido para la siguiente sesión:
```
Continúa con Phase 2 del rediseño visual. La Phase 1 (tokens) está completada en la rama
redesign/visual-system-2026. Carga el skill 03-global-components-redesign y neutraliza los
gradientes hardcoded de components.css: líneas 931-939, 1017-1025, 1211-1295, 1341-1357,
1427-1469, 1660-1664. Usa los tokens ya definidos (--color-brand-primary, --color-accent,
--color-surface-soft). No toques copy, rutas, SEO ni lógica React.
```
