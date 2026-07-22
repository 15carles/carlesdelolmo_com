/**
 * Modelo de datos del Laboratorio de visibilidad en IA.
 *
 * Existen dos capas separadas (docs/lab-investigacion-phase0-plan.md):
 *
 *  - Capa privada: todo el contenido de `Business`, consultas completas,
 *    notas, otras empresas y el informe viven exclusivamente en el navegador
 *    (localStorage) y NUNCA se envían a ningún servidor.
 *  - Capa de investigación: un subconjunto estrictamente estadístico y
 *    seudonimizado (`ResearchInfo` + el mapeo de research/snapshot.ts) se
 *    sincroniza con la base de investigación de Supabase, tal y como se
 *    explica al usuario antes de empezar.
 *
 * A analítica (GA4) no se envía ningún dato identificativo ni de investigación
 * (ver analytics.ts).
 */

export type QueryType =
  | 'descubrimiento'
  | 'recomendacion'
  | 'necesidad'
  | 'personalizada';

/** Nivel de aparición de la empresa en una respuesta registrada (§9.1). */
export type AppearanceLevel =
  | 'no_aparece'
  | 'mencionada'
  | 'recomendada'
  | 'no_evaluable';

/** ¿La web aparece como fuente o enlace? (§9.2). */
export type SourceStatus = 'si' | 'no' | 'no_seguro';

/** Exactitud de la información mostrada sobre la empresa (§9.3). */
export type AccuracyStatus =
  | 'correcta'
  | 'parcial'
  | 'incorrecta'
  | 'insuficiente'
  | 'no_seguro';

/** Estado de una prueba individual dentro del trabajo de campo. */
export type TestStatus = 'pendiente' | 'guardada';

/** Datos del negocio (§6, §20). */
export interface Business {
  nombre: string;
  /** Dominio normalizado (https://…). */
  dominio: string;
  servicio: string;
  ubicacion: string;
  tipoCliente: string;
  necesidad: string;
  /** 0-3 competidores conocidos. */
  competidores: string[];
}

/** Consulta de prueba (§7, §20). */
export interface LabQuery {
  id: string;
  tipo: QueryType;
  /** Texto original generado por plantilla (vacío en la personalizada). */
  original: string;
  /** Texto actual (editado por el usuario o igual al original). */
  texto: string;
  personalizada: boolean;
}

/** Resultado registrado para una combinación consulta × motor (§9, §20). */
export interface TestResult {
  id: string;
  queryId: string;
  engineId: string;
  status: TestStatus;
  /** Fecha y hora del guardado (ISO). */
  fechaISO: string | null;
  aparicion: AppearanceLevel | null;
  fuente: SourceStatus | null;
  exactitud: AccuracyStatus | null;
  /** Nombres de competidores conocidos detectados. */
  competidoresConocidos: string[];
  /** «Aparecen otras empresas» (competidores no listados). */
  otrasEmpresasFlag: boolean;
  /** «No aparece ningún competidor conocido». */
  ningunCompetidor: boolean;
  /** «No estoy seguro» respecto a competidores. */
  competidorNoSeguro: boolean;
  /** Texto libre con otras empresas mencionadas. */
  otrasEmpresas: string;
  notas: string;
}

/**
 * Clasificación para el estudio y estado de sincronización con la base de
 * investigación. Solo contiene datos que pueden viajar a Supabase (slugs de
 * catálogo y el hash irreversible del dominio) más los marcadores locales de
 * sincronización. Ausente en sesiones creadas antes de esta funcionalidad
 * (legacy), que no sincronizan.
 */
export interface ResearchInfo {
  /** Identificador de sincronización (UUID aleatorio, sin información personal). */
  publicSessionId: string;
  /** SHA-256 del hostname normalizado (ver research/hash.ts). Vacío = sin sync. */
  domainHash: string;
  sectorSlug: string;
  serviceCategorySlug: string;
  provinceSlug: string;
  /** Primera vez que el análisis quedó completo (ISO), o null. */
  completedAtISO: string | null;
  /** La sesión remota ya existe (algún envío fue confirmado). */
  remoteCreated: boolean;
  /** Hay un snapshot pendiente de enviar (último intento fallido). */
  pendingSync: boolean;
  /** Último envío confirmado (ISO), o null. */
  lastSyncedISO: string | null;
}

/** Sesión completa del laboratorio (§20). */
export interface LabSession {
  localId: string;
  version: string;
  createdISO: string;
  updatedISO: string;
  /** Etapa actual (1-5). */
  stage: number;
  business: Business;
  queries: LabQuery[];
  results: TestResult[];
  /** Índice de la prueba activa dentro de la etapa 4. */
  currentTestIndex: number;
  /** Si el usuario ya vio la pantalla de instrucciones del trabajo de campo. */
  fieldworkIntroSeen: boolean;
  /**
   * Capa de investigación (opcional: las sesiones legacy no la tienen y las
   * nuevas la reciben al completar los datos del negocio).
   */
  research?: ResearchInfo | null;
}
