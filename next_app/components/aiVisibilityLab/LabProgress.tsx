import React from 'react';
import styles from './VisibilityLab.module.css';

const STEPS = [
  { stage: 2, label: 'Datos del negocio' },
  { stage: 3, label: 'Consultas de prueba' },
  { stage: 4, label: 'Trabajo de campo' },
] as const;

interface LabProgressProps {
  /** Etapa actual (2, 3 o 4). */
  stage: number;
}

/**
 * Indicador de progreso de las etapas 2, 3 y 4 (§4). El estado se comunica con
 * texto además de con color para no depender únicamente del color (§18).
 */
export default function LabProgress({ stage }: LabProgressProps) {
  const totalSteps = STEPS.length;
  const currentIndex = STEPS.findIndex((s) => s.stage === stage);
  const percent = ((currentIndex + 1) / totalSteps) * 100;

  return (
    <nav className={styles.progress} aria-label="Progreso del laboratorio">
      <ol className={styles.progressSteps}>
        {STEPS.map((step, index) => {
          const isCurrent = step.stage === stage;
          const isDone = index < currentIndex;
          const className = [
            styles.progressStep,
            isCurrent ? styles.progressStepCurrent : '',
            isDone ? styles.progressStepDone : '',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <li
              key={step.stage}
              className={className}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span aria-hidden="true">{index + 1}.</span> {step.label}
              {isDone && <span className="sr-only"> (completado)</span>}
              {isCurrent && <span className="sr-only"> (etapa actual)</span>}
            </li>
          );
        })}
      </ol>
      <div
        className={styles.progressBarTrack}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={currentIndex + 1}
        aria-valuetext={`Paso ${currentIndex + 1} de ${totalSteps}`}
      >
        <div className={styles.progressBarFill} style={{ width: `${percent}%` }} />
      </div>
      <p className={styles.progressMeta}>
        Paso {currentIndex + 1} de {totalSteps}
      </p>
    </nav>
  );
}
