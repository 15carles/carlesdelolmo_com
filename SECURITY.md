# SECURITY.md

Estado de seguridad del proyecto `carlesdelolmo.com` tras la auditoría y remediación de 2026-04-18.

## Resumen

Se ejecutó una auditoría completa del repositorio (Next.js 15 + Keystatic + Supabase) y se aplicaron las correcciones críticas, altas y medias en el código. Los pasos que requieren intervención manual en plataformas externas están listados en [SECURITY-TODO.md](./SECURITY-TODO.md).

## Controles implementados (código)

### Críticos / Altos

| Id  | Descripción                                                                                      | Archivo(s)                                           |
| --- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| C1  | Auth básica de `/keystatic` en middleware con `timingSafeEqual` y fail-closed (503) sin credenciales | `next_app/middleware.ts`                             |
| C2  | Endpoint server-side `/api/contact` con validación, rate-limiting (20 req/h/IP) y proxy a Supabase | `next_app/app/api/contact/route.ts`                  |
| C2  | Frontend `ContactForm` usa fetch al endpoint interno (no Supabase client directo)                | `next_app/components/ContactForm.tsx`                |
| C2  | Eliminado `public/assets/js/form.js` (duplicado con credenciales hardcoded)                       | borrado                                              |
| C3  | Habilitado RLS en las 24 tablas del ERP que compartían proyecto Supabase                         | Supabase migration `enable_rls_on_all_erp_tables`    |
| C3  | Policy `leads_contacto` endurecida con límites de longitud y `estado = 'nuevo'` forzado           | Supabase migration `harden_leads_contacto_insert_policy` |
| H1  | XSS en `PricingCard`: reemplazado `dangerouslySetInnerHTML` por render React seguro de `<br>`+`<strong>` | `next_app/components/PricingCard.tsx`              |
| H2  | XSS en burbujas de chat de proyectos: usa `renderInlineBold` en lugar de HTML crudo              | `next_app/app/(site)/proyectos/[slug]/page.tsx`      |

### Medios

| Id  | Descripción                                                                                | Archivo(s)                                                                  |
| --- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| M1  | Headers de seguridad globales: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP-Report-Only | `next_app/next.config.ts`                                                 |
| M2  | Helper `safeJsonLd()` aplicado a las 5 inyecciones de JSON-LD (escapa `<`, `>`, `&`, U+2028/9) | `next_app/lib/seo/jsonLd.ts` + 5 páginas                                   |
| M3  | Validación server-side de leads (cubierta por C2)                                          | `next_app/app/api/contact/route.ts`                                         |
| M5  | Workflow `publish-scheduled-posts.yml` endurecido: actions pinned a SHA, `fetch-depth: 1`, `timeout-minutes`, `concurrency`, permisos mínimos | `.github/workflows/publish-scheduled-posts.yml`                             |
| M6  | RSS: escape de `]]>` en CDATA con helper `escapeCdata`                                     | `next_app/app/(site)/rss.xml/route.ts`                                      |

### Bajos

| Id  | Descripción                                                                | Archivo(s)                        |
| --- | -------------------------------------------------------------------------- | --------------------------------- |
| L2  | Validación del valor leído desde `localStorage['theme']` en el script anti-FOUC | `next_app/app/(site)/layout.tsx`  |
| L3  | Google Consent Mode v2 ya implementado correctamente con CookieBanner: sin cambios | (revisión)                        |

## Estado de `npm audit`

Tras `npm audit fix --legacy-peer-deps`:

- **brace-expansion** (moderate): fix disponible, aplicado automáticamente cuando procede.
- **cookie** (low): sin fix disponible aguas arriba.
- **@cloudflare/next-on-pages** (moderate): sin fix disponible aguas arriba.
- **next 16.1.6** (DoS en Server Components, null-origin CSRF): fix requiere `npm audit fix --force` → `next@16.2.4`, que cae fuera del rango declarado. **Pendiente**: actualizar manualmente tras validar que no rompe Turbopack / keystatic.
- **undici** (vía `miniflare` dev-dep): sin fix porque miniflare no ha publicado versión actualizada. No afecta producción (solo dev).

## Controles NO implementados (requieren decisión / plataforma externa)

Ver [SECURITY-TODO.md](./SECURITY-TODO.md).
