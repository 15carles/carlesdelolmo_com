import React from 'react';
import Link from 'next/link';

interface ServicioItem {
  title: string;
  description: string;
  label: string;
  badgeClass: string;
  featured?: boolean;
}

const servicios: ServicioItem[] = [
  {
    title: 'Diseño y desarrollo web',
    description:
      'Creo páginas web profesionales, claras y bien estructuradas para que tu negocio transmita mejor, gane solidez y tenga una base técnica preparada para crecer.',
    label: 'Servicio principal',
    badgeClass: 'badge--purple',
    featured: true,
  },
  {
    title: 'SEO y estructura para posicionar',
    description:
      'Trabajo la arquitectura, los contenidos y la organización de la web para facilitar una mejor comprensión por parte de buscadores y reforzar la visibilidad orgánica.',
    label: 'Visibilidad orgánica',
    badgeClass: 'badge--blue',
  },
  {
    title: 'Preparación para IA y GEO',
    description:
      'Optimizo la base semántica y la claridad del sitio para que tu presencia digital esté mejor preparada para entornos de inteligencia artificial y sistemas de respuesta.',
    label: 'Entornos IA',
    badgeClass: 'badge--cyan',
  },
  {
    title: 'Automatización como apoyo',
    description:
      'Cuando el proyecto lo necesita, también puedo integrar automatizaciones para mejorar captación, seguimiento de leads o eficiencia operativa.',
    label: 'Eficiencia operativa',
    badgeClass: 'badge--teal',
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="section" aria-labelledby="servicios-title">
      <div className="container">
        <header className="section-header animate-on-scroll">
          <h2 id="servicios-title" className="section-header__title">
            Servicios pensados para construir una presencia digital sólida
          </h2>
          <p className="section-header__subtitle">
            No trabajo la web como una pieza aislada. La planteo como una base digital
            que debe comunicar bien, posicionar con criterio y ayudarte a generar oportunidades.
          </p>
        </header>

        <div className="grid grid-cols-2 servicios-grid">
          {servicios.map((servicio) => (
            <article
              key={servicio.title}
              className={`service-card servicio-item animate-on-scroll ${servicio.featured ? 'service-card--featured servicio-item--featured' : ''}`}
            >
              <div className="servicio-item__top">
                <span className={`badge badge--tag ${servicio.badgeClass} servicio-item__badge`}>{servicio.label}</span>
              </div>
              <h3 className="service-card__title servicio-item__title">{servicio.title}</h3>
              <p className="service-card__description servicio-item__description">{servicio.description}</p>
            </article>
          ))}
        </div>

        <div className="section-actions animate-on-scroll" role="group" aria-label="Acciones de servicios">
          <Link href="/pricing" className="btn btn--primary">Ver servicios y precios</Link>
          <Link href="/contacto" className="btn btn--secondary">Cuéntame tu proyecto</Link>
        </div>
      </div>
    </section>
  );
}
