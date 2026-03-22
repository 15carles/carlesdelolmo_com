# Keystatic Projects Strict Workflow

## Context
Editing entries in `Proyectos (Portfolio)` failed with:

`Field validation failed: content: Must be a string`

The temporary compatibility phase is now stabilized on `feature/keystatic-cms`, with migration + strict validation workflow in place for ongoing edits.

## What changed
- Added safe defaults in `projects` component blocks that were most exposed to legacy content:
  - `section.title`
  - `section.subtitle`
  - `testimonial.quote`
  - `testimonial.author`
  - `testimonial.role`
- Root cause discovered: `testimonial.logo` as `fields.image(...)` in component blocks is brittle when the attribute is missing in legacy content and can surface as `content: Must be a string`.
- Stable editor compatibility:
  - `testimonial.logo` in `projects.content` uses an optional text path (`fields.text`) instead of image upload metadata.
- Normalized broken logo reference in `ledescaparate.mdoc`:
  - `/assets/projects/ledescaparate/client/logo.webp` -> `/assets/projects/ledescaparate/client/logo.png`
- Expanded testimonial blocks in project entries to explicit required props.
- Added one-time Keystatic browser storage recovery in `app/keystatic/keystatic.tsx` to clear stale IndexedDB drafts/cache (`?ksRecover=1` forces recovery).
- Hardened project schema validation (required root fields, bounded percentages, non-empty arrays, required block fields).
- Added automated legacy -> strict migration for project content blocks.

## Deterministic diagnostics
Run:

```bash
node scripts/diagnose-keystatic-projects.mjs
```

This writes a per-slug report to:

`reports/keystatic-projects-validation.json`

## Strict migration
Run:

```bash
node scripts/migrate-projects-to-strict.mjs
```

Check mode (fails when a rewrite is still required):

```bash
node scripts/migrate-projects-to-strict.mjs --check
```

Combined strict gate:

```bash
npm run keystatic:strict:check
```

The migration script applies safe rewrites for legacy patterns:
- Normalize known broken logo paths.
- Expand shorthand testimonial tags.
- Ensure `section` has `title` and `subtitle`.
- Ensure `testimonial` includes `quote`, `author`, `role`.
- Convert legacy blocks into current unified blocks:
  - `terminal`/`terminalChat`/`automatedTerminal` -> `terminalUnified`
  - `precisionGrid`/`challengeGrid`/`cardGrid` -> `insightGrid`
  - `simulatorCard`/`statsGrid`/`pagespeedMetrics` -> `metricsPanel`
  - `automationGrid` -> `automationPanels`
  - `contentGrid`/`challengeCard` -> compatible section/insight fallback
  - `styledImage` -> markdown image

## Current status
- `npm run keystatic:strict:check` passes with 0 issues on current project entries.
- Keystatic editor loads and saves `projects` entries without `content: Must be a string`.
- Work remains intentionally on `feature/keystatic-cms` (no merge to `main` required).

## Exit criteria to remove remaining compatibility helpers
- `diagnose-keystatic-projects.mjs` returns 0 issues for all slugs.
- CMS can open and save every item in `projects`.
- No runtime validation error appears in `/keystatic/collection/projects/item/*`.
- All entries pass `node scripts/migrate-projects-to-strict.mjs --check`.
