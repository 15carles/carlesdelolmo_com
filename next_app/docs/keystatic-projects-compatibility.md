# Keystatic Projects Compatibility Layer

## Context
Editing entries in `Proyectos (Portfolio)` failed with:

`Field validation failed: content: Must be a string`

This compatibility layer keeps the current `projects` schema editable while we migrate all legacy `.mdoc` entries to a strict final shape.

## What was changed
- Added safe defaults in `projects` component blocks that were most exposed to legacy content:
  - `section.title`
  - `section.subtitle`
  - `testimonial.quote`
  - `testimonial.author`
  - `testimonial.role`
  - `testimonial.link`
- Root cause discovered: `testimonial.logo` as `fields.image(...)` in component blocks is brittle when the attribute is missing in legacy content and can surface as `content: Must be a string`.
- Temporary compatibility for editor stability:
  - `testimonial.logo` in `projects.content` uses an optional text path (`fields.text`) instead of image upload metadata.
- Normalized broken logo reference in `ledescaparate.mdoc`:
  - `/assets/projects/ledescaparate/client/logo.webp` -> `/assets/projects/ledescaparate/client/logo.png`
- Expanded testimonial blocks in project entries to explicit props, including `logo`.
- Added one-time Keystatic browser storage recovery in `app/keystatic/keystatic.tsx` to clear stale IndexedDB drafts/cache (`?ksRecover=1` forces recovery).

## Deterministic diagnostics
Run:

```bash
node scripts/diagnose-keystatic-projects.mjs
```

This writes a per-slug report to:

`reports/keystatic-projects-validation.json`

## Planned strict migration
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

The migration script applies known safe rewrites for legacy patterns:
- Normalize known broken logo paths.
- Expand shorthand testimonial tags.
- Ensure `section` has `title` and `subtitle`.
- Ensure `testimonial` includes `quote`, `author`, `role`, `logo`, `link`.

## Exit criteria to remove compatibility mode
- `diagnose-keystatic-projects.mjs` returns 0 issues for all slugs.
- CMS can open and save every item in `projects`.
- No runtime validation error appears in `/keystatic/collection/projects/item/*`.
- All entries pass `node scripts/migrate-projects-to-strict.mjs --check`.
