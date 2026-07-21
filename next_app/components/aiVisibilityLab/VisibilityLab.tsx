'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import styles from './VisibilityLab.module.css';
import LabProgress from './LabProgress';
import StageIntro from './StageIntro';
import StageBusiness from './StageBusiness';
import StageQueries from './StageQueries';
import StageFieldwork from './StageFieldwork';
import StageReport from './StageReport';
import type { Business, LabQuery, LabSession, TestResult } from '@/lib/aiVisibilityLab/types';
import { ANALYTICS_EVENTS } from '@/lib/aiVisibilityLab/config';
import {
  loadSession,
  saveSession,
  clearSession,
  createSession,
} from '@/lib/aiVisibilityLab/storage';
import {
  buildBaseQueries,
  buildTestMatrix,
} from '@/lib/aiVisibilityLab/queries';
import { computeMetrics } from '@/lib/aiVisibilityLab/report';
import { trackLabEvent } from '@/lib/aiVisibilityLab/analytics';
import {
  buildContactPrefill,
  storeContactPrefill,
} from '@/lib/aiVisibilityLab/contactPrefill';

/** ¿La sesión guardada tiene progreso real que justifique recuperarla? (§17) */
function hasProgress(session: LabSession): boolean {
  return (
    session.stage > 1 ||
    session.business.nombre.trim() !== '' ||
    session.results.some((r) => r.status === 'guardada')
  );
}

export default function VisibilityLab() {
  const router = useRouter();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const viewTracked = useRef(false);

  const [session, setSession] = useState<LabSession | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [focusSignal, setFocusSignal] = useState(0);

  const bumpFocus = useCallback(() => setFocusSignal((n) => n + 1), []);

  // Hidratación: carga la sesión local (localStorage) una vez montado el
  // componente para no romper la coincidencia con el HTML del servidor. Es una
  // sincronización desde un sistema externo, por lo que el setState dentro del
  // efecto es intencionado y correcto.
  useEffect(() => {
    const loaded = loadSession();
    /* eslint-disable react-hooks/set-state-in-effect */
    if (loaded && hasProgress(loaded)) {
      setSession(loaded);
      setShowRecovery(true);
    } else {
      setSession(loaded ?? createSession());
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    if (!viewTracked.current) {
      trackLabEvent(ANALYTICS_EVENTS.view);
      viewTracked.current = true;
    }
  }, []);

  // Persistencia local (§15). Sincroniza el estado con localStorage y refleja un
  // fallo de almacenamiento (§17). setState aquí es intencionado.
  useEffect(() => {
    if (!hydrated || !session || showRecovery) return;
    const ok = saveSession(session);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStorageError(!ok);
  }, [session, hydrated, showRecovery]);

  // Mueve el foco al encabezado principal al cambiar de etapa (§18). Se omite la
  // carga inicial (focusSignal === 0) para no robar el foco al abrir la página.
  useEffect(() => {
    if (!hydrated || focusSignal === 0) return;
    const id = window.requestAnimationFrame(() => headingRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [focusSignal, hydrated]);

  const mutate = useCallback((fn: (s: LabSession) => LabSession) => {
    setSession((prev) =>
      prev ? { ...fn(prev), updatedISO: new Date().toISOString() } : prev,
    );
  }, []);

  const goStage = useCallback(
    (stage: number) => {
      mutate((s) => ({ ...s, stage }));
      bumpFocus();
    },
    [mutate, bumpFocus],
  );

  /* ─────────── Transiciones de etapa ─────────── */

  const handleStart = useCallback(() => {
    trackLabEvent(ANALYTICS_EVENTS.start);
    goStage(2);
  }, [goStage]);

  const scrollToMethodology = useCallback(() => {
    document
      .getElementById('metodologia')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleBusinessContinue = useCallback(
    (business: Business) => {
      mutate((s) => {
        const newBase = buildBaseQueries(business);
        const existingBase = s.queries.filter((q) => !q.personalizada);
        const sameOriginals =
          existingBase.length === 3 &&
          existingBase.every((q, i) => q.original === newBase[i].original);
        const base = sameOriginals ? existingBase : newBase;
        const custom = s.queries.find((q) => q.personalizada);
        const queries = custom ? [...base, custom] : base;
        return { ...s, business, queries, stage: 3 };
      });
      trackLabEvent(ANALYTICS_EVENTS.businessCompleted);
      bumpFocus();
    },
    [mutate, bumpFocus],
  );

  const handleQueriesContinue = useCallback(
    (queries: LabQuery[]) => {
      mutate((s) => {
        const results = buildTestMatrix(queries, s.results);
        return { ...s, queries, results, stage: 4, currentTestIndex: 0 };
      });
      const usedCustom = queries.some((q) => q.personalizada);
      trackLabEvent(ANALYTICS_EVENTS.queriesGenerated, {
        query_count: queries.length,
        custom_query: usedCustom,
      });
      bumpFocus();
    },
    [mutate, bumpFocus],
  );

  const handleSeenIntro = useCallback(() => {
    mutate((s) => ({ ...s, fieldworkIntroSeen: true }));
    bumpFocus();
  }, [mutate, bumpFocus]);

  const handleCommit = useCallback(
    (result: TestResult) => {
      mutate((s) => ({
        ...s,
        results: s.results.map((r) => (r.id === result.id ? result : r)),
      }));
      if (result.status === 'guardada') {
        const query = session?.queries.find((q) => q.id === result.queryId);
        trackLabEvent(ANALYTICS_EVENTS.testSaved, {
          engine: result.engineId,
          query_type: query?.tipo ?? 'desconocido',
        });
      }
    },
    [mutate, session],
  );

  const handleNavigate = useCallback(
    (index: number) => {
      mutate((s) => ({ ...s, currentTestIndex: index }));
      bumpFocus();
    },
    [mutate, bumpFocus],
  );

  const handleGoReport = useCallback(() => {
    if (session) {
      const allSaved =
        session.results.length > 0 &&
        session.results.every((r) => r.status === 'guardada');
      const metrics = computeMetrics(session);
      const usedCustom = session.queries.some((q) => q.personalizada);
      if (allSaved) {
        trackLabEvent(ANALYTICS_EVENTS.completed, {
          evaluable_tests: metrics.evaluables,
          custom_query: usedCustom,
          session_completed: true,
        });
      } else {
        trackLabEvent(ANALYTICS_EVENTS.partialResults, {
          evaluable_tests: metrics.evaluables,
          custom_query: usedCustom,
          session_completed: false,
        });
      }
    }
    goStage(5);
  }, [session, goStage]);

  const handleEditResults = useCallback(() => {
    mutate((s) => ({ ...s, stage: 4, fieldworkIntroSeen: true }));
    bumpFocus();
  }, [mutate, bumpFocus]);

  const handleBackToQueries = useCallback(() => goStage(3), [goStage]);
  const handleBackToIntro = useCallback(() => goStage(1), [goStage]);

  /* ─────────── Acciones del informe ─────────── */

  const handlePrint = useCallback(() => {
    trackLabEvent(ANALYTICS_EVENTS.reportPrinted);
    window.print();
  }, []);

  const handleContact = useCallback(() => {
    if (!session) return;
    const metrics = computeMetrics(session);
    const prefill = buildContactPrefill(session, metrics);
    storeContactPrefill(prefill);
    trackLabEvent(ANALYTICS_EVENTS.contactClicked);
    router.push('/contacto?ref=laboratorio-visibilidad-ia');
  }, [session, router]);

  const handleRepeat = useCallback(() => {
    mutate((s) => ({
      ...s,
      results: buildTestMatrix(s.queries, []),
      fieldworkIntroSeen: false,
      currentTestIndex: 0,
      stage: 4,
    }));
    bumpFocus();
  }, [mutate, bumpFocus]);

  const requestReset = useCallback(() => setShowResetConfirm(true), []);

  const confirmReset = useCallback(() => {
    clearSession();
    setSession(createSession());
    setShowResetConfirm(false);
    setShowRecovery(false);
    trackLabEvent(ANALYTICS_EVENTS.reset);
    bumpFocus();
  }, [bumpFocus]);

  /* ─────────── Recuperación de sesión ─────────── */

  const continueRecovered = useCallback(() => {
    setShowRecovery(false);
    bumpFocus();
  }, [bumpFocus]);

  /* ─────────── Render ─────────── */

  const storageBanner = storageError ? (
    <div className={`${styles.notice} ${styles.noticeWarning} mb-md`} role="alert">
      <AlertTriangle size={20} aria-hidden="true" />
      <p className="mb-0">
        No se ha podido guardar el progreso en este dispositivo. Mantén esta
        página abierta hasta completar el análisis.
      </p>
    </div>
  ) : null;

  // Antes de hidratar (y en SSR) mostramos la presentación para el indexado.
  if (!hydrated || !session) {
    return (
      <div className={styles.lab}>
        <StageIntro
          onStart={handleStart}
          onShowMethodology={scrollToMethodology}
          headingRef={headingRef}
        />
      </div>
    );
  }

  if (showRecovery) {
    return (
      <div className={styles.lab}>
        {storageBanner}
        <div className="card card--no-hover" role="region" aria-label="Sesión recuperada">
          <h2 ref={headingRef} tabIndex={-1} className="card__title text-left mb-sm">
            Hemos encontrado un análisis sin terminar en este dispositivo
          </h2>
          <p className="text-secondary mb-md">
            Puedes continuar donde lo dejaste o empezar de nuevo. Empezar de nuevo
            borrará los datos guardados.
          </p>
          <div className={styles.navRow}>
            <button type="button" className="btn btn--secondary" onClick={requestReset}>
              Empezar de nuevo
            </button>
            <button type="button" className="btn btn--primary" onClick={continueRecovered}>
              Continuar
            </button>
          </div>
        </div>
        {showResetConfirm && (
          <ResetConfirm
            onCancel={() => setShowResetConfirm(false)}
            onConfirm={confirmReset}
          />
        )}
      </div>
    );
  }

  return (
    <div className={styles.lab}>
      {storageBanner}

      {showResetConfirm && (
        <ResetConfirm
          onCancel={() => setShowResetConfirm(false)}
          onConfirm={confirmReset}
        />
      )}

      {session.stage >= 2 && session.stage <= 4 && (
        <LabProgress stage={session.stage} />
      )}

      {session.stage === 1 && (
        <StageIntro
          onStart={handleStart}
          onShowMethodology={scrollToMethodology}
          headingRef={headingRef}
        />
      )}

      {session.stage === 2 && (
        <StageBusiness
          business={session.business}
          onContinue={handleBusinessContinue}
          onBack={handleBackToIntro}
          onClear={requestReset}
          headingRef={headingRef}
        />
      )}

      {session.stage === 3 && (
        <StageQueries
          business={session.business}
          queries={session.queries}
          onContinue={handleQueriesContinue}
          onBack={() => goStage(2)}
          headingRef={headingRef}
        />
      )}

      {session.stage === 4 && (
        <StageFieldwork
          business={session.business}
          queries={session.queries}
          results={session.results}
          currentIndex={session.currentTestIndex}
          introSeen={session.fieldworkIntroSeen}
          onSeenIntro={handleSeenIntro}
          onCommit={handleCommit}
          onNavigate={handleNavigate}
          onGoReport={handleGoReport}
          onBack={handleBackToQueries}
          onCopy={(queryType) =>
            trackLabEvent(ANALYTICS_EVENTS.queryCopied, { query_type: queryType })
          }
          onOpenEngine={(engineId) =>
            trackLabEvent(ANALYTICS_EVENTS.engineOpened, { engine: engineId })
          }
          headingRef={headingRef}
        />
      )}

      {session.stage === 5 && (
        <StageReport
          session={session}
          onContact={handleContact}
          onPrint={handlePrint}
          onEditResults={handleEditResults}
          onRepeat={handleRepeat}
          onReset={requestReset}
          headingRef={headingRef}
        />
      )}
    </div>
  );
}

function ResetConfirm({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const confirmRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    confirmRef.current?.focus();
  }, []);
  return (
    <div
      ref={confirmRef}
      tabIndex={-1}
      role="alertdialog"
      aria-label="Confirmar borrado de datos"
      className={`card card--no-hover mb-md ${styles.noPrint}`}
    >
      <p className="mb-md">
        <strong>¿Seguro que quieres borrar todos los datos del laboratorio?</strong>
        <br />
        Se eliminará el análisis guardado en este dispositivo. Esta acción no se
        puede deshacer.
      </p>
      <div className={styles.navRow}>
        <button type="button" className="btn btn--secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="button" className="btn btn--primary" onClick={onConfirm}>
          Sí, borrar todo
        </button>
      </div>
    </div>
  );
}
