/**
 * Modelo de datos del Laboratorio de visibilidad en IA.
 *
 * Toda la información vive exclusivamente en el navegador del usuario
 * (localStorage). Ningún dato de este modelo se envía al servidor ni a
 * analítica de forma automática (ver spec §15 y §16).
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
}
