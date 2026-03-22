# Keystatic Projects QA Checklist (feature/keystatic-cms)

This checklist is intended for ongoing work in `feature/keystatic-cms` (no merge to `main` required).

## 1) Local strict checks

Run from `next_app/`:

```bash
npm run keystatic:strict:check
```

Expected:
- no migration changes required
- `reports/keystatic-projects-validation.json` generated
- 0 issues for every slug

## 2) Keystatic editor smoke test

Open current project entries directly (based on files in `content/projects/*.mdoc`), for example:

- `http://127.0.0.1:3000/keystatic/collection/projects/item/ledescaparate`

Expected:
- no `Field validation failed: content: Must be a string`
- editor loads the item without runtime banner

## 3) Save flow

For each active project entry:
- edit a simple field (`subtitle`)
- edit inside at least one content block (`section` or `testimonial`)
- save

Expected:
- save succeeds
- dirty state appears/disappears correctly in Keystatic UI
- no runtime error banner
- changes persist after full browser refresh

## 4) Frontend render check

Open each active project route (for example `/proyectos/ledescaparate`).

Expected:
- page renders without runtime errors
- testimonial block shows quote, author, role
- optional testimonial logo path (if set) does not break rendering

## 5) Branch hygiene

- keep working branch: `feature/keystatic-cms`
- do not merge into `main` during this phase

## 6) Phase 2 gate (strict + build)

Run from `next_app/`:

```bash
npm run keystatic:phase2:gate
```

Expected:
- strict migration check passes
- diagnostics report 0 issues
- `next build` completes successfully in this branch

## Current closure snapshot (2026-03-22)

- `npm run keystatic:strict:check`: OK (`ledescaparate: 0 issue(s)`).
- Keystatic save + refresh persistence: validated manually on `ledescaparate`.
- `npm run keystatic:phase2:gate`: OK after strict migration normalization.
