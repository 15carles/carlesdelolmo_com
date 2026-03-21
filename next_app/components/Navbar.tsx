"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

// Estructura de datos para los servicios (Fase 1)
const SERVICES_DATA = [
  {
    title: 'Diseño de páginas web',
    id: 'diseno',
    submenu: [
      { title: 'Diseño web Valencia', href: '/diseno-web/valencia' },
      { title: 'Diseño web en Castellón', href: '/diseno-web/castellon' },
      { title: 'Diseño web en Alicante', href: '/diseno-web/alicante' },
    ]
  },
  {
    title: 'Servicios SEO',
    id: 'seo',
    submenu: [
      { title: 'Auditoría SEO + GEO', href: '/servicio-seo/auditoria-seo-geo' },
      { title: 'Posicionamiento SEO + GEO', href: '/servicio-seo/posicionamiento-seo-geo' },
      { title: 'Autoridad Digital para IAs', href: '/servicio-seo/autoridad-digital-ias' },
    ]
  },
  { title: 'Desarrollo de software a medida', href: '/desarrollo-web-a-medida' },
  { title: 'Mantenimiento web Valencia', href: '/mantenimiento-web-valencia' },
  { title: 'Migraciones web', href: '/migraciones-web' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Cerrar todo cuando cambia la ruta (navegación)
  useEffect(() => {
    closeMobileMenu();
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const toggleDropdown = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === name ? null : name);
    // Limpiar sub-dropdown al cambiar el dropdown principal
    setActiveSubDropdown(null);
  };

  const toggleSubDropdown = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSubDropdown(activeSubDropdown === name ? null : name);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Si el clic no es dentro de la navbar, cerramos todo
      const nav = document.querySelector('.navbar');
      if (nav && !nav.contains(event.target as Node)) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
      <div className="navbar__container">
        {/* Logo */}
        <Link href="/" className="navbar__logo" aria-label="Carles del Olmo - Inicio">
          Carles del Olmo
        </Link>

        {/* Menú Desktop */}
        <div className="navbar__menu hidden-mobile">
          <Link href="/#inicio" className={`navbar__link ${isActive('/#inicio') ? 'active' : ''}`}>Inicio</Link>
          <Link href="/#proyectos" className={`navbar__link ${isActive('/#proyectos') ? 'active' : ''}`}>Proyectos</Link>

          {/* Dropdown Servicios Desktop */}
          <div className={`dropdown ${activeDropdown === 'servicios' ? 'is-active' : ''}`}>
            <button
              className="navbar__link dropdown__toggle"
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'servicios'}
              onClick={(e) => toggleDropdown('servicios', e)}
            >
              Servicios
              <ChevronDown className="dropdown__arrow" size={12} />
            </button>
            <div className="dropdown__menu">
              {SERVICES_DATA.map((service, index) => (
                service.submenu ? (
                  <div
                    key={index}
                    className={`dropdown__item has-submenu ${activeSubDropdown === service.id ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveSubDropdown(service.id)}
                  >
                    <button
                      className="dropdown__link dropdown__toggle-sub"
                      aria-haspopup="true"
                      aria-expanded={activeSubDropdown === service.id}
                      onClick={(e) => toggleSubDropdown(service.id, e)}
                    >
                      {service.title}
                      <ChevronRight className="dropdown__arrow-sub" size={12} />
                    </button>
                    <div className="dropdown__submenu">
                      {service.submenu.map((sub, subIdx) => (
                        <Link
                          key={subIdx}
                          href={sub.href}
                          className="dropdown__sublink"
                          onClick={() => {
                            setActiveDropdown(null);
                            setActiveSubDropdown(null);
                          }}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={service.href || '#'}
                    className="dropdown__link"
                    onMouseEnter={() => setActiveSubDropdown(null)}
                    onClick={() => {
                      setActiveDropdown(null);
                      setActiveSubDropdown(null);
                    }}
                  >
                    {service.title}
                  </Link>
                )
              ))}
            </div>
          </div>

          <Link href="/blog" className={`navbar__link ${isActive('/blog') ? 'active' : ''}`}>Blog</Link>
          <Link href="/contacto" className={`navbar__link ${isActive('/contacto') ? 'active' : ''}`}>Contacto</Link>
          <Link href="/pricing" className={`navbar__link ${isActive('/pricing') ? 'active' : ''}`}>Pricing</Link>

          <ThemeToggle />

          <Link href="/contacto" className="btn btn--primary">Hablemos</Link>
        </div>

        {/* Botón Menú Móvil */}
        <button
          id="mobile-menu-btn"
          className="navbar__mobile-toggle hidden-desktop"
          aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú Móvil (Acordeón) */}
      <div id="mobile-menu" className={`navbar__mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link href="/#inicio" className="navbar__link" onClick={closeMobileMenu}>Inicio</Link>
        <Link href="/#proyectos" className="navbar__link" onClick={closeMobileMenu}>Proyectos</Link>

        {/* Dropdown Servicios Móvil */}
        <div className={`mobile-dropdown ${activeDropdown === 'servicios-mobile' ? 'is-active' : ''}`}>
          <button
            className="navbar__link mobile-dropdown__toggle"
            aria-expanded={activeDropdown === 'servicios-mobile'}
            onClick={(e) => toggleDropdown('servicios-mobile', e)}
          >
            Servicios
            <ChevronDown className="dropdown__arrow" size={16} />
          </button>
          <div className="mobile-dropdown__menu">
            {SERVICES_DATA.map((service, index) => (
              service.submenu ? (
                <div
                  key={index}
                  className={`mobile-dropdown__item ${activeSubDropdown === `${service.id}-mobile` ? 'is-active' : ''}`}
                >
                  <button
                    className="mobile-dropdown__sublink mobile-dropdown__toggle-sub"
                    aria-expanded={activeSubDropdown === `${service.id}-mobile`}
                    onClick={(e) => toggleSubDropdown(`${service.id}-mobile`, e)}
                  >
                    {service.title}
                    <ChevronDown className="dropdown__arrow" size={14} />
                  </button>
                  <div className="mobile-dropdown__submenu">
                    {service.submenu.map((sub, subIdx) => (
                      <Link
                        key={subIdx}
                        href={sub.href}
                        className="mobile-dropdown__sublink-final"
                        onClick={closeMobileMenu}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={service.href || '#'}
                  className="mobile-dropdown__sublink"
                  onClick={closeMobileMenu}
                >
                  {service.title}
                </Link>
              )
            ))}
          </div>
        </div>

        <Link href="/blog" className="navbar__link" onClick={closeMobileMenu}>Blog</Link>
        <Link href="/contacto" className="navbar__link" onClick={closeMobileMenu}>Contacto</Link>
        <Link href="/pricing" className="navbar__link" onClick={closeMobileMenu}>Pricing</Link>

        <ThemeToggle className="theme-toggle" style={{ margin: 'var(--spacing-sm) 0' }} />
        <Link href="/contacto" className="btn btn--primary btn--block" onClick={closeMobileMenu}>Hablemos</Link>
      </div>
    </nav>
  );
}
