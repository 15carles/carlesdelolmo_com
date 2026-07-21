import React, { useState } from 'react';
import { Copy, ExternalLink, Info } from 'lucide-react';
import styles from './VisibilityLab.module.css';
import type {
  Business,
  LabQuery,
  TestResult,
  AppearanceLevel,
  SourceStatus,
  AccuracyStatus,
} from '@/lib/aiVisibilityLab/types';
import {
  ENGINES,
  QUERY_TYPE_LABELS,
  APPEARANCE_OPTIONS,
  SOURCE_OPTIONS,
  ACCURACY_OPTIONS,
  LIMITS,
  LIMITATION_TEXTS,
  type EngineConfig,
} from '@/lib/aiVisibilityLab/config';

interface StageFieldworkProps {
  business: Business;
  queries: LabQuery[];
  results: TestResult[];
  currentIndex: number;
  introSeen: boolean;
  onSeenIntro: () => void;
  onCommit: (result: TestResult) => void;
  onNavigate: (index: number) => void;
  onGoReport: () => void;
  onBack: () => void;
  onCopy: (queryType: string) => void;
  onOpenEngine: (engineId: string) => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}

const FIELD_INSTRUCTIONS = [
  'Abre una conversación nueva para cada consulta.',
  'Copia la pregunta exactamente como aparece.',
  'No añadas contexto ni hagas preguntas posteriores.',
  'Registra la primera respuesta completa.',
  'Utiliza la misma cuenta y configuración durante toda la prueba.',
  'Realiza todas las pruebas en el menor intervalo razonable posible.',
];

function appears(level: AppearanceLevel | null): boolean {
  return level === 'mencionada' || level === 'recomendada';
}

export default function StageFieldwork(props: StageFieldworkProps) {
  const {
    business,
    queries,
    results,
    currentIndex,
    introSeen,
    onSeenIntro,
    onCommit,
    onNavigate,
    onGoReport,
    onBack,
    onCopy,
    onOpenEngine,
    headingRef,
  } = props;

  if (!introSeen) {
    return (
      <div>
        <h2 ref={headingRef} tabIndex={-1}>
          Antes de empezar: metodología del trabajo de campo
        </h2>
        <p className="text-secondary mb-md">
          Para que los resultados sean comparables, sigue estos pasos en cada
          comprobación:
        </p>
        <div className="card card--no-hover">
          <ol className={styles.stepsList} style={{ marginTop: 0 }}>
            {FIELD_INSTRUCTIONS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className={`${styles.notice} mt-md`}>
          <Info size={20} aria-hidden="true" />
          <p className="mb-0">{LIMITATION_TEXTS.variabilityNotice}</p>
        </div>
        <div className={styles.navRow}>
          <button type="button" className="btn btn--secondary" onClick={onBack}>
            Volver a las consultas
          </button>
          <button type="button" className="btn btn--primary" onClick={onSeenIntro}>
            Entendido, empezar
          </button>
        </div>
      </div>
    );
  }

  const total = results.length;
  const safeIndex = Math.min(Math.max(currentIndex, 0), total - 1);
  const current = results[safeIndex];
  const query = queries.find((q) => q.id === current.queryId);
  const engine = ENGINES.find((e) => e.id === current.engineId);

  const completed = results.filter((r) => r.status === 'guardada').length;
  const pending = results.filter((r) => r.status === 'pendiente').length;
  const notEvaluable = results.filter(
    (r) => r.status === 'guardada' && r.aparicion === 'no_evaluable',
  ).length;
  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (!query || !engine) {
    return null;
  }

  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1}>
        Trabajo de campo
      </h2>

      {/* Resumen de progreso permanente (§9) */}
      <div className="card card--no-hover mb-md">
        <div
          className={styles.progressBarTrack}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={completed}
          aria-valuetext={`${completed} de ${total} pruebas completadas`}
        >
          <div
            className={styles.progressBarFill}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className={styles.progressMeta} aria-live="polite">
          {completed} de {total} pruebas completadas ({progressPct}%)
        </p>
        <div className={styles.tally}>
          <span>
            Completadas: <strong>{completed}</strong>
          </span>
          <span>
            Pendientes: <strong>{pending}</strong>
          </span>
          <span>
            No evaluables: <strong>{notEvaluable}</strong>
          </span>
        </div>
      </div>

      <TestForm
        key={current.id}
        result={current}
        query={query}
        engine={engine}
        business={business}
        index={safeIndex}
        total={total}
        onCommit={onCommit}
        onNavigate={onNavigate}
        onGoReport={onGoReport}
        onCopy={onCopy}
        onOpenEngine={onOpenEngine}
      />
    </div>
  );
}

interface TestFormProps {
  result: TestResult;
  query: LabQuery;
  engine: EngineConfig;
  business: Business;
  index: number;
  total: number;
  onCommit: (result: TestResult) => void;
  onNavigate: (index: number) => void;
  onGoReport: () => void;
  onCopy: (queryType: string) => void;
  onOpenEngine: (engineId: string) => void;
}

type CopyState = 'idle' | 'ok' | 'error';

function TestForm({
  result,
  query,
  engine,
  business,
  index,
  total,
  onCommit,
  onNavigate,
  onGoReport,
  onCopy,
  onOpenEngine,
}: TestFormProps) {
  const [aparicion, setAparicion] = useState<AppearanceLevel | null>(
    result.aparicion,
  );
  const [fuente, setFuente] = useState<SourceStatus | null>(result.fuente);
  const [exactitud, setExactitud] = useState<AccuracyStatus | null>(
    result.exactitud,
  );
  const [competidoresConocidos, setCompetidoresConocidos] = useState<string[]>(
    result.competidoresConocidos,
  );
  const [otrasEmpresasFlag, setOtrasEmpresasFlag] = useState(
    result.otrasEmpresasFlag,
  );
  const [ningunCompetidor, setNingunCompetidor] = useState(
    result.ningunCompetidor,
  );
  const [competidorNoSeguro, setCompetidorNoSeguro] = useState(
    result.competidorNoSeguro,
  );
  const [otrasEmpresas, setOtrasEmpresas] = useState(result.otrasEmpresas);
  const [notas, setNotas] = useState(result.notas);

  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [openBlocked, setOpenBlocked] = useState(false);
  const [showAparicionError, setShowAparicionError] = useState(false);

  const buildResult = (forcePending: boolean): TestResult => {
    const status =
      !forcePending && aparicion !== null ? 'guardada' : 'pendiente';
    const isVisible = appears(aparicion);
    return {
      ...result,
      status,
      fechaISO: status === 'guardada' ? new Date().toISOString() : result.fechaISO,
      aparicion,
      fuente: isVisible ? fuente : null,
      exactitud: isVisible ? exactitud : null,
      competidoresConocidos,
      otrasEmpresasFlag,
      ningunCompetidor,
      competidorNoSeguro,
      otrasEmpresas: otrasEmpresas.trim(),
      notas: notas.trim(),
    };
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(query.texto);
      setCopyState('ok');
      onCopy(query.tipo);
    } catch {
      setCopyState('error');
    }
  };

  const handleOpen = () => {
    onOpenEngine(engine.id);
    const win = window.open(engine.url, '_blank', 'noopener,noreferrer');
    setOpenBlocked(!win);
  };

  const toggleCompetitor = (name: string) => {
    setCompetidoresConocidos((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const saveAndNext = () => {
    if (aparicion === null) {
      setShowAparicionError(true);
      return;
    }
    onCommit(buildResult(false));
    if (index < total - 1) onNavigate(index + 1);
    else onGoReport();
  };

  const markPending = () => {
    onCommit(buildResult(true));
    if (index < total - 1) onNavigate(index + 1);
  };

  const goPrev = () => {
    onCommit(buildResult(false));
    if (index > 0) onNavigate(index - 1);
  };

  const isVisible = appears(aparicion);

  return (
    <div className="card card--no-hover">
      <div className={styles.testHead}>
        <span className="badge badge--tag badge--cyan">
          Consulta {index + 1} de {total}
        </span>
        <span className="badge badge--tag badge--teal">
          {QUERY_TYPE_LABELS[query.tipo]}
        </span>
        <span className="badge badge--tag badge--blue">Motor: {engine.name}</span>
      </div>

      <p className="text-secondary mb-sm">
        Usa <strong>{engine.name}</strong> para esta comprobación. Copia el texto
        exacto y pégalo en una conversación nueva.
      </p>

      <label htmlFor={`query-text-${result.id}`} className="sr-only">
        Texto de la consulta
      </label>
      <div id={`query-text-${result.id}`} className={styles.queryBox}>
        {query.texto}
      </div>

      <div className={styles.testActions}>
        <button type="button" className="btn btn--primary" onClick={handleCopy}>
          <Copy size={18} aria-hidden="true" /> Copiar consulta
        </button>
        <button type="button" className="btn btn--secondary" onClick={handleOpen}>
          <ExternalLink size={18} aria-hidden="true" /> Abrir {engine.name} en una
          pestaña nueva
        </button>
      </div>

      <p className={styles.copyStatus} aria-live="polite">
        {copyState === 'ok' && 'Consulta copiada.'}
        {copyState === 'error' && (
          <span className={styles.copyStatusError}>
            No se ha podido copiar automáticamente. Selecciona el texto y cópialo
            manualmente.
          </span>
        )}
      </p>
      {openBlocked && (
        <p className={`${styles.copyStatus} ${styles.copyStatusError}`} role="alert">
          No se ha podido abrir el motor automáticamente. Copia la consulta y abre
          la plataforma manualmente.
        </p>
      )}

      <p className="text-secondary mt-md mb-md">
        Cuando tengas la respuesta, vuelve aquí y registra lo que ha ocurrido.
      </p>

      {/* Q1: aparición */}
      <fieldset className={styles.optionGroup}>
        <legend className={styles.optionLegend}>¿Aparece tu empresa?</legend>
        <div className={styles.optionList}>
          {APPEARANCE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`${styles.option} ${
                aparicion === opt.value ? styles.optionChecked : ''
              }`}
            >
              <input
                type="radio"
                name={`aparicion-${result.id}`}
                value={opt.value}
                checked={aparicion === opt.value}
                onChange={() => {
                  setAparicion(opt.value);
                  setShowAparicionError(false);
                }}
              />
              <span className={styles.optionText}>
                {opt.label}
                {opt.hint && <span className={styles.optionHint}>{opt.hint}</span>}
              </span>
            </label>
          ))}
        </div>
        {showAparicionError && (
          <div className="form__error" role="alert">
            Selecciona una opción para guardar la prueba.
          </div>
        )}
      </fieldset>

      {/* Q2: fuente (solo si aparece) */}
      {isVisible && (
        <fieldset className={styles.optionGroup}>
          <legend className={styles.optionLegend}>
            ¿Aparece tu web como fuente o enlace?
          </legend>
          <p className="text-muted text-sm mb-sm">
            Una mención de la empresa y una cita hacia su web son señales
            distintas.
          </p>
          <div className={styles.optionList}>
            {SOURCE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`${styles.option} ${
                  fuente === opt.value ? styles.optionChecked : ''
                }`}
              >
                <input
                  type="radio"
                  name={`fuente-${result.id}`}
                  value={opt.value}
                  checked={fuente === opt.value}
                  onChange={() => setFuente(opt.value)}
                />
                <span className={styles.optionText}>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {/* Q3: exactitud (solo si aparece) */}
      {isVisible && (
        <fieldset className={styles.optionGroup}>
          <legend className={styles.optionLegend}>
            ¿La información sobre tu empresa es correcta?
          </legend>
          <div className={styles.optionList}>
            {ACCURACY_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`${styles.option} ${
                  exactitud === opt.value ? styles.optionChecked : ''
                }`}
              >
                <input
                  type="radio"
                  name={`exactitud-${result.id}`}
                  value={opt.value}
                  checked={exactitud === opt.value}
                  onChange={() => setExactitud(opt.value)}
                />
                <span className={styles.optionText}>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {/* Q4: competidores */}
      <fieldset className={styles.optionGroup}>
        <legend className={styles.optionLegend}>¿Aparece algún competidor?</legend>
        <div className={styles.optionList}>
          {business.competidores.map((name) => (
            <label
              key={name}
              className={`${styles.option} ${
                competidoresConocidos.includes(name) ? styles.optionChecked : ''
              }`}
            >
              <input
                type="checkbox"
                checked={competidoresConocidos.includes(name)}
                onChange={() => toggleCompetitor(name)}
              />
              <span className={styles.optionText}>{name}</span>
            </label>
          ))}
          <label
            className={`${styles.option} ${
              otrasEmpresasFlag ? styles.optionChecked : ''
            }`}
          >
            <input
              type="checkbox"
              checked={otrasEmpresasFlag}
              onChange={(e) => setOtrasEmpresasFlag(e.target.checked)}
            />
            <span className={styles.optionText}>Aparecen otras empresas</span>
          </label>
          <label
            className={`${styles.option} ${
              ningunCompetidor ? styles.optionChecked : ''
            }`}
          >
            <input
              type="checkbox"
              checked={ningunCompetidor}
              onChange={(e) => setNingunCompetidor(e.target.checked)}
            />
            <span className={styles.optionText}>
              No aparece ningún competidor conocido
            </span>
          </label>
          <label
            className={`${styles.option} ${
              competidorNoSeguro ? styles.optionChecked : ''
            }`}
          >
            <input
              type="checkbox"
              checked={competidorNoSeguro}
              onChange={(e) => setCompetidorNoSeguro(e.target.checked)}
            />
            <span className={styles.optionText}>No estoy seguro</span>
          </label>
        </div>
      </fieldset>

      {/* Q5: otras empresas */}
      <div className="form__group">
        <label htmlFor={`otras-${result.id}`} className="form__label text-left">
          Otras empresas mencionadas (opcional)
        </label>
        <input
          id={`otras-${result.id}`}
          type="text"
          className="form__input"
          value={otrasEmpresas}
          maxLength={LIMITS.otrasEmpresasMax}
          placeholder="Nombres de empresas no incluidas antes"
          onChange={(e) => setOtrasEmpresas(e.target.value)}
        />
      </div>

      {/* Q6: notas */}
      <div className="form__group">
        <label htmlFor={`notas-${result.id}`} className="form__label text-left">
          Notas (opcional)
        </label>
        <textarea
          id={`notas-${result.id}`}
          className="form__textarea"
          value={notas}
          maxLength={LIMITS.notasMax}
          rows={2}
          aria-describedby={`notas-help-${result.id}`}
          onChange={(e) => setNotas(e.target.value)}
        />
        <p id={`notas-help-${result.id}`} className="text-muted text-sm mt-xs mb-0">
          No introduzcas información confidencial ni datos personales. No hace
          falta pegar la respuesta completa.
        </p>
      </div>

      <div className={styles.navRow}>
        <div className={styles.navGroup}>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={goPrev}
            disabled={index === 0}
          >
            Anterior
          </button>
          <button type="button" className="btn btn--secondary" onClick={markPending}>
            Marcar como pendiente
          </button>
        </div>
        <div className={styles.navGroup}>
          <button type="button" className="btn btn--secondary" onClick={onGoReport}>
            Ver resultados
          </button>
          <button type="button" className="btn btn--primary" onClick={saveAndNext}>
            {index < total - 1 ? 'Guardar y siguiente' : 'Guardar y ver resultados'}
          </button>
        </div>
      </div>
    </div>
  );
}
