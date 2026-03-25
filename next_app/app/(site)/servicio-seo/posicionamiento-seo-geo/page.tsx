import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { TrendingUp, Globe, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Posicionamiento SEO + GEO | Carles del Olmo - SEO y GEO',
  description: 'Optimización continua para Google y motores de IA. SEO Local en Valencia, arquitectura semántica y visibilidad estratégica en ChatGPT y Gemini.',
  alternates: {
    canonical: 'https://carlesdelolmo.com/servicio-seo/posicionamiento-seo-geo',
  },
};

export default function PosicionamientoSeoGeo() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios SEO', href: '/pricing#geo-seo' },
    { label: 'Posicionamiento SEO + GEO' }
  ];

  const valueProps = [
    {
      title: 'Dominio de Google Local',
      description: 'Optimizamos tu Google Business Profile y tu autoridad local para captar clientes en tu zona de influencia.',
      icon: MapPin,
      color: 'text-purple-400'
    },
    {
      title: 'Estrategia de Contenido Semántico',
      description: 'Creamos y optimizamos contenido basado en entidades, no solo en palabras clave, para ser entendidos por IAs.',
      icon: Sparkles,
      color: 'text-blue-400'
    },
    {
      title: 'Crecimiento Sostenible',
      description: 'Enfoque en tráfico de calidad que realmente convierte visitas en clientes finales.',
      icon: TrendingUp,
      color: 'text-cyan-400'
    }
  ];

  return (
    <main className="page__content">
      <Breadcrumbs items={breadcrumbs} />

      <section className="section">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <div className="badge badge--blue mb-lg">
              <span>Servicio de Continuidad</span>
            </div>
            <h1 className="section-header__title">Posicionamiento <span className="gradient-text">SEO + GEO</span></h1>
            <p className="section-header__subtitle">
              Estrategia híbrida para liderar los resultados de búsqueda tradicionales y las nuevas respuestas generativas.
            </p>
          </header>

          <div className="grid grid-cols-2 mt-2xl items-center gap-xl">
            <div className="animate-on-scroll">
              <h2 className="mb-lg">Visibilidad en todo el ecosistema de búsqueda</h2>
              <p className="text-secondary mb-lg">
                El SEO ya no es solo aparecer en los 10 enlaces azules de Google. Hoy, tus clientes te buscan a través de asistentes de voz, ChatGPT, Perplexity y las nuevas funcionalidades de IA de los buscadores.
              </p>
              <p className="text-secondary mb-xl">
                Nuestro servicio mensual de posicionamiento SEO + GEO asegura que tu negocio mantenga una autoridad sólida en todos estos canales de forma simultánea.
              </p>
              
              <div className="card card--no-hover p-lg border-blue-900/20 bg-dark-soft">
                <div className="flex items-center gap-4 mb-md">
                  <span className="text-2xl font-bold gradient-text">600€/mes</span>
                  <span className="text-muted text-sm">(Compromiso sugerido de 6 meses)</span>
                </div>
                <Link href="/contacto" className="btn btn--primary btn--block" data-primary-cta="true">Empezar ahora</Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-md animate-on-scroll">
              {valueProps.map((prop, index) => (
                <article key={index} className="card p-lg flex flex-col gap-3 glass-effect">
                  <div className={`${prop.color} shrink-0`}>
                    <prop.icon size={32} />
                  </div>
                  <h3 className="text-xl mb-1">{prop.title}</h3>
                  <p className="text-secondary">{prop.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO vs GEO Comparison */}
      <section className="section bg-dark-soft">
        <div className="container">
          <h2 className="text-center mb-xl">¿Por qué SEO + GEO juntos?</h2>
          <div className="grid grid-cols-2 gap-xl">
            <div className="card p-xl border-purple-900/10">
              <h3 className="mb-md flex items-center gap-2">
                <Globe className="text-purple-400" size={24} /> SEO Tradicional
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-secondary">
                  <CheckCircle2 size={16} className="text-teal-400 mt-1 shrink-0" />
                  <span>Posicionamiento por Keywords competitivas.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-secondary">
                  <CheckCircle2 size={16} className="text-teal-400 mt-1 shrink-0" />
                  <span>Optimización del Google Business Profile.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-secondary">
                  <CheckCircle2 size={16} className="text-teal-400 mt-1 shrink-0" />
                  <span>Construcción de autoridad vía enlaces (Backlinks).</span>
                </li>
              </ul>
            </div>
            <div className="card p-xl border-blue-900/10">
              <h3 className="mb-md flex items-center gap-2">
                <Sparkles className="text-blue-400" size={24} /> GEO (Optimización IA)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-secondary">
                  <CheckCircle2 size={16} className="text-blue-400 mt-1 shrink-0" />
                  <span>Optimización semántica basada en entidades.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-secondary">
                  <CheckCircle2 size={16} className="text-blue-400 mt-1 shrink-0" />
                  <span>Mejora de la citación de marca en LLMs.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-secondary">
                  <CheckCircle2 size={16} className="text-blue-400 mt-1 shrink-0" />
                  <span>Estructuración de datos para respuestas inteligentes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section">
        <div className="container text-center animate-on-scroll">
          <h2 className="mb-lg">Domina los resultados de búsqueda hoy</h2>
          <p className="text-secondary mb-xl max-w-2xl mx-auto">
            El mercado no espera. Asegura tu presencia en los canales donde tus clientes 
            están tomando decisiones de compra.
          </p>
          <div className="flex justify-center gap-md">
            <Link href="/contacto" className="btn btn--primary btn--large" data-primary-cta="true">Solicitar propuesta</Link>
            <Link href="/pricing" className="btn btn--secondary btn--large">Ver tarifas detalladas</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
