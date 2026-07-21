/**
 * Persistencia local del laboratorio (spec §15).
 *
 * Todos los datos permanecen en el navegador (localStorage). Nada se envía al
 * servidor durante el uso normal. Las operaciones son tolerantes a fallos: si
 * el almacenamiento no está disponible (modo privado, cuota, etc.) la
 * herramienta debe seguir siendo utilizable durante la sesión (§17).
 */

import type { LabSession } from './types';
import { LAB_STORAGE_KEY, METHODOLOGY_VERSION } from './config';
import { createLocalId } from './utils';

export function loadSession(): LabSession | null {
  if (typeof window === 'undefined') return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(LAB_STORAGE_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (isLabSession(parsed)) {
      return parsed;
    }
  } catch {
    // Payload corrupto: se descarta silenciosamente.
  }
  return null;
}

/** Guarda la sesión. Devuelve false si no pudo persistirse (§17). */
export function saveSession(session: LabSession): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(LAB_STORAGE_KEY, JSON.stringify(session));
    return true;
  } catch {
    return false;
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(LAB_STORAGE_KEY);
  } catch {
    // Ignorar fallos de borrado.
  }
}

function isLabSession(value: unknown): value is LabSession {
  if (!value || typeof value !== 'object') return false;
  const v = value as Partial<LabSession>;
  return (
    typeof v.localId === 'string' &&
    typeof v.stage === 'number' &&
    typeof v.business === 'object' &&
    v.business !== null &&
    Array.isArray(v.queries) &&
    Array.isArray(v.results)
  );
}

/** Estructura de negocio vacía. */
export function emptyBusiness() {
  return {
    nombre: '',
    dominio: '',
    servicio: '',
    ubicacion: '',
    tipoCliente: '',
    necesidad: '',
    competidores: [] as string[],
  };
}

/** Crea una sesión nueva en la etapa 1. */
export function createSession(): LabSession {
  const now = new Date().toISOString();
  return {
    localId: createLocalId(),
    version: METHODOLOGY_VERSION,
    createdISO: now,
    updatedISO: now,
    stage: 1,
    business: emptyBusiness(),
    queries: [],
    results: [],
    currentTestIndex: 0,
    fieldworkIntroSeen: false,
  };
}
