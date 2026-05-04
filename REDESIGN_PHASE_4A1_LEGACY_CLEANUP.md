# Phase 4A.1 — Targeted legacy visual cleanup

## What was cleaned
- Replaced remaining user-facing `gradient-text` usage with `text-primary` in:
  - `next_app/components/Hero.tsx`
  - `next_app/components/GoogleReviewsSection.tsx`
- Replaced remaining user-facing legacy badge variants (`badge--purple`, `badge--blue`, `badge--cyan`) with `badge--status` in:
  - `next_app/components/ServicesSection.tsx`
  - `next_app/components/ProjectsSection.tsx`
  - `next_app/components/CasoDestacadoSection.tsx`
- Cleaned Tailwind-like purple/cyan utility remnants in user-facing timeline interaction states by token-aligning active classes in:
  - `next_app/app/(site)/diseno-web/WorkflowTimeline.tsx`

## What remains and why
- `gradient-text`, `bg-glass`, and legacy badge classes remain **defined** in global CSS for compatibility/controlled risk; they were not removed in this safe pass to avoid unintended regressions without browser QA.
- `shadow-glow` remains as a tokenized shadow variable reference and is not inherently a legacy blocker.
- `linear-gradient`/`radial-gradient` occurrences remain in:
  - `keystatic.config.tsx` (out of redesign scope; editor UI)
  - `public/offline.html` (out of requested scope)
  - technical/structural gradient uses in `styles/components.css` (mask/divider/overlay style patterns)

## What is acceptable
- Google brand colors and vendor/static assets were intentionally untouched.
- Keystatic editor styles were intentionally untouched.
- Offline page visuals were intentionally untouched per scope constraints.
- Technical mask gradients that are structural and non-decorative were left as-is.

## Phase 4B local checks required
- Visual QA on Mac/browser for affected sections:
  - Homepage hero + Google reviews heading emphasis
  - Services badges
  - Projects badges
  - Caso destacado badge
  - Diseño web workflow timeline active/hover states (desktop/mobile)
- Confirm no contrast/accessibility regressions from class replacements.
- Re-run lint/build in fully provisioned environment.
