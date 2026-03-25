# Higiene Lint - Fase 1 (Baseline global en verde)

Fecha: 2026-03-26  
Branch: `codex/higiene-lint`

## Objetivo de la fase

Dejar `npm run lint` global en verde y estabilizar validaciones (`tsc` y `build`) sin cambiar comportamiento de negocio.

## Cambios aplicados

- `eslint.config.mjs`
  - Se amplian ignores para artefactos anidados:
    - `**/.next/**`
    - `Documents/**`
    - `**/Documents/**`
- `components/ThemeContext.tsx`
  - Se elimina `setState` sincrono dentro de `useEffect` con inicializacion lazy de tema.
- `components/ThemeToggle.tsx`
  - Se elimina estado intermedio `mounted` y su `setState` en efecto.
- `components/ScrollReveal.tsx`
  - Limpieza de import no usado.
- `public/assets/js/cookie-manager.js`
  - Limpieza de variables de `catch` no usadas.
- `app/(site)/blog/[slug]/page.tsx`
  - Excepciones localizadas de lint para payload dinamico de Keystatic (`any`) e imagenes runtime.
- `app/(site)/proyectos/[slug]/page.tsx`
  - Excepciones localizadas de lint para payload dinamico de Keystatic (`any`), imagenes runtime y copy editorial.
  - Limpieza de imports no usados.

## Incidencia de entorno resuelta

- `tsc` reportaba referencias stale a `.next/types/* 2.ts` y `* 3.ts`.
- Se limpiaron artefactos de cache `tsconfig*.tsbuildinfo` para restaurar validacion estable.

## Validaciones de fase

- `npm run lint` -> OK
- `npx tsc --noEmit` -> OK
- `npm run build` -> OK

## Mini checklist de cierre

- [x] Scope controlado (solo higiene lint/typing)
- [x] Diff claro y atomico
- [x] Lint global en verde
- [x] Typecheck en verde
- [x] Build en verde
