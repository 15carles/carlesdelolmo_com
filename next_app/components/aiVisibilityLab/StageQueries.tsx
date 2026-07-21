import React, { useMemo, useState } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import styles from './VisibilityLab.module.css';
import type { Business, LabQuery } from '@/lib/aiVisibilityLab/types';
import {
  LIMITS,
  QUERY_TYPE_LABELS,
  ENGINES,
} from '@/lib/aiVisibilityLab/config';
import {
  buildBaseQueries,
  createCustomQuery,
  detectBrandMentions,
} from '@/lib/aiVisibilityLab/queries';

interface StageQueriesProps {
  business: Business;
  queries: LabQuery[];
  onContinue: (queries: LabQuery[]) => void;
  onBack: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}

function BrandWarning({
  self,
  competitors,
}: {
  self: boolean;
  competitors: string[];
}) {
  if (!self && competitors.length === 0) return null;
  return (
    <div className={`${styles.notice} ${styles.noticeWarning} mt-sm`} role="note">
      <AlertTriangle size={18} aria-hidden="true" />
      <div>
        {self && (
          <p className="mb-0">
            Esta consulta incluye el nombre de tu empresa. El resultado medirá
            reconocimiento de marca, no descubrimiento espontáneo, y reduce su
            valor como prueba.
          </p>
        )}
        {competitors.length > 0 && (
          <p className="mb-0">
            Esta consulta incluye el nombre de un competidor
            {competitors.length > 1 ? 'es' : ''}: {competitors.join(', ')}.
          </p>
        )}
      </div>
    </div>
  );
}

export default function StageQueries({
  business,
  queries,
  onContinue,
  onBack,
  headingRef,
}: StageQueriesProps) {
  const initialBase = useMemo(() => {
    const existing = queries.filter((q) => !q.personalizada);
    return existing.length === 3 ? existing : buildBaseQueries(business);
  }, [queries, business]);

  const initialCustom = useMemo(
    () => queries.find((q) => q.personalizada) ?? createCustomQuery(),
    [queries],
  );

  const [base, setBase] = useState<LabQuery[]>(initialBase);
  const [custom, setCustom] = useState<LabQuery>(initialCustom);
  const [emptyError, setEmptyError] = useState(false);

  const updateBase = (id: string, texto: string) => {
    setBase((prev) => prev.map((q) => (q.id === id ? { ...q, texto } : q)));
    setEmptyError(false);
  };

  const restoreBase = (id: string) => {
    setBase((prev) =>
      prev.map((q) => (q.id === id ? { ...q, texto: q.original } : q)),
    );
  };

  const activeQueries = useMemo(() => {
    const list = [...base];
    if (custom.texto.trim()) list.push(custom);
    return list;
  }, [base, custom]);

  const totalChecks = activeQueries.length * ENGINES.length;

  const handleContinue = () => {
    if (base.some((q) => q.texto.trim().length === 0)) {
      setEmptyError(true);
      return;
    }
    onContinue(activeQueries);
  };

  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1}>
        Consultas de prueba
      </h2>
      <p className="text-secondary mb-md">
        Estas consultas se han generado con plantillas a partir de tus datos.
        Puedes editarlas antes de empezar. Cada consulta admite un máximo de{' '}
        {LIMITS.queryMax} caracteres.
      </p>

      {base.map((query, index) => {
        const { self, competitors } = detectBrandMentions(query.texto, business);
        const edited = query.texto !== query.original;
        const isEmpty = query.texto.trim().length === 0;
        const id = `lab-query-${query.id}`;
        return (
          <div key={query.id} className={`card card--no-hover ${styles.queryCard}`}>
            <div className={styles.queryHead}>
              <span className="badge badge--tag badge--cyan">
                Consulta {index + 1} · {QUERY_TYPE_LABELS[query.tipo]}
              </span>
              <div className={styles.queryActions}>
                <span className={styles.charCount}>
                  {query.texto.length}/{LIMITS.queryMax}
                </span>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => restoreBase(query.id)}
                  disabled={!edited}
                >
                  <RotateCcw size={16} aria-hidden="true" /> Restaurar
                </button>
              </div>
            </div>
            <label htmlFor={id} className="sr-only">
              Texto de la consulta {index + 1}
            </label>
            <textarea
              id={id}
              className={`form__textarea ${
                isEmpty && emptyError ? 'form__textarea--error' : ''
              }`}
              value={query.texto}
              maxLength={LIMITS.queryMax}
              rows={2}
              onChange={(e) => updateBase(query.id, e.target.value)}
            />
            {isEmpty && emptyError && (
              <div className="form__error">La consulta no puede estar vacía.</div>
            )}
            <BrandWarning self={self} competitors={competitors} />
          </div>
        );
      })}

      <div className={`card card--no-hover ${styles.queryCard}`}>
        <div className={styles.queryHead}>
          <span className="badge badge--tag badge--cyan">
            Consulta 4 · {QUERY_TYPE_LABELS.personalizada} (opcional)
          </span>
          <span className={styles.charCount}>
            {custom.texto.length}/{LIMITS.queryMax}
          </span>
        </div>
        <label
          htmlFor="lab-query-custom"
          className="text-muted text-sm mb-sm"
          style={{ display: 'block' }}
        >
          Puedes añadir una cuarta pregunta propia. Si la añades, el laboratorio
          tendrá {4 * ENGINES.length} comprobaciones en lugar de{' '}
          {3 * ENGINES.length}.
        </label>
        <textarea
          id="lab-query-custom"
          className="form__textarea"
          value={custom.texto}
          maxLength={LIMITS.queryMax}
          rows={2}
          placeholder="Escribe aquí tu consulta personalizada (opcional)"
          onChange={(e) =>
            setCustom((prev) => ({ ...prev, texto: e.target.value }))
          }
        />
        <BrandWarning
          {...detectBrandMentions(custom.texto, business)}
        />
      </div>

      <div className={`${styles.notice} ${styles.noticeInfo} mt-md`}>
        <div>
          <span className={styles.noticeTitle}>Resumen previo</span>
          <p className="mb-0">
            Realizarás {totalChecks} comprobaciones: {activeQueries.length}{' '}
            {activeQueries.length === 1 ? 'consulta' : 'consultas'} en{' '}
            {ENGINES.length} motores de IA.
          </p>
        </div>
      </div>

      <div className={styles.navRow}>
        <button type="button" className="btn btn--secondary" onClick={onBack}>
          Volver a editar el negocio
        </button>
        <button type="button" className="btn btn--primary" onClick={handleContinue}>
          Empezar las pruebas
        </button>
      </div>
    </div>
  );
}
