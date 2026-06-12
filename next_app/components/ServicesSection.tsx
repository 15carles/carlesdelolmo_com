import React from 'react';
import Link from 'next/link';

interface ServicioItem {
  title: string;
  description: string;
  label: string;
  featured?: boolean;
}

const servicios: ServicioItem[] = [
  {
    title: 'Diseño y desarrollo web',
    description:
      'Creo páginas web profesionales, claras y bien estructuradas para que tu negocio transmita mejor, gane solidez y tenga una base técnica preparada para crecer.',
    label: 'Servicio principal',
    featured: true,
  },
  {
    title: 'SEO y estructura para posicionar',
    description:
      'Trabajo la arquitectura, los contenidos y la organización de la web para facilitar una mejor comprensión por parte de buscadores y reforzar la visibilidad orgánica.',
    label: 'Visibilidad orgánica',
  },
  {
    title: 'Preparación para IA y GEO',
    description:
      'Optimizo la base semántica y la claridad del sitio para que tu presencia digital esté mejor preparada para entornos de inteligencia artificial y sistemas de respuesta.',
    label: 'Entornos IA',
  },
  {
    title: 'Automatización como apoyo',
    description:
      'Cuando el proyecto lo necesita, también puedo integrar automatizaciones para mejorar captación, seguimiento de leads o eficiencia operativa.',
    label: 'Eficiencia operativa',
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="section" aria-labelledby="servicios-title">
      <div className="container">
        <div className="split-section">
          <div className="split-section__aside animate-on-scroll">
            <header className="section-header section-header--left">
              <p className="section-header__eyebrow">Servicios</p>
              <h2 id="servicios-title" className="section-header__title">
                Servicios pensados para construir una presencia digital sólida
              </h2>
              <p className="section-header__subtitle">
                No trabajo la web como una pieza aislada. La planteo como una base digital
                que debe comunicar bien, posicionar con criterio y ayudarte a generar oportunidades.
              </p>
            </header>

            <div className="section-actions section-actions--left mt-xl" role="group" aria-label="Acciones de servicios">
              <Link href="/pricing" className="btn btn--primary">Ver servicios y precios</Link>
              <Link href="/diseno-web/valencia" className="action-link">Diseño web en Valencia</Link>
              <Link href="/proyectos/ledescaparate" className="action-link">Ver un caso real</Link>
              <Link href="/contacto" className="action-link">Cuéntame tu proyecto</Link>
            </div>
          </div>

          <ol className="editorial-list split-section__body animate-on-scroll">
            {servicios.map((servicio, index) => (
              <li key={servicio.title} className="editorial-item">
                <span className="editorial-item__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p className={`editorial-item__label ${servicio.featured ? 'editorial-item__label--accent' : ''}`}>
                    {servicio.label}
                  </p>
                  <h3 className="editorial-item__title">{servicio.title}</h3>
                  <p className="editorial-item__description">{servicio.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
