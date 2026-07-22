-- ============================================================================
-- Laboratorio de visibilidad en IA — base de investigación
-- Migración 1: esquema (catálogos, sesiones, consultas y resultados)
--
-- Proyecto Supabase: gzrgxkjvxaflteilmjuq (Carles_del_Olmo, eu-central-1)
-- Diseño completo: next_app/docs/lab-investigacion-phase0-plan.md
--
-- Reglas clave de esta capa de datos:
--   · Solo datos estadísticos normalizados: sin nombre de empresa, sin dominio
--     en claro (solo hash SHA-256 del hostname normalizado), sin nombres de
--     competidores y sin texto libre de ningún tipo.
--   · RLS activado en todas las tablas SIN políticas: la clave publishable
--     (rol anon) no puede leer ni escribir directamente en ninguna tabla.
--     La única vía de entrada será la función RPC de la migración 2.
--   · Idempotencia garantizada por restricciones únicas:
--     sesiones por public_session_id, consultas por (session, position),
--     resultados por (session, query, engine).
--   · Los catálogos se siembran con los mismos slugs que usa la configuración
--     local del laboratorio (lib/aiVisibilityLab), que es la fuente de verdad
--     de la interfaz.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 0. Función de trigger compartida para mantener updated_at
-- ----------------------------------------------------------------------------
create or replace function public.ai_visibility_lab_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

comment on function public.ai_visibility_lab_set_updated_at() is
  'Laboratorio de visibilidad en IA: mantiene updated_at en las tablas de investigación.';

revoke all on function public.ai_visibility_lab_set_updated_at() from public, anon, authenticated;

-- ----------------------------------------------------------------------------
-- 1. Catálogos
-- ----------------------------------------------------------------------------

create table public.ai_visibility_lab_engines (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) between 2 and 60),
  name text not null check (char_length(name) between 2 and 80),
  is_active boolean not null default true,
  sort_order smallint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.ai_visibility_lab_engines is
  'Catálogo de motores de IA del laboratorio. Slugs espejo de lib/aiVisibilityLab/config.ts.';

create table public.ai_visibility_lab_sectors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) between 2 and 60),
  name text not null check (char_length(name) between 2 and 80),
  is_active boolean not null default true,
  sort_order smallint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.ai_visibility_lab_sectors is
  'Catálogo normalizado de sectores empresariales (taxonomía para España).';

create table public.ai_visibility_lab_service_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) between 2 and 60),
  name text not null check (char_length(name) between 2 and 80),
  is_active boolean not null default true,
  sort_order smallint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.ai_visibility_lab_service_categories is
  'Catálogo global de categorías funcionales de servicio. La descripción libre del servicio nunca sale del navegador.';

create table public.ai_visibility_lab_provinces (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) between 2 and 60),
  name text not null check (char_length(name) between 2 and 80),
  is_active boolean not null default true,
  sort_order smallint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.ai_visibility_lab_provinces is
  'Catálogo de provincias y ámbitos geográficos. La ubicación libre del usuario nunca sale del navegador.';

-- ----------------------------------------------------------------------------
-- 2. Sesiones (una fila por análisis; solo se crea con el primer resultado)
-- ----------------------------------------------------------------------------

create table public.ai_visibility_lab_sessions (
  id uuid primary key default gen_random_uuid(),
  -- Identificador de sincronización generado en el navegador (UUID aleatorio,
  -- sin información personal). Actúa como referencia de escritura de la sesión.
  public_session_id uuid not null unique,
  -- SHA-256 (hex) del hostname normalizado. Seudonimizado: nunca se almacena
  -- el dominio original ni puede recuperarse desde aquí.
  domain_hash text not null check (domain_hash ~ '^[0-9a-f]{64}$'),
  methodology_version text not null
    check (methodology_version ~ '^[a-z0-9][a-z0-9.-]{0,39}$'),
  status text not null default 'partial'
    check (status in ('started', 'partial', 'completed', 'abandoned')),
  sector_id uuid not null references public.ai_visibility_lab_sectors (id),
  service_category_id uuid not null references public.ai_visibility_lab_service_categories (id),
  province_id uuid not null references public.ai_visibility_lab_provinces (id),
  known_competitors_registered smallint not null default 0
    check (known_competitors_registered between 0 and 10),
  started_at timestamptz not null,
  completed_at timestamptz,
  submitted_at timestamptz not null default now(),
  -- Contadores derivados en servidor (migración 2) a partir de las filas del
  -- snapshot: el cliente no puede introducir incoherencias.
  total_queries smallint not null default 0 check (total_queries between 0 and 8),
  total_tests smallint not null default 0 check (total_tests between 0 and 64),
  completed_tests smallint not null default 0 check (completed_tests >= 0),
  evaluable_tests smallint not null default 0 check (evaluable_tests >= 0),
  pending_tests smallint not null default 0 check (pending_tests >= 0),
  non_evaluable_tests smallint not null default 0 check (non_evaluable_tests >= 0),
  is_complete boolean not null default false,
  -- Marcador interno de calidad (spam, pruebas, datos metodológicamente
  -- inválidos). Las vistas estadísticas excluyen estas sesiones.
  is_excluded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sessions_completed_counters
    check (completed_tests = evaluable_tests + non_evaluable_tests),
  constraint sessions_total_counters
    check (total_tests = completed_tests + pending_tests),
  constraint sessions_is_complete_coherent
    check (is_complete = (pending_tests = 0 and total_tests > 0)),
  constraint sessions_completed_status_coherent
    check ((status = 'completed') = is_complete),
  constraint sessions_completed_at_coherent
    check ((completed_at is not null) = is_complete),
  constraint sessions_completed_after_start
    check (completed_at is null or completed_at >= started_at)
);

comment on table public.ai_visibility_lab_sessions is
  'Un análisis del laboratorio (datos estadísticos seudonimizados). Sin nombre de empresa, sin dominio en claro, sin textos libres.';
comment on column public.ai_visibility_lab_sessions.domain_hash is
  'SHA-256 hex del hostname normalizado (minúsculas, sin protocolo, sin www., sin rutas). Identificador seudonimizado, no anónimo.';
comment on column public.ai_visibility_lab_sessions.is_excluded is
  'Exclusión interna de estadísticas (spam, datos de prueba, sesiones inválidas).';

create index idx_ai_visibility_lab_sessions_domain_hash
  on public.ai_visibility_lab_sessions (domain_hash);
create index idx_ai_visibility_lab_sessions_sector
  on public.ai_visibility_lab_sessions (sector_id);
create index idx_ai_visibility_lab_sessions_service_category
  on public.ai_visibility_lab_sessions (service_category_id);
create index idx_ai_visibility_lab_sessions_province
  on public.ai_visibility_lab_sessions (province_id);
create index idx_ai_visibility_lab_sessions_status
  on public.ai_visibility_lab_sessions (status);
create index idx_ai_visibility_lab_sessions_created_at
  on public.ai_visibility_lab_sessions (created_at);

-- ----------------------------------------------------------------------------
-- 3. Consultas (una fila por tipo de consulta dentro de una sesión)
-- ----------------------------------------------------------------------------

create table public.ai_visibility_lab_queries (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null
    references public.ai_visibility_lab_sessions (id) on delete cascade,
  -- Posición estable dentro de la sesión (q1→1 … q4→4).
  position smallint not null check (position between 1 and 8),
  query_type text not null
    check (query_type in ('discovery', 'recommendation', 'specific_need', 'custom')),
  is_custom boolean not null default false,
  created_at timestamptz not null default now(),
  constraint queries_unique_position unique (session_id, position),
  constraint queries_custom_coherent check (is_custom = (query_type = 'custom'))
);

comment on table public.ai_visibility_lab_queries is
  'Tipos de consulta usados en cada sesión. Nunca se guarda el texto de la consulta; de la personalizada solo consta que existió.';

create index idx_ai_visibility_lab_queries_type
  on public.ai_visibility_lab_queries (query_type);

-- ----------------------------------------------------------------------------
-- 4. Resultados (una fila por combinación consulta × motor)
-- ----------------------------------------------------------------------------

create table public.ai_visibility_lab_results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null
    references public.ai_visibility_lab_sessions (id) on delete cascade,
  query_id uuid not null
    references public.ai_visibility_lab_queries (id) on delete cascade,
  engine_id uuid not null references public.ai_visibility_lab_engines (id),
  evaluation_status text not null
    check (evaluation_status in ('evaluable', 'non_evaluable', 'pending')),
  appearance_level text
    check (appearance_level in ('not_present', 'mentioned', 'recommended', 'unknown')),
  appeared_as_source text
    check (appeared_as_source in ('yes', 'no', 'unknown', 'not_applicable')),
  information_accuracy text
    check (information_accuracy in ('correct', 'partially_incorrect', 'incorrect',
                                    'insufficient_information', 'unknown', 'not_applicable')),
  known_competitor_appeared text
    check (known_competitor_appeared in ('yes', 'no', 'unknown', 'not_applicable')),
  known_competitors_count smallint
    check (known_competitors_count between 0 and 10),
  other_companies_appeared boolean,
  recorded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Idempotencia: una única fila por sesión × consulta × motor.
  constraint results_unique_per_engine unique (session_id, query_id, engine_id),
  -- Una prueba pendiente no tiene valores; una registrada los tiene todos.
  constraint results_pending_all_null check (
    (evaluation_status = 'pending'
      and appearance_level is null
      and appeared_as_source is null
      and information_accuracy is null
      and known_competitor_appeared is null
      and known_competitors_count is null
      and other_companies_appeared is null
      and recorded_at is null)
    or
    (evaluation_status <> 'pending'
      and appearance_level is not null
      and appeared_as_source is not null
      and information_accuracy is not null
      and known_competitor_appeared is not null
      and known_competitors_count is not null
      and other_companies_appeared is not null
      and recorded_at is not null)
  ),
  -- No evaluable: aparición desconocida y campos dependientes no aplicables.
  constraint results_non_evaluable_coherent check (
    evaluation_status <> 'non_evaluable'
    or (appearance_level = 'unknown'
        and appeared_as_source = 'not_applicable'
        and information_accuracy = 'not_applicable')
  ),
  -- La aparición 'unknown' solo existe en pruebas no evaluables.
  constraint results_unknown_appearance_only_non_evaluable check (
    appearance_level is distinct from 'unknown'
    or evaluation_status = 'non_evaluable'
  ),
  -- Si la empresa no aparece, fuente y exactitud no aplican (la UI no las pregunta).
  constraint results_not_present_coherent check (
    appearance_level is distinct from 'not_present'
    or (appeared_as_source = 'not_applicable'
        and information_accuracy = 'not_applicable')
  ),
  -- Si la empresa aparece, fuente y exactitud toman valores reales o 'unknown'.
  constraint results_present_coherent check (
    appearance_level is null
    or appearance_level not in ('mentioned', 'recommended')
    or (appeared_as_source in ('yes', 'no', 'unknown')
        and information_accuracy in ('correct', 'partially_incorrect', 'incorrect',
                                     'insufficient_information', 'unknown'))
  ),
  -- Coherencia entre presencia de competidores conocidos y su recuento.
  constraint results_competitor_count_coherent check (
    (known_competitor_appeared is null and known_competitors_count is null)
    or (known_competitor_appeared = 'yes' and known_competitors_count between 1 and 10)
    or (known_competitor_appeared in ('no', 'unknown', 'not_applicable')
        and known_competitors_count = 0)
  )
);

comment on table public.ai_visibility_lab_results is
  'Resultado estadístico de cada prueba (consulta × motor). Nunca se guarda qué competidor concreto apareció ni ningún texto.';

create index idx_ai_visibility_lab_results_query
  on public.ai_visibility_lab_results (query_id);
create index idx_ai_visibility_lab_results_engine
  on public.ai_visibility_lab_results (engine_id);

-- ----------------------------------------------------------------------------
-- 5. Triggers de updated_at
-- ----------------------------------------------------------------------------

create trigger trg_ai_visibility_lab_engines_updated_at
  before update on public.ai_visibility_lab_engines
  for each row execute function public.ai_visibility_lab_set_updated_at();

create trigger trg_ai_visibility_lab_sectors_updated_at
  before update on public.ai_visibility_lab_sectors
  for each row execute function public.ai_visibility_lab_set_updated_at();

create trigger trg_ai_visibility_lab_service_categories_updated_at
  before update on public.ai_visibility_lab_service_categories
  for each row execute function public.ai_visibility_lab_set_updated_at();

create trigger trg_ai_visibility_lab_provinces_updated_at
  before update on public.ai_visibility_lab_provinces
  for each row execute function public.ai_visibility_lab_set_updated_at();

create trigger trg_ai_visibility_lab_sessions_updated_at
  before update on public.ai_visibility_lab_sessions
  for each row execute function public.ai_visibility_lab_set_updated_at();

create trigger trg_ai_visibility_lab_results_updated_at
  before update on public.ai_visibility_lab_results
  for each row execute function public.ai_visibility_lab_set_updated_at();

-- ----------------------------------------------------------------------------
-- 6. Seguridad: RLS activado sin políticas + revocación de privilegios directos
--    (denegación total para anon/authenticated; la RPC de la migración 2 será
--    la única puerta de entrada, y las vistas internas se consultan solo con
--    service_role desde el dashboard o MCP).
-- ----------------------------------------------------------------------------

alter table public.ai_visibility_lab_engines enable row level security;
alter table public.ai_visibility_lab_sectors enable row level security;
alter table public.ai_visibility_lab_service_categories enable row level security;
alter table public.ai_visibility_lab_provinces enable row level security;
alter table public.ai_visibility_lab_sessions enable row level security;
alter table public.ai_visibility_lab_queries enable row level security;
alter table public.ai_visibility_lab_results enable row level security;

revoke all on table
  public.ai_visibility_lab_engines,
  public.ai_visibility_lab_sectors,
  public.ai_visibility_lab_service_categories,
  public.ai_visibility_lab_provinces,
  public.ai_visibility_lab_sessions,
  public.ai_visibility_lab_queries,
  public.ai_visibility_lab_results
from anon, authenticated;

-- ----------------------------------------------------------------------------
-- 7. Datos iniciales de catálogos
-- ----------------------------------------------------------------------------

insert into public.ai_visibility_lab_engines (slug, name, sort_order) values
  ('chatgpt', 'ChatGPT', 1),
  ('gemini', 'Google Gemini', 2),
  ('perplexity', 'Perplexity', 3)
on conflict (slug) do nothing;

insert into public.ai_visibility_lab_sectors (slug, name, sort_order) values
  ('servicios-profesionales', 'Servicios profesionales', 1),
  ('salud-bienestar', 'Salud y bienestar', 2),
  ('construccion-reformas', 'Construcción y reformas', 3),
  ('inmobiliario', 'Inmobiliario', 4),
  ('industria-fabricacion', 'Industria y fabricación', 5),
  ('comercio', 'Comercio', 6),
  ('hosteleria-restauracion', 'Hostelería y restauración', 7),
  ('turismo-ocio', 'Turismo y ocio', 8),
  ('educacion-formacion', 'Educación y formación', 9),
  ('tecnologia', 'Tecnología', 10),
  ('marketing-comunicacion', 'Marketing y comunicación', 11),
  ('finanzas-seguros', 'Finanzas y seguros', 12),
  ('legal', 'Legal', 13),
  ('automocion', 'Automoción', 14),
  ('hogar-decoracion', 'Hogar y decoración', 15),
  ('otros', 'Otros', 99)
on conflict (slug) do nothing;

insert into public.ai_visibility_lab_service_categories (slug, name, sort_order) values
  ('venta-de-productos', 'Venta de productos', 1),
  ('fabricacion-o-produccion', 'Fabricación o producción', 2),
  ('instalacion-o-montaje', 'Instalación o montaje', 3),
  ('reparacion-o-mantenimiento', 'Reparación o mantenimiento', 4),
  ('obra-o-reforma', 'Obra o reforma', 5),
  ('consultoria-o-asesoria', 'Consultoría o asesoría', 6),
  ('diseno-o-creatividad', 'Diseño o creatividad', 7),
  ('desarrollo-o-software', 'Desarrollo o software', 8),
  ('marketing-o-publicidad', 'Marketing o publicidad', 9),
  ('formacion-o-ensenanza', 'Formación o enseñanza', 10),
  ('salud-o-tratamientos', 'Salud o tratamientos', 11),
  ('estetica-o-cuidado-personal', 'Estética o cuidado personal', 12),
  ('alojamiento-o-restauracion', 'Alojamiento o restauración', 13),
  ('transporte-o-logistica', 'Transporte o logística', 14),
  ('alquiler-de-bienes-o-espacios', 'Alquiler de bienes o espacios', 15),
  ('gestion-o-tramitacion', 'Gestión o tramitación', 16),
  ('otros', 'Otros', 99)
on conflict (slug) do nothing;

insert into public.ai_visibility_lab_provinces (slug, name, sort_order) values
  -- Ámbitos no provinciales
  ('toda-espana', 'Toda España', 1),
  ('varias-provincias', 'Varias provincias', 2),
  ('internacional', 'Internacional', 3),
  ('no-aplicable', 'No aplicable', 4),
  -- Provincias y ciudades autónomas (orden alfabético)
  ('a-coruna', 'A Coruña', 10),
  ('alava', 'Álava', 11),
  ('albacete', 'Albacete', 12),
  ('alicante', 'Alicante', 13),
  ('almeria', 'Almería', 14),
  ('asturias', 'Asturias', 15),
  ('avila', 'Ávila', 16),
  ('badajoz', 'Badajoz', 17),
  ('barcelona', 'Barcelona', 18),
  ('bizkaia', 'Bizkaia', 19),
  ('burgos', 'Burgos', 20),
  ('caceres', 'Cáceres', 21),
  ('cadiz', 'Cádiz', 22),
  ('cantabria', 'Cantabria', 23),
  ('castellon', 'Castellón', 24),
  ('ceuta', 'Ceuta', 25),
  ('ciudad-real', 'Ciudad Real', 26),
  ('cordoba', 'Córdoba', 27),
  ('cuenca', 'Cuenca', 28),
  ('gipuzkoa', 'Gipuzkoa', 29),
  ('girona', 'Girona', 30),
  ('granada', 'Granada', 31),
  ('guadalajara', 'Guadalajara', 32),
  ('huelva', 'Huelva', 33),
  ('huesca', 'Huesca', 34),
  ('illes-balears', 'Illes Balears', 35),
  ('jaen', 'Jaén', 36),
  ('la-rioja', 'La Rioja', 37),
  ('las-palmas', 'Las Palmas', 38),
  ('leon', 'León', 39),
  ('lleida', 'Lleida', 40),
  ('lugo', 'Lugo', 41),
  ('madrid', 'Madrid', 42),
  ('malaga', 'Málaga', 43),
  ('melilla', 'Melilla', 44),
  ('murcia', 'Murcia', 45),
  ('navarra', 'Navarra', 46),
  ('ourense', 'Ourense', 47),
  ('palencia', 'Palencia', 48),
  ('pontevedra', 'Pontevedra', 49),
  ('salamanca', 'Salamanca', 50),
  ('santa-cruz-de-tenerife', 'Santa Cruz de Tenerife', 51),
  ('segovia', 'Segovia', 52),
  ('sevilla', 'Sevilla', 53),
  ('soria', 'Soria', 54),
  ('tarragona', 'Tarragona', 55),
  ('teruel', 'Teruel', 56),
  ('toledo', 'Toledo', 57),
  ('valencia', 'Valencia', 58),
  ('valladolid', 'Valladolid', 59),
  ('zamora', 'Zamora', 60),
  ('zaragoza', 'Zaragoza', 61)
on conflict (slug) do nothing;
