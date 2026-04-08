"use client";

import React from 'react';
import Link from 'next/link';

interface FooterLink {
  href: string;
  label: string;
}

interface FooterContactLink {
  href: string;
  label: string;
  ariaLabel: string;
  icon: React.ReactNode;
  isExternal?: boolean;
}

interface FooterIconProps {
  className?: string;
}

function MailIcon({ className }: FooterIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon({ className }: FooterIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5l1.5-2.5 5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: FooterIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732.737 5.291 2.022 7.491l-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809 8.209-.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507ZM16.062 28.228h-.005c-2.319 0-4.489-.64-6.342-1.753l-.451-.267-4.675 1.227 1.247-4.559-.294-.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353Zm6.776-9.251c-.371-.186-2.197-1.083-2.537-1.208-.341-.124-.589-.185-.837.187-.246.371-.958 1.207-1.175 1.455-.216.249-.434.279-.805.094-1.15-.466-2.138-1.087-2.997-1.852-.799-.74-1.484-1.587-2.037-2.521-.216-.371-.023-.572.162-.757.167-.166.372-.434.557-.65.146-.179.271-.384.366-.604.043-.087.068-.188.068-.296 0-.131-.037-.253-.101-.357-.094-.186-.836-2.014-1.145-2.758-.302-.724-.609-.625-.836-.637-.216-.01-.464-.012-.712-.012-.395.01-.746.188-.988.463-.802.761-1.3 1.834-1.3 3.023 0 .026 0 .053.001.079.131 1.467.681 2.784 1.527 3.857 1.604 2.379 3.742 4.282 6.251 5.564.548.248 1.25.513 1.968.74.442.14.951.221 1.479.221.303 0 .601-.027.889-.078 1.069-.223 1.956-.868 2.497-1.749.165-.366.261-.793.261-1.242 0-.185-.016-.366-.047-.542-.092-.155-.34-.247-.712-.434Z"
      />
    </svg>
  );
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

const CONTACT_LINKS: FooterContactLink[] = [
  {
    href: 'mailto:hola@carlesdelolmo.com',
    label: 'hola@carlesdelolmo.com',
    ariaLabel: 'Enviar un correo a hola@carlesdelolmo.com',
    icon: <MailIcon className="footer__contact-icon" />,
  },
  {
    href: 'tel:+34668676302',
    label: '+34 668 676 302',
    ariaLabel: 'Llamar al +34 668 676 302',
    icon: <PhoneIcon className="footer__contact-icon" />,
  },
  {
    href: 'https://wa.me/34668676302',
    label: 'WhatsApp',
    ariaLabel: 'Abrir chat de WhatsApp con el +34 668 676 302',
    icon: <WhatsAppIcon className="footer__contact-icon" />,
    isExternal: true,
  },
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

          <nav className="footer__section" aria-label="Datos de contacto">
            <h2 className="footer__section-title">Contacto</h2>
            <ul className="footer__list footer__list--contact">
              {CONTACT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer__link footer__link--contact"
                    aria-label={link.ariaLabel}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  >
                    <span className="footer__contact-icon-wrap" aria-hidden="true">
                      {link.icon}
                    </span>
                    <span className="footer__contact-label">{link.label}</span>
                  </a>
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
