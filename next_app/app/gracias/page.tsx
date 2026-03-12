import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Gracias por contactar — Carles del Olmo',
  description: 'Mensaje recibido correctamente. Me pondré en contacto contigo lo antes posible.',
  robots: 'noindex, nofollow'
};

export default function GraciasPage() {
  return (
    <main className="section flex items-center justify-center" style={{ minHeight: '80vh' }}>
      <div className="container text-center animate-fade-in-up">
        {/* Success Icon */}
        <div className="mb-lg">
          <CheckCircle 
            size={80} 
            strokeWidth={1.5} 
            className="text-accent-purple" 
            style={{ margin: '0 auto', color: 'var(--color-accent-purple)' }} 
          />
        </div>

        {/* Heading */}
        <h1 className="mb-md">¡Mensaje Recibido!</h1>

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-xl">
          <p className="text-secondary text-lg">
            Gracias por contactar. He recibido tu mensaje correctamente y lo revisaré en breve.<br />
            Te responderé al correo que has facilitado lo antes posible.
          </p>
        </div>

        {/* Action Button */}
        <Link href="/" className="btn btn--primary btn--large">
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}
