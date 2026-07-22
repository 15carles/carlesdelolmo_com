import React from 'react';
import Link from 'next/link';

interface PorQueItem {
  title: string;
  description: string;
}

const items: PorQueItem[] = [
  {
    title: 'Diagnóstico antes que herramientas',
    description: 'Primero identifico qué está fallando y qué debe resolver la web. La solución viene después.',
  },
  {
    title: 'Decisiones explicadas con claridad',
    description: 'Cada elección tiene una razón comprensible, desde la estructura hasta el enfoque de cada página.',
  },
  {
    title: 'SEO, GEO y negocio en la misma dirección',
    description: 'La visibilidad y la conversión no se añaden al final. Forman parte del planteamiento desde el inicio.',
  },
  {
    title: 'Un único criterio de principio a fin',
    description: 'Estrategia, contenido, diseño y evolución se trabajan como partes de un mismo sistema.',
  },
];

export default function PorQueConmigoSection() {
  return (
    <section id="por-que-conmigo" className="section section--band" aria-labelledby="por-que-conmigo-title">
      <div className="container">
        <div className="split-section">
          <div className="split-section__aside animate-on-scroll">
            <header className="section-header section-header--left">
              <p className="section-header__eyebrow">Por qué conmigo</p>
              <h2 id="por-que-conmigo-title" className="section-header__title">
                Primero entiendo el problema. Después planteo la web.
              </h2>
              <p className="section-header__subtitle">
                No parto de una solución cerrada. Primero entiendo el negocio, el problema y el
                objetivo. A partir de ahí, planteo una web con una función clara y decisiones que
                se puedan explicar.
              </p>
            </header>

            <div className="section-actions section-actions--left mt-xl" role="group" aria-label="Acciones de por qué conmigo">
              <Link href="/diseno-web/valencia" className="btn btn--primary">Ver enfoque de diseño web</Link>
              <Link href="/contacto" className="action-link">Hablar sobre tu web</Link>
            </div>
          </div>

          <ul className="editorial-list split-section__body animate-on-scroll">
            {items.map((item, index) => (
              <li key={item.title} className="editorial-item">
                <span className="editorial-item__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="editorial-item__title">{item.title}</h3>
                  <p className="editorial-item__description">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
