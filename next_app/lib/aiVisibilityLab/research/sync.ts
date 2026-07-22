/**
 * Motor de sincronización con la base de investigación (spec §7 y §8).
 *
 * Reglas:
 *  - La sesión remota se crea con el PRIMER resultado guardado (el snapshot es
 *    null hasta entonces; ni visitas ni «Empezar» generan envíos).
 *  - Cada guardado/edición reenvía el snapshot completo con un pequeño
 *    debounce; el servidor reconcilia de forma idempotente, así que los
 *    reintentos y los dobles clics son inocuos.
 *  - Un fallo NUNCA bloquea el laboratorio: se marca `pendingSync` en la
 *    sesión local (aviso discreto en la UI) y se reintenta con backoff, al
 *    reanudar la sesión y al recuperar la conexión.
 *  - La huella del snapshot (fingerprint) evita reenvíos idénticos: los campos
 *    de estado de sincronización no forman parte del snapshot, por lo que
 *    actualizar `lastSyncedISO`/`pendingSync` no provoca bucles.
 */

import { useCallback, useEffect, useRef } from 'react';
import type { LabSession } from '../types';
import { LAB_RESEARCH_ENDPOINT } from '../config';
import { buildResearchSnapshot, snapshotFingerprint } from './snapshot';

/** Debounce tras un guardado; agrupa ráfagas de cambios en un solo envío. */
const DEBOUNCE_MS = 1500;
/** Backoff entre reintentos automáticos tras un fallo. */
const RETRY_DELAYS_MS = [5000, 15000, 60000] as const;
/** Tope de reintentos automáticos por ráfaga (los nuevos guardados reactivan). */
const MAX_AUTO_RETRIES = 5;

type Mutate = (fn: (s: LabSession) => LabSession) => void;

/**
 * Hook de sincronización. Recibe la sesión activa (o null mientras no deba
 * sincronizarse, p. ej. durante la pantalla de recuperación) y el mutador del
 * orquestador. No devuelve estado: la UI lee `session.research.pendingSync`.
 */
export function useResearchSync(session: LabSession | null, mutate: Mutate): void {
  const sessionRef = useRef<LabSession | null>(session);
  sessionRef.current = session;

  const lastSentRef = useRef<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const inFlightRef = useRef(false);
  const attemptsRef = useRef(0);
  const seededRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const trySend = useCallback(async (): Promise<void> => {
    timerRef.current = null;
    if (inFlightRef.current) {
      // Ya hay un envío en curso: reprograma con el estado más reciente.
      timerRef.current = window.setTimeout(() => void trySend(), DEBOUNCE_MS);
      return;
    }
    const current = sessionRef.current;
    if (!current) return;
    const snapshot = buildResearchSnapshot(current);
    if (!snapshot) return;
    const fingerprint = snapshotFingerprint(snapshot);
    if (fingerprint === lastSentRef.current) return;

    inFlightRef.current = true;
    try {
      const response = await fetch(LAB_RESEARCH_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // La huella ES el snapshot serializado: se envía tal cual.
        body: fingerprint,
      });
      if (!response.ok) {
        throw new Error(`lab-research status ${response.status}`);
      }
      lastSentRef.current = fingerprint;
      attemptsRef.current = 0;
      mutate((s) =>
        s.research
          ? {
              ...s,
              research: {
                ...s.research,
                remoteCreated: true,
                pendingSync: false,
                lastSyncedISO: new Date().toISOString(),
              },
            }
          : s,
      );
    } catch {
      // Sin alarmas: se conserva todo en local y se reintenta más tarde.
      attemptsRef.current += 1;
      mutate((s) =>
        !s.research || s.research.pendingSync
          ? s
          : { ...s, research: { ...s.research, pendingSync: true } },
      );
      if (attemptsRef.current <= MAX_AUTO_RETRIES) {
        const delay =
          RETRY_DELAYS_MS[Math.min(attemptsRef.current - 1, RETRY_DELAYS_MS.length - 1)];
        clearTimer();
        timerRef.current = window.setTimeout(() => void trySend(), delay);
      }
    } finally {
      inFlightRef.current = false;
    }
  }, [mutate, clearTimer]);

  // Programa un envío cuando el snapshot difiere del último confirmado. Si ya
  // hay un temporizador armado (debounce o backoff), se respeta: al dispararse
  // reconstruirá el snapshot con el estado más reciente.
  useEffect(() => {
    if (!session) return;
    const snapshot = buildResearchSnapshot(session);
    if (!snapshot) return;
    const fingerprint = snapshotFingerprint(snapshot);

    // Primera pasada tras cargar una sesión ya sincronizada: siembra la huella
    // para no reenviar un snapshot idéntico en cada visita.
    if (!seededRef.current) {
      seededRef.current = true;
      if (session.research?.remoteCreated && !session.research.pendingSync) {
        lastSentRef.current = fingerprint;
        return;
      }
    }

    if (fingerprint === lastSentRef.current) return;
    if (timerRef.current !== null || inFlightRef.current) return;
    timerRef.current = window.setTimeout(() => void trySend(), DEBOUNCE_MS);
  }, [session, trySend]);

  // Reintento inmediato al recuperar la conexión.
  useEffect(() => {
    const onOnline = () => {
      attemptsRef.current = 0;
      clearTimer();
      timerRef.current = window.setTimeout(() => void trySend(), 500);
    };
    window.addEventListener('online', onOnline);
    return () => {
      window.removeEventListener('online', onOnline);
      clearTimer();
    };
  }, [trySend, clearTimer]);
}
