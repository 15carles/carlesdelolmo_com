# Skill 04 — page-sections-redesign

## Purpose

Apply the approved 2026 visual direction to page-level sections in `carlesdelolmo.com` while preserving content structure, SEO, GEO, metadata, schema, routing and existing component behavior.

Use this skill after the visual tokens and reusable global components are already defined or when working on a specific page section.

---

## Activation triggers

Use this skill when the task mentions or affects:

- hero
- homepage
- home sections
- service sections
- ORBITA
- method section
- projects section
- case study section
- blog layout
- blog cards section
- pricing page
- contact page
- demos page
- project pages
- service pages
- landing page sections
- page layout
- section redesign
- make this page match the new style
- apply the 2026 visual system to a page

---

## Required context

Follow:

- `redesign-orchestrator`
- `visual-tokens-carles-2026`
- `global-components-redesign` when shared components are involved

Use the approved direction:

- warm
- clear
- technical
- young
- professional
- boutique
- non-generic
- no AI-looking identity
- no visible gradients
- no heavy glassmorphism
- no off-palette colors

---

## Likely files

Inspect only what the task needs.

Common section/page files:

```txt
next_app/app/(site)/page.tsx
next_app/components/Hero.tsx
next_app/components/CredibilidadSection.tsx
next_app/components/QueResuelvoSection.tsx
next_app/components/ServicesSection.tsx
next_app/components/CasoDestacadoSection.tsx
next_app/components/MetodoOrbitaSection.tsx
next_app/components/DiferenciadoresSection.tsx
next_app/components/InsightsSection.tsx
next_app/components/ParaQuienSection.tsx
next_app/components/GoogleReviewsSection.tsx
next_app/components/CtaFinalSection.tsx
next_app/components/ContactSection.tsx
next_app/app/(site)/pricing/page.tsx
next_app/app/(site)/blog/page.tsx
next_app/app/(site)/blog/[slug]/page.tsx
next_app/app/(site)/contacto/page.tsx
next_app/app/(site)/demos-interactivas/page.tsx
next_app/app/(site)/proyectos/[slug]/page.tsx
next_app/app/(site)/diseno-web/page.tsx
next_app/app/(site)/servicio-seo/*/page.tsx
```

---

## Mandatory rules

1. Do not change headings, copy, metadata, schema or internal links unless explicitly requested.

2. Preserve semantic HTML and accessibility.

3. Preserve existing page order unless the user asks to restructure.

4. Do not touch global tokens unless the task explicitly requires token work.

5. Do not redesign reusable components here if `global-components-redesign` should handle them.

6. Do not add new colors, gradients, visual libraries or decorative AI imagery.

7. Keep changes scoped to the requested page or section.

8. Do not remove conversion elements, CTAs, forms or trust signals without permission.

9. Preserve responsive behavior.

10. Prefer improving hierarchy, spacing, surfaces and clarity over adding effects.

---

## Section style rules

### Hero

Should communicate immediately:

- what Carles does
- who it is for
- why it matters
- what action to take next

Use:

- strong hierarchy
- warm background
- ink-blue authority
- restrained accent
- clear CTA group
- no generic AI/code decoration unless it feels intentional

---

### Services

Service sections should not feel like generic agency cards.

Each service block should make clear:

- problem solved
- criterion applied
- business outcome
- next step

Use clean cards, clear headings and minimal decoration.

---

### ORBITA / Method

Should feel proprietary and structured.

Use:

- steps
- sequence
- thin lines
- numbered modules
- lime accent only as signal
- strong clarity

Avoid infographic clutter.

---

### Projects / Case studies

Should emphasize proof.

Use:

- problem
- intervention
- result
- context
- clear link to project

Avoid portfolio-gallery aesthetics with no business meaning.

---

### Blog

Should feel editorial and useful.

Use:

- readable width
- clear headings
- definition boxes
- quick-answer blocks
- internal links visible but elegant

Do not reduce readability for decoration.

---

### Pricing

Should feel transparent, serious and premium.

Use:

- clear packages
- strong comparison hierarchy
- restrained badges
- no aggressive sales styling

---

### Contact

Should feel simple, human and low friction.

Use:

- clear form area
- trust cues
- visible labels
- strong focus states
- direct CTA

---

## Workflow

1. Identify the target page or section.
2. Confirm whether tokens or shared components are already handled.
3. Inspect current structure and CSS dependencies.
4. Preserve semantic structure.
5. Apply visual system through classes and CSS.
6. Check desktop and mobile.
7. Run lint/build if possible.
8. Report changes and any section still visually inconsistent.

---

## Delivery format

```txt
Summary:
- What changed

Sections/pages touched:
- section or page 1
- section or page 2

Files touched:
- file 1
- file 2

Preserved:
- SEO/schema: yes / no
- headings/copy: yes / no
- routing/links: yes / no
- responsive behavior: yes / no

Checks:
- lint: OK / not run
- build: OK / not run
- mobile checked: yes / no

Risks or pending items:
- item 1
- item 2
```

---

## Guiding sentence

Each page section should feel intentional, useful and branded, not like a generic block from a template.
