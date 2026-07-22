'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Info } from 'lucide-react';
import styles from './VisibilityLab.module.css';
import LabProgress from './LabProgress';
import StageIntro from './StageIntro';
import StageBusiness from './StageBusiness';
import StageQueries from './StageQueries';
import StageFieldwork from './StageFieldwork';
import StageReport from './StageReport';
import type {
  Business,
  LabQuery,
  LabSession,
  ResearchInfo,
  ResearchSelection,
  TestResult,
} from '@/lib/aiVisibilityLab/types';
import { ANALYTICS_EVENTS, LIMITATION_TEXTS } from '@/lib/aiVisibilityLab/config';
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
import { createLocalId } from '@/lib/aiVisibilityLab/utils';
import { useResearchSync } from '@/lib/aiVisibilityLab/research/sync';
import { hashDomainForResearch } from '@/lib/aiVisibilityLab/research/hash';

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

  // Sincronización con la base de investigación (research/sync.ts). Inactiva
  // hasta que la sesión tiene clasificación completa y un resultado guardado;
  // en pausa mientras se muestra la pantalla de recuperación.
  useResearchSync(hydrated && !showRecovery ? session : null, mutate);

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
    async (business: Business, selection: ResearchSelection) => {
      // Hash irreversible del dominio, calculado SIEMPRE en el navegador: el
      // dominio en claro nunca sale del dispositivo. Si no puede calcularse
      // (dominio no interpretable o sin Web Crypto), queda vacío y la sesión
      // simplemente no sincroniza con el estudio.
      const domainHash = await hashDomainForResearch(business.dominio);
      mutate((s) => {
        const newBase = buildBaseQueries(business);
        const existingBase = s.queries.filter((q) => !q.personalizada);
        const sameOriginals =
          existingBase.length === 3 &&
          existingBase.every((q, i) => q.original === newBase[i].original);
        const base = sameOriginals ? existingBase : newBase;
        const custom = s.queries.find((q) => q.personalizada);
        const queries = custom ? [...base, custom] : base;
        const research: ResearchInfo = {
          publicSessionId: s.research?.publicSessionId ?? createLocalId(),
          domainHash,
          sectorSlug: selection.sectorSlug,
          serviceCategorySlug: selection.serviceCategorySlug,
          provinceSlug: selection.provinceSlug,
          completedAtISO: s.research?.completedAtISO ?? null,
          remoteCreated: s.research?.remoteCreated ?? false,
          pendingSync: s.research?.pendingSync ?? false,
          lastSyncedISO: s.research?.lastSyncedISO ?? null,
        };
        return { ...s, business, queries, research, stage: 3 };
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
    // Sella la primera finalización para la base de investigación (§7): la
    // fecha se conserva aunque después se editen resultados.
    mutate((s) => {
      const allSaved =
        s.results.length > 0 && s.results.every((r) => r.status === 'guardada');
      if (!s.research || !allSaved || s.research.completedAtISO) {
        return { ...s, stage: 5 };
      }
      return {
        ...s,
        stage: 5,
        research: { ...s.research, completedAtISO: new Date().toISOString() },
      };
    });
    bumpFocus();
  }, [session, mutate, bumpFocus]);

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
      // Repetir el análisis es una medición nueva: identificador de
      // sincronización nuevo para no sobrescribir la sesión remota anterior
      // (estudio longitudinal, decisión D5 del plan).
      research: s.research
        ? {
            ...s.research,
            publicSessionId: createLocalId(),
            completedAtISO: null,
            remoteCreated: false,
            pendingSync: false,
            lastSyncedISO: null,
          }
        : s.research,
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

  // Aviso discreto y no alarmista (§7): el fallo de envío nunca bloquea el
  // laboratorio; los datos siguen en local y se reintenta automáticamente.
  const syncPendingBanner = session?.research?.pendingSync ? (
    <div
      className={`${styles.notice} ${styles.noticeInfo} mb-md ${styles.noPrint}`}
      role="status"
    >
      <Info size={20} aria-hidden="true" />
      <p className="mb-0">
        Los resultados estadísticos del estudio están pendientes de envío. El
        laboratorio funciona con normalidad y el envío se reintentará
        automáticamente.
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
            remoteCreated={session.research?.remoteCreated ?? false}
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
      {syncPendingBanner}

      {showResetConfirm && (
        <ResetConfirm
          remoteCreated={session.research?.remoteCreated ?? false}
          onCancel={() => setShowResetConfirm(false)}
          onConfirm={confirmReset}
        />
      )}

      {session.stage >= 2 && session.stage <= 4 && (
        <>
          <LabProgress stage={session.stage} />
          <p className={`text-muted text-sm mb-md ${styles.noPrint}`}>
            {LIMITATION_TEXTS.duringLabNotice}
          </p>
        </>
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
          research={session.research ?? null}
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
  remoteCreated,
  onCancel,
  onConfirm,
}: {
  /** La sesión ya envió resultados estadísticos al estudio (§17). */
  remoteCreated: boolean;
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
        Esto borrará el análisis guardado en este dispositivo.{' '}
        {remoteCreated &&
          'Los resultados estadísticos ya incorporados al estudio se conservarán de acuerdo con la política de privacidad. '}
        Esta acción no se puede deshacer.
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
