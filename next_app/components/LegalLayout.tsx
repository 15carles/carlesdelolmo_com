import React from 'react';

interface LegalLayoutProps {
  title: string;
  lastUpdate: string;
  metadataText?: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdate, metadataText, children }: LegalLayoutProps) {
  return (
    <main className="page">
      <header className="page-header">
        <div className="container text-center">
          <h1 className="page-header__title">{title}</h1>
          <p className="page-header__subtitle">
            <strong>Última actualización:</strong> {lastUpdate}
          </p>
          {metadataText && (
            <p className="page-header__meta">
              {metadataText}
            </p>
          )}
        </div>
      </header>

      <div className="page__content">
        <div className="container">
          <article className="article-content">
            {children}
          </article>
        </div>
      </div>
    </main>
  );
}
