import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CaseMetric {
  value: string;
  label: string;
}

const metrics: CaseMetric[] = [
  {
    value: '+250%',
    label: 'Tráfico orgánico desde IA en los primeros 30 días',
  },
  {
    value: '1 y 2',
    label: 'Puestos en Google para sus keywords principales, en varias ciudades',
  },
  {
    value: '100/100/98/97',
    label: 'Lighthouse: SEO, rendimiento, buenas prácticas y accesibilidad',
  },
];

export default function CasoDestacadoSection() {
  return (
    <section id="caso-destacado" className="section" aria-labelledby="caso-destacado-title">
      <div className="container">
        <header className="section-header section-header--left case-study-heading animate-on-scroll mb-2xl">
          <p className="section-header__eyebrow">Caso real</p>
          <h2 id="caso-destacado-title" className="section-header__title">Caso de estudio destacado</h2>
          <p className="section-header__subtitle">
            Una muestra real de cómo planteo un proyecto web con enfoque estratégico y una base
            preparada para posicionar y crecer.
          </p>
        </header>

        <article className="case-study-featured animate-on-scroll">
          <div className="case-study-media">
            <figure className="case-study-figure">
              <div className="case-study-figure__media">
                <Image
                  src="/assets/images/muestras/ledescaparate_muestra.webp"
                  alt="Captura del proyecto web LEDescaparate desarrollado por Carles del Olmo"
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="case-study-figure__image"
                />
              </div>
              <figcaption className="case-study-figure__caption">
                LEDescaparate: una web planteada para presentar mejor la propuesta, ordenar la
                información y reforzar la presencia digital del negocio.
              </figcaption>
            </figure>
          </div>

          <div className="case-study-content">
            <p className="badge badge--tag badge--purple case-study-label">Proyecto destacado</p>

            <h3 className="case-study-title">LEDescaparate</h3>

            <p className="case-study-intro">
              LEDescaparate partía de un dominio nuevo en un sector muy competitivo. En unos 30 días
              construimos un ecosistema digital que lo convirtió en referencia, tanto en Google como
              en las respuestas de IA.
            </p>

            <ul className="case-metrics" aria-label="Resultados del proyecto LEDescaparate">
              {metrics.map((metric) => (
                <li key={metric.value} className="case-metric">
                  <span className="case-metric__value">{metric.value}</span>
                  <span className="case-metric__label">{metric.label}</span>
                </li>
              ))}
            </ul>

            <div className="case-study-actions" role="group" aria-label="Acciones del caso de estudio">
              <Link href="/proyectos/ledescaparate" className="btn btn--primary">Ver caso completo</Link>
              <Link href="/proyectos" className="btn btn--secondary">Ver más proyectos</Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
