import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface OrbitaItem {
  letter: string;
  title: string;
}

const orbitaItems: OrbitaItem[] = [
  { letter: 'O', title: 'Optimización técnica' },
  { letter: 'R', title: 'Relevancia semántica' },
  { letter: 'B', title: 'Base de autoridad' },
  { letter: 'I', title: 'Interpretación por IA' },
  { letter: 'T', title: 'Tráfico cualificado' },
  { letter: 'A', title: 'Actualización continua' },
];

export default function MetodoOrbitaSection() {
  return (
    <section id="metodo-orbita" className="section" aria-labelledby="metodo-orbita-title">
      <div className="container">
        <header className="section-header section-header--left orbita-home-heading animate-on-scroll mb-2xl">
          <p className="section-header__eyebrow">Método de trabajo</p>
          <h2 id="metodo-orbita-title" className="section-header__title">
            Trabajo con un enfoque estructurado: método ORBITA
          </h2>
          <p className="section-header__subtitle">
            Un sistema para plantear la web como base digital: comunicar bien, posicionar con criterio
            y evolucionar con el tiempo.
          </p>
        </header>

        <div className="orbita-home-layout">
          <div className="orbita-home-content animate-on-scroll">
            <ul className="editorial-list editorial-list--two-col orbita-home-letters">
              {orbitaItems.map((item) => (
                <li key={item.letter} className="editorial-item">
                  <span className="editorial-item__num" aria-hidden="true">{item.letter}</span>
                  <div>
                    <h3 className="editorial-item__title">{item.title}</h3>
                  </div>
                </li>
              ))}
            </ul>

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
