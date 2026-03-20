import React from 'react';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contacto | Carles del Olmo - SEO y GEO',
  description: 'Contacta con Carles del Olmo para impulsar tu negocio con Diseño Web, SEO técnico y GEO (Generative Engine Optimization).'
};

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