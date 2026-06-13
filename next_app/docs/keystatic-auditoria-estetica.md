# Auditoría Keystatic vs. estética "Minimalismo cálido"

Rama: `audit/keystatic-estetica` · Fecha: 2026-06-13

## Objetivo
Garantizar que los posts del blog puedan construirse siguiendo la estética
actual de la web. Se audita estética, encaje y colores de los elementos
Keystatic.

## Estética de referencia
Definida en `styles/main.css` (sistema "Minimalismo cálido"):

- Fondos crema: `--color-bg-primary: #FDFCFA`, `--color-bg-secondary: #F1EBDF`,
  inset `#F4F0E7`, tinta `#191813`.
- Acento **verde bosque único** (`--color-green-800` … `--color-green-50`).
- Tipografía: Fraunces (display serif) + Instrument (sans).
- **Glassmorphism eliminado**: `--blur-sm/md/lg: 0px`.
- Radios nítidos, sombras con tinte cálido marrón-gris.
- Acentos legacy aliaseados a verde:
  `--color-accent-purple/blue/cyan/green` → todos resuelven a verde.

## Dos capas auditadas

### 1. Previews del editor (`keystatic.config.tsx`) — DESALINEADOS
Lo que el autor ve mientras edita usa colores hardcoded antiguos, no la marca.
Solo es cosmético del editor (no afecta a la web publicada), pero engaña al
autor: preview azul, web final verde.

| Bloque | Color hardcoded en preview | Nota |
|---|---|---|
| `button` (posts) | `#3b82f6` azul | No es verde marca |
| `notice` (posts) | `#f59e0b` / `#10b981` / `#3b82f6` | El output ni siquiera respeta estos 3 |
| `ctaSection` (projects) | gradiente navy → `#1d4ed8` | Azul, choca con verde |
| `insightGrid` / `projectHero` (projects) | `#5a67d8` indigo | Fuera de paleta |
| `section` (projects) | variantes `dark`/`gradient` azul `#1d4ed8`/`#4338ca` | Preview azul vs. marca verde |

### 2. Output publicado (`app/(site)/blog/[slug]/page.tsx`) — problemas reales
El renderer usa clases CSS + vars, que los alias salvan a verde. Mayormente
coherente, pero con deuda concreta:

- **`notice` roto conceptualmente.** info/warning/tip mapean a
  `--color-accent-blue/purple/green`, que **ahora son los tres verde** → los
  tipos no se distinguen visualmente. Además los emojis ℹ️⚠️💡 chocan con el
  minimalismo cálido.
  Acción sugerida: rediferenciar (p. ej. verde sólido / borde neutro / verde
  claro) y retirar emojis o sustituirlos por marca tipográfica.
- **`styledImage` efecto "Glassmorphism" = falso.** `img--glass`
  (`styles/components.css:842`) ya solo es imagen redondeada con borde + sombra;
  no hay blur (neutralizado a 0). El toggle Normal/Glass apenas cambia nada y la
  etiqueta miente.
  Acción sugerida: renombrar la opción ("Con marco") o eliminarla.
- **Badges del header (`badge--teal/blue/purple`).** Colapsan a verdes/neutros
  casi idénticos (`styles/components.css:542-564`) → la diferenciación por
  categoría se pierde. Coherente con marca, pero plano.

### 3. Brecha posts ↔ proyectos — la grande
- **Posts:** 6 bloques antiguos — `articleBox`, `button`, `styledImage`,
  `ctaSection`, `notice`, `imageGallery`.
- **Proyectos:** set moderno y rico — `section` (variantes + eyebrow),
  `terminalUnified`, `insightGrid`, `metricsPanel`, `automationPanels`,
  `testimonial`, `ctaSection` con gradiente, `styledImage`, `imageGallery`,
  `projectHero`, `sirBadge`.

El bloque `section` (contenedor con fondo, eyebrow y variantes) es el más útil
para la estética nueva y **no existe en posts**. Un post no puede alcanzar la
riqueza visual de un proyecto.

## Veredicto
- Output publicado: **mayormente coherente** gracias a los alias verde.
- Deuda real en: `notice` (tipos indistinguibles), falso "glass", badges planos.
- Previews del editor: **todos desalineados** (azul/indigo/navy).
- **Brecha de capacidades** posts↔proyectos significativa.

## Acciones propuestas (no ejecutadas)
1. Alinear previews del editor a tokens verdes en `keystatic.config.tsx`.
2. Reparar `notice` (rediferenciar tipos, quitar emojis) y resolver el falso
   efecto Glassmorphism de `styledImage`.
3. Portar bloques de proyectos a posts (prioridad: `section`) para cerrar la
   brecha.

## Priorización (orden de ejecución: P0 → P1 → P2 → P3)
Criterio: impacto en el lector vs. esfuerzo.

### P0 — Output roto que ve el lector
**`notice`: rediferenciar tipos + quitar emojis.**
Único bloque que se ve mal en producción: info/warning/tip salen los tres verdes
(indistinguibles) y los emojis ℹ️⚠️💡 rompen el minimalismo cálido.
- Esfuerzo: bajo (solo el renderer en `app/(site)/blog/[slug]/page.tsx`).
- Impacto: alto y visible.

### P1 — Capacidad que falta para construir posts on-brand
**Portar `section` de proyectos a posts.**
Contenedor con fondo/eyebrow/variantes: la pieza que permite maquetar un post
con la estética nueva. Sin él, un post no llega al nivel visual de un proyecto.
Es el desbloqueo central del encargo ("que los posts sigan la nueva estética").
- Esfuerzo: medio (schema en config + renderer; existe en proyectos, se copia y
  se adapta a la paleta).
- Impacto: alto.

### P2 — Coherencia del editor (engaña al autor, no al lector)
**Alinear previews hardcoded a tokens verdes** en `keystatic.config.tsx`
(button `#3b82f6`, ctaSection navy, insightGrid `#5a67d8`…).
- Esfuerzo: bajo-medio (mecánico, muchos sitios).
- Impacto: medio. No afecta a la web, pero el autor diseña a ciegas.

### P3 — Limpieza / honestidad
**Resolver el falso "Glassmorphism"** de `styledImage` (renombrar a "Con marco"
o quitar el toggle).
- Esfuerzo: muy bajo.
- Impacto: bajo. Cosmético/semántico.

### Descartado por ahora
**Badges planos** (teal/blue/purple casi iguales). Coherente con marca aunque
pierda contraste entre categorías. No tocar salvo decisión de diseño de
recuperar diferenciación — no es deuda.

## Archivos clave
- `keystatic.config.tsx` — schema y previews de `posts`, `projects`, `authors`.
- `app/(site)/blog/[slug]/page.tsx` — renderer real de los bloques en el blog.
- `styles/main.css` — tokens de la estética "Minimalismo cálido".
- `styles/components.css` — `.badge--*`, `.img--glass`, `.btn`.
- `styles/shared.css` — `.article-box`, `.cta-section`.
