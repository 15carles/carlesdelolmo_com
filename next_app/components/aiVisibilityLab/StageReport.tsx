import React, { useState } from 'react';
import { AlertTriangle, Check, Copy, Info, Printer, Send } from 'lucide-react';
import Link from 'next/link';
import styles from './VisibilityLab.module.css';
import type { LabSession, TestResult } from '@/lib/aiVisibilityLab/types';
import { computeReport } from '@/lib/aiVisibilityLab/report';
import { buildResultsSummaryText } from '@/lib/aiVisibilityLab/contactPrefill';
import {
  ENGINES,
  QUERY_TYPE_LABELS,
  APPEARANCE_SHORT,
  SOURCE_SHORT,
  ACCURACY_SHORT,
  METHODOLOGY_VERSION,
  LIMITATION_TEXTS,
  RELATED_ARTICLE_HREF,
} from '@/lib/aiVisibilityLab/config';
import { domainHost } from '@/lib/aiVisibilityLab/utils';

interface StageReportProps {
  session: LabSession;
  onContact: () => void;
  onPrint: () => void;
  onEditResults: () => void;
  onRepeat: () => void;
  onReset: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

function competitorCell(r: TestResult): string {
  const parts = [...r.competidoresConocidos];
  if (r.otrasEmpresasFlag) parts.push('otras empresas');
  if (parts.length > 0) return parts.join(', ');
  if (r.ningunCompetidor) return 'Ninguno';
  if (r.competidorNoSeguro) return 'No seguro';
  return '—';
}

export default function StageReport({
  session,
  onContact,
  onPrint,
  onEditResults,
  onRepeat,
  onReset,
  headingRef,
}: StageReportProps) {
  const report = computeReport(session);
  const { metrics } = report;
  const { business, queries, results } = session;

  const [copyState, setCopyState] = useState<'idle' | 'ok' | 'error'>('idle');

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(
        buildResultsSummaryText(session, metrics),
      );
      setCopyState('ok');
    } catch {
      setCopyState('error');
    }
  };

  const lastSaved = results
    .filter((r) => r.status === 'guardada' && r.fechaISO)
    .map((r) => r.fechaISO as string)
    .sort()
    .pop();

  const engineName = (id: string) =>
    ENGINES.find((e) => e.id === id)?.name ?? id;
  const queryLabel = (id: string) => {
    const q = queries.find((x) => x.id === id);
    return q ? QUERY_TYPE_LABELS[q.tipo] : id;
  };

  const header = (
    <div className="card card--no-hover mb-md">
      <h2 ref={headingRef} tabIndex={-1} className="card__title text-left mb-sm">
        Informe de visibilidad en IA
      </h2>
      <div className={styles.reportHeaderGrid}>
        <p className={styles.reportHeaderItem}>
          <strong>Empresa:</strong> {business.nombre}
        </p>
        <p className={styles.reportHeaderItem}>
          <strong>Dominio:</strong> {domainHost(business.dominio)}
        </p>
        <p className={styles.reportHeaderItem}>
          <strong>Servicio:</strong> {business.servicio}
        </p>
        <p className={styles.reportHeaderItem}>
          <strong>Ubicación:</strong> {business.ubicacion}
        </p>
        <p className={styles.reportHeaderItem}>
          <strong>Fecha de inicio:</strong> {formatDate(session.createdISO)}
        </p>
        <p className={styles.reportHeaderItem}>
          <strong>Fecha de finalización:</strong> {formatDate(lastSaved ?? null)}
        </p>
        <p className={styles.reportHeaderItem}>
          <strong>Pruebas evaluables:</strong> {metrics.evaluables}
        </p>
        <p className={styles.reportHeaderItem}>
          <strong>Pruebas pendientes:</strong> {metrics.pendientes}
        </p>
        <p className={styles.reportHeaderItem}>
          <strong>Metodología:</strong> {METHODOLOGY_VERSION}
        </p>
      </div>
    </div>
  );

  // Cabecera del documento impreso (solo visible al exportar a PDF).
  const printHeader = (
    <div className={`${styles.printOnly} ${styles.printDocHeader}`}>
      <h2>Laboratorio de visibilidad en IA</h2>
      <p>carlesdelolmo.com · {METHODOLOGY_VERSION}</p>
    </div>
  );

  // Sin datos suficientes para comparar (§9, §17).
  if (metrics.evaluables < 3) {
    const onlyNotEvaluable =
      metrics.evaluables === 0 && metrics.noEvaluables > 0;
    return (
      <div>
        {header}
        <div className={`${styles.notice} ${styles.noticeWarning}`} role="status">
          <AlertTriangle size={20} aria-hidden="true" />
          <p className="mb-0">
            {onlyNotEvaluable
              ? 'Las respuestas registradas no permiten calcular resultados. Revisa las pruebas marcadas como no evaluables.'
              : 'Todavía no hay resultados suficientes para generar una comparación útil. Completa al menos tres pruebas evaluables.'}
          </p>
        </div>
        <div className={`${styles.navRow} ${styles.noPrint}`}>
          <button type="button" className="btn btn--secondary" onClick={onReset}>
            Borrar todos los datos
          </button>
          <button type="button" className="btn btn--primary" onClick={onEditResults}>
            Continuar con las pruebas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.reportRoot}>
      {printHeader}
      {header}

      {report.isPartial && (
        <div className={`${styles.notice} ${styles.noticeWarning} mb-md`} role="status">
          <AlertTriangle size={20} aria-hidden="true" />
          <p className="mb-0">
            El informe se basa en una muestra incompleta. Completa las pruebas
            pendientes para obtener una comparación más representativa.
          </p>
        </div>
      )}

      {/* Métricas principales (§10) */}
      <h3>Métricas principales</h3>
      <div className={styles.metricGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>{metrics.presencia}</div>
          <div className={styles.metricLabel}>Presencia (menciones)</div>
          <p className={styles.metricDetail}>
            Apareció en {metrics.presencia} de {metrics.evaluables} pruebas
            evaluables.
          </p>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>{metrics.recomendaciones}</div>
          <div className={styles.metricLabel}>Recomendaciones</div>
          <p className={styles.metricDetail}>
            Recomendada de forma destacada en {metrics.recomendaciones} de{' '}
            {metrics.evaluables} pruebas.
          </p>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>{metrics.citaciones}</div>
          <div className={styles.metricLabel}>Citaciones del dominio</div>
          <p className={styles.metricDetail}>
            Tu dominio se usó como fuente en {metrics.citaciones} respuestas.
          </p>
        </div>
      </div>

      {/* Exactitud */}
      <div className="card card--no-hover mt-md">
        <h4 className="mb-sm">Exactitud de las menciones</h4>
        <div className={styles.tally}>
          <span>
            Correctas: <strong>{metrics.exactitud.correcta}</strong>
          </span>
          <span>
            Parcialmente incorrectas: <strong>{metrics.exactitud.parcial}</strong>
          </span>
          <span>
            Incorrectas: <strong>{metrics.exactitud.incorrecta}</strong>
          </span>
          <span>
            No evaluables: <strong>{metrics.exactitud.insuficiente + metrics.exactitud.noSeguro}</strong>
          </span>
        </div>
      </div>

      {/* Competencia */}
      <div className="card card--no-hover mt-md">
        <h4 className="mb-sm">Competencia</h4>
        <p className="text-secondary mb-sm">
          Algún competidor apareció en {metrics.competencia.conCompetidor} pruebas.
          En {metrics.competencia.competidorSinEmpresa} de ellas apareció un
          competidor, pero no tu empresa.
        </p>
        {metrics.competencia.porCompetidor.length > 0 && (
          <div className={styles.tally}>
            {metrics.competencia.porCompetidor.map((c) => (
              <span key={c.name}>
                {c.name}: <strong>{c.count}</strong>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tabla completa (§10) — nueva hoja en el PDF */}
      <section className={styles.pageBreak}>
      <h3 className="mt-lg">Tabla de comprobaciones</h3>
      <div className={styles.tableWrap}>
        <table className="article-table">
          <caption className="sr-only">
            Resultado de cada comprobación por consulta y motor
          </caption>
          <thead>
            <tr>
              <th scope="col">Consulta</th>
              <th scope="col">Motor</th>
              <th scope="col">Resultado</th>
              <th scope="col">Fuente</th>
              <th scope="col">Exactitud</th>
              <th scope="col">Competidores</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => {
              const pending = r.status === 'pendiente';
              const noEval = r.aparicion === 'no_evaluable';
              return (
                <tr key={r.id}>
                  <th scope="row">{queryLabel(r.queryId)}</th>
                  <td>{engineName(r.engineId)}</td>
                  <td>
                    {pending ? (
                      <span className={styles.statusPending}>Pendiente</span>
                    ) : noEval ? (
                      <span className={styles.statusNa}>No evaluable</span>
                    ) : (
                      r.aparicion && APPEARANCE_SHORT[r.aparicion]
                    )}
                  </td>
                  <td>{r.fuente ? SOURCE_SHORT[r.fuente] : '—'}</td>
                  <td>{r.exactitud ? ACCURACY_SHORT[r.exactitud] : '—'}</td>
                  <td>{pending ? '—' : competitorCell(r)}</td>
                  <td>{formatDate(r.fechaISO)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </section>

      {/* Diagnóstico, prioridades y conclusión (§11-§13) — nueva hoja en el PDF */}
      <section className={styles.pageBreak}>
      {/* Diagnóstico (§11) */}
      {report.diagnoses.length > 0 && (
        <>
          <h3 className="mt-lg">Diagnóstico</h3>
          <p className="text-secondary">
            El diagnóstico describe lo observado en la muestra. No confirma causas
            sin una auditoría específica.
          </p>
          <div className={styles.diagnosisList}>
            {report.diagnoses.map((d) => (
              <div key={d.id} className="card card--no-hover">
                <h4 className="mb-sm">{d.title}</h4>
                <p className="text-secondary">{d.message}</p>
                <p className="text-secondary mb-sm">
                  <strong>Áreas sugeridas para investigar:</strong>
                </p>
                <ul className={styles.stepsList} style={{ marginTop: 0 }}>
                  {d.areas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Prioridades (§12) */}
      {report.priorities.length > 0 && (
        <>
          <h3 className="mt-lg">Prioridades sugeridas</h3>
          <div className={styles.diagnosisList}>
            {report.priorities.map((p) => (
              <div key={p.id} className={styles.priorityItem}>
                <h4>{p.title}</h4>
                <dl>
                  <dt>Qué se ha observado</dt>
                  <dd>{p.observed}</dd>
                  <dt>Por qué importa</dt>
                  <dd>{p.matters}</dd>
                  <dt>Qué conviene revisar</dt>
                  <dd>{p.review}</dd>
                </dl>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Conclusión (§13) */}
      <div className={`${styles.notice} ${styles.noticeInfo} mt-lg`}>
        <Info size={20} aria-hidden="true" />
        <p className="mb-0">{LIMITATION_TEXTS.reportConclusion}</p>
      </div>
      </section>

      {/* Acciones (§14) — enviar el resultado a Carles de forma cómoda */}
      <div className={`card card--no-hover mt-lg ${styles.noPrint}`}>
        <h3 className="mb-sm">¿Quieres que revisemos juntos estos resultados?</h3>
        <p className="text-secondary mb-md">
          Adjuntaremos automáticamente un resumen de tus resultados a la consulta.
          Podrás revisarlo y editarlo antes de enviarlo, y no incluye tus notas
          privadas.
        </p>
        <div className={styles.reportActions}>
          <button
            type="button"
            className="btn btn--primary btn--large"
            onClick={onContact}
          >
            <Send size={18} aria-hidden="true" /> {report.ctaLabel}
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleCopySummary}
          >
            {copyState === 'ok' ? (
              <>
                <Check size={18} aria-hidden="true" /> Resumen copiado
              </>
            ) : (
              <>
                <Copy size={18} aria-hidden="true" /> Copiar resumen de resultados
              </>
            )}
          </button>
        </div>
        <p className={styles.copyStatus} aria-live="polite">
          {copyState === 'ok' &&
            'Resumen copiado. Puedes pegarlo en un email o WhatsApp para enviármelo.'}
          {copyState === 'error' && (
            <span className={styles.copyStatusError}>
              No se ha podido copiar automáticamente. Usa el botón de enviar la
              consulta o imprime el informe.
            </span>
          )}
        </p>
      </div>

      <div className={`${styles.reportActions} ${styles.noPrint}`}>
        <button type="button" className="btn btn--secondary" onClick={onPrint}>
          <Printer size={18} aria-hidden="true" /> Imprimir o guardar como PDF
        </button>
        <button type="button" className="btn btn--secondary" onClick={onEditResults}>
          Editar resultados
        </button>
        <button type="button" className="btn btn--secondary" onClick={onRepeat}>
          Repetir el laboratorio
        </button>
        <button type="button" className="btn btn--secondary" onClick={onReset}>
          Borrar todos los datos
        </button>
        <Link className="btn btn--secondary" href={RELATED_ARTICLE_HREF}>
          Por qué muchas webs no aparecen en respuestas de IA
        </Link>
      </div>
    </div>
  );
}
