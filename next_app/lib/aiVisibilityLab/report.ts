/**
 * Cálculo del informe (spec §10-§13).
 *
 * Solo se calcula a partir de las respuestas registradas manualmente por el
 * usuario. No se inventa ninguna puntuación de 0 a 100 y el diagnóstico describe
 * lo observado mediante reglas transparentes, sin afirmar causas.
 */

import type { LabSession, TestResult, AppearanceLevel } from './types';

export interface CompetitorFrequency {
  name: string;
  count: number;
}

export interface ReportMetrics {
  total: number;
  evaluables: number;
  pendientes: number;
  noEvaluables: number;
  /** Menciones + recomendaciones (presencia). */
  presencia: number;
  soloMenciones: number;
  recomendaciones: number;
  citaciones: number;
  exactitud: {
    correcta: number;
    parcial: number;
    incorrecta: number;
    insuficiente: number;
    noSeguro: number;
  };
  competencia: {
    conCompetidor: number;
    competidorSinEmpresa: number;
    porCompetidor: CompetitorFrequency[];
  };
}

export interface Diagnosis {
  id: string;
  title: string;
  message: string;
  areas: string[];
  /** Marca de prioridad de presentación (exactitud tiene prioridad, §11). */
  priority: boolean;
}

export interface PriorityItem {
  id: string;
  title: string;
  observed: string;
  matters: string;
  review: string;
}

export interface ReportData {
  metrics: ReportMetrics;
  diagnoses: Diagnosis[];
  priorities: PriorityItem[];
  /** Hay al menos 3 pruebas evaluables para generar comparación (§9). */
  hasEnough: boolean;
  /** La muestra es parcial (pruebas pendientes o no evaluables). */
  isPartial: boolean;
  /** Texto del CTA principal adaptado al resultado (§14). */
  ctaLabel: string;
}

const APPEARS: AppearanceLevel[] = ['mencionada', 'recomendada'];

function isSaved(r: TestResult): boolean {
  return r.status === 'guardada';
}

function isEvaluable(r: TestResult): boolean {
  return (
    isSaved(r) &&
    r.aparicion !== null &&
    r.aparicion !== 'no_evaluable'
  );
}

function competitorPresent(r: TestResult): boolean {
  return r.competidoresConocidos.length > 0 || r.otrasEmpresasFlag;
}

export function computeMetrics(session: LabSession): ReportMetrics {
  const { results, business } = session;
  const total = results.length;
  const evaluableTests = results.filter(isEvaluable);
  const evaluables = evaluableTests.length;
  const pendientes = results.filter((r) => r.status === 'pendiente').length;
  const noEvaluables = results.filter(
    (r) => isSaved(r) && r.aparicion === 'no_evaluable',
  ).length;

  const presencia = evaluableTests.filter((r) =>
    APPEARS.includes(r.aparicion as AppearanceLevel),
  ).length;
  const recomendaciones = evaluableTests.filter(
    (r) => r.aparicion === 'recomendada',
  ).length;
  const soloMenciones = evaluableTests.filter(
    (r) => r.aparicion === 'mencionada',
  ).length;

  const appearingTests = evaluableTests.filter((r) =>
    APPEARS.includes(r.aparicion as AppearanceLevel),
  );

  const citaciones = appearingTests.filter((r) => r.fuente === 'si').length;

  const exactitud = {
    correcta: appearingTests.filter((r) => r.exactitud === 'correcta').length,
    parcial: appearingTests.filter((r) => r.exactitud === 'parcial').length,
    incorrecta: appearingTests.filter((r) => r.exactitud === 'incorrecta')
      .length,
    insuficiente: appearingTests.filter((r) => r.exactitud === 'insuficiente')
      .length,
    noSeguro: appearingTests.filter((r) => r.exactitud === 'no_seguro').length,
  };

  const conCompetidor = evaluableTests.filter(competitorPresent).length;
  const competidorSinEmpresa = evaluableTests.filter(
    (r) => competitorPresent(r) && r.aparicion === 'no_aparece',
  ).length;

  const porCompetidor: CompetitorFrequency[] = business.competidores
    .map((name) => ({
      name,
      count: evaluableTests.filter((r) =>
        r.competidoresConocidos.includes(name),
      ).length,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    total,
    evaluables,
    pendientes,
    noEvaluables,
    presencia,
    soloMenciones,
    recomendaciones,
    citaciones,
    exactitud,
    competencia: { conCompetidor, competidorSinEmpresa, porCompetidor },
  };
}

/** Umbral de «al menos dos tercios» de las pruebas evaluables (§11 caso 6). */
function recurrentThreshold(evaluables: number): number {
  return Math.ceil((2 / 3) * evaluables);
}

export function computeDiagnoses(m: ReportMetrics): Diagnosis[] {
  const diagnoses: Diagnosis[] = [];
  const hasInaccurate = m.exactitud.parcial + m.exactitud.incorrecta > 0;

  // Caso 5: información incorrecta (prioridad sobre el resto).
  if (hasInaccurate) {
    diagnoses.push({
      id: 'exactitud',
      priority: true,
      title: 'Se han detectado menciones con información incorrecta',
      message:
        'Se han detectado menciones con información incorrecta o incompleta. Este problema puede afectar a la confianza del usuario incluso cuando la empresa consigue aparecer.',
      areas: [
        'Consistencia del nombre comercial',
        'Servicios descritos en la web',
        'Ubicación y áreas de trabajo',
        'Datos publicados en perfiles y directorios',
        'Información antigua o contradictoria',
        'Relación entre la empresa y su dominio oficial',
      ],
    });
  }

  // Caso 1: ninguna aparición.
  if (m.evaluables > 0 && m.presencia === 0) {
    diagnoses.push({
      id: 'sin-presencia',
      priority: false,
      title: 'No se ha detectado presencia de tu empresa',
      message:
        'No se ha detectado presencia de tu empresa en la muestra analizada. Esto no demuestra que nunca aparezca en estos motores, pero sí indica que no fue recuperada ante las consultas y condiciones utilizadas.',
      areas: [
        'Claridad con la que la web identifica la empresa, los servicios y la ubicación',
        'Existencia de páginas específicas para el servicio analizado',
        'Contenido que responda preguntas de descubrimiento y recomendación',
        'Casos, experiencia y señales de autoridad',
        'Menciones y validaciones en fuentes externas',
      ],
    });
  }

  // Caso 2: aparece, pero no es recomendada.
  if (m.presencia > 0 && m.recomendaciones === 0) {
    diagnoses.push({
      id: 'sin-recomendacion',
      priority: false,
      title: 'Apareces, pero no como opción destacada',
      message:
        'Los motores analizados reconocen tu empresa en algunas respuestas, pero no la han seleccionado de forma destacada. Existe una diferencia entre ser conocida por un sistema y ser elegida como una opción relevante.',
      areas: [
        'Diferenciación frente a otras empresas',
        'Evidencias de especialización',
        'Casos de estudio y resultados',
        'Cobertura de necesidades concretas del cliente',
        'Autoridad externa',
      ],
    });
  }

  // Caso 3: es recomendada, pero su web no se cita.
  if (m.recomendaciones > 0 && m.citaciones === 0) {
    diagnoses.push({
      id: 'sin-citacion',
      priority: false,
      title: 'Te recomiendan, pero no citan tu web',
      message:
        'Tu empresa ha sido recomendada, pero su web no ha aparecido como fuente directa en las pruebas registradas. La recomendación puede estar apoyándose en información procedente de terceros, directorios u otras fuentes.',
      areas: [
        'Contenido original y suficientemente específico en el dominio',
        'Páginas que documenten servicios, experiencia y proyectos',
        'Facilidad para relacionar la entidad con su sitio oficial',
        'Coherencia entre la web y otras fuentes públicas',
      ],
    });
  }

  // Caso 4: los competidores aparecen con mayor frecuencia.
  if (m.competencia.competidorSinEmpresa >= 2) {
    diagnoses.push({
      id: 'competencia',
      priority: false,
      title: 'Los competidores aparecen donde tú no',
      message:
        'Se ha detectado una ventaja competitiva en la muestra: otras empresas aparecen ante consultas en las que tu negocio no ha sido mencionado.',
      areas: [
        'Qué servicios documentan esos competidores',
        'Qué contenidos responden a esas consultas',
        'Qué fuentes externas los mencionan',
        'Qué señales de especialización y confianza presentan',
        'Qué diferencias existen en la claridad de su posicionamiento',
      ],
    });
  }

  // Caso 6: presencia recurrente.
  if (m.evaluables > 0 && m.presencia >= recurrentThreshold(m.evaluables)) {
    diagnoses.push({
      id: 'presencia-recurrente',
      priority: false,
      title: 'Presencia recurrente en la muestra',
      message:
        'Tu empresa presenta una presencia recurrente dentro de la muestra. El siguiente paso no es dar la visibilidad por garantizada, sino comprobar en qué consultas, motores y fuentes se sostiene.',
      areas: [
        'Ampliar la variedad de consultas',
        'Revisar la calidad y exactitud de las menciones',
        'Comparar la presencia con nuevos competidores',
        'Repetir la medición en otra fecha',
        'Analizar qué contenidos y fuentes parecen respaldar las respuestas',
      ],
    });
  }

  // La exactitud tiene prioridad de presentación sobre el resto (§11 caso 5).
  return diagnoses.sort(
    (a, b) => Number(b.priority) - Number(a.priority),
  );
}

const PRIORITY_NOTE =
  'Requiere un análisis específico para confirmar la causa; este informe solo describe lo observado.';

export function computePriorities(m: ReportMetrics): PriorityItem[] {
  const items: PriorityItem[] = [];
  const inaccurate = m.exactitud.parcial + m.exactitud.incorrecta;

  // 1. Corregir información incorrecta.
  if (inaccurate > 0) {
    items.push({
      id: 'p-exactitud',
      title: 'Corregir la información incorrecta detectada',
      observed: `Se han registrado ${inaccurate} ${
        inaccurate === 1 ? 'mención' : 'menciones'
      } con información incorrecta o incompleta sobre tu empresa.`,
      matters:
        'La información errónea puede afectar a la confianza del usuario incluso cuando la empresa aparece.',
      review: `${PRIORITY_NOTE} Conviene revisar la consistencia del nombre, los servicios, la ubicación y la relación entre la empresa y su dominio.`,
    });
  }

  // 2. Investigar apariciones de competidores sin presencia propia.
  if (m.competencia.competidorSinEmpresa >= 2) {
    items.push({
      id: 'p-competencia',
      title: 'Investigar por qué aparecen competidores y tú no',
      observed: `En ${m.competencia.competidorSinEmpresa} pruebas apareció un competidor pero no tu empresa.`,
      matters:
        'Indica una ventaja competitiva de otras empresas ante esas consultas concretas.',
      review: `${PRIORITY_NOTE} Conviene revisar qué contenidos, servicios y fuentes respaldan a esos competidores.`,
    });
  }

  // 3. Revisar ausencia total de menciones.
  if (m.evaluables > 0 && m.presencia === 0) {
    items.push({
      id: 'p-ausencia',
      title: 'Revisar la ausencia total de menciones',
      observed:
        'Tu empresa no apareció en ninguna de las pruebas evaluables de la muestra.',
      matters:
        'No fue recuperada ante estas consultas y condiciones, aunque no demuestra que nunca aparezca.',
      review: `${PRIORITY_NOTE} Conviene revisar la claridad de la web, las páginas de servicio y las señales de autoridad.`,
    });
  }

  // 4. Mejorar la transición entre mención y recomendación.
  if (m.presencia > 0 && m.recomendaciones === 0) {
    items.push({
      id: 'p-recomendacion',
      title: 'Mejorar la transición de mención a recomendación',
      observed:
        'Apareces mencionada en algunas respuestas, pero no como opción destacada.',
      matters:
        'Ser conocida por un motor no equivale a ser elegida como opción relevante.',
      review: `${PRIORITY_NOTE} Conviene revisar la diferenciación, la especialización y los casos de resultados.`,
    });
  }

  // 5. Reforzar la aparición del dominio como fuente.
  if (m.recomendaciones > 0 && m.citaciones === 0) {
    items.push({
      id: 'p-citacion',
      title: 'Reforzar la aparición del dominio como fuente',
      observed:
        'Te han recomendado, pero tu web no apareció como fuente o enlace en las pruebas registradas.',
      matters:
        'La recomendación puede estar apoyándose en terceros en lugar de tu propio dominio.',
      review: `${PRIORITY_NOTE} Conviene revisar el contenido original del dominio y su relación con la entidad.`,
    });
  }

  // 6. Ampliar y repetir la medición cuando la presencia ya es consistente.
  if (m.evaluables > 0 && m.presencia >= recurrentThreshold(m.evaluables)) {
    items.push({
      id: 'p-ampliar',
      title: 'Ampliar y repetir la medición',
      observed:
        'Tu empresa presenta una presencia recurrente dentro de la muestra.',
      matters:
        'Conviene confirmar en qué consultas, motores y fuentes se sostiene antes de darla por garantizada.',
      review: `${PRIORITY_NOTE} Conviene ampliar las consultas, comparar competidores y repetir la medición en otra fecha.`,
    });
  }

  // Máximo tres prioridades (§12).
  return items.slice(0, 3);
}

function buildCtaLabel(m: ReportMetrics): string {
  if (m.evaluables > 0 && m.presencia === 0) {
    return 'Quiero saber por qué mi empresa no aparece';
  }
  if (m.evaluables > 0 && m.presencia >= recurrentThreshold(m.evaluables)) {
    return 'Quiero consolidar mi visibilidad en IA';
  }
  return 'Quiero mejorar cómo aparece mi empresa';
}

export function computeReport(session: LabSession): ReportData {
  const metrics = computeMetrics(session);
  return {
    metrics,
    diagnoses: computeDiagnoses(metrics),
    priorities: computePriorities(metrics),
    hasEnough: metrics.evaluables >= 3,
    isPartial: metrics.pendientes + metrics.noEvaluables > 0,
    ctaLabel: buildCtaLabel(metrics),
  };
}
