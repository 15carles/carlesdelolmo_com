import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import GenerativeCanvas from '@/components/GenerativeCanvas';
import FaqAccordion from '@/components/FaqAccordion';
import SeoServiceChooser from '@/components/SeoServiceChooser';
import { constructMetadata } from '@/lib/seo/metadata';
import { safeJsonLd } from '@/lib/seo/jsonLd';
import {
  BUSINESS_SCHEMA,
  PERSON_SCHEMA,
  SITE_URL,
  generateBreadcrumbSchema,
  generateFaqPageNode,
} from '@/lib/seo/schemas';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'Auditoría SEO + GEO | Por qué no apareces en Google ni en las IAs',
  description:
    'Auditoría técnica manual de tu visibilidad en Google y en respuestas de IA (ChatGPT, Gemini, Perplexity). Recibes un plan de acción priorizado para saber qué arreglar primero.',
  exactUrl: `${SITE_URL}/servicio-seo/auditoria-seo-geo`,
});

const POINTS = [
  {
    title: 'Análisis de visibilidad en buscadores',
    description:
      'Reviso cómo te ven Google y Bing hoy: indexación, bloqueos técnicos, canibalizaciones y oportunidades desaprovechadas.',
  },
  {
    title: 'Auditoría de respuestas de IA (GEO)',
    description:
      'Compruebo si ChatGPT, Gemini o Perplexity te mencionan, cómo presentan tu marca y qué señales les faltan para entenderte.',
  },
  {
    title: 'Arquitectura semántica y entidad',
    description:
      'Analizo si tu web usa la estructura y los datos estructurados necesarios para ser interpretada por modelos de lenguaje.',
  },
  {
    title: 'Rendimiento y Core Web Vitals',
    description:
      'Estudio de velocidad de carga y experiencia técnica, porque el rendimiento condiciona tanto el SEO como la conversión.',
  },
];

const SYMPTOMS = [
  {
    title: 'Tu web no aparece (o aparece mal)',
    text: 'Tienes página, pero no la encuentras cuando buscas lo que ofreces, o apareces por términos que no te interesan.',
  },
  {
    title: 'Las IAs no saben quién eres',
    text: 'Preguntas por tu marca o tu sector a ChatGPT o Gemini y no te citan, o te describen de forma imprecisa.',
  },
  {
    title: 'Has invertido y no ves retorno',
    text: 'Hiciste web, quizás algo de SEO, pero no tienes claro qué está fallando ni por dónde empezar a corregir.',
  },
];

const DELIVERABLES = [
  'Plan de acción SEO con correcciones técnicas priorizadas por impacto.',
  'Estrategia GEO: qué necesita tu web para ser entendida y citada por sistemas de IA.',
  'Diagnóstico de arquitectura semántica y datos estructurados.',
  'Revisión de rendimiento y Core Web Vitals con puntos críticos.',
  'Benchmarking: qué está haciendo bien tu competencia y dónde puedes ganar.',
  'Orden de prioridades claro: qué hacer hoy, qué después y qué puede esperar.',
];

const FAQ_ITEMS = [
  {
    question: '¿En qué se diferencia esta auditoría de un informe automático de una herramienta?',
    answer:
      'Una herramienta te da una lista de avisos sin contexto ni prioridad. Esta auditoría es un análisis manual y estratégico: interpreto los datos, descarto el ruido y te digo qué importa de verdad para tu negocio y en qué orden resolverlo.',
  },
  {
    question: '¿Qué entregable recibo exactamente?',
    answer:
      'Un documento accionable con el diagnóstico de tu visibilidad en buscadores y en IA, los problemas detectados y un plan de actuación priorizado. El objetivo es que, al terminar, sepas exactamente qué hacer y por qué.',
  },
  {
    question: '¿La auditoría incluye implementar los cambios?',
    answer:
      'No. La auditoría es el diagnóstico y el plan. La implementación se trabaja después, ya sea por tu parte, con tu equipo o conmigo a través del servicio de Posicionamiento SEO + GEO o de Autoridad Digital para IAs.',
  },
  {
    question: '¿Analizas también mi visibilidad en ChatGPT, Gemini o Perplexity?',
    answer:
      'Sí. Reviso si esos sistemas te mencionan, cómo describen tu marca y qué señales de estructura, entidad y consistencia les faltan para entenderte mejor. Esa es la parte GEO de la auditoría.',
  },
  {
    question: '¿Para qué tipo de webs tiene sentido?',
    answer:
      'Para empresas y profesionales con una web activa que no está rindiendo como debería y que quieren un diagnóstico claro antes de invertir más. Si aún no tienes web o los servicios no están definidos, puede convenir empezar por diseño web.',
  },
  {
    question: '¿Cuánto cuesta y cuánto tarda?',
    answer:
      'La auditoría tiene un precio de 750 € (pago único, sin IVA). El plazo depende del tamaño de la web, pero recibirás el documento en cuestión de días, no de semanas.',
  },
];

export default function AuditoriaSeoGeo() {
  const pageUrl = `${SITE_URL}/servicio-seo/auditoria-seo-geo`;
  const breadcrumbId = `${pageUrl}#breadcrumbs`;
  const serviceId = `${pageUrl}#service`;
  const offerId = `${pageUrl}#offer`;

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios SEO', href: '/pricing#geo-seo' },
    { label: 'Auditoría SEO + GEO' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      PERSON_SCHEMA,
      BUSINESS_SCHEMA,
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Auditoría SEO + GEO',
        description:
          'Auditoría técnica manual de la visibilidad de una web en buscadores y en respuestas de IA, con plan de acción priorizado.',
        inLanguage: 'es-ES',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': breadcrumbId },
        about: [{ '@id': `${SITE_URL}/#business` }, { '@id': serviceId }],
        mainEntity: { '@id': serviceId },
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: 'Auditoría SEO + GEO',
        description:
          'Análisis técnico y estratégico de la visibilidad de una web en Google y en sistemas de IA (ChatGPT, Gemini, Perplexity), con un plan de acción priorizado.',
        provider: { '@id': `${SITE_URL}/#business` },
        serviceType: 'Auditoría SEO y GEO',
        areaServed: [
          { '@type': 'City', name: 'Valencia' },
          { '@type': 'Country', name: 'España' },
        ],
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: `${SITE_URL}/contacto`,
          availableLanguage: ['es', 'en'],
        },
        offers: { '@id': offerId },
      },
      {
        '@type': 'Offer',
        '@id': offerId,
        url: pageUrl,
        price: '750',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        itemOffered: { '@id': serviceId },
      },
      generateBreadcrumbSchema(
        [
          { label: 'Inicio', href: '/' },
          { label: 'Servicios SEO', href: '/pricing#geo-seo' },
          { label: 'Auditoría SEO + GEO', href: '/servicio-seo/auditoria-seo-geo' },
        ],
        breadcrumbId,
      ),
      generateFaqPageNode(FAQ_ITEMS, `${pageUrl}#faq`),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />

      <main className="page__content">
        <Breadcrumbs items={breadcrumbs} />

        <section className="section">
          <div className="container">
            <header className="section-header animate-on-scroll">
              <div className="badge badge--purple mb-lg">
                <span>Diagnóstico · Punto de partida</span>
              </div>
              <h1 className="section-header__title">
                Auditoría <span className="gradient-text">SEO + GEO</span>
              </h1>
              <p className="section-header__subtitle">
                No basta con estar online. Necesitas saber por qué no estás captando lo que quieres y cómo te interpretan
                hoy Google y los nuevos buscadores de IA. Esta auditoría te lo dice, con un plan claro para actuar.
              </p>
            </header>

            <div className="generative-band animate-on-scroll mt-2xl">
              <div className="hero-canvas-frame">
                <GenerativeCanvas variant="audit" className="hero-canvas" />
              </div>
            </div>

            <div className="grid grid-cols-2 mt-2xl items-center gap-xl">
              <div className="animate-on-scroll">
                <h2 className="mb-lg">Radiografía completa de tu ecosistema digital</h2>
                <p className="text-secondary mb-lg">
                  Mi auditoría SEO + GEO no es un informe automático generado por una herramienta. Es un análisis manual y
                  estratégico donde reviso cada punto crítico que impide que tu web escale.
                </p>
                <p className="text-secondary mb-xl">
                  Recibirás un documento accionable con prioridades claras: qué arreglar hoy para ver resultados mañana.
                </p>

                <p className="text-secondary mb-xl">
                  ¿Quieres una primera señal antes de reservar? Con el{' '}
                  <Link href="/laboratorio-visibilidad-ia">Laboratorio de visibilidad en IA</Link>{' '}
                  puedes comprobar tú mismo, gratis, si ChatGPT, Gemini o Perplexity ya mencionan tu empresa.
                </p>

                <div className="card card--no-hover p-lg">
                  <div className="flex items-center gap-4 mb-md">
                    <span className="text-2xl font-bold gradient-text">750€</span>
                    <span className="text-muted text-sm">(Pago único, precios sin IVA)</span>
                  </div>
                  <Link href="/contacto" className="btn btn--primary btn--block" data-primary-cta="true">
                    Reservar Auditoría
                  </Link>
                </div>
              </div>

              <ol className="editorial-list animate-on-scroll">
                {POINTS.map((point, index) => (
                  <li key={point.title} className="editorial-item">
                    <span className="editorial-item__num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="editorial-item__title">{point.title}</h3>
                      <p className="editorial-item__description">{point.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Síntomas: para quién es */}
        <section className="section section-problem" aria-labelledby="sintomas-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--teal mb-lg">Cuándo tiene sentido</span>
              <h2 id="sintomas-title" className="section-header__title">
                Empieza por aquí si te reconoces en esto
              </h2>
            </div>

            <div className="problem-grid grid grid-cols-3 gap-lg">
              {SYMPTOMS.map((item) => (
                <article key={item.title} className="problem-card card animate-on-scroll">
                  <h3>{item.title}</h3>
                  <p className="text-secondary mb-0">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Qué incluye el informe */}
        <section className="section bg-dark-soft" aria-labelledby="incluye-title">
          <div className="container">
            <h2 id="incluye-title" className="text-center mb-xl">
              ¿Qué incluye el informe final?
            </h2>
            <div className="grid grid-cols-2 gap-lg">
              {DELIVERABLES.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="text-teal-400 mt-1 shrink-0" size={20} />
                  <p className="text-secondary mb-0">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qué pasa después: enlaza hacia adelante */}
        <section className="section" aria-labelledby="despues-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--blue mb-lg">Qué pasa después</span>
              <h2 id="despues-title" className="section-header__title">
                La auditoría es el primer paso, no el último
              </h2>
              <p className="section-header__subtitle">
                Con el diagnóstico en la mano, el camino natural es implementar. Según lo que necesites, seguimos por el
                trabajo mensual de{' '}
                <Link href="/servicio-seo/posicionamiento-seo-geo">Posicionamiento SEO + GEO</Link> o por la capa de{' '}
                <Link href="/servicio-seo/autoridad-digital-ias">Autoridad Digital para IAs</Link>. Y si lo que falla es
                la base, quizás toque revisar el <Link href="/diseno-web">diseño de la web</Link>.
              </p>
            </div>
          </div>
        </section>

        <SeoServiceChooser
          current="auditoria"
          title="¿Solo necesitas el diagnóstico o algo más?"
          subtitle="La auditoría es la entrada. Estos son los tres momentos del proceso: según en cuál estés, empezamos por uno u otro."
        />

        {/* FAQ */}
        <section id="faq" className="section" aria-labelledby="faq-title">
          <div className="container animate-on-scroll">
            <div className="section-heading section-header">
              <h2 id="faq-title" className="section-header__title">
                Preguntas frecuentes sobre la auditoría SEO + GEO
              </h2>
            </div>
            <FaqAccordion title="Respuestas rápidas antes de reservar" items={FAQ_ITEMS} />
          </div>
        </section>

        {/* CTA final */}
        <section className="section" aria-labelledby="cta-title">
          <div className="container text-center animate-on-scroll">
            <h2 id="cta-title" className="mb-lg">
              ¿Empezamos con el análisis?
            </h2>
            <p className="text-secondary mb-xl max-w-2xl mx-auto">
              La mayoría de las webs fallan por errores técnicos invisibles a simple vista. Detectarlos es el primer paso
              para ganar visibilidad en buscadores y en las IAs.
            </p>
            <Link href="/contacto" className="btn btn--primary btn--large" data-primary-cta="true">
              Solicitar presupuesto personalizado
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
