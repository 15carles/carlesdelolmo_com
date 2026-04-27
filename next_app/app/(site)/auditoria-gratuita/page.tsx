import React from 'react';
import Link from 'next/link';
import { Search, Eye, ListChecks, CheckCircle2, ArrowDown } from 'lucide-react';
import AuditoriaGratuitaForm from '@/components/AuditoriaGratuitaForm';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/schemas';

export const metadata = constructMetadata({
  title: 'Auditoría SEO + GEO Gratuita — Solo en Mayo | Carles del Olmo',
  description:
    'Durante mayo regalo una Auditoría SEO + GEO valorada en +750€. Analizo tu web, tu visibilidad en Google y tu presencia en IAs (ChatGPT, Gemini). Plazas limitadas.',
  exactUrl: `${SITE_URL}/auditoria-gratuita`,
});

const AUDIT_ITEMS = [
  {
    icon: Search,
    color: 'text-purple-400',
    title: 'Auditoría Técnica SEO',
    description:
      'Errores de indexación, velocidad de carga, Core Web Vitals, arquitectura de URLs y estructura interna que frenan tu posicionamiento en Google.',
  },
  {
    icon: Eye,
    color: 'text-teal-400',
    title: 'Análisis GEO (Presencia en IAs)',
    description:
      'Reviso si ChatGPT, Gemini o Perplexity conocen tu negocio, cómo te presentan y qué optimizaciones semánticas necesitas para aparecer en sus respuestas.',
  },
  {
    icon: ListChecks,
    color: 'text-cyan-400',
    title: 'Plan de Acción Prioritizado',
    description:
      'Un documento accionable —no un informe automático— con qué corregir primero para obtener resultados reales, ordenado por impacto.',
  },
];

const FOR_WHOM = [
  'Tienes web pero no apareces donde deberías en Google',
  'Quieres saber si las IAs conocen y recomiendan tu negocio',
  'Buscas una hoja de ruta clara antes de invertir en SEO',
  'Sospechas que hay errores técnicos que nadie te ha dicho',
];

export default function AuditoriaGratuitaPage() {
  return (
    <main className="page__content">
      {/* ── HERO ── */}
      <section className="section" style={{ paddingTop: 'var(--space-3xl)' }}>
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="badge badge--purple mb-lg">
              <span>Solo durante mayo · Plazas limitadas</span>
            </div>

            <h1 className="section-header__title">
              Auditoría{' '}
              <span className="gradient-text">SEO + GEO gratuita</span>
            </h1>

            <p className="section-header__subtitle">
              Durante mayo analizo tu web, tu visibilidad en Google y tu presencia en
              IAs como ChatGPT o Gemini —sin coste para ti. Servicio valorado en{' '}
              <strong>+750€</strong>.
            </p>

            <div
              className="flex gap-lg mt-xl"
              style={{ justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <div className="card card--no-hover p-lg text-center" style={{ minWidth: '160px' }}>
                <div className="text-3xl font-bold gradient-text">+750€</div>
                <div className="text-muted text-sm mt-sm">Valor del servicio</div>
              </div>
              <div className="card card--no-hover p-lg text-center" style={{ minWidth: '160px' }}>
                <div className="text-3xl font-bold" style={{ color: 'var(--color-accent-teal)' }}>
                  0€
                </div>
                <div className="text-muted text-sm mt-sm">Lo que pagas tú</div>
              </div>
              <div className="card card--no-hover p-lg text-center" style={{ minWidth: '160px' }}>
                <div className="text-3xl font-bold" style={{ color: 'var(--color-accent-cyan)' }}>
                  Mayo
                </div>
                <div className="text-muted text-sm mt-sm">Único mes disponible</div>
              </div>
            </div>

            <div className="mt-xl flex gap-md" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#formulario" className="btn btn--primary btn--large">
                Quiero mi auditoría gratuita
              </a>
              <Link href="/servicio-seo/auditoria-seo-geo" className="btn btn--secondary btn--large">
                Ver qué incluye el servicio
              </Link>
            </div>

            <div className="mt-xl flex items-center gap-sm" style={{ justifyContent: 'center', color: 'var(--color-text-muted)' }}>
              <ArrowDown size={16} />
              <span className="text-sm">Descubre qué recibirás</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUÉ INCLUYE ── */}
      <section className="section bg-dark-soft">
        <div className="container">
          <header className="section-header animate-on-scroll mb-2xl">
            <h2>¿Qué obtienes exactamente?</h2>
            <p className="section-header__subtitle">
              No es un informe automático. Es un análisis manual y estratégico de tu web.
            </p>
          </header>

          <div className="grid grid-cols-3 gap-lg animate-on-scroll">
            {AUDIT_ITEMS.map((item) => (
              <article key={item.title} className="card p-xl flex flex-col gap-4">
                <div className={item.color}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-lg">{item.title}</h3>
                <p className="text-secondary text-sm" style={{ lineHeight: '1.7' }}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="card card--no-hover p-xl mt-xl animate-on-scroll">
            <h3 className="text-center mb-lg">El informe final incluye</h3>
            <div className="grid grid-cols-3 gap-lg">
              <div className="flex flex-col gap-3">
                <CheckCircle2 className="text-purple-400" size={20} />
                <h4 className="font-bold">Errores priorizados</h4>
                <p className="text-sm text-secondary">
                  Lista ordenada por impacto de los problemas técnicos que debes corregir.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <CheckCircle2 className="text-teal-400" size={20} />
                <h4 className="font-bold">Estrategia GEO</h4>
                <p className="text-sm text-secondary">
                  Qué necesita tu web para aparecer en las respuestas de ChatGPT, Gemini y Perplexity.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <CheckCircle2 className="text-cyan-400" size={20} />
                <h4 className="font-bold">Benchmarking competitivo</h4>
                <p className="text-sm text-secondary">
                  Qué está haciendo bien tu competencia y cómo puedes superarla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARA QUIÉN ── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 gap-2xl items-center animate-on-scroll">
            <div>
              <div className="badge badge--purple mb-lg">
                <span>¿Esto es para ti?</span>
              </div>
              <h2 className="mb-lg">
                Para negocios que quieren{' '}
                <span className="gradient-text">visibilidad real</span>
              </h2>
              <div className="flex flex-col gap-md">
                {FOR_WHOM.map((item) => (
                  <div key={item} className="flex items-start gap-sm">
                    <CheckCircle2
                      size={20}
                      className="shrink-0 mt-1"
                      style={{ color: 'var(--color-accent-purple)' }}
                    />
                    <span className="text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-xl">
              <h3 className="mb-md">¿Por qué lo regalo?</h3>
              <p className="text-secondary mb-md" style={{ lineHeight: '1.8' }}>
                Quiero que compruebes la calidad de mi trabajo antes de tomar ninguna
                decisión. Una auditoría real, con profundidad y sin humo, es la mejor
                forma que tengo de presentarme.
              </p>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                Sin compromiso de contratación posterior. Si al recibir el informe decides
                que no te encaja trabajar conmigo, no pasa nada. Te quedas con el análisis
                completo de tu web sin coste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMULARIO ── */}
      <section id="formulario" className="section bg-dark-soft">
        <div className="container">
          <div className="section-header animate-on-scroll mb-xl">
            <div className="badge badge--purple mb-lg">
              <span>Plazas limitadas · Mayo 2025</span>
            </div>
            <h2>Solicita tu auditoría gratuita</h2>
            <p className="section-header__subtitle">
              Rellena el formulario y me pongo en contacto contigo en menos de 24h
              para confirmar tu plaza.
            </p>
          </div>

          <div style={{ maxWidth: '640px', margin: '0 auto' }} className="animate-on-scroll">
            <AuditoriaGratuitaForm />
          </div>

          <p className="text-muted text-sm text-center mt-lg">
            Sin spam. Tus datos solo se usan para gestionar esta auditoría.{' '}
            <Link href="/politica-privacidad" className="underline">
              Política de privacidad
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
