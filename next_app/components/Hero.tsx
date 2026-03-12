"use client";

import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="inicio" className="section">
      <div className="container">
        <div className="grid grid-cols-2">
          {/* Left Column: Content */}
          <div className="animate-on-scroll hero-content-wrapper">
            {/* Badge */}
            <div className="badge badge--status mb-lg helper-center-mobile">
              <span className="badge__dot badge__dot--pulse" aria-hidden="true"></span>
              <span>Disponible para proyectos</span>
            </div>

            {/* Heading */}
            <h1 className="mb-md helper-center-mobile" aria-label="Webs optimizadas para buscadores e IA">
              Webs optimizadas<br />
              <span className="gradient-text">para buscadores e IA</span>
            </h1>

            {/* Description */}
            <p className="text-secondary mb-xl helper-center-mobile"
              aria-label="Diseño y optimizo webs pensadas para personas y preparadas para la inteligencia artificial">
              Diseño y optimizo páginas web en Valencia pensadas para personas
              y estructuradas para posicionar en buscadores e <strong>inteligencia artificial</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-md mb-xl helper-flex-center-mobile">
              <Link href="#proyectos" className="btn btn--primary btn--large" aria-label="Ver Proyectos">
                Pide presupuesto
              </Link>
            </div>

            {/* Checklist SEO */}
            <div id="hero-checklist" className="hero-features flex gap-lg mb-xl helper-flex-center-mobile">
              <div className="hero-features__item">
                <span className="hero-features__icon-wrapper">
                  <Check size={20} strokeWidth={3} />
                </span>
                <span>Diseño web</span>
              </div>
              <div className="hero-features__item">
                <span className="hero-features__icon-wrapper">
                  <Check size={20} strokeWidth={3} />
                </span>
                <span>Posicionamiento SEO</span>
              </div>
              <div className="hero-features__item">
                <span className="hero-features__icon-wrapper">
                  <Check size={20} strokeWidth={3} />
                </span>
                <span>Preparado para IA</span>
              </div>
            </div>

            {/* Stats */}
            <div className="stats hidden-mobile">
              <div className="stat">
                <div className="stat__value">10+</div>
                <div className="stat__label">Proyectos</div>
              </div>
              <div className="stat">
                <div className="stat__value">1+</div>
                <div className="stat__label">Años Exp.</div>
              </div>
              <div className="stat">
                <div className="stat__value">100%</div>
                <div className="stat__label">Dedicación</div>
              </div>
            </div>
          </div>

          {/* Right Column: Code Terminal Card */}
          <div className="animate-on-scroll flex flex-col justify-center pb-3xl hero-right-col hidden-mobile">
            <div className="terminal">
              {/* Terminal Header */}
              <div className="terminal__header">
                <span className="terminal__dot terminal__dot--red" aria-hidden="true"></span>
                <span className="terminal__dot terminal__dot--yellow" aria-hidden="true"></span>
                <span className="terminal__dot terminal__dot--green" aria-hidden="true"></span>
                <span className="terminal__filename">developer.js</span>
              </div>

              {/* Code Content */}
              <div className="terminal__code">
                <pre><code><span className="code-keyword">const</span> <span className="code-variable">developer</span> = {'{'}{"\n"}
  <span className="code-property">nombre</span>: <span className="code-string">"Carles del Olmo"</span>,{"\n"}
  <span className="code-property">skills</span>: [<span className="code-string">"GEO"</span>, <span className="code-string">"SEO"</span>, <span className="code-string">"Web"</span>, <span className="code-string">"Automatización"</span>],{"\n"}
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
