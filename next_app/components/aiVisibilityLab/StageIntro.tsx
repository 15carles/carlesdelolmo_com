import React from 'react';
import { Info, ShieldCheck } from 'lucide-react';
import styles from './VisibilityLab.module.css';
import { ENGINES, LIMITATION_TEXTS } from '@/lib/aiVisibilityLab/config';

interface StageIntroProps {
  onStart: () => void;
  onShowMethodology: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}

const STEPS = [
  'Describe brevemente tu empresa.',
  'Realiza las consultas propuestas en tres motores de IA.',
  'Registra lo que aparece y consulta el informe.',
];

export default function StageIntro({
  onStart,
  onShowMethodology,
  headingRef,
}: StageIntroProps) {
  return (
    <div>
      <div className={`${styles.notice} ${styles.noticeInfo} mb-md`}>
        <ShieldCheck size={20} aria-hidden="true" />
        <p className="mb-0">{LIMITATION_TEXTS.privacyNotice}</p>
      </div>

      <p className="text-secondary">
        El laboratorio genera consultas basadas en tu actividad y te guía para
        realizar una prueba comparable en cada motor. Al terminar obtendrás un
        mapa de visibilidad, menciones, recomendaciones, fuentes y competidores.
      </p>

      <h2 ref={headingRef} tabIndex={-1} className="mt-lg">
        El laboratorio en tres pasos
      </h2>
      <ol className={styles.stepsList}>
        {STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <div className={`${styles.notice} mt-md`}>
        <Info size={20} aria-hidden="true" />
        <p className="mb-0">{LIMITATION_TEXTS.initialMethodology}</p>
      </div>

      <div className="card card--no-hover mt-md">
        <h3 className="card__title text-left mb-sm">
          Qué necesitarás para la prueba
        </h3>
        <p className="text-secondary mb-sm">
          Para realizar las comprobaciones necesitarás abrir estos tres motores
          de IA. No hace falta comprobar si tienes la sesión iniciada.
        </p>
        <ul className={styles.stepsList} style={{ marginTop: 0 }}>
          {ENGINES.map((engine) => (
            <li key={engine.id}>{engine.name}</li>
          ))}
        </ul>
      </div>

      <div className="mt-lg flex flex-col gap-sm items-center">
        <button type="button" className="btn btn--primary btn--large" onClick={onStart}>
          Iniciar el laboratorio
        </button>
        <button type="button" className="btn btn--secondary" onClick={onShowMethodology}>
          Ver cómo funciona la metodología
        </button>
      </div>
    </div>
  );
}
