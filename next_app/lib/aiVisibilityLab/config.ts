/**
 * Configuración centralizada del Laboratorio de visibilidad en IA (spec §21).
 *
 * Todo lo que puede cambiar en el futuro (motores, enlaces, plantillas de
 * consulta, opciones de resultado, versión metodológica, textos de limitación
 * y nombres de eventos de analítica) vive aquí para no quedar duplicado en los
 * componentes. Añadir o retirar motores o actualizar la metodología debe poder
 * hacerse editando únicamente este archivo.
 */

import type {
  AppearanceLevel,
  SourceStatus,
  AccuracyStatus,
  QueryType,
} from './types';

/** Versión de la metodología mostrada en el informe (§10). */
export const METHODOLOGY_VERSION = 'Laboratorio MVP 1.0';

/** Ruta pública de la herramienta. */
export const LAB_PATH = '/laboratorio-visibilidad-ia';

/** Clave de almacenamiento local de la sesión (§15). */
export const LAB_STORAGE_KEY = 'ai_visibility_lab_session_v1';

/** Clave de sessionStorage usada para prellenar el formulario de contacto. */
export const LAB_CONTACT_PREFILL_KEY = 'ai_visibility_lab_contact_prefill';

/** Límites de longitud de campos (§6, §7, §9). */
export const LIMITS = {
  nombreMin: 2,
  nombreMax: 100,
  servicioMin: 3,
  servicioMax: 100,
  ubicacionMin: 2,
  ubicacionMax: 100,
  tipoClienteMin: 3,
  tipoClienteMax: 120,
  necesidadMin: 5,
  necesidadMax: 180,
  competidorMin: 2,
  competidorMax: 100,
  competidoresMax: 3,
  queryMax: 300,
  otrasEmpresasMax: 300,
  notasMax: 500,
} as const;

/** Motores de IA incluidos en el MVP (§9). Fijos pero fáciles de ampliar. */
export interface EngineConfig {
  id: string;
  name: string;
  url: string;
}

export const ENGINES: readonly EngineConfig[] = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/' },
  { id: 'gemini', name: 'Google Gemini', url: 'https://gemini.google.com/app' },
  { id: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai/' },
] as const;

/** Etiquetas legibles por tipo de consulta. */
export const QUERY_TYPE_LABELS: Record<QueryType, string> = {
  descubrimiento: 'Descubrimiento',
  recomendacion: 'Recomendación',
  necesidad: 'Necesidad concreta',
  personalizada: 'Personalizada',
};

/**
 * Plantillas deterministas de consulta (§7). Los marcadores se sustituyen con
 * los datos del negocio. No interviene ninguna IA en su generación.
 */
export interface QueryTemplate {
  id: string;
  tipo: QueryType;
  build: (b: {
    servicio: string;
    ubicacion: string;
    necesidad: string;
    tipoCliente: string;
  }) => string;
}

export const QUERY_TEMPLATES: readonly QueryTemplate[] = [
  {
    id: 'q1',
    tipo: 'descubrimiento',
    build: ({ servicio, ubicacion }) =>
      `¿Qué empresas o profesionales ofrecen ${servicio} en ${ubicacion}?`,
  },
  {
    id: 'q2',
    tipo: 'recomendacion',
    build: ({ servicio, ubicacion }) =>
      `¿Qué empresa o profesional recomendarías para contratar ${servicio} en ${ubicacion}?`,
  },
  {
    id: 'q3',
    tipo: 'necesidad',
    build: ({ necesidad, tipoCliente, ubicacion }) =>
      `Necesito ${necesidad} para ${tipoCliente} en ${ubicacion}. ¿Qué opciones me recomendarías y por qué?`,
  },
] as const;

export const CUSTOM_QUERY_ID = 'q4';

/** Opciones de aparición de la empresa (§9.1). */
export const APPEARANCE_OPTIONS: ReadonlyArray<{
  value: AppearanceLevel;
  label: string;
  hint?: string;
}> = [
  { value: 'no_aparece', label: 'No aparece' },
  { value: 'mencionada', label: 'Aparece mencionada entre varias opciones' },
  { value: 'recomendada', label: 'Aparece destacada o recomendada' },
  {
    value: 'no_evaluable',
    label: 'La respuesta no permite evaluarlo',
    hint: 'Úsalo cuando el motor no responde, la respuesta es demasiado ambigua, no recomienda empresas concretas, se produce un error o la respuesta no está relacionada con la consulta. Las pruebas no evaluables no cuentan en los porcentajes principales.',
  },
];

/** Opciones de web como fuente o enlace (§9.2). */
export const SOURCE_OPTIONS: ReadonlyArray<{
  value: SourceStatus;
  label: string;
}> = [
  { value: 'si', label: 'Sí' },
  { value: 'no', label: 'No' },
  { value: 'no_seguro', label: 'No estoy seguro' },
];

/** Opciones de exactitud de la información (§9.3). */
export const ACCURACY_OPTIONS: ReadonlyArray<{
  value: AccuracyStatus;
  label: string;
}> = [
  { value: 'correcta', label: 'Sí, es correcta' },
  { value: 'parcial', label: 'Es parcialmente incorrecta' },
  { value: 'incorrecta', label: 'Es claramente incorrecta' },
  { value: 'insuficiente', label: 'No se proporciona información suficiente' },
  { value: 'no_seguro', label: 'No estoy seguro' },
];

/** Etiquetas cortas para la tabla del informe. */
export const APPEARANCE_SHORT: Record<AppearanceLevel, string> = {
  no_aparece: 'No aparece',
  mencionada: 'Mencionada',
  recomendada: 'Recomendada',
  no_evaluable: 'No evaluable',
};

export const SOURCE_SHORT: Record<SourceStatus, string> = {
  si: 'Sí',
  no: 'No',
  no_seguro: 'No seguro',
};

export const ACCURACY_SHORT: Record<AccuracyStatus, string> = {
  correcta: 'Correcta',
  parcial: 'Parcialmente incorrecta',
  incorrecta: 'Incorrecta',
  insuficiente: 'Información insuficiente',
  no_seguro: 'No seguro',
};

/** Textos de limitación reutilizables (§3, §5, §8, §13). */
export const LIMITATION_TEXTS = {
  initialMethodology:
    'Este laboratorio no garantiza ni certifica la visibilidad general de una empresa. Los resultados representan una muestra obtenida con unas consultas, motores, cuentas y fechas concretas.',
  privacyNotice:
    'Los datos del análisis se guardan únicamente en este dispositivo mientras no decidas enviarnos una solicitud. No introduzcas información confidencial.',
  variabilityNotice:
    'Las respuestas pueden variar según la fecha, la ubicación, el historial, la cuenta, el modelo utilizado y otros factores propios de cada plataforma.',
  reportConclusion:
    'Este informe representa una muestra de visibilidad generativa obtenida con consultas y condiciones concretas. No certifica cómo aparecerá la empresa en todas las respuestas ni permite atribuir automáticamente las causas. Su utilidad consiste en detectar patrones: ausencia, reconocimiento, recomendación, citación, exactitud y ventaja competitiva. Estos patrones permiten decidir qué aspectos merece la pena analizar con mayor profundidad.',
} as const;

/** Nombres de eventos de analítica (§16). Solo se envían con consentimiento. */
export const ANALYTICS_EVENTS = {
  view: 'ai_lab_view',
  start: 'ai_lab_start',
  businessCompleted: 'ai_lab_business_completed',
  queriesGenerated: 'ai_lab_queries_generated',
  queryCopied: 'ai_lab_query_copied',
  engineOpened: 'ai_lab_engine_opened',
  testSaved: 'ai_lab_test_saved',
  partialResults: 'ai_lab_partial_results',
  completed: 'ai_lab_completed',
  reportPrinted: 'ai_lab_report_printed',
  contactClicked: 'ai_lab_contact_clicked',
  reset: 'ai_lab_reset',
} as const;

/** Servicios preseleccionados en el formulario de contacto desde el CTA (§14). */
export const CONTACT_PRESELECTED_SERVICES = ['Auditoría', 'SEO/GEO'] as const;

/** Enlace al artículo relacionado sobre por qué las webs no aparecen en IA (§14). */
export const RELATED_ARTICLE_HREF = '/blog/por-que-webs-no-aparecen-respuestas-ia';
