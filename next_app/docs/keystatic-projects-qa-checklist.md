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

Use forced storage recovery once if needed:

- `http://127.0.0.1:3000/keystatic/collection/projects/item/ledescaparate?ksRecover=1`
- `http://127.0.0.1:3000/keystatic/collection/projects/item/ambar-muebles?ksRecover=1`

Expected:
- no `Field validation failed: content: Must be a string`
- editor loads both items

## 3) Save flow

For both project entries:
- edit a simple field (`subtitle`)
- edit inside at least one content block (`section` or `testimonial`)
- save

Expected:
- save succeeds
- no runtime error banner

## 4) Frontend render check

Open:
- `/proyectos/ledescaparate`
- `/proyectos/ambar-muebles`

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
