import React from 'react';
import ContactForm from '@/components/ContactForm';
import { constructMetadata } from '@/lib/seo/metadata';
import { ENTITY, SITE_URL } from '@/lib/seo/entity';

export const metadata = constructMetadata({
  title: 'Contacto | Carles del Olmo - SEO y GEO',
  description: 'Contacta con Carles del Olmo para impulsar tu negocio con Diseño Web, SEO técnico y GEO (Generative Engine Optimization).',
  exactUrl: `${SITE_URL}/contacto`,
});

export default function ContactPage() {
  return (
    <main className="page__content">
      <section id="contacto" className="pricing-contact">
        <div className="container">
          <header className="section-header animate-on-scroll mb-lg">
            <h1 className="section-header__title">Contacto</h1>
            <p className="section-header__subtitle">
              Sitio web oficial de {ENTITY.name}, diseñador web en Valencia especializado en SEO técnico, GEO y automatizaciones.
            </p>
          </header>

          <ContactForm />

          <div className="card card--no-hover mt-lg animate-on-scroll">
            <p className="mb-sm">
              <strong>{ENTITY.name}</strong>
            </p>
            <p className="mb-sm">
              Email: <a href={`mailto:${ENTITY.email}`}>{ENTITY.email}</a> · Teléfono: <a href={`tel:${ENTITY.phoneE164}`}>{ENTITY.phoneDisplay}</a>
            </p>
            <p className="mb-sm">
              Ubicación: {ENTITY.location.display}
            </p>
            <p className="mb-sm">
              Área de servicio: {ENTITY.serviceArea.primary} (principal), {ENTITY.serviceArea.secondary}
            </p>
            <p className="mb-0">
              <a href={ENTITY.profiles.googleBusinessProfile} target="_blank" rel="noopener noreferrer">
                Ver reseñas en Google
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
