"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleOpenCookieSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    // Dispatch a custom event to open the cookie modal
    window.dispatchEvent(new CustomEvent('openCookieSettings'));
  };

  return (
    <footer className="footer no-print">
      <div className="container footer__container">
        {/* Links */}
        <nav className="footer__links" aria-label="Enlaces legales">
          <Link href="/politica-privacidad" target="_blank" rel="noopener" className="footer__link">
            Política de Privacidad
          </Link>
          <Link href="/terminos-y-condiciones" target="_blank" rel="noopener" className="footer__link">
            Términos y Condiciones
          </Link>
          <Link href="/politica-cookies" target="_blank" rel="noopener" className="footer__link">
            Política de Cookies
          </Link>
          <a href="#" id="open-cookie-settings" className="footer__link" aria-label="Abrir configuración de cookies" onClick={handleOpenCookieSettings}>
            Configurar cookies
          </a>
        </nav>

        {/* Copyright */}
        <p className="footer__text">
          © {currentYear} <Link href="/">Carles del Olmo</Link>. Diseñador web en Valencia especializado en SEO y GEO.
        </p>
      </div>
    </footer>
  );
}
