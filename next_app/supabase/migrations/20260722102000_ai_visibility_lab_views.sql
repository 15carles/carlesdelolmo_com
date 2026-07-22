-- ============================================================================
-- Laboratorio de visibilidad en IA — base de investigación
-- Migración 3: vistas de estadísticas agregadas y de comprobación interna
--
-- Uso: consultas internas (dashboard de Supabase o MCP con service_role) y
-- futuros contadores públicos cuando exista una muestra mínima razonable.
-- NO se exponen al público:
--   · security_invoker = true → la vista se evalúa con los permisos de quien
--     consulta; anon/authenticated no tienen privilegios sobre las tablas.
--   · REVOKE explícito sobre las vistas para anon/authenticated.
-- Todas las vistas excluyen las sesiones marcadas is_excluded (spam, pruebas,
-- datos metodológicamente inválidos).
--
-- Definiciones de los porcentajes:
--   · pct_present / pct_recommended: sobre pruebas evaluables.
--   · pct_cited_of_present / pct_inaccurate_of_present: sobre pruebas en las
--     que la empresa aparece (mentioned/recommended), igual que el informe
--     local del laboratorio.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. ai_visibility_lab_statistics — resumen global en una fila (spec §5)
-- ----------------------------------------------------------------------------
create view public.ai_visibility_lab_statistics
with (security_invoker = true) as
with s as (
  select * from public.ai_visibility_lab_sessions where not is_excluded
)
select
  (select count(*) from s) as sessions_total,
  (select count(*) from s where status = 'completed') as sessions_completed,
  (select count(*) from s where status = 'partial') as sessions_partial,
  (select count(*)
     from public.ai_visibility_lab_queries q
     join s on s.id = q.session_id) as queries_total,
  (select count(*)
     from public.ai_visibility_lab_results r
     join s on s.id = r.session_id) as results_total,
  (select count(*)
     from public.ai_visibility_lab_results r
     join s on s.id = r.session_id
     where r.evaluation_status = 'evaluable') as results_evaluable,
  (select min(started_at) from s) as first_session_at,
  (select max(started_at) from s) as last_session_at,
  (select count(distinct sector_id) from s) as distinct_sectors,
  (select count(distinct province_id) from s) as distinct_provinces,
  (select count(distinct domain_hash) from s) as distinct_domain_hashes,
  (select count(*) - count(distinct domain_hash) from s) as repeat_domain_sessions;

comment on view public.ai_visibility_lab_statistics is
  'Laboratorio de visibilidad en IA: agregados globales (excluye is_excluded). Uso interno; base de futuros contadores públicos.';

-- ----------------------------------------------------------------------------
-- 2. ai_visibility_lab_stats_by_engine — resultados y tasas por motor (spec §14)
-- ----------------------------------------------------------------------------
create view public.ai_visibility_lab_stats_by_engine
with (security_invoker = true) as
select
  e.slug as engine,
  count(r.id) filter (where r.evaluation_status <> 'pending') as results_recorded,
  count(r.id) filter (where r.evaluation_status = 'evaluable') as results_evaluable,
  count(r.id) filter (where r.evaluation_status = 'non_evaluable') as results_non_evaluable,
  count(r.id) filter (where r.appearance_level in ('mentioned', 'recommended')) as present_count,
  count(r.id) filter (where r.appearance_level = 'recommended') as recommended_count,
  count(r.id) filter (where r.appeared_as_source = 'yes') as cited_count,
  count(r.id) filter (where r.information_accuracy in ('partially_incorrect', 'incorrect')) as inaccurate_count,
  count(r.id) filter (where r.known_competitor_appeared = 'yes' or r.other_companies_appeared) as competitor_present_count,
  round(100.0 * count(r.id) filter (where r.appearance_level in ('mentioned', 'recommended'))
        / nullif(count(r.id) filter (where r.evaluation_status = 'evaluable'), 0), 1) as pct_present,
  round(100.0 * count(r.id) filter (where r.appearance_level = 'recommended')
        / nullif(count(r.id) filter (where r.evaluation_status = 'evaluable'), 0), 1) as pct_recommended,
  round(100.0 * count(r.id) filter (where r.appeared_as_source = 'yes')
        / nullif(count(r.id) filter (where r.appearance_level in ('mentioned', 'recommended')), 0), 1) as pct_cited_of_present,
  round(100.0 * count(r.id) filter (where r.information_accuracy in ('partially_incorrect', 'incorrect'))
        / nullif(count(r.id) filter (where r.appearance_level in ('mentioned', 'recommended')), 0), 1) as pct_inaccurate_of_present,
  round(100.0 * count(r.id) filter (where r.known_competitor_appeared = 'yes' or r.other_companies_appeared)
        / nullif(count(r.id) filter (where r.evaluation_status = 'evaluable'), 0), 1) as pct_competitor_present
from public.ai_visibility_lab_engines e
left join public.ai_visibility_lab_results r
  on r.engine_id = e.id
  and exists (
    select 1 from public.ai_visibility_lab_sessions s
    where s.id = r.session_id and not s.is_excluded
  )
group by e.slug, e.sort_order
order by e.sort_order;

comment on view public.ai_visibility_lab_stats_by_engine is
  'Laboratorio de visibilidad en IA: tasas de presencia, recomendación, citación, exactitud y competencia por motor (uso interno).';

-- ----------------------------------------------------------------------------
-- 3. ai_visibility_lab_stats_by_sector — sesiones y tasas por sector (spec §14)
-- ----------------------------------------------------------------------------
create view public.ai_visibility_lab_stats_by_sector
with (security_invoker = true) as
select
  sec.slug as sector,
  count(distinct s.id) as sessions,
  count(distinct s.id) filter (where s.status = 'completed') as sessions_completed,
  count(distinct s.domain_hash) as distinct_domains,
  count(r.id) filter (where r.evaluation_status = 'evaluable') as results_evaluable,
  count(r.id) filter (where r.appearance_level in ('mentioned', 'recommended')) as present_count,
  count(r.id) filter (where r.appearance_level = 'recommended') as recommended_count,
  round(100.0 * count(r.id) filter (where r.appearance_level in ('mentioned', 'recommended'))
        / nullif(count(r.id) filter (where r.evaluation_status = 'evaluable'), 0), 1) as pct_present
from public.ai_visibility_lab_sectors sec
left join public.ai_visibility_lab_sessions s
  on s.sector_id = sec.id and not s.is_excluded
left join public.ai_visibility_lab_results r
  on r.session_id = s.id
group by sec.slug, sec.sort_order
order by sec.sort_order;

comment on view public.ai_visibility_lab_stats_by_sector is
  'Laboratorio de visibilidad en IA: sesiones, dominios únicos y tasas por sector (uso interno).';

-- ----------------------------------------------------------------------------
-- 4. ai_visibility_lab_stats_by_province — sesiones y tasas por provincia (spec §14)
-- ----------------------------------------------------------------------------
create view public.ai_visibility_lab_stats_by_province
with (security_invoker = true) as
select
  p.slug as province,
  count(distinct s.id) as sessions,
  count(distinct s.id) filter (where s.status = 'completed') as sessions_completed,
  count(distinct s.domain_hash) as distinct_domains,
  count(r.id) filter (where r.evaluation_status = 'evaluable') as results_evaluable,
  count(r.id) filter (where r.appearance_level in ('mentioned', 'recommended')) as present_count,
  round(100.0 * count(r.id) filter (where r.appearance_level in ('mentioned', 'recommended'))
        / nullif(count(r.id) filter (where r.evaluation_status = 'evaluable'), 0), 1) as pct_present
from public.ai_visibility_lab_provinces p
left join public.ai_visibility_lab_sessions s
  on s.province_id = p.id and not s.is_excluded
left join public.ai_visibility_lab_results r
  on r.session_id = s.id
group by p.slug, p.sort_order
order by p.sort_order;

comment on view public.ai_visibility_lab_stats_by_province is
  'Laboratorio de visibilidad en IA: sesiones, dominios únicos y tasas por provincia o ámbito (uso interno).';

-- ----------------------------------------------------------------------------
-- 5. ai_visibility_lab_stats_monthly — evolución mensual (spec §14)
-- ----------------------------------------------------------------------------
create view public.ai_visibility_lab_stats_monthly
with (security_invoker = true) as
select
  date_trunc('month', s.started_at)::date as month,
  count(distinct s.id) as sessions,
  count(distinct s.id) filter (where s.status = 'completed') as sessions_completed,
  count(distinct s.domain_hash) as distinct_domains,
  count(r.id) filter (where r.evaluation_status = 'evaluable') as results_evaluable,
  count(r.id) filter (where r.appearance_level in ('mentioned', 'recommended')) as present_count,
  count(r.id) filter (where r.appearance_level = 'recommended') as recommended_count
from public.ai_visibility_lab_sessions s
left join public.ai_visibility_lab_results r
  on r.session_id = s.id
where not s.is_excluded
group by 1
order by 1;

comment on view public.ai_visibility_lab_stats_monthly is
  'Laboratorio de visibilidad en IA: evolución mensual de sesiones y resultados (uso interno).';

-- ----------------------------------------------------------------------------
-- 6. Permisos: las vistas no son accesibles con las claves del navegador
-- ----------------------------------------------------------------------------
revoke all on table
  public.ai_visibility_lab_statistics,
  public.ai_visibility_lab_stats_by_engine,
  public.ai_visibility_lab_stats_by_sector,
  public.ai_visibility_lab_stats_by_province,
  public.ai_visibility_lab_stats_monthly
from anon, authenticated;
