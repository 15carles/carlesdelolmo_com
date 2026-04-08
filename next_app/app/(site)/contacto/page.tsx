import React from 'react';
import ContactForm from '@/components/ContactForm';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/schemas';

export const metadata = constructMetadata({
  title: 'Contacto | Carles del Olmo - SEO y GEO',
  description: 'Contacta con Carles del Olmo para impulsar tu negocio con Diseño Web, SEO técnico y GEO (Generative Engine Optimization).',
  exactUrl: `${SITE_URL}/contacto`,
});

export default function ContactPage() {
  return (
    <main>
      <section id="contacto" className="pricing-contact">
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
