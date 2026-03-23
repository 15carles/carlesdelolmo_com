import React from 'react';
import Link from 'next/link';

export default function CtaFinalSection() {
  return (
    <section id="cta-final" className="section" aria-labelledby="cta-final-title">
      <div className="container">
        <div className="cta-final-content animate-on-scroll">
          <h2 id="cta-final-title" className="cta-final-title">
            Si tu web no está ayudando de verdad, conviene revisarla
          </h2>

          <p className="cta-final-text">
            Una web profesional no debería limitarse a estar online. Debería explicar bien lo que haces,
            reforzar tu credibilidad y servir como base para captar oportunidades con más sentido.
          </p>

          <p className="cta-final-text">
            Si quieres una web mejor planteada, más clara y preparada para buscadores e inteligencia artificial,
            podemos hablar sobre tu proyecto.
          </p>

          <div className="cta-final-actions" role="group" aria-label="Acciones finales de contacto">
            <Link href="/contacto" className="btn btn--primary">Cuéntame tu proyecto</Link>
            <Link href="/pricing" className="btn btn--secondary">Ver servicios y precios</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
