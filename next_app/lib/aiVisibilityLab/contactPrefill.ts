/**
 * Preparación del resumen para el formulario de contacto (spec §14).
 *
 * El resumen se coloca en sessionStorage y el formulario de contacto lo carga
 * en el campo de mensaje (visible y editable). NO se envía automáticamente y NO
 * incluye las notas privadas del laboratorio ni las respuestas de los motores
 * (§15). El usuario revisa el contenido antes de enviar.
 */

import type { LabSession } from './types';
import type { ReportMetrics } from './report';
import {
  LAB_CONTACT_PREFILL_KEY,
  CONTACT_PRESELECTED_SERVICES,
  METHODOLOGY_VERSION,
} from './config';
import { domainHost } from './utils';

export interface ContactPrefill {
  servicios: string[];
  message: string;
}

export function buildContactPrefill(
  session: LabSession,
  metrics: ReportMetrics,
): ContactPrefill {
  const { business } = session;
  const incidencias = metrics.exactitud.parcial + metrics.exactitud.incorrecta;
  const topCompetitors = metrics.competencia.porCompetidor
    .filter((c) => c.count > 0)
    .slice(0, 3)
    .map((c) => `${c.name} (${c.count})`);

  const lines = [
    'Resumen del Laboratorio de visibilidad en IA',
    `Metodología: ${METHODOLOGY_VERSION}`,
    '',
    `Empresa: ${business.nombre}`,
    `Dominio: ${domainHost(business.dominio)}`,
    `Servicio analizado: ${business.servicio}`,
    `Ubicación: ${business.ubicacion}`,
    '',
    `Pruebas evaluables: ${metrics.evaluables}`,
    `Menciones (presencia): ${metrics.presencia}`,
    `Recomendaciones destacadas: ${metrics.recomendaciones}`,
    `Citas de mi dominio como fuente: ${metrics.citaciones}`,
    `Incidencias de exactitud: ${incidencias}`,
    `Pruebas donde aparece un competidor y no mi empresa: ${metrics.competencia.competidorSinEmpresa}`,
    topCompetitors.length
      ? `Competidores con mayor presencia: ${topCompetitors.join(', ')}`
      : 'Competidores con mayor presencia: no registrados',
    '',
    'Me gustaría revisar estos resultados en una auditoría SEO + GEO.',
  ];

  return {
    servicios: [...CONTACT_PRESELECTED_SERVICES],
    message: lines.join('\n'),
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
