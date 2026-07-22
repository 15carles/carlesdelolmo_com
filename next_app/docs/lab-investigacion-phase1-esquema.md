# Laboratorio de visibilidad en IA — Fase 1: esquema de la base de investigación

- **Estado:** aplicada y verificada (2026-07-22)
- **Migración:** `next_app/supabase/migrations/20260722100000_ai_visibility_lab_schema.sql`
- **Proyecto Supabase:** `gzrgxkjvxaflteilmjuq` (Carles_del_Olmo, eu-central-1)
- **Plan general:** `lab-investigacion-phase0-plan.md`

## Qué se ha creado

| Objeto | Detalle |
|---|---|
| `ai_visibility_lab_engines` | Catálogo de motores. Seeds: `chatgpt`, `gemini`, `perplexity` (slugs espejo de `lib/aiVisibilityLab/config.ts`) |
| `ai_visibility_lab_sectors` | 16 sectores (`servicios-profesionales` … `otros`) |
| `ai_visibility_lab_service_categories` | 17 categorías funcionales globales (`venta-de-productos` … `otros`) — decisión D6 |
| `ai_visibility_lab_provinces` | 56 entradas: 4 ámbitos (`toda-espana`, `varias-provincias`, `internacional`, `no-aplicable`) + 52 provincias/ciudades autónomas |
| `ai_visibility_lab_sessions` | Una fila por análisis: `public_session_id` (único), `domain_hash` (CHECK 64 hex), versión metodológica, estado, FKs a catálogos, contadores derivados, `is_complete`, `is_excluded` |
| `ai_visibility_lab_queries` | Una fila por consulta: `UNIQUE (session_id, position)`, tipo normalizado, sin texto |
| `ai_visibility_lab_results` | Una fila por consulta × motor: `UNIQUE (session_id, query_id, engine_id)` (idempotencia) |
| `ai_visibility_lab_set_updated_at()` | Función de trigger compartida (`search_path` fijado); triggers en las 6 tablas con `updated_at` |

## Reglas de calidad aplicadas por la base (spec §13)

- Enums por CHECK en estados, tipos, aparición, fuente, exactitud y competidores.
- `pending` ⇒ todos los campos de resultado NULL; registrada ⇒ todos con valor.
- `non_evaluable` ⇒ aparición `unknown` + fuente/exactitud `not_applicable`.
- `not_present` ⇒ fuente/exactitud `not_applicable` (la UI no las pregunta).
- Aparición (`mentioned`/`recommended`) ⇒ fuente y exactitud con valores reales o `unknown`.
- Recuento de competidores coherente con la presencia declarada.
- Contadores: `completed = evaluable + non_evaluable`, `total = completed + pending`, `is_complete ⇔ (pending = 0 ∧ total > 0) ⇔ status 'completed' ⇔ completed_at presente`, `completed_at ≥ started_at`.
- `is_custom ⇔ query_type = 'custom'`.

## Seguridad verificada

- RLS activado en las 7 tablas, **cero políticas** (denegación total).
- `REVOKE ALL` a `anon` y `authenticated`: verificado con `has_table_privilege` → `false` en SELECT/INSERT para todas.
- `get_advisors(security)`: únicamente avisos INFO `rls_enabled_no_policy`, que es el patrón intencionado (idéntico al de las tablas del ERP existentes). Sin WARN/ERROR.

## Verificación de seeds

`engines=3`, `sectors=16`, `service_categories=17`, `provinces=56`, `sessions=0`.

## Notas

- Los seeds usan `on conflict (slug) do nothing`: la migración de datos es re-ejecutable.
- Los catálogos no se borran (FK sin cascade): retirar una opción = `is_active = false`.
- La única vía de escritura será la RPC de la Fase 2; hasta entonces la base es inerte.
