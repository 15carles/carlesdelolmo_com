# Phase 4A — Full-site code QA

## Status
pass with notes

## Commands run
- `git status --short --branch`
- `git log --oneline --decorate -n 12`
- `git diff --name-only main...HEAD` *(failed: `main` ref not present in this clone)*
- `find "next_app/app/(site)" -name "page.tsx" | sort`
- `find "next_app/components" -type f | sort`
- `find "next_app/styles" -type f | sort`
- `rg -n "#9333ea|#06b6d4|#3b82f6|#8b5cf6|#a855f7|purple|cyan|blue glow|gradient-text|badge--purple|badge--blue|badge--cyan|bg-glass|border-purple|border-cyan|text-purple|text-cyan|shadow-glow" next_app || true`
- `rg -n "linear-gradient|radial-gradient" next_app || true`
- `rg -n "#[0-9A-Fa-f]{3,8}" next_app || true`
- `git diff --check`
- `cd next_app && npm run lint`
- `cd next_app && npm run build`

## Files changed since main
`git diff --name-only main...HEAD` could not run because this repository snapshot has no local `main` ref, so exact branch-vs-main file list is unavailable in this environment.

Proxy context used:
- Current branch: `work`
- Last 12 commits inspected via `git log --oneline --decorate -n 12`
- Head commit: `c7da29e`

## Old visual language scan
### Findings from class/token keyword scan
- Legacy class usage still present in app/components:
  - `gradient-text` in `Hero.tsx` and `GoogleReviewsSection.tsx`
  - `badge--purple`, `badge--blue`, `badge--cyan` in services/projects/blog-related components
  - `bg-glass` utility still defined in styles
  - `text-purple-*`, `text-cyan-*`, `border-purple-*`, `border-cyan-*` Tailwind-like remnants in `diseno-web/WorkflowTimeline.tsx`
- Accent token names with `purple`/`cyan` remain frequent in CSS variables and utility variants. This is not automatically a blocker, but it indicates incomplete semantic rename cleanup.

Assessment:
- **SHOULD FIX** for consistency cleanup in redesign phase hardening.
- **ACCEPTABLE** where brand token aliasing is intentionally mapped (e.g., `--color-accent-purple` -> brand primary).

## Gradient scan
- `linear-gradient` / `radial-gradient` still present in multiple places:
  - `next_app/styles/components.css` (including mask/overlay and divider effects)
  - `next_app/public/offline.html` (radial background)
  - `next_app/keystatic.config.tsx` (editor UI styles)

Assessment:
- **SHOULD FIX** for visible front-end gradients if they are user-facing on the site.
- **ACCEPTABLE** for non-site/editor-only contexts (`keystatic.config.tsx`) and technical mask-image gradients that are not visible color gradients.

## Hardcoded color scan
- Many hex colors remain across:
  - `next_app/styles/components.css`
  - `next_app/components/GoogleReviewsSection.tsx` (Google brand/star/avatar colors)
  - `next_app/lib/notFoundRunnerGame.ts`
  - `next_app/public/offline.html`
  - `next_app/keystatic.config.tsx`
  - static assets under `next_app/public/*.svg`

Assessment:
- **SHOULD FIX** in redesign-critical site styles (`components.css`) if those colors are visible and off-palette.
- **ACCEPTABLE** in third-party brand fidelity elements (Google logo colors), static vendor/demo assets, and isolated game/offline contexts unless scope explicitly includes them.

## SEO/schema/routing safety
- No direct evidence of accidental SEO/schema/routing/metadata changes from this QA run.
- `git diff --check` returned clean (no whitespace/conflict marker issues).
- Because `main` is unavailable locally, full diff-based SEO/schema/routing safety comparison against `main` could not be fully confirmed in this environment.

Assessment:
- **PASS WITH NOTES** (needs main-based diff in a fully-tracked repo clone for strict confirmation).

## Known environment limitations
- `main` reference missing locally, so `main...HEAD` comparisons cannot run.
- `npm run lint` failed due to missing `eslint` dependency resolution.
- `npm run build` failed because `next` binary is unavailable in environment (`next: not found`).

These are treated as environment/dependency limitations, not direct redesign code regressions.

## Local Phase 4B checklist
Run on Mac/local fully-provisioned environment:
- [ ] `git fetch --all` and rerun `git diff --name-only main...HEAD`
- [ ] `npm ci` inside `next_app`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Visual smoke QA (desktop + mobile): navbar, hero, services, projects, blog, contact, legal pages
- [ ] Keyboard/focus accessibility pass
- [ ] Confirm no visible gradients remain on user-facing pages
- [ ] Confirm no legacy `badge--purple/blue/cyan` or `gradient-text` in user-facing components
- [ ] Confirm SEO/schema/metadata/routes/sitemap/robots unchanged vs `main`

## Findings
- **BLOCKER**
  - None identified in this environment-only QA pass.

- **SHOULD FIX**
  1. Legacy visual classes still present (`gradient-text`, legacy badge variants, Tailwind purple/cyan utility remnants).
  2. Remaining gradients in site CSS should be reviewed and removed/neutralized where visually rendered.
  3. Hardcoded hex colors in `components.css` should be tokenized where part of user-facing redesign scope.

- **LOCAL QA**
  1. Re-run strict `main...HEAD` comparison once `main` is available locally.
  2. Run full lint/build after installing dependencies.
  3. Browser/device verification on Mac (Safari/Chrome/Firefox + mobile viewports).

- **ACCEPTABLE**
  1. Hex colors in Google-branded iconography where exact brand colors are expected.
  2. Non-site/editor contexts (`keystatic.config.tsx`) unless redesign scope explicitly includes CMS UI.
  3. Technical gradients used for masking/dividers where no visible neon/gradient effect reaches UI.

## Recommended next step
Proceed to **Phase 4B local visual/build QA on Mac** with fully installed dependencies and a repository clone that includes `main`, then address SHOULD FIX items in a small targeted cleanup PR before final merge.
