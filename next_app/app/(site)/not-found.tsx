import React from 'react';
import Link from 'next/link';
import NotFoundRunnerGameCanvas from '@/components/NotFoundRunnerGame';

export default function NotFoundPage() {
  return (
    <main className="not-found-page section">
      <div className="container">
        <div className="not-found-shell animate-fade-in-up">
          <p className="not-found-eyebrow">Error 404</p>
          <h1 className="not-found-title">Página no encontrada</h1>
          <p className="not-found-description">
            El enlace que has seguido ya no existe o puede tener una errata.
            Vuelve al inicio para continuar y, si te apetece, rompe tu récord en el mini-juego.
          </p>

          <div className="not-found-actions">
            <Link href="/" className="btn btn--primary btn--large">
              Volver al Inicio
            </Link>
          </div>

          <NotFoundRunnerGameCanvas />
        </div>
      </div>
    </main>
  );
}
