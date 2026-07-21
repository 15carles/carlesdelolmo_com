import React from 'react';
import Link from 'next/link';

export type SeoServiceId = 'auditoria' | 'posicionamiento' | 'autoridad';

interface SeoServiceChooserProps {
  /** Página actual, para marcarla como "estás aquí" y no enlazarla a sí misma. */
  current?: SeoServiceId;
  /** Título de la sección. Se puede personalizar por página. */
  title?: string;
  /** Subtítulo de la sección. */
  subtitle?: string;
}

interface ServiceChoice {
  id: SeoServiceId;
  step: string;
  role: string;
  question: string;
  title: string;
  description: string;
  href: string;
}

const SERVICES: ServiceChoice[] = [
  {
    id: 'auditoria',
    step: '01',
    role: 'Diagnóstico',
    question: '«No sé por qué no aparezco ni qué está fallando»',
    title: 'Auditoría SEO + GEO',
    description:
      'Radiografía de tu visibilidad en Google y en las respuestas de IA, con un plan de acción priorizado. Es el punto de partida y filtro para proyectos mayores.',
    href: '/servicio-seo/auditoria-seo-geo',
  },
  {
    id: 'posicionamiento',
    step: '02',
    role: 'Trabajo continuo',
    question: '«Quiero mejorar mes a mes en buscadores y en IA»',
    title: 'Posicionamiento SEO + GEO',
    description:
      'Servicio mensual de implementación: arquitectura, contenido, entidad y SEO local para ganar y mantener posiciones de forma sostenida.',
    href: '/servicio-seo/posicionamiento-seo-geo',
  },
  {
    id: 'autoridad',
    step: '03',
    role: 'Diferencial',
    question: '«Quiero que ChatGPT, Gemini o Perplexity entiendan y citen mi marca»',
    title: 'Autoridad Digital para IAs',
    description:
      'La capa de entidad y autoridad temática para que tu marca sea comprendida, resumida y citada como fuente fiable por los sistemas de IA.',
    href: '/servicio-seo/autoridad-digital-ias',
  },
];

export default function SeoServiceChooser({
  current,
  title = '¿Cuál de los tres necesitas?',
  subtitle = 'No son tres servicios sueltos: son tres momentos del mismo proceso. Según el punto en el que estés, empezamos por uno u otro.',
}: SeoServiceChooserProps) {
  return (
    <section className="section section-services" aria-labelledby="seo-chooser-title">
      <div className="container">
        <div className="section-heading section-header animate-on-scroll">
          <span className="section-eyebrow badge badge--blue mb-lg">Cómo encajan</span>
          <h2 id="seo-chooser-title" className="section-header__title">
            {title}
          </h2>
          <p className="section-header__subtitle">{subtitle}</p>
        </div>

        <div className="services-grid grid grid-cols-3 gap-lg">
          {SERVICES.map((service) => {
            const isCurrent = service.id === current;
            return (
              <article
                key={service.id}
                className="service-card animate-on-scroll"
                aria-current={isCurrent ? 'page' : undefined}
              >
                <p className="editorial-item__label editorial-item__label--accent">
                  {service.step} · {service.role}
                </p>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">
                  <strong>{service.question}</strong>
                </p>
                <p className="service-card__description">{service.description}</p>
                {isCurrent ? (
                  <span className="badge badge--status" aria-hidden="true">
                    <span>Estás viendo esta página</span>
                  </span>
                ) : (
                  <Link href={service.href} className="btn btn--secondary">
                    Ver {service.title}
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
