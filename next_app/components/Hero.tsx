"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Check } from 'lucide-react';
import Link from 'next/link';

const HeroCanvas = dynamic(() => import('./HeroCanvas'));

// El canvas es decorativo y .hidden-mobile ya lo ocultaba por debajo de 768px,
// pero ocultarlo con CSS no evita que su chunk se descargue. Montarlo solo en
// escritorio ahorra esos bytes justo en el dispositivo donde más cuestan.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  return isDesktop;
}

export default function Hero() {
  const isDesktop = useIsDesktop();

  return (
    <section id="inicio" className="section" aria-labelledby="hero-title">
      <div className="container">
        <div className="grid grid-cols-2">
          {/* Sin animate-on-scroll: este bloque ya esta en pantalla al cargar y
              contiene el h1, que es el elemento LCP. Envolverlo en una animacion
              que arranca en opacity:0 retrasa su pintado, y en los navegadores sin
              scroll-driven animations lo deja invisible hasta que hidrata React. */}
          <div className="hero-content-wrapper">
            <p className="badge badge--status mb-lg helper-center-mobile">
              <span className="badge__dot badge__dot--pulse" aria-hidden="true"></span>
              <span>Disponible para proyectos</span>
            </p>

            <h1 id="hero-title" className="mb-md helper-center-mobile">
              Diseño web para que tu empresa<br />
              <span className="gradient-text">sea la respuesta</span>
            </h1>

            <p className="text-secondary mb-xl helper-center-mobile">
              Estructuro tu web para que, cuando busquen en Google o pregunten a una IA, tu empresa sea la que encuentran, entienden y eligen.
            </p>

            <div className="hero-actions mb-xl helper-flex-center-mobile" role="group" aria-label="Acciones principales">
              <Link href="/contacto" className="btn btn--primary btn--large" aria-label="Pedir presupuesto">
                Pide presupuesto
              </Link>
              <Link href="/proyectos" className="btn btn--secondary btn--large" aria-label="Ver proyectos">
                Ver proyectos
              </Link>
            </div>

            <ul id="hero-checklist" className="mb-xl helper-flex-center-mobile" aria-label="Servicios destacados">
              <li className="hero-features__item">
                <span className="hero-features__icon-wrapper">
                  <Check size={20} strokeWidth={3} />
                </span>
                <span>Diseño web</span>
              </li>
              <li className="hero-features__item">
                <span className="hero-features__icon-wrapper">
                  <Check size={20} strokeWidth={3} />
                </span>
                <span>Posicionamiento SEO</span>
              </li>
              <li className="hero-features__item">
                <span className="hero-features__icon-wrapper">
                  <Check size={20} strokeWidth={3} />
                </span>
                <span>Visibilidad en IA (GEO)</span>
              </li>
            </ul>

          </div>

          <div className="animate-on-scroll flex flex-col justify-center pb-3xl hero-right-col hidden-mobile">
            <div className="hero-canvas-frame">
              {isDesktop && <HeroCanvas className="hero-canvas" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
