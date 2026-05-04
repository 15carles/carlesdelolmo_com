# Skill 06 — redesign-qa-check

## Purpose

Review visual redesign changes in `carlesdelolmo.com` before delivery, PR or merge.

Use this skill to catch visual, responsive, accessibility, SEO, schema, routing and behavior regressions caused by redesign work.

---

## Activation triggers

Use this skill when the task includes or implies:

- QA
- review redesign
- check redesign
- validate changes
- before PR
- before merge
- final review
- visual review
- responsive check
- accessibility check
- contrast check
- lint
- build
- regression check
- verify no SEO changes
- verify no schema changes
- check off-palette colors
- check gradients
- check mobile
- check navbar
- check forms

---

## Required context

Follow the active redesign skills:

- `redesign-orchestrator`
- `visual-tokens-carles-2026`
- `global-components-redesign`
- `page-sections-redesign`
- `safe-redesign-workflow`

This skill reviews work. It should not introduce new redesign decisions unless fixing a clear issue.

---

## Mandatory checks

Check that the redesign:

1. Uses only the approved palette.

2. Does not show visible gradients.

3. Does not reintroduce neon, AI, cyberpunk or generic SaaS aesthetics.

4. Keeps the site warm, clear, technical, young and professional.

5. Preserves SEO, GEO, schema, metadata, routes, sitemap, robots, analytics, cookies and legal content.

6. Preserves headings and copy unless the task explicitly allowed changes.

7. Preserves navbar, mobile menu, dropdowns, CTAs, forms and banners behavior.

8. Preserves accessibility and visible focus states.

9. Works on desktop and mobile.

10. Builds without errors if the environment allows it.

---

## Suggested commands

Run when possible:

```bash
npm run lint
npm run build
```

Search for visible gradients:

```bash
grep -R "linear-gradient\|radial-gradient" next_app/styles next_app/components next_app/app
```

Search for hardcoded colors:

```bash
grep -R "#[0-9A-Fa-f]\{3,8\}" next_app/styles next_app/components next_app/app
```

Search for risky SEO/schema changes in the diff:

```bash
git diff -- next_app/lib/seo next_app/app/sitemap.ts next_app/app/robots.ts
```

Review changed files:

```bash
git diff --name-only
git diff
```

---

## Visual checklist

Verify:

- backgrounds are warm and consistent
- surfaces are clean
- ink blue carries authority
- lime accent is controlled
- cards are not generic
- CTA blocks are clear and human
- navbar is calm and usable
- footer feels intentional
- sections have enough spacing
- hover states are subtle
- no glow or heavy glassmorphism
- no off-brand decoration

---

## Responsive checklist

Verify:

- mobile navbar opens and closes
- dropdowns remain usable
- CTAs do not overflow
- cards stack correctly
- forms are usable
- footer links remain readable
- no horizontal scroll
- spacing is not cramped
- hero remains clear on mobile

---

## Accessibility checklist

Verify:

- focus states are visible
- buttons and links are distinguishable
- contrast is acceptable
- aria labels were not removed
- semantic structure is preserved
- form labels remain clear
- interactive elements are keyboard usable

---

## SEO/GEO safety checklist

Verify no accidental changes to:

- metadata
- title/description
- canonical URLs
- JSON-LD
- schema generators
- breadcrumbs
- internal links
- headings
- sitemap
- robots
- llms/humans files
- blog content
- legal content

If any of these changed without explicit request, flag it.

---

## Behavior checklist

Verify:

- links work
- forms still submit
- cookie settings still open
- promo/contextual banners keep their visibility logic
- theme toggle still works if present
- scroll/reveal effects do not break usability
- no hydration/runtime errors are introduced

---

## Delivery format

```txt
QA Summary:
- Overall status: pass / pass with notes / fail

Files reviewed:
- file 1
- file 2

Checks:
- lint: OK / failed / not run
- build: OK / failed / not run
- responsive: pass / issues found / not checked
- accessibility: pass / issues found / not checked
- palette compliance: pass / issues found
- gradients removed: yes / no / not checked
- SEO/schema untouched: yes / no
- behavior preserved: yes / no

Issues found:
- issue 1
- issue 2

Recommended fixes:
- fix 1
- fix 2

Merge readiness:
- ready / not ready
```

---

## Guiding sentence

A redesign is not done when it looks better; it is done when it still works, ranks, converts and feels coherent.
