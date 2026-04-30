import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowDown, Clock } from 'lucide-react';
import AuditoriaGratuitaForm from '@/components/AuditoriaGratuitaForm';
import FaqAccordion from '@/components/FaqAccordion';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/schemas';

export const metadata = constructMetadata({
  title: 'Auditoría SEO + GEO Gratuita - Solo en Mayo | Carles del Olmo',
  description:
    'Durante mayo regalo una Auditoría SEO + GEO valorada en +750€. Analizo tu web, tu visibilidad en Google y tu presencia en IAs (ChatGPT, Gemini). Plazas limitadas.',
  exactUrl: `${SITE_URL}/auditoria-gratuita`,
});

const AUDIT_ITEMS = [
  {
    title: 'Auditoría Técnica SEO',
    description:
      'Errores de indexación, velocidad de carga, Core Web Vitals, arquitectura de URLs y estructura interna que frenan tu posicionamiento en Google.',
    illustration: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" aria-hidden="true">
        <rect x="6" y="10" width="52" height="44" rx="4" />
        <line x1="6" y1="20" x2="58" y2="20" />
        <line x1="14" y1="30" x2="32" y2="30" />
        <line x1="14" y1="38" x2="28" y2="38" />
        <line x1="14" y1="46" x2="36" y2="46" />
        <circle cx="44" cy="38" r="9" />
        <line x1="51" y1="45" x2="56" y2="50" />
        <path d="M41 38l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Análisis GEO (Presencia en IAs)',
    description:
      'Reviso si ChatGPT, Gemini o Perplexity conocen tu negocio, cómo te presentan y qué optimizaciones semánticas necesitas para aparecer en sus respuestas.',
    illustration: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" aria-hidden="true">
        <path d="M8 32c0 0 10-16 24-16s24 16 24 16s-10 16-24 16S8 32 8 32z" />
        <circle cx="32" cy="32" r="7" />
        <circle cx="32" cy="32" r="2" fill="currentColor" stroke="none" />
        <circle cx="10" cy="14" r="3" />
        <line x1="13" y1="16" x2="20" y2="22" />
        <circle cx="54" cy="14" r="3" />
        <line x1="51" y1="16" x2="44" y2="22" />
        <circle cx="54" cy="50" r="3" />
        <line x1="51" y1="48" x2="44" y2="42" />
        <circle cx="10" cy="50" r="3" />
        <line x1="13" y1="48" x2="20" y2="42" />
      </svg>
    ),
  },
  {
    title: 'Plan de Acción Prioritizado',
    description:
      'No es un informe automático. Es un documento accionable con qué corregir primero para obtener resultados reales, ordenado por impacto.',
    illustration: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" aria-hidden="true">
        <rect x="8" y="8" width="48" height="48" rx="4" />
        <line x1="8" y1="20" x2="56" y2="20" />
        <path d="M16 32h10" />
        <path d="M22 28l4 4-4 4" />
        <line x1="32" y1="29" x2="50" y2="29" />
        <line x1="32" y1="35" x2="44" y2="35" />
        <path d="M16 46h10" />
        <path d="M22 42l4 4-4 4" />
        <line x1="32" y1="43" x2="48" y2="43" />
        <line x1="32" y1="49" x2="42" y2="49" />
      </svg>
    ),
  },
];

const HOW_IT_WORKS = [
  {
    number: '01',
    title: 'Rellenas el formulario',
    description: 'Tardas 1 minuto. Solo necesito tu nombre, email, teléfono y la URL de la web a auditar.',
    time: '1 minuto',
    illustration: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" aria-hidden="true">
        <rect x="14" y="10" width="36" height="48" rx="3" />
        <rect x="22" y="6" width="20" height="8" rx="2" />
        <line x1="20" y1="24" x2="44" y2="24" />
        <line x1="20" y1="32" x2="44" y2="32" />
        <line x1="20" y1="40" x2="36" y2="40" />
        <path d="M20 48l4 4 8-8" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Te contacto en 24h',
    description: 'Confirmo tu plaza por email y, si hace falta, te explico cómo darme acceso de solo lectura a Search Console.',
    time: 'En 24h',
    illustration: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" aria-hidden="true">
        <rect x="8" y="14" width="48" height="36" rx="3" />
        <path d="M8 18l24 18 24-18" />
        <line x1="8" y1="46" x2="22" y2="34" />
        <line x1="56" y1="46" x2="42" y2="34" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Recibes el informe completo',
    description: 'Documento accionable con plan SEO + análisis GEO + benchmarking competitivo, ordenado por prioridad.',
    time: 'En 7 días',
    illustration: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" aria-hidden="true">
        <rect x="10" y="8" width="36" height="48" rx="3" />
        <line x1="18" y1="20" x2="38" y2="20" />
        <line x1="18" y1="28" x2="40" y2="28" />
        <line x1="18" y1="36" x2="34" y2="36" />
        <circle cx="46" cy="46" r="10" />
        <path d="M42 46l3 3 5-5" />
      </svg>
    ),
  },
];

const FOR_WHOM = [
  'Tienes web pero no apareces donde deberías en Google',
  'Quieres saber si las IAs conocen y recomiendan tu negocio',
  'Buscas una hoja de ruta clara antes de invertir en SEO',
  'Sospechas que hay errores técnicos que nadie te ha dicho',
];

const FAQ_ITEMS = [
  {
    question: '¿Realmente es gratis o hay letra pequeña?',
    answer:
      'Sí, es 100% gratis. No hay coste oculto, ni tarjeta requerida, ni periodo de prueba. Recibes la auditoría completa que normalmente facturo a 750€ y, si después decides que no te encaja trabajar conmigo, no pasa nada. El informe es tuyo.',
  },
  {
    question: '¿En cuántos días recibiré el informe?',
    answer:
      'Te entrego el documento completo en un máximo de 7 días desde que confirmamos los datos de tu web. Es un análisis manual y estratégico, no un informe automático: necesito ese tiempo para revisar bien tu caso y darte conclusiones útiles.',
  },
  {
    question: '¿Qué pasa después de enviar el formulario?',
    answer:
      'En las próximas 24 horas te escribo por email para confirmar tu plaza y, si hace falta, pedirte acceso a Google Search Console (solo lectura). A partir de ahí, en 7 días tienes el informe completo en tu correo.',
  },
  {
    question: '¿Es un anzuelo para venderme servicios luego?',
    answer:
      'Te seré honesto: el objetivo es que conozcas mi forma de trabajar. Si cuando recibas el informe te interesa que ejecute las mejoras conmigo, hablamos. Si no, te quedas con el análisis y se acabó. Sin emails de seguimiento agresivos ni llamadas insistentes.',
  },
  {
    question: '¿Cuántas plazas hay disponibles en mayo?',
    answer:
      'Las que pueda atender con el nivel de profundidad que requiere una auditoría real. Cuando se llenen, cierro la promoción. Por eso recomiendo no dejarlo para final de mes: el orden de llegada determina las plazas.',
  },
  {
    question: '¿Qué incluye exactamente la auditoría SEO + GEO?',
    answer:
      'Tres bloques: (1) auditoría técnica SEO con errores priorizados por impacto, (2) análisis GEO sobre cómo te ven y citan ChatGPT, Gemini y Perplexity, y (3) un plan de acción concreto ordenado por prioridad. Es exactamente el mismo servicio que vendo a 750€ a clientes habituales.',
  },
  {
    question: '¿Necesitas acceso a algo de mi web?',
    answer:
      'Lo ideal es acceso de solo lectura a Google Search Console y Google Analytics (te explico cómo darme acceso en menos de 1 minuto). Si no los tienes configurados, igualmente hago la auditoría con análisis externo, aunque pierdo parte de la profundidad de los datos reales de tráfico.',
  },
  {
    question: '¿Para qué tipo de webs es esta auditoría?',
    answer:
      'Para webs de empresas, autónomos y proyectos digitales que ya estén publicados y tengan algo de tráfico. No es ideal para webs recién creadas sin historial, ni para e-commerce muy grandes (necesitan auditorías más específicas que no entran en el alcance de esta promoción).',
  },
  {
    question: '¿Vas a tocar o modificar algo de mi web?',
    answer:
      'No. Es una auditoría 100% de análisis: solo recibes un documento con conclusiones y recomendaciones. Las modificaciones las haces tú o tu equipo. O si quieres, me las contratas aparte si lo prefieres, pero eso ya es otra conversación.',
  },
  {
    question: '¿En qué se diferencia esto de un informe automático tipo SEMrush o Ahrefs?',
    answer:
      'Las herramientas como SEMrush o Ahrefs dan datos crudos y scores genéricos. Mi auditoría da contexto y prioridades aplicadas a tu negocio: te digo qué problema resolver primero y por qué. Además, ninguna herramienta automática hace análisis GEO real (cómo te ven las IAs); eso requiere consultas manuales y criterio humano.',
  },
];

export default function AuditoriaGratuitaPage() {
  return (
    <main className="page__content">
      {/* ── HERO ── */}
      <section className="section" style={{ paddingTop: 'var(--spacing-3xl)' }}>
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <div className="badge badge--purple mb-lg">
              <span>Solo durante mayo · Plazas limitadas</span>
            </div>

            <h1 className="section-header__title">
              Auditoría{' '}
              <span className="gradient-text">SEO + GEO gratuita</span>
            </h1>

            <p className="section-header__subtitle">
              Durante mayo analizo tu web, tu visibilidad en Google y tu presencia en
              IAs como ChatGPT o Gemini <strong>sin coste</strong> para ti. Servicio valorado en{' '}
              <strong>+750€</strong>.
            </p>

            <div className="audit-highlight-bar animate-fade-in-up">
              <div className="audit-highlight-item">
                <div className="audit-highlight-value" style={{ color: 'var(--color-accent-teal)' }}>
                  +750€
                </div>
                <div className="audit-highlight-label">Valor real</div>
              </div>
              <div className="audit-highlight-item">
                <div className="audit-highlight-value gradient-text">
                  0€
                </div>
                <div className="audit-highlight-label">Lo que pagas</div>
              </div>
              <div className="audit-highlight-item">
                <div className="audit-highlight-value" style={{ color: 'var(--color-accent-cyan)' }}>
                  Mayo
                </div>
                <div className="audit-highlight-label">Solo este mes</div>
              </div>
            </div>

            <div className="mt-xl flex gap-md" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#formulario" className="btn btn--primary btn--large">
                Quiero mi auditoría gratuita
              </a>
              <Link href="/servicio-seo/auditoria-seo-geo" className="btn btn--glass btn--large">
                Ver qué incluye el servicio
              </Link>
            </div>

            <div className="mt-xl flex items-center gap-sm" style={{ justifyContent: 'center', color: 'var(--color-text-muted)' }}>
              <ArrowDown size={16} className="animate-bounce" />
              <span className="text-sm">Descubre qué recibirás</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUÉ INCLUYE ── */}
      <section className="section bg-dark-soft">
        <div className="container">
          <header className="section-header animate-on-scroll mb-2xl">
            <h2 className="gradient-text">¿Qué obtienes exactamente?</h2>
            <p className="section-header__subtitle">
              No es un informe automático. Es un análisis manual y estratégico de tu web.
            </p>
          </header>

          <div className="grid grid-cols-3 gap-lg animate-on-scroll">
            {AUDIT_ITEMS.map((item) => (
              <article key={item.title} className="card card--glass p-xl flex flex-col gap-2">
                <div className="audit-card-icon-container">
                  {item.illustration}
                </div>
                <h3 className="text-lg mb-2">{item.title}</h3>
                <p className="text-secondary text-sm" style={{ lineHeight: '1.7' }}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="card card--glass card--no-hover p-xl mt-xl animate-on-scroll">
            <h3 className="text-center mb-xl">El informe final incluye</h3>
            <div className="grid grid-cols-3 gap-lg">
              <div className="audit-checklist-item">
                <CheckCircle2 size={24} style={{ color: 'var(--color-accent-purple)' }} className="shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Errores priorizados</h4>
                  <p className="text-sm text-secondary">
                    Lista ordenada por impacto de los problemas técnicos que debes corregir.
                  </p>
                </div>
              </div>
              <div className="audit-checklist-item">
                <CheckCircle2 size={24} style={{ color: 'var(--color-accent-purple)' }} className="shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Estrategia GEO</h4>
                  <p className="text-sm text-secondary">
                    Qué necesita tu web para aparecer en las respuestas de ChatGPT, Gemini y Perplexity.
                  </p>
                </div>
              </div>
              <div className="audit-checklist-item">
                <CheckCircle2 size={24} style={{ color: 'var(--color-accent-purple)' }} className="shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Benchmarking competitivo</h4>
                  <p className="text-sm text-secondary">
                    Qué está haciendo bien tu competencia y cómo puedes superarla.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="section">
        <div className="container">
          <header className="section-header animate-on-scroll mb-2xl">
            <div className="badge badge--purple mb-lg">
              <span>Transparencia total</span>
            </div>
            <h2>Tres pasos y el informe es tuyo</h2>
            <p className="section-header__subtitle">
              Sin trámites raros, sin reuniones obligatorias. Tú envías el formulario y yo me encargo del resto.
            </p>
          </header>

          <div className="grid grid-cols-3 gap-lg animate-on-scroll">
            {HOW_IT_WORKS.map((step) => (
              <article key={step.number} className="card card--step p-xl flex flex-col gap-4">
                <span className="step-number-stylized">{step.number}</span>
                <div className="flex items-center justify-between">
                  <div className="audit-card-icon-container" style={{ marginBottom: 0 }}>
                    {step.illustration}
                  </div>
                </div>
                <h3 className="text-lg">{step.title}</h3>
                <p className="text-secondary text-sm" style={{ lineHeight: '1.7' }}>
                  {step.description}
                </p>
                <div className="flex items-center gap-sm text-muted text-sm" style={{ marginTop: 'auto', justifyContent: 'flex-start' }}>
                  <Clock size={14} />
                  <span>{step.time}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULARIO (posición principal de conversión) ── */}
      <section id="formulario" className="section bg-dark-soft">
        <div className="container">
          <div className="section-header animate-on-scroll mb-xl">
            <div className="badge badge--purple mb-lg">
              <span>Plazas limitadas · Mayo</span>
            </div>
            <h2>Solicita tu auditoría gratuita</h2>
            <p className="section-header__subtitle">
              Rellena el formulario y me pongo en contacto contigo en menos de 24h
              para confirmar tu plaza.
            </p>
          </div>

          <div style={{ maxWidth: '640px', margin: '0 auto' }} className="animate-on-scroll card card--glass p-xl">
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
                  <div key={item} className="audit-checklist-item" style={{ padding: 'var(--spacing-sm) var(--spacing-md)' }}>
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

            <div className="card card--glass p-xl">
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

      {/* ── FAQ ── */}
      <section className="section bg-dark-soft">
        <div className="container">
          <div className="section-header animate-on-scroll mb-xl">
            <div className="badge badge--purple mb-lg">
              <span>Preguntas frecuentes</span>
            </div>
            <h2>Resolvemos tus dudas antes de pedirla</h2>
            <p className="section-header__subtitle">
              Si te queda alguna pregunta sin responder, escríbeme directamente y te contesto.
            </p>
          </div>

          <div className="animate-on-scroll">
            <FaqAccordion
              title="Sobre la Auditoría SEO + GEO Gratuita"
              items={FAQ_ITEMS}
            />
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="section">
        <div className="container">
          <div
            className="card card--glass card--no-hover p-2xl text-center animate-on-scroll"
            style={{ maxWidth: '820px', margin: '0 auto' }}
          >
            <div className="badge badge--purple mb-lg" style={{ display: 'inline-block' }}>
              <span>Plazas limitadas</span>
            </div>
            <h2 className="mb-md">¿Resuelto? Reserva tu plaza ahora</h2>
            <p className="text-secondary mb-xl" style={{ maxWidth: '520px', margin: '0 auto var(--spacing-xl)' }}>
              El orden de llegada determina las plazas. Cuando se llenen, cierro la promoción y vuelvo a la tarifa de 750€.
            </p>
            <a href="#formulario" className="btn btn--primary btn--large">
              Solicitar mi auditoría gratuita →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
