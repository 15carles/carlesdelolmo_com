# Laboratorio de visibilidad en IA — Fase 3: vistas de estadísticas

- **Estado:** aplicada y probada (2026-07-22)
- **Migración:** `next_app/supabase/migrations/20260722102000_ai_visibility_lab_views.sql`

## Vistas creadas (todas `security_invoker` + REVOKE a anon/authenticated)

| Vista | Contenido |
|---|---|
| `ai_visibility_lab_statistics` | Resumen global en una fila (§5): `sessions_total/completed/partial`, `queries_total`, `results_total/evaluable`, `first/last_session_at`, `distinct_sectors/provinces/domain_hashes`, `repeat_domain_sessions` (= sesiones − hashes distintos) |
| `ai_visibility_lab_stats_by_engine` | Por motor: registradas, evaluables, no evaluables, presencia, recomendación, citación, información incorrecta, competencia + tasas (`pct_present`, `pct_recommended`, `pct_cited_of_present`, `pct_inaccurate_of_present`, `pct_competitor_present`) |
| `ai_visibility_lab_stats_by_sector` | Por sector: sesiones, completadas, dominios únicos, evaluables, presencia y `pct_present` |
| `ai_visibility_lab_stats_by_province` | Por provincia/ámbito: ídem |
| `ai_visibility_lab_stats_monthly` | Evolución mensual (mes de `started_at`) |

Decisión: **vista normal**, no materializada. El volumen previsto a 1-2 años no
justifica jobs de refresco; convertirla en materializada más adelante es
trivial y no cambia el contrato de columnas.

Definiciones (idénticas al informe local del laboratorio):
- `pct_present`/`pct_recommended`: sobre pruebas **evaluables**.
- `pct_cited_of_present`/`pct_inaccurate_of_present`: sobre pruebas donde la
  empresa **aparece** (`mentioned`/`recommended`).
- Todas las vistas excluyen sesiones `is_excluded`.

## Cómo consultarlas (solo interno)

Desde el dashboard de Supabase (SQL editor) o vía MCP con `service_role`:

```sql
select * from public.ai_visibility_lab_statistics;
select * from public.ai_visibility_lab_stats_by_engine;
select * from public.ai_visibility_lab_stats_by_sector where sessions > 0;
select * from public.ai_visibility_lab_stats_by_province where sessions > 0;
select * from public.ai_visibility_lab_stats_monthly;
```

Consultas de comprobación adicionales (§14) sin vista propia:

```sql
-- Sesiones parciales sin actividad reciente (candidatas a 'abandoned', derivado)
select count(*) from public.ai_visibility_lab_sessions
 where status = 'partial' and not is_excluded
   and updated_at < now() - interval '30 days';

-- Frecuencia de aparición de competidores conocidos (pruebas evaluables)
select known_competitor_appeared, count(*)
  from public.ai_visibility_lab_results
 where evaluation_status = 'evaluable'
 group by 1 order by 2 desc;

-- Sesiones por dominio (recurrencia longitudinal)
select domain_hash, count(*) as sesiones, min(started_at), max(started_at)
  from public.ai_visibility_lab_sessions
 where not is_excluded
 group by domain_hash having count(*) > 1;
```

## Verificación realizada

Con dos sesiones ficticias (mismo `domain_hash`, sectores/provincias distintos,
una completa y una parcial con una prueba pendiente):

- Global: 2 sesiones (1 completa, 1 parcial), 2 consultas, 5 resultados,
  4 evaluables, 2 sectores, 2 provincias, **1 hash distinto, 1 sesión repetida** ✔
- Por motor: chatgpt 2/2 presencia (1 citada → 50 % de las presentes),
  gemini 1 recomendada/citada/incorrecta (100 %), perplexity 0 presencia y
  tasas `null` cuando el denominador es 0 ✔
- Mensual: julio 2026 → 2 sesiones, 1 completa, 1 dominio único ✔
- Privilegios: `SELECT` denegado a `anon` y `authenticated` en las 5 vistas ✔
- Limpieza: 0 sesiones y 0 resultados tras el borrado ✔

No se mostrará públicamente ninguna estadística hasta que exista una muestra
mínima razonable (fuera de alcance en esta versión).
