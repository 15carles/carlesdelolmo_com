/**
 * POST /api/lab-research
 *
 * Endpoint de servidor para la contribución estadística del Laboratorio de
 * visibilidad en IA. Recibe el snapshot estadístico completo de una sesión y
 * lo reenvía a la función RPC `ai_visibility_lab_submit_snapshot` de Supabase
 * (las tablas deniegan todo acceso directo; ver next_app/supabase/migrations).
 *
 * Centraliza, igual que /api/contact:
 *   - Validación de entrada (espejo de la validación de la RPC, que revalida
 *     todo en servidor; los slugs de catálogo los verifica la base de datos).
 *   - Rate limiting best-effort en memoria por IP.
 *   - La clave publishable de Supabase no viaja en el bundle del navegador.
 *
 * Principios de privacidad (docs/lab-investigacion-phase0-plan.md):
 *   - El payload solo admite valores de listas cerradas, slugs, contadores y
 *     fechas: NUNCA texto libre. Cualquier campo no previsto se descarta al
 *     reconstruir el payload saneado.
 *   - El dominio nunca llega aquí: el cliente envía únicamente su hash SHA-256.
 *   - No se registra la IP como dato de investigación (solo se usa en memoria
 *     para el rate limit).
 *
 * Rate limiting en memoria: se reinicia en cold starts y no comparte estado
 * entre regiones/isolates. Solo frena inundaciones triviales; para mitigación
 * real, configurar una regla de rate-limit del WAF de Cloudflare sobre
 * `/api/lab-research` (igual que está documentado para /api/contact).
 */

import { NextRequest, NextResponse } from 'next/server';

// Variables públicas leídas en servidor (mismo patrón y fallback que
// /api/contact; retirar el fallback cuando se roten las claves).
const SUPABASE_URL =
  process.env.SUPABASE_URL ?? 'https://gzrgxkjvxaflteilmjuq.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  'sb_publishable_-rNRG-bfifNaR--8DkvKvA_xXLh4eil';

const RPC_URL = `${SUPABASE_URL}/rest/v1/rpc/ai_visibility_lab_submit_snapshot`;

// Un snapshot completo (8 consultas × 3 motores) ocupa ~6 KB; 32 KB deja
// margen sin permitir cuerpos arbitrariamente grandes.
const MAX_BODY_BYTES = 32 * 1024;

// Listas cerradas espejo de la RPC y de los CHECK de las tablas.
const QUERY_TYPES = new Set(['discovery', 'recommendation', 'specific_need', 'custom']);
const EVALUATION_STATUSES = new Set(['evaluable', 'non_evaluable', 'pending']);
const APPEARANCE_LEVELS = new Set(['not_present', 'mentioned', 'recommended', 'unknown']);
const SOURCE_VALUES = new Set(['yes', 'no', 'unknown', 'not_applicable']);
const ACCURACY_VALUES = new Set([
  'correct',
  'partially_incorrect',
  'incorrect',
  'insufficient_information',
  'unknown',
  'not_applicable',
]);
const COMPETITOR_VALUES = new Set(['yes', 'no', 'unknown', 'not_applicable']);

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DOMAIN_HASH_REGEX = /^[0-9a-f]{64}$/;
const METHODOLOGY_REGEX = /^[a-z0-9][a-z0-9.-]{0,39}$/;
const SLUG_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const LIMITS = {
  queriesMax: 8,
  resultsMax: 64,
  competitorsMax: 10,
  slugMax: 60,
  isoDateMax: 40,
} as const;

// Rango temporal admitido (la RPC lo revalida con el reloj del servidor SQL).
const MIN_DATE_MS = Date.parse('2026-01-01T00:00:00Z');
const CLOCK_SKEW_MS = 60 * 60 * 1000; // 1 hora

// ---------------------------------------------------------------------------
// Rate limiter en memoria (best-effort; ver nota de cabecera).
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hora
// Un análisis completo genera ~15-25 snapshots (uno por guardado + reintentos).
const RATE_LIMIT_MAX_REQUESTS = 120; // por IP y ventana

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

// ---------------------------------------------------------------------------
// Validación (espejo de la RPC). Reconstruye un payload saneado con
// únicamente los campos permitidos: todo lo demás se descarta.
// ---------------------------------------------------------------------------

interface ResearchQuery {
  position: number;
  query_type: string;
  is_custom: boolean;
}

interface ResearchResult {
  query_position: number;
  engine: string;
  evaluation_status: string;
  appearance_level?: string;
  appeared_as_source?: string;
  information_accuracy?: string;
  known_competitor_appeared?: string;
  known_competitors_count?: number;
  other_companies_appeared?: boolean;
  recorded_at?: string;
}

interface ResearchPayload {
  public_session_id: string;
  domain_hash: string;
  methodology_version: string;
  sector: string;
  service_category: string;
  province: string;
  known_competitors_registered: number;
  started_at: string;
  completed_at: string | null;
  queries: ResearchQuery[];
  results: ResearchResult[];
}

type Validation =
  | { ok: true; payload: ResearchPayload }
  | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asSlug(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  if (value.length < 2 || value.length > LIMITS.slugMax) return null;
  if (!SLUG_REGEX.test(value)) return null;
  return value;
}

function asIsoDate(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > LIMITS.isoDateMax) return null;
  const ms = Date.parse(value);
  if (Number.isNaN(ms)) return null;
  if (ms < MIN_DATE_MS || ms > Date.now() + CLOCK_SKEW_MS) return null;
  return value;
}

function validate(body: unknown): Validation {
  if (!isRecord(body)) return { ok: false, error: 'payload inválido' };

  const publicSessionId = body.public_session_id;
  if (typeof publicSessionId !== 'string' || !UUID_REGEX.test(publicSessionId)) {
    return { ok: false, error: 'public_session_id inválido' };
  }

  const domainHash = body.domain_hash;
  if (typeof domainHash !== 'string' || !DOMAIN_HASH_REGEX.test(domainHash)) {
    return { ok: false, error: 'domain_hash inválido' };
  }

  const methodologyVersion = body.methodology_version;
  if (
    typeof methodologyVersion !== 'string' ||
    !METHODOLOGY_REGEX.test(methodologyVersion)
  ) {
    return { ok: false, error: 'methodology_version inválida' };
  }

  const sector = asSlug(body.sector);
  const serviceCategory = asSlug(body.service_category);
  const province = asSlug(body.province);
  if (!sector) return { ok: false, error: 'sector inválido' };
  if (!serviceCategory) return { ok: false, error: 'service_category inválida' };
  if (!province) return { ok: false, error: 'province inválida' };

  const kcr = body.known_competitors_registered;
  if (
    typeof kcr !== 'number' ||
    !Number.isInteger(kcr) ||
    kcr < 0 ||
    kcr > LIMITS.competitorsMax
  ) {
    return { ok: false, error: 'known_competitors_registered inválido' };
  }

  const startedAt = asIsoDate(body.started_at);
  if (!startedAt) return { ok: false, error: 'started_at inválido' };

  let completedAt: string | null = null;
  if (body.completed_at !== undefined && body.completed_at !== null) {
    completedAt = asIsoDate(body.completed_at);
    if (!completedAt || Date.parse(completedAt) < Date.parse(startedAt)) {
      return { ok: false, error: 'completed_at inválido' };
    }
  }

  // Consultas
  const rawQueries = body.queries;
  if (
    !Array.isArray(rawQueries) ||
    rawQueries.length < 1 ||
    rawQueries.length > LIMITS.queriesMax
  ) {
    return { ok: false, error: 'queries inválidas' };
  }
  const positions = new Set<number>();
  const queries: ResearchQuery[] = [];
  for (const rawQuery of rawQueries) {
    if (!isRecord(rawQuery)) return { ok: false, error: 'query inválida' };
    const position = rawQuery.position;
    if (
      typeof position !== 'number' ||
      !Number.isInteger(position) ||
      position < 1 ||
      position > LIMITS.queriesMax
    ) {
      return { ok: false, error: 'posición de query inválida' };
    }
    if (positions.has(position)) {
      return { ok: false, error: 'posición de query duplicada' };
    }
    const queryType = rawQuery.query_type;
    if (typeof queryType !== 'string' || !QUERY_TYPES.has(queryType)) {
      return { ok: false, error: 'query_type inválido' };
    }
    const isCustom = rawQuery.is_custom;
    if (typeof isCustom !== 'boolean' || isCustom !== (queryType === 'custom')) {
      return { ok: false, error: 'is_custom inválido' };
    }
    positions.add(position);
    queries.push({ position, query_type: queryType, is_custom: isCustom });
  }

  // Resultados
  const rawResults = body.results;
  if (
    !Array.isArray(rawResults) ||
    rawResults.length < 1 ||
    rawResults.length > LIMITS.resultsMax
  ) {
    return { ok: false, error: 'results inválidos' };
  }
  const pairs = new Set<string>();
  const results: ResearchResult[] = [];
  for (const rawResult of rawResults) {
    if (!isRecord(rawResult)) return { ok: false, error: 'result inválido' };

    const queryPosition = rawResult.query_position;
    if (
      typeof queryPosition !== 'number' ||
      !Number.isInteger(queryPosition) ||
      !positions.has(queryPosition)
    ) {
      return { ok: false, error: 'query_position inválida' };
    }
    const engine = asSlug(rawResult.engine);
    if (!engine) return { ok: false, error: 'engine inválido' };

    const pair = `${queryPosition}:${engine}`;
    if (pairs.has(pair)) return { ok: false, error: 'result duplicado' };
    pairs.add(pair);

    const evaluationStatus = rawResult.evaluation_status;
    if (
      typeof evaluationStatus !== 'string' ||
      !EVALUATION_STATUSES.has(evaluationStatus)
    ) {
      return { ok: false, error: 'evaluation_status inválido' };
    }

    if (evaluationStatus === 'pending') {
      results.push({
        query_position: queryPosition,
        engine,
        evaluation_status: 'pending',
      });
      continue;
    }

    // Prueba registrada: todos los campos son obligatorios y coherentes.
    const appearance = rawResult.appearance_level;
    const source = rawResult.appeared_as_source;
    const accuracy = rawResult.information_accuracy;
    const competitor = rawResult.known_competitor_appeared;
    const competitorCount = rawResult.known_competitors_count;
    const otherCompanies = rawResult.other_companies_appeared;

    if (typeof appearance !== 'string' || !APPEARANCE_LEVELS.has(appearance)) {
      return { ok: false, error: 'appearance_level inválido' };
    }
    if (typeof source !== 'string' || !SOURCE_VALUES.has(source)) {
      return { ok: false, error: 'appeared_as_source inválido' };
    }
    if (typeof accuracy !== 'string' || !ACCURACY_VALUES.has(accuracy)) {
      return { ok: false, error: 'information_accuracy inválida' };
    }
    if (evaluationStatus === 'evaluable' && appearance === 'unknown') {
      return { ok: false, error: 'appearance_level inválido' };
    }
    if (
      evaluationStatus === 'non_evaluable' &&
      (appearance !== 'unknown' || source !== 'not_applicable' || accuracy !== 'not_applicable')
    ) {
      return { ok: false, error: 'resultado no evaluable incoherente' };
    }
    if (
      appearance === 'not_present' &&
      (source !== 'not_applicable' || accuracy !== 'not_applicable')
    ) {
      return { ok: false, error: 'resultado sin aparición incoherente' };
    }
    if (appearance === 'mentioned' || appearance === 'recommended') {
      if (source === 'not_applicable' || accuracy === 'not_applicable') {
        return { ok: false, error: 'resultado con aparición incoherente' };
      }
    }

    if (typeof competitor !== 'string' || !COMPETITOR_VALUES.has(competitor)) {
      return { ok: false, error: 'known_competitor_appeared inválido' };
    }
    if (
      typeof competitorCount !== 'number' ||
      !Number.isInteger(competitorCount) ||
      competitorCount < 0 ||
      competitorCount > LIMITS.competitorsMax
    ) {
      return { ok: false, error: 'known_competitors_count inválido' };
    }
    if (competitor === 'yes' && (competitorCount < 1 || competitorCount > kcr)) {
      return { ok: false, error: 'known_competitors_count incoherente' };
    }
    if (competitor !== 'yes' && competitorCount !== 0) {
      return { ok: false, error: 'known_competitors_count incoherente' };
    }
    if (kcr === 0 && competitor !== 'not_applicable') {
      return { ok: false, error: 'known_competitor_appeared incoherente' };
    }
    if (typeof otherCompanies !== 'boolean') {
      return { ok: false, error: 'other_companies_appeared inválido' };
    }
    const recordedAt = asIsoDate(rawResult.recorded_at);
    if (!recordedAt) return { ok: false, error: 'recorded_at inválido' };

    results.push({
      query_position: queryPosition,
      engine,
      evaluation_status: evaluationStatus,
      appearance_level: appearance,
      appeared_as_source: source,
      information_accuracy: accuracy,
      known_competitor_appeared: competitor,
      known_competitors_count: competitorCount,
      other_companies_appeared: otherCompanies,
      recorded_at: recordedAt,
    });
  }

  return {
    ok: true,
    payload: {
      public_session_id: publicSessionId,
      domain_hash: domainHash,
      methodology_version: methodologyVersion,
      sector,
      service_category: serviceCategory,
      province,
      known_competitors_registered: kcr,
      started_at: startedAt,
      completed_at: completedAt,
      queries,
      results,
    },
  };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export const runtime = 'edge';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'payload demasiado grande' }, { status: 413 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'demasiadas solicitudes, prueba más tarde' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const supabaseResponse = await fetch(RPC_URL, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ payload: result.payload }),
  });

  if (!supabaseResponse.ok) {
    // La RPC rechaza payloads incoherentes con 400 (p. ej. slug de catálogo
    // inexistente). No filtramos detalles internos de Supabase al cliente.
    const detail = await supabaseResponse.text().catch(() => '');
    console.error('[api/lab-research] Supabase RPC failed', {
      status: supabaseResponse.status,
      detail,
    });
    const status = supabaseResponse.status === 400 ? 400 : 502;
    return NextResponse.json(
      { error: 'no se pudo registrar la contribución' },
      { status }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
