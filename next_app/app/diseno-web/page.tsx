import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MapPin, ArrowRight, Code, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Diseño Web Profesional | Carles del Olmo',
  description: 'Servicios de diseño y desarrollo web profesional orientados a resultados, SEO técnico y optimización para IA (GEO).',
};

export default function DisenoWebPage() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Diseño web' }
  ];

  const cities = [
    {
      name: 'Valencia',
      href: '/diseno-web/valencia',
      description: 'Diseño web estratégico y SEO local en la capital del Turia.',
      color: 'service-card__icon-wrapper--purple'
    },
    {
      name: 'Alicante',
      href: '/diseno-web/alicante',
      description: 'Webs de alto rendimiento para negocios en la Costa Blanca.',
      color: 'service-card__icon-wrapper--cyan'
    },
    {
      name: 'Castellón',
      href: '/diseno-web/castellon',
      description: 'Soluciones digitales robustas para el tejido empresarial de Castellón.',
      color: 'service-card__icon-wrapper--blue'
    }
  ];

  return (
    <main className="page__content">
      <Breadcrumbs items={breadcrumbs} />

      <section className="section">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h1 className="section-header__title">Diseño Web <span className="gradient-text">Profesional</span></h1>
            <p className="section-header__subtitle">
              Creamos infraestructuras digitales de alto rendimiento preparadas para los buscadores de hoy y la inteligencia artificial de mañana.
            </p>
          </header>

          <div className="grid grid-cols-3 mt-xl">
            {cities.map((city, index) => (
              <article key={index} className="service-card animate-on-scroll">
                <div className={`service-card__icon-wrapper ${city.color}`}>
                  <MapPin size={24} />
                </div>
                <h3 className="service-card__title">
                  <Link href={city.href}>Diseño web {city.name}</Link>
                </h3>
                <p className="service-card__description">{city.description}</p>
                <Link href={city.href} className="flex items-center gap-2 mt-md text-purple-400 hover:text-white transition-colors">
                  Ver detalles <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy / Value Prop */}
      <section className="section bg-dark-soft">
        <div className="container">
          <div className="grid grid-cols-2 gap-xl items-center">
            <div className="animate-on-scroll">
              <h2 className="mb-lg">Más que un diseño, una <span className="gradient-text">estrategia</span></h2>
              <p className="text-secondary mb-xl">
                No creemos en las "webs de usar y tirar". Cada proyecto que entregamos es una pieza de ingeniería 
                diseñada para durar, escalar y, sobre todo, convertir visitas en clientes.
              </p>
              <ul className="list-unstyled space-y-md">
                <li className="flex items-center gap-3">
                  <Zap className="text-purple-400" size={20} />
                  <span>Carga instantánea (Core Web Vitals)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Code className="text-blue-400" size={20} />
                  <span>Código limpio y semántico</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="text-cyan-400" size={20} />
                  <span>Optimización para SEO Local</span>
                </li>
              </ul>
            </div>
            <div className="animate-on-scroll">
              <div className="card card--no-hover p-xl bg-dark border-purple-900/30">
                <h3 className="mb-md">¿Hablamos de tu proyecto?</h3>
                <p className="text-secondary mb-xl">
                  Cuéntanos qué necesitas y te ayudaremos a definir la mejor infraestructura digital para tu negocio.
                </p>
                <Link href="/contacto" className="btn btn--primary btn--block">Pide tu presupuesto gratuito</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
