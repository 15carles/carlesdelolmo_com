"use client";

import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="inicio" className="section" aria-labelledby="hero-title">
      <div className="container">
        <div className="grid grid-cols-2">
          <div className="animate-on-scroll hero-content-wrapper">
            <p className="badge badge--status mb-lg helper-center-mobile hero-eyebrow">
              <span className="badge__dot badge__dot--pulse" aria-hidden="true"></span>
              <span>Disponible para proyectos</span>
            </p>

            <h1 id="hero-title" className="mb-md helper-center-mobile">
              Webs optimizadas<br />
              <span className="gradient-text">para buscadores e IA</span>
            </h1>

            <p className="text-secondary mb-xl helper-center-mobile hero-subtitle">
              Diseño y optimizo páginas web en Valencia para personas, buscadores e inteligencias artificiales.
            </p>

            <div className="hero-actions mb-xl helper-flex-center-mobile" role="group" aria-label="Acciones principales">
              <Link href="/contacto" className="btn btn--primary btn--large" aria-label="Pedir presupuesto">
                Pide presupuesto
              </Link>
              <Link href="/proyectos" className="btn btn--secondary btn--large" aria-label="Ver proyectos">
                Ver proyectos
              </Link>
            </div>

            <ul id="hero-checklist" className="hero-features mb-xl helper-flex-center-mobile" aria-label="Servicios destacados">
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
                <span>Preparado para IA</span>
              </li>
            </ul>

          </div>

          <div className="animate-on-scroll flex flex-col justify-center pb-3xl hero-right-col hidden-mobile">
            <div className="terminal">
              <div className="terminal__header">
                <span className="terminal__dot terminal__dot--red" aria-hidden="true"></span>
                <span className="terminal__dot terminal__dot--yellow" aria-hidden="true"></span>
                <span className="terminal__dot terminal__dot--green" aria-hidden="true"></span>
                <span className="terminal__filename">developer.js</span>
              </div>

              <div className="terminal__code">
                <pre><code><span className="code-keyword">const</span> <span className="code-variable">developer</span> = {'{'}{"\n"}
  <span className="code-property">nombre</span>: <span className="code-string">&quot;Carles del Olmo&quot;</span>,{"\n"}
  <span className="code-property">skills</span>: [<span className="code-string">&quot;GEO&quot;</span>, <span className="code-string">&quot;SEO&quot;</span>, <span className="code-string">&quot;Web&quot;</span>, <span className="code-string">&quot;Automatización&quot;</span>],{"\n"}
  <span className="code-property">disponible</span>: <span className="code-boolean">true</span>{"\n"}
{'}'};</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
