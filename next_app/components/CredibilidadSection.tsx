import React from 'react';
import Link from 'next/link';

interface CredibilidadItem {
  title: string;
  description: string;
}

const credibilidadItems: CredibilidadItem[] = [
  {
    title: 'Proyectos reales',
    description:
      'Trabajo sobre casos y necesidades concretas, no sobre soluciones genéricas ni plantillas sin criterio.',
  },
  {
    title: 'Desarrollo a medida',
    description:
      'Cada web se plantea según el negocio, su propuesta de valor y los objetivos que debe cumplir.',
  },
  {
    title: 'SEO + GEO desde la base',
    description:
      'No añado posicionamiento al final: la estructura, el contenido y la arquitectura se plantean desde el inicio para buscadores e IA.',
  },
  {
    title: 'Valencia y remoto',
    description:
      'Trabajo con empresas de Valencia y también con proyectos que necesitan una presencia digital sólida más allá del ámbito local.',
  },
];

export default function CredibilidadSection() {
  return (
    <section id="credibilidad" className="section" aria-labelledby="credibilidad-title">
      <div className="container">
        <header className="section-header animate-on-scroll credibilidad-heading">
          <h2 id="credibilidad-title" className="section-header__title">Diseño web con enfoque estratégico</h2>
          <p className="section-header__subtitle">
            Desarrollo webs pensadas para transmitir mejor, posicionar con más solidez
            y servir como base real para crecer en buscadores y entornos de IA.
          </p>
        </header>

        <div className="grid grid-cols-2 credibilidad-grid">
          {credibilidadItems.map((item) => (
            <article key={item.title} className="card credibilidad-item animate-on-scroll">
              <h3 className="credibilidad-item__title">{item.title}</h3>
              <p className="credibilidad-item__description">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="section-actions animate-on-scroll mt-xl" role="group" aria-label="Enlaces de credibilidad">
          <Link href="/blog/metodo-orbita" className="btn btn--secondary">Entender mi método</Link>
          <Link href="/proyectos/ledescaparate" className="btn btn--primary">Ver un caso real</Link>
          <Link href="/diseno-web/valencia" className="btn btn--secondary">Ver diseño web en Valencia</Link>
        </div>
      </div>
    </section>
  );
}
