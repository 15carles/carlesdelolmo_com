import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface OrbitaItem {
  letter: string;
  title: string;
  description: string;
}

const orbitaItems: OrbitaItem[] = [
  {
    letter: 'O',
    title: 'Optimización técnica',
    description:
      'Rendimiento, código limpio, estructura semántica y una base sólida para que la web pueda funcionar y escalar bien.',
  },
  {
    letter: 'R',
    title: 'Relevancia semántica',
    description:
      'Claridad para explicar qué hace la empresa, qué ofrece y a quién se dirige.',
  },
  {
    letter: 'B',
    title: 'Base de autoridad',
    description:
      'Casos, contenidos e interlinks que refuerzan especialización y confianza.',
  },
  {
    letter: 'I',
    title: 'Interpretación por IA',
    description:
      'Estructura y claridad para que el contenido pueda ser entendido mejor por motores generativos y sistemas de respuesta.',
  },
  {
    letter: 'T',
    title: 'Tráfico cualificado',
    description:
      'El objetivo no es atraer visitas vacías, sino personas con una intención real.',
  },
  {
    letter: 'A',
    title: 'Actualización continua',
    description:
      'Una web útil no se abandona: mejora, se adapta y evoluciona con el negocio.',
  },
];

export default function MetodoOrbitaSection() {
  return (
    <section id="metodo-orbita" className="section" aria-labelledby="metodo-orbita-title">
      <div className="container">
        <header className="section-header animate-on-scroll orbita-home-heading">
          <h2 id="metodo-orbita-title" className="section-header__title">
            Trabajo con un enfoque estructurado: método ORBITA
          </h2>
          <p className="section-header__subtitle">
            No planteo una web solo como una pieza visual. La trabajo como una base digital
            que debe comunicar bien, posicionar con criterio y evolucionar con el tiempo.
          </p>
        </header>

        <div className="orbita-home-layout">
          <div className="orbita-home-content animate-on-scroll">
            <p className="orbita-home-intro">
              ORBITA es mi forma de entender el desarrollo web como un sistema completo de
              visibilidad digital. El objetivo no es solo tener presencia online, sino construir
              una web útil, clara y preparada para buscadores, inteligencia artificial y crecimiento.
            </p>

            <div className="orbita-home-grid">
              {orbitaItems.map((item) => (
                <article key={item.letter} className="orbita-home-item">
                  <h3 className="orbita-home-item__title">
                    <span className="orbita-home-item__letter" aria-hidden="true">{item.letter}</span>
                    <span>{item.title}</span>
                  </h3>
                  <p className="orbita-home-item__description">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="orbita-home-actions" role="group" aria-label="Acciones del método ORBITA">
              <Link href="/blog/metodo-orbita" className="btn btn--primary">Entender el método ORBITA</Link>
              <Link href="/contacto" className="btn btn--secondary">Cuéntame tu proyecto</Link>
            </div>
          </div>

          <aside className="orbita-home-media animate-on-scroll" aria-label="Resumen visual del método ORBITA">
            <figure className="orbita-home-figure">
              <div className="orbita-home-figure__media">
                <Image
                  src="/assets/blog/metodo-orbita/diagrama-metodo-ORBITA.webp"
                  alt="Esquema visual del método ORBITA aplicado al desarrollo web, SEO y GEO"
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="orbita-home-figure__image"
                />
              </div>
              <figcaption className="orbita-home-figure__caption">
                ORBITA resume cómo planteo una web como sistema de visibilidad, autoridad y evolución.
              </figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}
