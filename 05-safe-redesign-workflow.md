# Skill 05 — safe-redesign-workflow

## Purpose

Control broad visual redesign work in `carlesdelolmo.com` when the task may affect many files, several pages, legacy CSS, shared styles or component architecture.

Use this skill to prevent uncontrolled refactors, accidental SEO damage or large visual changes that are hard to review.

---

## Activation triggers

Use this skill when the task includes or implies:

- broad redesign
- many files
- multiple pages
- refactor styles
- clean CSS
- remove legacy styles
- migrate visual system
- apply redesign across the site
- large visual change
- redesign phase
- visual cleanup
- style architecture
- simplify CSS
- remove old visual patterns
- update whole website
- prepare pull request
- split into phases
- reduce risk

Also use this skill when the task feels too large for a single focused change.

---

## Required context

Follow:

- `redesign-orchestrator`
- `visual-tokens-carles-2026`
- `global-components-redesign`
- `page-sections-redesign`

This skill does not define visual style. It defines safe execution.

---

## Mandatory rules

1. Never work directly on `main`.

2. Never mix unrelated redesign phases in one change.

3. Never touch SEO, schema, metadata, analytics, cookies, legal pages, sitemap, robots or routing unless explicitly requested.

4. Never combine visual redesign with copy rewriting unless explicitly requested.

5. Do not rewrite large components unless smaller CSS/token changes are insufficient.

6. Do not delete legacy CSS until its usage is checked.

7. Do not remove classes without searching for all references.

8. Do not change multiple page types at once unless the task explicitly requires it.

9. Keep commits small and reversible.

10. If debt or risk is found, document it instead of silently fixing it.

---

## Recommended phase order

Use this order unless the user explicitly asks otherwise:

```txt
1. Tokens and visual foundations
2. Global reusable components
3. Homepage pilot
4. Internal service pages
5. Blog and editorial pages
6. Pricing and conversion pages
7. Legal/support pages
8. Cleanup of unused legacy styles
9. QA and PR
```

---

## Scope limits

For each task, define:

```txt
Goal:
Files allowed:
Files forbidden:
What must not change:
Expected output:
Validation:
```

If the scope is unclear, choose the safest minimal scope.

---

## Safe file handling

Before deleting or renaming CSS/classes:

1. Search all references.
2. Check mobile-specific rules.
3. Check component-specific dependencies.
4. Check old aliases used by other styles.
5. Keep compatibility aliases if removal is risky.

Useful searches:

```bash
grep -R "class-or-token-name" next_app
grep -R "linear-gradient\|radial-gradient" next_app
grep -R "#[0-9A-Fa-f]\{3,8\}" next_app
```

---

## What to avoid

Avoid:

- large "cleanup everything" commits
- changing tokens and components and pages in one step
- removing CSS because it “looks unused” without search
- creating a parallel design system
- adding new naming conventions mid-task
- changing layout while only asked for visual polish
- touching business-critical forms without testing
- touching consent/cookie logic without explicit approval

---

## Required workflow

1. Read the user request.
2. Identify whether the task is too broad.
3. Split into the smallest safe phase.
4. State the exact scope.
5. List files to inspect.
6. Apply only that phase.
7. Run checks if possible.
8. Report risks and next phase.

---

## Branch and commit guidance

Recommended branch:

```bash
git checkout main
git pull
git checkout -b redesign/visual-system-2026
```

Commit style:

```txt
redesign: update visual tokens
redesign: restyle global components
redesign: apply homepage pilot
redesign: clean legacy visual styles
```

Do not create noisy commits with unrelated changes.

---

## Validation checklist

Before delivery, verify:

- no accidental SEO/schema/metadata changes
- no broken routes or links
- no new off-palette colors
- no visible gradients
- no broken responsive layout
- no broken forms
- no broken navbar/mobile menu
- no broken cookie or promo banner behavior
- no build or lint errors if checks can be run

Run when possible:

```bash
npm run lint
npm run build
```

---

## Delivery format

```txt
Summary:
- What was done

Scope:
- Included:
- Excluded:

Files touched:
- file 1
- file 2

Safety checks:
- SEO/schema untouched: yes / no
- routing untouched: yes / no
- copy/headings untouched: yes / no
- legacy references checked: yes / no
- lint: OK / not run
- build: OK / not run

Risks or pending items:
- item 1
- item 2

Recommended next phase:
- next step
```

---

## Guiding sentence

Small safe phases beat heroic redesigns that nobody can review.
