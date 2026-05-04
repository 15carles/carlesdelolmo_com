# CLAUDE.md — carlesdelolmo.com

## Redesign skills

This project includes a visual redesign skill system for `carlesdelolmo.com`.

Skills are located in `.llm/skills/`. Always start with the router to load only what is needed.

### Entry point

```
.llm/skills/00-redesign-skill-router.md
```

### Available skills

| File | Purpose | When to load |
|---|---|---|
| `00-redesign-skill-router.md` | Decides which skill to use | Always first |
| `01-redesign-orchestrator-en.md` | Coordinates broad redesign tasks | Broad or unclear redesign requests |
| `02-visual-tokens-carles-2026.md` | CSS variables and color palette | Colors, tokens, gradients, shadows |
| `03-global-components-redesign.md` | Navbar, footer, buttons, cards, forms | Reusable UI components |
| `04-page-sections-redesign.md` | Hero, homepage, service pages, blog | Page-level sections |
| `05-safe-redesign-workflow.md` | Safe execution for large changes | Multi-file or risky refactors |
| `06-redesign-qa-check.md` | QA before PR or merge | After every redesign phase |

### Slash command

Use `/redesign` to activate the skill router directly.

### Hard rules (apply always)

- Never work directly on `main`.
- Do not change SEO, schema, metadata, routes, sitemap, robots, analytics, cookies or legal content unless explicitly requested.
- Do not change copy or headings when the task is visual.
- Do not introduce colors outside the approved palette.
- Do not use visible gradients.
- Do not add visual libraries without approval.
- Keep changes small and reviewable.

### Approved visual direction

The site must feel: warm, clear, technical, young, professional, trustworthy, boutique, strategic.
The site must not feel: AI-themed, generic SaaS, neon, cyberpunk, template-like, overdesigned.

### Project stack

- Next.js + React + TypeScript
- Global CSS with design tokens (`next_app/styles/`)
- Cloudflare Pages deployment
- Keystatic CMS (Git-based)
