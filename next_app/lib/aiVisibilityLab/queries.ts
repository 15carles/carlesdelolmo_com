/**
 * Generación determinista de consultas y creación de la matriz de pruebas.
 * No interviene ninguna IA (spec §7).
 */

import type { Business, LabQuery, TestResult } from './types';
import {
  QUERY_TEMPLATES,
  CUSTOM_QUERY_ID,
  ENGINES,
} from './config';
import { textContainsName } from './utils';

/** Construye las tres consultas base a partir de los datos del negocio. */
export function buildBaseQueries(business: Business): LabQuery[] {
  return QUERY_TEMPLATES.map((template) => {
    const texto = template.build({
      servicio: business.servicio.trim(),
      ubicacion: business.ubicacion.trim(),
      necesidad: business.necesidad.trim(),
      tipoCliente: business.tipoCliente.trim(),
    });
    return {
      id: template.id,
      tipo: template.tipo,
      original: texto,
      texto,
      personalizada: false,
    };
  });
}

/** Crea (o repone) la consulta personalizada opcional. */
export function createCustomQuery(texto = ''): LabQuery {
  return {
    id: CUSTOM_QUERY_ID,
    tipo: 'personalizada',
    original: '',
    texto,
    personalizada: true,
  };
}

/**
 * Genera la matriz de pruebas (consulta × motor) conservando los resultados ya
 * registrados cuando la combinación sigue existiendo.
 */
export function buildTestMatrix(
  queries: LabQuery[],
  previous: TestResult[] = [],
): TestResult[] {
  const previousById = new Map(previous.map((r) => [r.id, r]));
  const matrix: TestResult[] = [];

  for (const query of queries) {
    for (const engine of ENGINES) {
      const id = `${query.id}-${engine.id}`;
      const existing = previousById.get(id);
      if (existing) {
        matrix.push(existing);
      } else {
        matrix.push(createEmptyResult(query.id, engine.id));
      }
    }
  }

  return matrix;
}

export function createEmptyResult(queryId: string, engineId: string): TestResult {
  return {
    id: `${queryId}-${engineId}`,
    queryId,
    engineId,
    status: 'pendiente',
    fechaISO: null,
    aparicion: null,
    fuente: null,
    exactitud: null,
    competidoresConocidos: [],
    otrasEmpresasFlag: false,
    ningunCompetidor: false,
    competidorNoSeguro: false,
    otrasEmpresas: '',
    notas: '',
  };
}

/**
 * Detecta si una consulta contiene el nombre de la propia empresa o el de un
 * competidor conocido para poder advertir al usuario (§7). La advertencia no
 * bloquea el avance.
 */
export function detectBrandMentions(
  text: string,
  business: Business,
): { self: boolean; competitors: string[] } {
  const self = business.nombre
    ? textContainsName(text, business.nombre)
    : false;
  const competitors = business.competidores.filter((name) =>
    textContainsName(text, name),
  );
  return { self, competitors };
}
