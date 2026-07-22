/**
 * Preparación del resumen del laboratorio para hacérselo llegar a Carles del
 * Olmo (spec §14).
 *
 * El mismo texto estructurado se usa para dos vías cómodas de entrega:
 *  - Prellenar el mensaje del formulario de contacto (visible y editable).
 *  - Copiarlo al portapapeles para pegarlo en un email o WhatsApp.
 *
 * NUNCA se envía automáticamente y NO incluye las notas privadas del laboratorio
 * ni las respuestas completas de los motores (§15). El usuario revisa el
 * contenido antes de enviarlo.
 */

import type { LabSession, TestResult, AppearanceLevel } from './types';
import type { ReportMetrics } from './report';
import {
  LAB_CONTACT_PREFILL_KEY,
  CONTACT_PRESELECTED_SERVICES,
  METHODOLOGY_VERSION,
  ENGINES,
  QUERY_TYPE_LABELS,
  APPEARANCE_SHORT,
  SOURCE_SHORT,
  ACCURACY_SHORT,
} from './config';
import { domainHost } from './utils';

export interface ContactPrefill {
  servicios: string[];
  message: string;
}

function engineName(id: string): string {
  return ENGINES.find((e) => e.id === id)?.name ?? id;
}

function queryLabel(session: LabSession, queryId: string): string {
  const q = session.queries.find((x) => x.id === queryId);
  return q ? QUERY_TYPE_LABELS[q.tipo] : queryId;
}

function appears(level: AppearanceLevel | null): boolean {
  return level === 'mencionada' || level === 'recomendada';
}

function competitorText(r: TestResult): string {
  const parts = [...r.competidoresConocidos];
  if (r.otrasEmpresasFlag) parts.push('otras empresas');
  if (parts.length > 0) return parts.join(', ');
  if (r.ningunCompetidor) return 'ninguno';
  if (r.competidorNoSeguro) return 'no seguro';
  return 'n/d';
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

/**
 * Texto completo y legible del resultado: datos del negocio, cifras globales y
 * el detalle de cada comprobación registrada (sin notas privadas).
 */
export function buildResultsSummaryText(
  session: LabSession,
  metrics: ReportMetrics,
): string {
  const { business } = session;
  const incidencias = metrics.exactitud.parcial + metrics.exactitud.incorrecta;
  const topCompetitors = metrics.competencia.porCompetidor
    .filter((c) => c.count > 0)
    .slice(0, 3)
    .map((c) => `${c.name} (${c.count})`);

  const detalle = session.results
    .filter((r) => r.status === 'guardada')
    .map((r) => {
      const base = `- ${queryLabel(session, r.queryId)} · ${engineName(
        r.engineId,
      )} · ${r.aparicion ? APPEARANCE_SHORT[r.aparicion] : 'n/d'}`;
      const extra = appears(r.aparicion)
        ? ` · Fuente: ${r.fuente ? SOURCE_SHORT[r.fuente] : 'n/d'} · Exactitud: ${
            r.exactitud ? ACCURACY_SHORT[r.exactitud] : 'n/d'
          }`
        : '';
      return `${base}${extra} · Competidores: ${competitorText(r)}`;
    });

  const lines: string[] = [
    'RESUMEN DEL LABORATORIO DE VISIBILIDAD EN IA',
    `Metodología: ${METHODOLOGY_VERSION}`,
    `Fecha: ${formatDate(session.updatedISO)}`,
    '',
    'DATOS DEL NEGOCIO',
    `Empresa: ${business.nombre}`,
    `Dominio: ${domainHost(business.dominio)}`,
    `Servicio analizado: ${business.servicio}`,
    `Ubicación: ${business.ubicacion}`,
    '',
    'RESULTADOS GLOBALES',
    `Pruebas evaluables: ${metrics.evaluables}`,
    `Menciones (presencia): ${metrics.presencia}`,
    `Recomendaciones destacadas: ${metrics.recomendaciones}`,
    `Citas de mi dominio como fuente: ${metrics.citaciones}`,
    `Incidencias de exactitud: ${incidencias}`,
    `Pruebas donde aparece un competidor y no mi empresa: ${metrics.competencia.competidorSinEmpresa}`,
    topCompetitors.length
      ? `Competidores con mayor presencia: ${topCompetitors.join(', ')}`
      : 'Competidores con mayor presencia: no registrados',
  ];

  if (detalle.length) {
    lines.push('', 'DETALLE POR COMPROBACIÓN', ...detalle);
  }

  return lines.join('\n');
}

export function buildContactPrefill(
  session: LabSession,
  metrics: ReportMetrics,
): ContactPrefill {
  const message = `${buildResultsSummaryText(session, metrics)}\n\nMe gustaría revisar estos resultados en una auditoría SEO + GEO.`;
  return {
    servicios: [...CONTACT_PRESELECTED_SERVICES],
    message,
  };
}

/** Guarda el resumen en sessionStorage para que lo lea el formulario. */
export function storeContactPrefill(prefill: ContactPrefill): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.sessionStorage.setItem(
      LAB_CONTACT_PREFILL_KEY,
      JSON.stringify(prefill),
    );
    return true;
  } catch {
    return false;
  }
}

/** Lee y elimina el resumen (se consume una sola vez). */
export function consumeContactPrefill(): ContactPrefill | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(LAB_CONTACT_PREFILL_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(LAB_CONTACT_PREFILL_KEY);
    const parsed = JSON.parse(raw) as Partial<ContactPrefill>;
    if (
      parsed &&
      typeof parsed.message === 'string' &&
      Array.isArray(parsed.servicios)
    ) {
      return {
        message: parsed.message,
        servicios: parsed.servicios.filter(
          (s): s is string => typeof s === 'string',
        ),
      };
    }
  } catch {
    // Ignorar payloads corruptos.
  }
  return null;
}
