import React from 'react';
import Image from 'next/image';
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
      'Webs profesionales, claras y bien estructuradas para que tu negocio transmita mejor y crezca.',
    label: 'Servicio principal',
    featured: true,
  },
  {
    title: 'Visibilidad en IA y GEO',
    description:
      'Estructuro tu web para que ChatGPT, Gemini o Perplexity entiendan y puedan citar tu marca.',
    label: 'Tu diferencial',
  },
  {
    title: 'SEO y estructura para posicionar',
    description:
      'Arquitectura, contenidos y organización pensados para mejorar tu visibilidad orgánica.',
    label: 'Visibilidad orgánica',
  },
  {
    title: 'Automatización como apoyo',
    description:
      'Cuando el proyecto lo pide, integro automatizaciones para captar y hacer seguimiento de leads.',
    label: 'Eficiencia operativa',
  },
];

interface MosaicoItem {
  src: string;
  alt: string;
}

const mosaico: MosaicoItem[] = [
  {
    src: '/assets/images/mockups/mockup_colorvibe.webp',
    alt: 'Mockup de web de marca creativa diseñada por Carles del Olmo',
  },
  {
    src: '/assets/images/mockups/mockup_synapse_ops.webp',
    alt: 'Mockup de plataforma web B2B con estructura orientada a negocio',
  },
  {
    src: '/assets/images/mockups/mockup_ecohoagr.webp',
    alt: 'Mockup de web de producto con enfoque claro y orientado a conversión',
  },
  {
    src: '/assets/images/mockups/mockup_multi.webp',
    alt: 'Mockup de web corporativa multidispositivo con jerarquía visual clara',
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
                No trabajo la web como una pieza aislada, sino como una base digital que comunica,
                posiciona y genera oportunidades.
              </p>
            </header>

            <div className="section-actions section-actions--left mt-xl" role="group" aria-label="Acciones de servicios">
              <Link href="/pricing" className="btn btn--primary">Ver servicios y precios</Link>
              <Link href="/diseno-web" className="action-link">Servicio de diseño web</Link>
              <Link href="/servicio-seo/autoridad-digital-ias" className="action-link">Visibilidad en IA (GEO)</Link>
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

        <ul className="services-mosaic animate-on-scroll" aria-label="Muestras de proyectos web">
          {mosaico.map((item) => (
            <li key={item.src} className="services-mosaic__item">
              <Image
                src={item.src}
                alt={item.alt}
                width={800}
                height={600}
                loading="lazy"
                className="services-mosaic__image"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
