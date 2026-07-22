-- ============================================================================
-- Laboratorio de visibilidad en IA — base de investigación
-- Migración 2: función RPC de ingesta de snapshots
--
-- Única puerta de entrada de datos desde la web (las tablas deniegan todo
-- acceso directo a anon/authenticated; ver migración 1).
--
-- Contrato:
--   · Recibe el snapshot estadístico COMPLETO de una sesión (sesión + tipos de
--     consulta + todas las filas de la matriz de pruebas con su estado).
--   · Valida todos los valores contra listas cerradas, formatos y topes; los
--     campos no previstos del payload se descartan (nunca se leen).
--   · Reconciliación idempotente: upsert de la sesión por public_session_id,
--     de consultas por (session, position) y de resultados por
--     (session, query, engine); poda de filas ausentes del snapshot.
--   · Los contadores y el estado de la sesión se derivan aquí de las filas del
--     snapshot: el cliente no puede introducir incoherencias.
--   · La sesión remota solo se crea si el snapshot contiene al menos un
--     resultado registrado (nunca por visitas ni por pulsar «Empezar»).
--   · No devuelve datos almacenados: solo ok/estado.
--
-- Seguridad:
--   · SECURITY DEFINER con search_path fijado; EXECUTE solo para anon (llamada
--     vía /api/lab-research con la clave publishable) y service_role.
--   · Bloqueo advisory por sesión para serializar envíos concurrentes.
--   · El payload nunca contiene texto libre: cualquier cadena fuera de las
--     listas cerradas se rechaza.
-- ============================================================================

create or replace function public.ai_visibility_lab_submit_snapshot(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $func$
declare
  v_now timestamptz := now();
  v_psid uuid;
  v_domain_hash text;
  v_methodology text;
  v_sector_id uuid;
  v_service_category_id uuid;
  v_province_id uuid;
  v_kcr int;
  v_started_at timestamptz;
  v_completed_at_raw timestamptz;
  v_completed_at timestamptz;
  v_queries jsonb;
  v_results jsonb;
  v_q jsonb;
  v_r jsonb;
  v_pos int;
  v_qtype text;
  v_is_custom boolean;
  v_positions smallint[] := '{}';
  v_engine_slug text;
  v_engine_id uuid;
  v_eval text;
  v_appearance text;
  v_source text;
  v_accuracy text;
  v_kca text;
  v_kcc int;
  v_recorded_at timestamptz;
  v_pair text;
  v_pairs text[] := '{}';
  v_total_tests int := 0;
  v_pending int := 0;
  v_evaluable int := 0;
  v_non_evaluable int := 0;
  v_is_complete boolean;
  v_status text;
  v_existing uuid;
  v_session_id uuid;
  v_query_id uuid;
  v_result_id uuid;
  v_result_ids uuid[] := '{}';
begin
  -- --------------------------------------------------------------------------
  -- 1. Estructura básica e identificador de sesión
  -- --------------------------------------------------------------------------
  if payload is null or jsonb_typeof(payload) <> 'object' then
    raise exception 'invalid_payload';
  end if;

  begin
    v_psid := (payload->>'public_session_id')::uuid;
  exception when others then
    v_psid := null;
  end;
  if v_psid is null then
    raise exception 'invalid_public_session_id';
  end if;

  -- Serializa envíos concurrentes de la misma sesión (doble pestaña, carreras).
  perform pg_advisory_xact_lock(hashtextextended('ai_visibility_lab:' || v_psid::text, 0));

  -- --------------------------------------------------------------------------
  -- 2. Escalares de la sesión
  -- --------------------------------------------------------------------------
  v_domain_hash := payload->>'domain_hash';
  if v_domain_hash is null or v_domain_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'invalid_domain_hash';
  end if;

  v_methodology := payload->>'methodology_version';
  if v_methodology is null or v_methodology !~ '^[a-z0-9][a-z0-9.-]{0,39}$' then
    raise exception 'invalid_methodology_version';
  end if;

  select id into v_sector_id
    from public.ai_visibility_lab_sectors
    where slug = payload->>'sector' and is_active;
  if v_sector_id is null then
    raise exception 'invalid_sector';
  end if;

  select id into v_service_category_id
    from public.ai_visibility_lab_service_categories
    where slug = payload->>'service_category' and is_active;
  if v_service_category_id is null then
    raise exception 'invalid_service_category';
  end if;

  select id into v_province_id
    from public.ai_visibility_lab_provinces
    where slug = payload->>'province' and is_active;
  if v_province_id is null then
    raise exception 'invalid_province';
  end if;

  if coalesce((payload->'known_competitors_registered')::text, '') !~ '^[0-9]+$' then
    raise exception 'invalid_known_competitors_registered';
  end if;
  v_kcr := (payload->>'known_competitors_registered')::int;
  if v_kcr > 10 then
    raise exception 'invalid_known_competitors_registered';
  end if;

  begin
    v_started_at := (payload->>'started_at')::timestamptz;
  exception when others then
    v_started_at := null;
  end;
  if v_started_at is null
     or v_started_at < timestamptz '2026-01-01T00:00:00Z'
     or v_started_at > v_now + interval '1 hour' then
    raise exception 'invalid_started_at';
  end if;

  if payload ? 'completed_at' and jsonb_typeof(payload->'completed_at') <> 'null' then
    begin
      v_completed_at_raw := (payload->>'completed_at')::timestamptz;
    exception when others then
      v_completed_at_raw := null;
    end;
    if v_completed_at_raw is null
       or v_completed_at_raw < v_started_at
       or v_completed_at_raw > v_now + interval '1 hour' then
      raise exception 'invalid_completed_at';
    end if;
  end if;

  -- --------------------------------------------------------------------------
  -- 3. Consultas: validación
  -- --------------------------------------------------------------------------
  v_queries := payload->'queries';
  if v_queries is null or jsonb_typeof(v_queries) <> 'array'
     or jsonb_array_length(v_queries) < 1
     or jsonb_array_length(v_queries) > 8 then
    raise exception 'invalid_queries';
  end if;

  for v_q in select q.value from jsonb_array_elements(v_queries) q loop
    if jsonb_typeof(v_q) <> 'object' then
      raise exception 'invalid_query';
    end if;
    if coalesce((v_q->'position')::text, '') !~ '^[0-9]+$' then
      raise exception 'invalid_query_position';
    end if;
    v_pos := (v_q->>'position')::int;
    if v_pos < 1 or v_pos > 8 then
      raise exception 'invalid_query_position';
    end if;
    if v_pos::smallint = any (v_positions) then
      raise exception 'duplicate_query_position';
    end if;
    v_qtype := v_q->>'query_type';
    if v_qtype is null
       or v_qtype not in ('discovery', 'recommendation', 'specific_need', 'custom') then
      raise exception 'invalid_query_type';
    end if;
    if jsonb_typeof(v_q->'is_custom') <> 'boolean' then
      raise exception 'invalid_query_is_custom';
    end if;
    v_is_custom := (v_q->>'is_custom')::boolean;
    if v_is_custom <> (v_qtype = 'custom') then
      raise exception 'invalid_query_is_custom';
    end if;
    v_positions := v_positions || v_pos::smallint;
  end loop;

  -- --------------------------------------------------------------------------
  -- 4. Resultados: validación y contadores derivados
  -- --------------------------------------------------------------------------
  v_results := payload->'results';
  if v_results is null or jsonb_typeof(v_results) <> 'array'
     or jsonb_array_length(v_results) < 1
     or jsonb_array_length(v_results) > 64 then
    raise exception 'invalid_results';
  end if;

  for v_r in select r.value from jsonb_array_elements(v_results) r loop
    if jsonb_typeof(v_r) <> 'object' then
      raise exception 'invalid_result';
    end if;

    if coalesce((v_r->'query_position')::text, '') !~ '^[0-9]+$' then
      raise exception 'invalid_result_query';
    end if;
    v_pos := (v_r->>'query_position')::int;
    if not (v_pos::smallint = any (v_positions)) then
      raise exception 'invalid_result_query';
    end if;

    v_engine_slug := v_r->>'engine';
    select id into v_engine_id
      from public.ai_visibility_lab_engines
      where slug = v_engine_slug and is_active;
    if v_engine_id is null then
      raise exception 'invalid_result_engine';
    end if;

    v_pair := v_pos::text || ':' || v_engine_slug;
    if v_pair = any (v_pairs) then
      raise exception 'duplicate_result';
    end if;
    v_pairs := v_pairs || v_pair;

    v_eval := v_r->>'evaluation_status';
    if v_eval is null or v_eval not in ('evaluable', 'non_evaluable', 'pending') then
      raise exception 'invalid_result_status';
    end if;

    v_total_tests := v_total_tests + 1;

    if v_eval = 'pending' then
      v_pending := v_pending + 1;
      continue;
    end if;

    -- Prueba registrada: todos los campos son obligatorios y coherentes.
    v_appearance := v_r->>'appearance_level';
    v_source := v_r->>'appeared_as_source';
    v_accuracy := v_r->>'information_accuracy';
    v_kca := v_r->>'known_competitor_appeared';

    if v_eval = 'evaluable' then
      v_evaluable := v_evaluable + 1;
      if v_appearance is null
         or v_appearance not in ('not_present', 'mentioned', 'recommended') then
        raise exception 'invalid_result_appearance';
      end if;
    else
      v_non_evaluable := v_non_evaluable + 1;
      if v_appearance is distinct from 'unknown'
         or v_source is distinct from 'not_applicable'
         or v_accuracy is distinct from 'not_applicable' then
        raise exception 'invalid_result_non_evaluable';
      end if;
    end if;

    if v_appearance = 'not_present'
       and (v_source is distinct from 'not_applicable'
            or v_accuracy is distinct from 'not_applicable') then
      raise exception 'invalid_result_not_present';
    end if;

    if v_appearance in ('mentioned', 'recommended') then
      if v_source is null or v_source not in ('yes', 'no', 'unknown') then
        raise exception 'invalid_result_source';
      end if;
      if v_accuracy is null
         or v_accuracy not in ('correct', 'partially_incorrect', 'incorrect',
                               'insufficient_information', 'unknown') then
        raise exception 'invalid_result_accuracy';
      end if;
    end if;

    if v_kca is null or v_kca not in ('yes', 'no', 'unknown', 'not_applicable') then
      raise exception 'invalid_result_competitors';
    end if;
    if coalesce((v_r->'known_competitors_count')::text, '') !~ '^[0-9]+$' then
      raise exception 'invalid_result_competitors';
    end if;
    v_kcc := (v_r->>'known_competitors_count')::int;
    if (v_kca = 'yes' and (v_kcc < 1 or v_kcc > v_kcr))
       or (v_kca <> 'yes' and v_kcc <> 0) then
      raise exception 'invalid_result_competitors';
    end if;
    if v_kcr = 0 and v_kca <> 'not_applicable' then
      raise exception 'invalid_result_competitors';
    end if;

    if jsonb_typeof(v_r->'other_companies_appeared') <> 'boolean' then
      raise exception 'invalid_result_other_companies';
    end if;

    begin
      v_recorded_at := (v_r->>'recorded_at')::timestamptz;
    exception when others then
      v_recorded_at := null;
    end;
    if v_recorded_at is null
       or v_recorded_at < timestamptz '2026-01-01T00:00:00Z'
       or v_recorded_at > v_now + interval '1 hour' then
      raise exception 'invalid_result_recorded_at';
    end if;
  end loop;

  -- --------------------------------------------------------------------------
  -- 5. Reglas de creación y derivación de estado
  -- --------------------------------------------------------------------------
  select id into v_existing
    from public.ai_visibility_lab_sessions
    where public_session_id = v_psid;

  -- Nunca crear una sesión remota sin ningún resultado registrado.
  if v_existing is null and (v_evaluable + v_non_evaluable) = 0 then
    raise exception 'no_recorded_results';
  end if;

  v_is_complete := (v_pending = 0);
  v_status := case when v_is_complete then 'completed' else 'partial' end;
  v_completed_at := case
    when v_is_complete then coalesce(v_completed_at_raw, v_now)
    else null
  end;

  -- --------------------------------------------------------------------------
  -- 6. Upsert de la sesión (submitted_at solo se fija en la creación)
  -- --------------------------------------------------------------------------
  insert into public.ai_visibility_lab_sessions as s (
    public_session_id, domain_hash, methodology_version, status,
    sector_id, service_category_id, province_id, known_competitors_registered,
    started_at, completed_at,
    total_queries, total_tests, completed_tests,
    evaluable_tests, pending_tests, non_evaluable_tests,
    is_complete
  ) values (
    v_psid, v_domain_hash, v_methodology, v_status,
    v_sector_id, v_service_category_id, v_province_id, v_kcr,
    v_started_at, v_completed_at,
    jsonb_array_length(v_queries), v_total_tests, v_evaluable + v_non_evaluable,
    v_evaluable, v_pending, v_non_evaluable,
    v_is_complete
  )
  on conflict (public_session_id) do update set
    domain_hash = excluded.domain_hash,
    methodology_version = excluded.methodology_version,
    status = excluded.status,
    sector_id = excluded.sector_id,
    service_category_id = excluded.service_category_id,
    province_id = excluded.province_id,
    known_competitors_registered = excluded.known_competitors_registered,
    started_at = excluded.started_at,
    completed_at = excluded.completed_at,
    total_queries = excluded.total_queries,
    total_tests = excluded.total_tests,
    completed_tests = excluded.completed_tests,
    evaluable_tests = excluded.evaluable_tests,
    pending_tests = excluded.pending_tests,
    non_evaluable_tests = excluded.non_evaluable_tests,
    is_complete = excluded.is_complete
  returning id into v_session_id;

  -- --------------------------------------------------------------------------
  -- 7. Reconciliación de consultas (poda + upsert)
  -- --------------------------------------------------------------------------
  delete from public.ai_visibility_lab_queries q
  where q.session_id = v_session_id
    and not (q.position = any (v_positions));

  for v_q in select q.value from jsonb_array_elements(v_queries) q loop
    insert into public.ai_visibility_lab_queries (session_id, position, query_type, is_custom)
    values (
      v_session_id,
      (v_q->>'position')::smallint,
      v_q->>'query_type',
      (v_q->>'is_custom')::boolean
    )
    on conflict (session_id, position) do update set
      query_type = excluded.query_type,
      is_custom = excluded.is_custom;
  end loop;

  -- --------------------------------------------------------------------------
  -- 8. Reconciliación de resultados (upsert + poda)
  -- --------------------------------------------------------------------------
  for v_r in select r.value from jsonb_array_elements(v_results) r loop
    v_pos := (v_r->>'query_position')::int;
    v_eval := v_r->>'evaluation_status';

    select id into v_query_id
      from public.ai_visibility_lab_queries
      where session_id = v_session_id and position = v_pos;

    select id into v_engine_id
      from public.ai_visibility_lab_engines
      where slug = v_r->>'engine' and is_active;

    insert into public.ai_visibility_lab_results (
      session_id, query_id, engine_id, evaluation_status,
      appearance_level, appeared_as_source, information_accuracy,
      known_competitor_appeared, known_competitors_count,
      other_companies_appeared, recorded_at
    ) values (
      v_session_id, v_query_id, v_engine_id, v_eval,
      case when v_eval = 'pending' then null else v_r->>'appearance_level' end,
      case when v_eval = 'pending' then null else v_r->>'appeared_as_source' end,
      case when v_eval = 'pending' then null else v_r->>'information_accuracy' end,
      case when v_eval = 'pending' then null else v_r->>'known_competitor_appeared' end,
      case when v_eval = 'pending' then null else (v_r->>'known_competitors_count')::smallint end,
      case when v_eval = 'pending' then null else (v_r->>'other_companies_appeared')::boolean end,
      case when v_eval = 'pending' then null else (v_r->>'recorded_at')::timestamptz end
    )
    on conflict (session_id, query_id, engine_id) do update set
      evaluation_status = excluded.evaluation_status,
      appearance_level = excluded.appearance_level,
      appeared_as_source = excluded.appeared_as_source,
      information_accuracy = excluded.information_accuracy,
      known_competitor_appeared = excluded.known_competitor_appeared,
      known_competitors_count = excluded.known_competitors_count,
      other_companies_appeared = excluded.other_companies_appeared,
      recorded_at = excluded.recorded_at
    returning id into v_result_id;

    v_result_ids := v_result_ids || v_result_id;
  end loop;

  delete from public.ai_visibility_lab_results r
  where r.session_id = v_session_id
    and not (r.id = any (v_result_ids));

  return jsonb_build_object(
    'ok', true,
    'created', v_existing is null,
    'status', v_status
  );
end;
$func$;

comment on function public.ai_visibility_lab_submit_snapshot(jsonb) is
  'Laboratorio de visibilidad en IA: ingesta idempotente del snapshot estadístico de una sesión. Única vía de escritura desde la web.';

-- Permisos: solo anon (vía /api/lab-research) y service_role pueden ejecutarla.
revoke all on function public.ai_visibility_lab_submit_snapshot(jsonb) from public, authenticated;
grant execute on function public.ai_visibility_lab_submit_snapshot(jsonb) to anon;
grant execute on function public.ai_visibility_lab_submit_snapshot(jsonb) to service_role;
