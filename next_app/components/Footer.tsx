"use client";

import React from 'react';
import Link from 'next/link';

interface FooterLink {
  href: string;
  label: string;
}

const NAV_LINKS: FooterLink[] = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contacto', label: 'Contacto' },
];

const SERVICE_LINKS: FooterLink[] = [
  { href: '/diseno-web/valencia', label: 'Diseño Web Valencia' },
  { href: '/diseno-web/castellon', label: 'Diseño Web Castellón' },
  { href: '/diseno-web/alicante', label: 'Diseño Web Alicante' },
  { href: '/servicio-seo/auditoria-seo-geo', label: 'Auditoría SEO + GEO' },
  { href: '/servicio-seo/posicionamiento-seo-geo', label: 'Posicionamiento SEO + GEO' },
  { href: '/servicio-seo/autoridad-digital-ias', label: 'Autoridad Digital para IAs' },
];

const LEGAL_LINKS: FooterLink[] = [
  { href: '/politica-privacidad', label: 'Política de Privacidad' },
  { href: '/terminos-y-condiciones', label: 'Términos y Condiciones' },
  { href: '/politica-cookies', label: 'Política de Cookies' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleOpenCookieSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('openCookieSettings'));
  };

  return (
    <footer className="footer no-print">
      <div className="container footer__container">
        <div className="footer__grid">
          <nav className="footer__section" aria-label="Navegación principal">
            <h2 className="footer__section-title">Navegación</h2>
            <ul className="footer__list footer__list--mobile-split footer__list--split footer__list--compact">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__section" aria-label="Servicios">
            <h2 className="footer__section-title">Servicios</h2>
            <ul className="footer__list footer__list--services">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__section" aria-label="Enlaces legales">
            <h2 className="footer__section-title">Legal</h2>
            <ul className="footer__list">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} target="_blank" rel="noopener" className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  id="open-cookie-settings"
                  className="footer__link footer__link--button"
                  aria-label="Abrir configuración de cookies"
                  aria-controls="cookie-modal"
                  onClick={handleOpenCookieSettings}
                >
                  Configurar cookies
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <p className="footer__text">
          © {currentYear} <Link href="/">Carles del Olmo</Link>. Diseñador web en Valencia especializado en SEO y GEO.
        </p>
      </div>
    </footer>
  );
}
