import React from 'react';
import Link from 'next/link';
import { FlaskConical, Info, ShieldCheck } from 'lucide-react';
import styles from './VisibilityLab.module.css';
import {
  ENGINES,
  LIMITATION_TEXTS,
  RESEARCH_INTRO,
} from '@/lib/aiVisibilityLab/config';

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
      <div className="mb-lg flex flex-col gap-sm items-center">
        <button type="button" className="btn btn--primary btn--large" onClick={onStart}>
          Iniciar el laboratorio
        </button>
        <p className="text-muted text-sm mb-0 text-center" style={{ maxWidth: '38rem' }}>
          {RESEARCH_INTRO.ctaNote}{' '}
          <Link href="/politica-privacidad">Política de privacidad</Link>.
        </p>
        <button type="button" className="btn btn--secondary" onClick={onShowMethodology}>
          Ver cómo funciona la metodología
        </button>
      </div>

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

      {/* Transparencia del estudio: qué datos estadísticos se comparten y
          cuáles no (§10). La recogida real no ocurre aquí, sino al guardar el
          primer resultado (etapa 4), con aviso durante todo el flujo. */}
      <div className="card card--no-hover mt-md" aria-labelledby="lab-research-title">
        <h3 id="lab-research-title" className="card__title text-left mb-sm">
          <FlaskConical
            size={18}
            aria-hidden="true"
            style={{ verticalAlign: 'text-bottom', marginRight: '0.4rem' }}
          />
          {RESEARCH_INTRO.title}
        </h3>
        {RESEARCH_INTRO.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-secondary mb-sm">
            {paragraph}
          </p>
        ))}
        <details className={styles.sharedDataDetails}>
          <summary>{RESEARCH_INTRO.detailsSummary}</summary>
          <div className="grid grid-cols-2 gap-md mt-sm">
            <div>
              <h4 className="text-left mb-sm">Se comparte</h4>
              <ul className={styles.stepsList} style={{ marginTop: 0 }}>
                {RESEARCH_INTRO.shared.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-left mb-sm">No se comparte</h4>
              <ul className={styles.stepsList} style={{ marginTop: 0 }}>
                {RESEARCH_INTRO.notShared.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </div>

    </div>
  );
}
