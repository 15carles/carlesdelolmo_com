# GitHub Copilot instructions — carlesdelolmo.com

## Redesign skills

For any visual redesign task on this project, use the skill system in `.llm/skills/`.

Start with `.llm/skills/00-redesign-skill-router.md` to load only the skill needed.

### Skills available

- `00` — Router: decides which skill to load
- `01` — Orchestrator: broad redesign coordination
- `02` — Visual tokens: CSS variables and approved palette
- `03` — Global components: navbar, footer, buttons, cards, forms
- `04` — Page sections: hero, homepage, service pages, blog
- `05` — Safe workflow: large or multi-file changes
- `06` — QA check: before PR or merge

### Hard rules

- Never work directly on `main`.
- Do not touch SEO, schema, metadata, routes, analytics, cookies or legal content unless explicitly requested.
- Do not change copy or headings when the task is visual.
- No colors outside the approved palette. No visible gradients. No new visual libraries without approval.
- Keep changes small and reviewable.

### Approved visual direction

Warm, clear, technical, young, professional, boutique, strategic. Not AI-themed or generic SaaS.
