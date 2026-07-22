/**
 * Construcción del snapshot estadístico que se envía a la base de
 * investigación (POST /api/lab-research → RPC ai_visibility_lab_submit_snapshot).
 *
 * Este módulo es la frontera entre las dos capas de datos: recibe la sesión
 * local completa y produce ÚNICAMENTE valores normalizados en inglés (listas
 * cerradas), slugs de catálogo, contadores y fechas. Nunca incluye nombre de
 * empresa, dominio en claro, nombres de competidores, textos de consultas,
 * notas, otras empresas ni contenido del informe.
 *
 * Es una función pura y determinista de la sesión: el motor de sincronización
 * usa su serialización como huella para no reenviar snapshots idénticos.
 */

import type {
  AccuracyStatus,
  AppearanceLevel,
  LabSession,
  QueryType,
  SourceStatus,
  TestResult,
} from '../types';
import { RESEARCH_METHODOLOGY_VERSION } from '../config';

/* ─────────── Tipos del payload (contrato con /api/lab-research) ─────────── */

export type ResearchQueryType =
  | 'discovery'
  | 'recommendation'
  | 'specific_need'
  | 'custom';

export interface ResearchQueryPayload {
  position: number;
  query_type: ResearchQueryType;
  is_custom: boolean;
}

export interface ResearchResultPayload {
  query_position: number;
  engine: string;
  evaluation_status: 'evaluable' | 'non_evaluable' | 'pending';
  appearance_level?: 'not_present' | 'mentioned' | 'recommended' | 'unknown';
  appeared_as_source?: 'yes' | 'no' | 'unknown' | 'not_applicable';
  information_accuracy?:
    | 'correct'
    | 'partially_incorrect'
    | 'incorrect'
    | 'insufficient_information'
    | 'unknown'
    | 'not_applicable';
  known_competitor_appeared?: 'yes' | 'no' | 'unknown' | 'not_applicable';
  known_competitors_count?: number;
  other_companies_appeared?: boolean;
  recorded_at?: string;
}

export interface ResearchSnapshotPayload {
  public_session_id: string;
  domain_hash: string;
  methodology_version: string;
  sector: string;
  service_category: string;
  province: string;
  known_competitors_registered: number;
  started_at: string;
  completed_at: string | null;
  queries: ResearchQueryPayload[];
  results: ResearchResultPayload[];
}

/* ─────────── Mapeos de valores locales (ES) → investigación (EN) ─────────── */

const QUERY_TYPE_MAP: Record<QueryType, ResearchQueryType> = {
  descubrimiento: 'discovery',
  recomendacion: 'recommendation',
  necesidad: 'specific_need',
  personalizada: 'custom',
};

const APPEARANCE_MAP: Record<
  Exclude<AppearanceLevel, 'no_evaluable'>,
  'not_present' | 'mentioned' | 'recommended'
> = {
  no_aparece: 'not_present',
  mencionada: 'mentioned',
  recomendada: 'recommended',
};

const SOURCE_MAP: Record<SourceStatus, 'yes' | 'no' | 'unknown'> = {
  si: 'yes',
  no: 'no',
  no_seguro: 'unknown',
};

const ACCURACY_MAP: Record<
  AccuracyStatus,
  'correct' | 'partially_incorrect' | 'incorrect' | 'insufficient_information' | 'unknown'
> = {
  correcta: 'correct',
  parcial: 'partially_incorrect',
  incorrecta: 'incorrect',
  insuficiente: 'insufficient_information',
  no_seguro: 'unknown',
};

/** Posición estable de la consulta a partir de su id (q1…q4 → 1…4). */
function queryPosition(queryId: string, fallbackIndex: number): number {
  const match = /^q(\d+)$/.exec(queryId);
  const parsed = match ? Number(match[1]) : NaN;
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 8
    ? parsed
    : fallbackIndex + 1;
}

/**
 * Presencia de competidores conocidos en una prueba registrada. Solo se envían
 * presencia normalizada y recuento; nunca qué competidor concreto apareció.
 * Se cuentan únicamente nombres que sigan existiendo en la lista actual del
 * negocio (por si el usuario la editó después de registrar la prueba).
 */
function competitorFields(
  result: TestResult,
  registered: readonly string[],
): Pick<
  ResearchResultPayload,
  'known_competitor_appeared' | 'known_competitors_count'
> {
  if (registered.length === 0) {
    return { known_competitor_appeared: 'not_applicable', known_competitors_count: 0 };
  }
  const appearedCount = result.competidoresConocidos.filter((name) =>
    registered.includes(name),
  ).length;
  if (appearedCount > 0) {
    return {
      known_competitor_appeared: 'yes',
      known_competitors_count: Math.min(appearedCount, registered.length),
    };
  }
  if (result.ningunCompetidor) {
    return { known_competitor_appeared: 'no', known_competitors_count: 0 };
  }
  // «No estoy seguro» o ninguna casilla marcada.
  return { known_competitor_appeared: 'unknown', known_competitors_count: 0 };
}

function mapResult(
  result: TestResult,
  position: number,
  registered: readonly string[],
  fallbackRecordedAt: string,
): ResearchResultPayload {
  if (result.status !== 'guardada' || result.aparicion === null) {
    return {
      query_position: position,
      engine: result.engineId,
      evaluation_status: 'pending',
    };
  }

  const recordedAt = result.fechaISO ?? fallbackRecordedAt;
  const base = {
    query_position: position,
    engine: result.engineId,
    ...competitorFields(result, registered),
    other_companies_appeared: result.otrasEmpresasFlag,
    recorded_at: recordedAt,
  };

  if (result.aparicion === 'no_evaluable') {
    return {
      ...base,
      evaluation_status: 'non_evaluable',
      appearance_level: 'unknown',
      appeared_as_source: 'not_applicable',
      information_accuracy: 'not_applicable',
    };
  }

  const appearance = APPEARANCE_MAP[result.aparicion];
  const visible = appearance === 'mentioned' || appearance === 'recommended';
  return {
    ...base,
    evaluation_status: 'evaluable',
    appearance_level: appearance,
    appeared_as_source: visible
      ? SOURCE_MAP[result.fuente ?? 'no_seguro']
      : 'not_applicable',
    information_accuracy: visible
      ? ACCURACY_MAP[result.exactitud ?? 'no_seguro']
      : 'not_applicable',
  };
}

/**
 * Construye el snapshot estadístico de la sesión, o `null` si la sesión no
 * participa en el estudio todavía:
 *  - sin capa research (sesión legacy o negocio sin completar),
 *  - clasificación o hash incompletos (p. ej. Web Crypto no disponible),
 *  - ningún resultado guardado (la sesión remota solo se crea con el primer
 *    resultado real; ni visitas ni «Empezar» generan registros).
 */
export function buildResearchSnapshot(
  session: LabSession,
): ResearchSnapshotPayload | null {
  const research = session.research;
  if (!research) return null;
  if (
    !research.publicSessionId ||
    !research.domainHash ||
    !research.sectorSlug ||
    !research.serviceCategorySlug ||
    !research.provinceSlug
  ) {
    return null;
  }

  const hasRecordedResult = session.results.some((r) => r.status === 'guardada');
  if (!hasRecordedResult) return null;

  const registered = session.business.competidores;

  const queries: ResearchQueryPayload[] = session.queries.map((query, index) => ({
    position: queryPosition(query.id, index),
    query_type: QUERY_TYPE_MAP[query.tipo],
    is_custom: query.tipo === 'personalizada',
  }));

  const positionByQueryId = new Map(
    session.queries.map((query, index) => [query.id, queryPosition(query.id, index)]),
  );

  const results: ResearchResultPayload[] = session.results.map((result) =>
    mapResult(
      result,
      positionByQueryId.get(result.queryId) ?? 1,
      registered,
      session.updatedISO,
    ),
  );

  return {
    public_session_id: research.publicSessionId,
    domain_hash: research.domainHash,
    methodology_version: RESEARCH_METHODOLOGY_VERSION,
    sector: research.sectorSlug,
    service_category: research.serviceCategorySlug,
    province: research.provinceSlug,
    known_competitors_registered: Math.min(registered.length, 10),
    started_at: session.createdISO,
    completed_at: research.completedAtISO,
    queries,
    results,
  };
}

/**
 * Huella determinista del snapshot: el motor de sincronización la usa para
 * evitar reenvíos idénticos y para detectar cambios pendientes.
 */
export function snapshotFingerprint(payload: ResearchSnapshotPayload): string {
  return JSON.stringify(payload);
}
