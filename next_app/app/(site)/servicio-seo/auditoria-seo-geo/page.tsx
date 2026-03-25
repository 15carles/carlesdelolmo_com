import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Search, Eye, ListChecks, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Auditoría SEO + GEO | Carles del Olmo - SEO y GEO',
  description: 'Auditoría técnica avanzada. Analizo tu visibilidad en Google y en respuestas de IA (ChatGPT, Gemini). Obtén un plan claro para mejorar tu posicionamiento.',
  alternates: {
    canonical: 'https://carlesdelolmo.com/servicio-seo/auditoria-seo-geo',
  },
};

export default function AuditoriaSeoGeo() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios SEO', href: '/pricing#geo-seo' },
    { label: 'Auditoría SEO + GEO' }
  ];

  const points = [
    {
      title: 'Análisis de Visibilidad en Buscadores',
      description: 'Evaluamos cómo te ven Google y Bing actualmente, detectando bloqueos técnicos e indexación.',
      icon: Search
    },
    {
      title: 'Auditoría de Respuestas de IA (GEO)',
      description: 'Reviso si las IAs (ChatGPT, Gemini, Perplexity) te están citando y cómo presentan tu marca.',
      icon: Eye
    },
    {
      title: 'Arquitectura Semántica',
      description: 'Analizo si tu web utiliza los datos estructurados necesarios para ser entendida por modelos de lenguaje.',
      icon: ListChecks
    },
    {
      title: 'Rendimiento y Core Web Vitals',
      description: 'Estudio profundo de la velocidad de carga y experiencia de usuario técnica.',
      icon: Zap
    }
  ];

  return (
    <main className="page__content">
      <Breadcrumbs items={breadcrumbs} />

      <section className="section">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <div className="badge badge--purple mb-lg">
              <span>Auditoría Técnica Digital</span>
            </div>
            <h1 className="section-header__title">Auditoría <span className="gradient-text">SEO + GEO</span></h1>
            <p className="section-header__subtitle">
              No basta con estar online. Necesitas saber por qué no estás vendiendo lo que quieres y cómo los nuevos buscadores de IA interpretan tu negocio.
            </p>
          </header>

          <div className="grid grid-cols-2 mt-2xl items-center gap-xl">
            <div className="animate-on-scroll">
              <h2 className="mb-lg">Radiografía completa de tu ecosistema digital</h2>
              <p className="text-secondary mb-lg">
                Mi auditoría SEO + GEO no es un informe automático generado por una herramienta. Es un análisis manual y estratégico donde reviso cada punto crítico que impide que tu web escale.
              </p>
              <p className="text-secondary mb-xl">
                Recibirás un documento accionable con prioridades claras: qué arreglar hoy para ver resultados mañana.
              </p>
              
              <div className="card card--no-hover p-lg border-purple-900/20 bg-dark-soft">
                <div className="flex items-center gap-4 mb-md">
                  <span className="text-2xl font-bold gradient-text">750€</span>
                  <span className="text-muted text-sm">(Pago único, precios sin IVA)</span>
                </div>
                <Link href="/contacto" className="btn btn--primary btn--block" data-primary-cta="true">Reservar Auditoría</Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-md animate-on-scroll">
              {points.map((point, index) => (
                <article key={index} className="card p-lg flex gap-4">
                  <div className="text-purple-400 shrink-0">
                    <point.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2">{point.title}</h3>
                    <p className="text-secondary text-sm">{point.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye Section */}
      <section className="section bg-dark-soft">
        <div className="container">
          <div className="card p-2xl border-purple-900/10">
            <h2 className="text-center mb-xl">¿Qué incluye el informe final?</h2>
            <div className="grid grid-cols-3 gap-lg">
              <div className="flex flex-col gap-3">
                <CheckCircle2 className="text-teal-400" size={20} />
                <h4 className="font-bold">Plan de Acción SEO</h4>
                <p className="text-sm text-secondary">Correcciones técnicas prioritarias para recuperar visibilidad en Google.</p>
              </div>
              <div className="flex flex-col gap-3">
                <CheckCircle2 className="text-blue-400" size={20} />
                <h4 className="font-bold">Estrategia GEO</h4>
                <p className="text-sm text-secondary">Optimizaciones semánticas para mejorar tu presencia en respuestas de IA.</p>
              </div>
              <div className="flex flex-col gap-3">
                <CheckCircle2 className="text-cyan-400" size={20} />
                <h4 className="font-bold">Benchmarking Local</h4>
                <p className="text-sm text-secondary">Análisis de qué está haciendo bien tu competencia y cómo superarla.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section">
        <div className="container text-center animate-on-scroll">
          <h2 className="mb-lg">¿Empezamos con el análisis?</h2>
          <p className="text-secondary mb-xl max-w-2xl mx-auto">
            La mayoría de las webs fallan por errores técnicos invisibles a simple vista. 
            Detectarlos es el primer paso para dominar tu mercado.
          </p>
          <Link href="/contacto" className="btn btn--primary btn--large" data-primary-cta="true">Solicitar presupuesto personalizado</Link>
        </div>
      </section>
    </main>
  );
}
