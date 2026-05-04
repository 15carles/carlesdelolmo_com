# Skill 02 — visual-tokens-carles-2026

## Purpose

Apply and maintain the approved 2026 visual token system for `carlesdelolmo.com`.

Use this skill to update the visual foundations of the site without changing layout, copy, SEO, schema, routing, content structure, or component behavior.

---

## Activation triggers

Use this skill when the task includes or implies:

- visual tokens
- design tokens
- CSS variables
- color palette
- apply palette
- update colors
- remove gradients
- flat colors
- shadows
- borders
- border radius
- focus states
- hover states
- button states
- background colors
- surface colors
- global CSS
- `main.css`
- `globals.css`
- theme colors
- light theme
- dark theme
- visual foundations
- brand colors
- replace old colors
- remove neon
- remove AI style

---

## Project context

Project: `carlesdelolmo.com`

The site uses global CSS and reusable variables. Token changes should be made before redesigning components or pages.

Likely files to inspect first:

```txt
next_app/app/(site)/globals.css
next_app/styles/main.css
next_app/styles/shared.css
next_app/styles/components.css
```

Do not modify page components unless the user explicitly asks for that phase.

---

## Approved visual direction

The new visual identity must feel:

- warm
- clear
- technical
- young
- professional
- trustworthy
- boutique
- strategic

It must not feel:

- AI themed
- generic SaaS
- cyberpunk
- neon
- futuristic
- template-like
- overdesigned

---

## Approved base palette

Use these colors as the source of truth:

```css
--color-bg-primary: #F7F3EA;
--color-bg-secondary: #EFE8DC;
--color-surface: #FFFFFF;
--color-surface-soft: #F3EDE3;

--color-text-primary: #172026;
--color-text-secondary: #5F666A;
--color-text-muted: #8A8F91;

--color-brand-primary: #123C55;
--color-brand-secondary: #1F5F6B;
--color-accent: #B9D94A;
--color-accent-soft: #E7F2B8;

--color-border: #DDD4C8;
--color-border-strong: #C7BAAA;
```

---

## Color usage rules

Use the palette with this hierarchy:

```txt
70% warm backgrounds and clean surfaces
20% ink blue / brand colors
10% lime accent
```

### Backgrounds

Use warm backgrounds:

```css
--color-bg-primary: #F7F3EA;
--color-bg-secondary: #EFE8DC;
--color-surface-soft: #F3EDE3;
```

### Surfaces

Use white or soft warm surfaces:

```css
--color-surface: #FFFFFF;
--color-surface-soft: #F3EDE3;
```

### Authority color

Use ink blue for important UI elements:

```css
--color-brand-primary: #123C55;
--color-brand-secondary: #1F5F6B;
```

Use for:

- primary buttons
- active navigation
- important links
- key headings
- CTA blocks
- icons with meaning

### Accent color

Use lime carefully:

```css
--color-accent: #B9D94A;
--color-accent-soft: #E7F2B8;
```

Use only for:

- small indicators
- focus rings
- subtle underlines
- active states
- ORBITA accents
- tiny highlights

Do not use lime as a dominant background.

---

## Mandatory rules

1. Do not add new brand colors.

2. Do not introduce colors outside the approved palette unless they are semantic state colors.

3. Do not use gradients as a visible design resource.

4. If existing `--gradient-*` variables are required for compatibility, redefine them as flat colors or very neutral aliases.

5. Remove or neutralize old neon, purple, cyan-glow or AI-like color tokens.

6. Prefer semantic tokens over hardcoded values.

7. Do not scatter hex values across components.

8. Keep token names compatible with existing CSS where possible.

9. Do not change copy, HTML structure, React logic, metadata, schema or routes.

10. Preserve dark mode only if it already exists, but do not make it the main identity.

---

## Recommended token groups

Create or maintain tokens for:

```txt
backgrounds
surfaces
text
brand
accent
borders
links
buttons
forms
focus
semantic states
badges
navbar
footer
CTA
shadows
overlays
legacy aliases
```

---

## Recommended flat gradient handling

If the repo already uses gradient variables, keep the names but avoid visible gradients:

```css
--gradient-primary: var(--color-brand-primary);
--gradient-brand: var(--color-brand-primary);
--gradient-button: var(--color-brand-primary);
--gradient-accent: var(--color-accent);
--gradient-bg: var(--color-bg-primary);
```

Do not use:

```css
linear-gradient(...)
```

unless the user explicitly approves gradients.

---

## Recommended shadows

Use subtle, non-glow shadows:

```css
--shadow-xs: 0 1px 2px rgba(23, 32, 38, 0.04);
--shadow-sm: 0 4px 12px rgba(23, 32, 38, 0.06);
--shadow-md: 0 12px 32px rgba(23, 32, 38, 0.08);
--shadow-lg: 0 24px 60px rgba(23, 32, 38, 0.10);
```

Avoid:

- glow shadows
- purple shadows
- blue neon shadows
- heavy floating cards

If `--shadow-glow` must stay for compatibility, redefine it subtly:

```css
--shadow-glow: 0 12px 32px rgba(18, 60, 85, 0.14);
```

---

## Recommended focus tokens

Focus must remain visible and accessible:

```css
--color-focus: #B9D94A;
--color-focus-ring: rgba(185, 217, 74, 0.35);
--color-focus-outline: #123C55;
```

Never remove focus outlines without replacing them with an accessible alternative.

---

## Recommended semantic state colors

Use only when needed for forms, alerts or validation:

```css
--color-success: #2E7D55;
--color-success-soft: #E1F0E8;

--color-warning: #B7791F;
--color-warning-soft: #FFF3D6;

--color-error: #B94A48;
--color-error-soft: #FBE4E2;

--color-info: #1F5F6B;
--color-info-soft: #DDECEF;
```

---

## Suggested workflow

1. Inspect current global CSS token structure.
2. Identify old colors, gradients, glow shadows and theme variables.
3. Replace values with approved tokens.
4. Add missing semantic tokens only if needed.
5. Keep legacy token names as aliases where removing them would break existing styles.
6. Avoid editing components in this phase.
7. Run checks.
8. Report changed tokens and any legacy aliases kept.

---

## Files normally allowed in this skill

Allowed:

```txt
next_app/styles/main.css
next_app/styles/shared.css
next_app/styles/components.css
next_app/app/(site)/globals.css
```

Only edit component files if the task explicitly requests it.

---

## Safety checks

Search for hardcoded off-palette colors:

```bash
grep -R "#[0-9A-Fa-f]\{3,8\}" next_app/styles next_app/components next_app/app
```

Search for gradients:

```bash
grep -R "linear-gradient\|radial-gradient" next_app/styles next_app/components next_app/app
```

Run when possible:

```bash
npm run lint
npm run build
```

---

## Delivery format

Always finish with:

```txt
Summary:
- Token changes made

Files touched:
- file 1
- file 2

Compatibility:
- legacy tokens kept: yes / no
- gradients neutralized: yes / no
- off-palette colors introduced: no / yes

Checks:
- lint: OK / not run
- build: OK / not run

Risks or pending items:
- item 1
- item 2
```

---

## Guiding sentence

Use warm clarity, ink-blue authority and controlled lime energy. No AI look, no gradients, no neon.
