import React from 'react';
import Link from 'next/link';

interface PorQueItem {
  title: string;
  description: string;
}

const items: PorQueItem[] = [
  {
    title: 'Claridad desde el primer vistazo',
    description: 'Se entiende qué haces, para quién y por qué elegirte.',
  },
  {
    title: 'SEO y GEO desde la base, no como parche',
    description: 'Estructura pensada para Google y para que la IA te cite.',
  },
  {
    title: 'Base técnica preparada para crecer',
    description: 'Rápida, ordenada y fácil de mantener y ampliar.',
  },
  {
    title: 'Enfoque estratégico, no solo estético',
    description: 'Diseño, contenido y negocio empujando en la misma dirección.',
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
                Qué hace que una web esté mejor planteada
              </h2>
              <p className="section-header__subtitle">
                No se trata solo de que una web se vea bien. Una base digital sólida ayuda a entender
                el negocio, transmitir confianza y ganar visibilidad.
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
