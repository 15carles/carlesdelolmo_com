# AGENTS.md — carlesdelolmo.com

## Redesign skills

This project includes a visual redesign skill system. Skills are in `.llm/skills/`.

Load only the skill needed for the current task. Use the router to decide.

### Entry point

```
.llm/skills/00-redesign-skill-router.md
```

### Skills

| File | When to use |
|---|---|
| `00-redesign-skill-router.md` | Always first — decides which skill to load |
| `01-redesign-orchestrator-en.md` | Broad or unclear redesign requests |
| `02-visual-tokens-carles-2026.md` | Colors, CSS variables, tokens, gradients, shadows |
| `03-global-components-redesign.md` | Navbar, footer, buttons, cards, banners, forms |
| `04-page-sections-redesign.md` | Hero, homepage, service pages, blog sections |
| `05-safe-redesign-workflow.md` | Multi-file or risky refactors |
| `06-redesign-qa-check.md` | After every redesign phase, before PR or merge |

### Hard rules

- Never work directly on `main`.
- Do not change SEO, schema, metadata, routes, sitemap, analytics, cookies or legal content unless explicitly requested.
- Do not change copy or headings when the task is visual.
- Do not introduce colors outside the approved palette.
- Do not use visible gradients.
- Do not add visual libraries without approval.
- Keep changes small and reviewable.

### Project stack

Next.js + React + TypeScript + Global CSS tokens + Cloudflare Pages.
