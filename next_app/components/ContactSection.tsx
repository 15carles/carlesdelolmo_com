import React from 'react';
import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section id="contacto" className="section">
      <div className="container">
        {/* Section Header */}
        <header className="section-header animate-on-scroll">
          <h2 className="section-header__title">¿Listo para dominar el GEO?</h2>
          <p className="section-header__subtitle">
            Hablemos sobre cómo puedo ayudar a tu empresa a destacar en las respuestas de inteligencia artificial.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-xl items-start">
          {/* Columna Izquierda: Información y Contexto */}
          <div className="flex flex-col gap-md pr-lg animate-fade-in-up">
            <div className="badge badge--status self-start">
              <span className="text-accent-purple font-semibold tracking-wide text-xs">
                RÁPIDO Y SENCILLO
              </span>
            </div>

            {/* Ilustración SVG Representativa */}
            <div className="pricing-card__illustration" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Burbuja de Chat Frontal (Soporte) */}
                <path d="M24 28h32a4 4 0 014 4v20a4 4 0 01-4 4h-24l-8 6v-6a4 4 0 01-4-4V32a4 4 0 014-4z" />
                <circle cx="34" cy="38" r="3" />
                <line x1="42" y1="38" x2="52" y2="38" />
                <line x1="30" y1="46" x2="52" y2="46" />

                {/* Burbuja de Chat Trasera (Cliente) - Más sutil */}
                <path d="M40 22V12a4 4 0 00-4-4H8a4 4 0 00-4 4v20a4 4 0 004 4h4" strokeOpacity="0.5" />
                <circle cx="16" cy="18" r="3" strokeOpacity="0.5" />
                <line x1="24" y1="18" x2="32" y2="18" strokeOpacity="0.5" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold leading-tight flex items-start">
              Rellena el formulario y me pondré en contacto contigo
            </h3>

            <p className="text-secondary leading-relaxed text-left">
              Este breve formulario me permite entender tu punto de partida y tus objetivos. Con esa información
              diseñaré una propuesta adaptada a tu caso: estrategia digital, desarrollo web, optimización avanzada para
              buscadores e IA...
            </p>
            <p className="text-secondary leading-relaxed text-left">
              hola@carlesdelolmo.com
            </p>
          </div>

          {/* Columna Derecha: El Formulario */}
          <div className="col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}