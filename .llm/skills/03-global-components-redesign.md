# Skill 03 — global-components-redesign

## Purpose

Redesign reusable global components in `carlesdelolmo.com` using the approved 2026 visual direction, without changing content strategy, SEO, routing, schema, analytics, consent logic or component behavior.

---

## Activation triggers

Use this skill when the task mentions or affects:

- navbar
- footer
- buttons
- cards
- badges
- forms
- CTA
- banners
- reviews
- cookie banner
- reusable components
- global components
- shared UI
- component restyle
- make components less generic
- update component appearance
- redesign navigation
- redesign footer
- redesign testimonials
- redesign contact form

---

## Required context

Use the approved visual direction:

- warm, clear, technical, young and professional
- boutique technical consultant
- no AI visual identity
- no SaaS-template look
- no neon, robots, holograms or cyberpunk
- no visible gradients
- controlled lime accent
- ink-blue authority
- warm backgrounds and clean white surfaces

Use the official palette from `visual-tokens-carles-2026`. Do not introduce new colors.

---

## Likely files

Inspect first:

```txt
next_app/components/Navbar.tsx
next_app/components/Footer.tsx
next_app/components/CtaFinalSection.tsx
next_app/components/GoogleReviewsSection.tsx
next_app/components/ContactSection.tsx
next_app/components/PromoBanner.tsx
next_app/components/ContextualLeadBanner.tsx
next_app/components/CookieBanner.tsx
next_app/components/BlogCard.tsx
next_app/components/PricingCard.tsx
next_app/components/DemoCard.tsx
next_app/styles/components.css
next_app/styles/main.css
```

Only edit files required by the requested component.

---

## Mandatory rules

1. Preserve component behavior.

2. Preserve links, routes, labels, aria attributes and accessibility.

3. Do not change SEO, schema, metadata, analytics, consent scripts or legal content.

4. Do not change copy unless explicitly requested.

5. Do not add new visual libraries.

6. Do not hardcode off-palette colors.

7. Do not use visible gradients.

8. Do not use heavy glassmorphism or glow effects.

9. Prefer CSS/token changes over large React rewrites.

10. Keep changes small and reviewable.

---

## Component style rules

### Navbar

Should feel:

- calm
- clear
- premium
- easy to scan

Use:

- warm background
- thin border
- subtle shadow
- ink-blue active states
- simple dropdowns
- accessible mobile menu

Avoid:

- gradient logo
- glass-heavy navbar
- flashy hover effects
- broken mobile behavior

---

### Footer

Should feel like a brand closing, not a link dump.

Use:

- warm surface background
- clear columns
- short positioning text
- useful links
- restrained icons
- ink-blue links

Preserve legal and cookie settings links.

---

### Buttons

Primary:

- solid ink blue
- white text
- subtle hover

Secondary:

- transparent or warm surface
- thin border
- ink-blue text

Accent button:

- lime only for rare, intentional actions

Avoid gradients, glow and oversized effects.

---

### Cards

Use:

- white surface
- thin warm border
- subtle shadow
- clear hierarchy
- minimal icon use

Avoid:

- generic agency cards
- floating glow cards
- icon + title + text pattern with no intent

Cards should communicate problem, criterion or result.

---

### CTA blocks

Should be direct and human.

Use:

- short message
- clear action
- ink-blue authority
- lime only as detail

Avoid vague claims like:

- transform your business
- take your website to the next level
- AI-powered future

---

### Reviews

Should feel trustworthy, not like marketplace widgets.

Use:

- readable quote
- simple structure
- light border
- minimal decoration
- optional small verification cue

Avoid oversized stars, carousels for decoration or testimonial clichés.

---

### Forms

Use:

- white inputs
- warm borders
- visible focus
- clear labels
- simple error/success states

Never remove focus visibility.

---

### Banners

Use:

- concise copy
- restrained visual weight
- clear close/hidden behavior if already present
- no layout jumps

Preserve existing visibility logic.

---

## Workflow

1. Inspect the component and related CSS.
2. Identify existing behavior that must not change.
3. Apply visual changes using existing classes and tokens.
4. Avoid structural rewrites unless necessary.
5. Check desktop and mobile states.
6. Run lint/build if possible.
7. Report exactly what changed.

---

## Delivery format

```txt
Summary:
- What changed

Components touched:
- component 1
- component 2

Files touched:
- file 1
- file 2

Checks:
- behavior preserved: yes / no
- accessibility preserved: yes / no
- lint: OK / not run
- build: OK / not run
- responsive checked: yes / no

Risks or pending items:
- item 1
- item 2
```

---

## Guiding sentence

Reusable components must feel like Carles del Olmo: clear, technical, young, trustworthy and non-generic.
