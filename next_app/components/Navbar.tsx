"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const pathname = usePathname();

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
    e.stopPropagation();
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleSubDropdown = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSubDropdown(activeSubDropdown === name ? null : name);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
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
              {/* Subnivel 1: Diseño de páginas web */}
              <div className={`dropdown__item has-submenu ${activeSubDropdown === 'diseno' ? 'is-active' : ''}`}>
                <button 
                  className="dropdown__link dropdown__toggle-sub" 
                  aria-haspopup="true" 
                  aria-expanded={activeSubDropdown === 'diseno'}
                  onClick={(e) => toggleSubDropdown('diseno', e)}
                >
                  Diseño de páginas web
                  <ChevronRight className="dropdown__arrow-sub" size={12} />
                </button>
                <div className="dropdown__submenu">
                  <Link href="/diseno-web/valencia" className="dropdown__sublink">Diseño web Valencia</Link>
                  <Link href="/diseno-web/castellon" className="dropdown__sublink">Diseño web en Castellón</Link>
                  <Link href="/diseno-web/alicante" className="dropdown__sublink">Diseño web en Alicante</Link>
                </div>
              </div>

              {/* Subnivel 2: Servicios SEO */}
              <div className={`dropdown__item has-submenu ${activeSubDropdown === 'seo' ? 'is-active' : ''}`}>
                <button 
                  className="dropdown__link dropdown__toggle-sub" 
                  aria-haspopup="true" 
                  aria-expanded={activeSubDropdown === 'seo'}
                  onClick={(e) => toggleSubDropdown('seo', e)}
                >
                  Servicios SEO
                  <ChevronRight className="dropdown__arrow-sub" size={12} />
                </button>
                <div className="dropdown__submenu">
                  <Link href="/servicio-seo/auditoria-seo-geo" className="dropdown__sublink">Auditoría SEO + GEO</Link>
                  <Link href="/servicio-seo/posicionamiento-seo-geo" className="dropdown__sublink">Posicionamiento SEO + GEO</Link>
                  <Link href="/servicio-seo/autoridad-digital-ias" className="dropdown__sublink">Autoridad Digital para IAs</Link>
                </div>
              </div>

              {/* Servicios simples */}
              <Link href="/desarrollo-web-a-medida" className="dropdown__link">Desarrollo de software a medida</Link>
              <Link href="/mantenimiento-web-valencia" className="dropdown__link">Mantenimiento web Valencia</Link>
              <Link href="/migraciones-web" className="dropdown__link">Migraciones web</Link>
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
            {/* Subacordeón 1 */}
            <div className={`mobile-dropdown__item ${activeSubDropdown === 'diseno-mobile' ? 'is-active' : ''}`}>
              <button 
                className="mobile-dropdown__sublink mobile-dropdown__toggle-sub" 
                aria-expanded={activeSubDropdown === 'diseno-mobile'}
                onClick={(e) => toggleSubDropdown('diseno-mobile', e)}
              >
                Diseño de páginas web
                <ChevronDown className="dropdown__arrow" size={14} />
              </button>
              <div className="mobile-dropdown__submenu">
                <Link href="/diseno-web/valencia" className="mobile-dropdown__sublink-final" onClick={closeMobileMenu}>Diseño web Valencia</Link>
                <Link href="/diseno-web/castellon" className="mobile-dropdown__sublink-final" onClick={closeMobileMenu}>Diseño web en Castellón</Link>
                <Link href="/diseno-web/alicante" className="mobile-dropdown__sublink-final" onClick={closeMobileMenu}>Diseño web en Alicante</Link>
              </div>
            </div>

            {/* Subacordeón 2 */}
            <div className={`mobile-dropdown__item ${activeSubDropdown === 'seo-mobile' ? 'is-active' : ''}`}>
              <button 
                className="mobile-dropdown__sublink mobile-dropdown__toggle-sub" 
                aria-expanded={activeSubDropdown === 'seo-mobile'}
                onClick={(e) => toggleSubDropdown('seo-mobile', e)}
              >
                Servicios SEO
                <ChevronDown className="dropdown__arrow" size={14} />
              </button>
              <div className="mobile-dropdown__submenu">
                <Link href="/servicio-seo/auditoria-seo-geo" className="mobile-dropdown__sublink-final" onClick={closeMobileMenu}>Auditoría SEO + GEO</Link>
                <Link href="/servicio-seo/posicionamiento-seo-geo" className="mobile-dropdown__sublink-final" onClick={closeMobileMenu}>Posicionamiento SEO + GEO</Link>
                <Link href="/servicio-seo/autoridad-digital-ias" className="mobile-dropdown__sublink-final" onClick={closeMobileMenu}>Autoridad Digital para IAs</Link>
              </div>
            </div>

            <Link href="/desarrollo-web-a-medida" className="mobile-dropdown__sublink" onClick={closeMobileMenu}>Desarrollo de software a medida</Link>
            <Link href="/mantenimiento-web-valencia" className="mobile-dropdown__sublink" onClick={closeMobileMenu}>Mantenimiento web</Link>
            <Link href="/migraciones-web" className="mobile-dropdown__sublink" onClick={closeMobileMenu}>Migraciones web</Link>
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
