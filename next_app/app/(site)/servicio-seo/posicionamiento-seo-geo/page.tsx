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
import { Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'Posicionamiento SEO + GEO | Trabajo mensual en Google y en IA',
  description:
    'Servicio mensual de posicionamiento para Google y motores de IA: SEO local en Valencia, arquitectura semántica y visibilidad estratégica en ChatGPT y Gemini.',
  exactUrl: `${SITE_URL}/servicio-seo/posicionamiento-seo-geo`,
});

const VALUE_PROPS = [
  {
    title: 'Dominio de Google Local',
    description:
      'Optimizo tu Google Business Profile y tu autoridad local para captar clientes en tu zona de influencia.',
  },
  {
    title: 'Estrategia de contenido semántico',
    description:
      'Creo y optimizo contenido basado en entidades, no solo en palabras clave, para ser entendido por buscadores e IAs.',
  },
  {
    title: 'Crecimiento sostenible',
    description: 'Enfoque en tráfico de calidad que realmente convierte visitas en clientes finales.',
  },
];

const FAQ_ITEMS = [
  {
    question: '¿En qué se diferencia del servicio de Autoridad Digital para IAs?',
    answer:
      'El posicionamiento es el trabajo mensual amplio de ranking y visibilidad: arquitectura, contenido, SEO local y medición. La Autoridad Digital para IAs es una capa más específica, centrada en que tu marca sea entendida y citada como entidad por los sistemas generativos. Se complementan, pero no compiten.',
  },
  {
    question: '¿Incluye SEO local?',
    answer:
      'Sí. Si tu negocio depende de clientes en una zona concreta, el SEO local (Google Business Profile, señales de proximidad y reseñas) es una parte central del trabajo mensual.',
  },
  {
    question: '¿Hay permanencia?',
    answer:
      'Trabajo con un compromiso sugerido de 6 meses porque el posicionamiento es acumulativo y necesita continuidad para dar resultados, pero no ato a nadie con penalizaciones. Si no aporta valor, no tiene sentido seguir.',
  },
  {
    question: '¿Cuándo se empiezan a ver resultados?',
    answer:
      'Depende del punto de partida, la competencia y el sector. Las mejoras técnicas pueden notarse pronto; la ganancia sostenida de posiciones y autoridad es un trabajo de meses, no de semanas.',
  },
];

export default function PosicionamientoSeoGeo() {
  const pageUrl = `${SITE_URL}/servicio-seo/posicionamiento-seo-geo`;
  const breadcrumbId = `${pageUrl}#breadcrumbs`;
  const serviceId = `${pageUrl}#service`;
  const offerId = `${pageUrl}#offer`;

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios SEO', href: '/pricing#geo-seo' },
    { label: 'Posicionamiento SEO + GEO' },
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
        name: 'Posicionamiento SEO + GEO',
        description:
          'Servicio mensual de posicionamiento en buscadores y motores de IA, con SEO local, arquitectura semántica y trabajo continuo.',
        inLanguage: 'es-ES',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': breadcrumbId },
        about: [{ '@id': `${SITE_URL}/#business` }, { '@id': serviceId }],
        mainEntity: { '@id': serviceId },
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: 'Posicionamiento SEO + GEO',
        description:
          'Servicio mensual de SEO + GEO orientado a ganar y mantener visibilidad en Google y en sistemas de IA, con SEO local, contenido semántico y medición continua.',
        provider: { '@id': `${SITE_URL}/#business` },
        serviceType: 'Posicionamiento SEO y GEO',
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
        price: '600',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        itemOffered: { '@id': serviceId },
      },
      generateBreadcrumbSchema(
        [
          { label: 'Inicio', href: '/' },
          { label: 'Servicios SEO', href: '/pricing#geo-seo' },
          { label: 'Posicionamiento SEO + GEO', href: '/servicio-seo/posicionamiento-seo-geo' },
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
              <div className="badge badge--blue mb-lg">
                <span>Servicio de continuidad</span>
              </div>
              <h1 className="section-header__title">
                Posicionamiento <span className="gradient-text">SEO + GEO</span>
              </h1>
              <p className="section-header__subtitle">
                Servicio mensual para ganar y mantener posiciones en Google y en los buscadores de IA, con SEO local y
                trabajo continuo.
              </p>
            </header>

            <div className="generative-band animate-on-scroll mt-2xl">
              <div className="hero-canvas-frame">
                <GenerativeCanvas variant="bars" className="hero-canvas" />
              </div>
            </div>

            <div className="grid grid-cols-2 mt-2xl items-center gap-xl">
              <div className="animate-on-scroll">
                <h2 className="mb-lg">Visibilidad en todo el ecosistema de búsqueda</h2>
                <p className="text-secondary mb-lg">
                  El SEO ya no es solo aparecer en los 10 enlaces azules de Google. Hoy, tus clientes te buscan a través de
                  asistentes de voz, ChatGPT, Perplexity y las nuevas funcionalidades de IA de los buscadores.
                </p>
                <p className="text-secondary mb-xl">
                  Mi servicio mensual de posicionamiento SEO + GEO asegura que tu negocio mantenga una autoridad sólida en
                  todos estos canales de forma simultánea.
                </p>

                <p className="text-secondary mb-xl">
                  ¿Aún no sabes cómo apareces hoy? Empieza por el{' '}
                  <Link href="/laboratorio-visibilidad-ia">Laboratorio de visibilidad en IA</Link>{' '}
                  y comprueba, gratis, si los motores de IA ya te mencionan y recomiendan.
                </p>

                <div className="card card--no-hover p-lg">
                  <div className="flex items-center gap-4 mb-md">
                    <span className="text-2xl font-bold gradient-text">600€/mes</span>
                    <span className="text-muted text-sm">(Compromiso sugerido de 6 meses)</span>
                  </div>
                  <Link href="/contacto" className="btn btn--primary btn--block" data-primary-cta="true">
                    Empezar ahora
                  </Link>
                </div>
              </div>

              <ol className="editorial-list animate-on-scroll">
                {VALUE_PROPS.map((prop, index) => (
                  <li key={prop.title} className="editorial-item">
                    <span className="editorial-item__num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="editorial-item__title">{prop.title}</h3>
                      <p className="editorial-item__description">{prop.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* SEO vs GEO Comparison */}
        <section className="section bg-dark-soft">
          <div className="container">
            <h2 className="text-center mb-xl">¿Por qué SEO + GEO juntos?</h2>
            <div className="grid grid-cols-2 gap-xl">
              <div className="comparison-col">
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
              <div className="comparison-col">
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

            <p className="text-center text-secondary mt-2xl max-w-2xl mx-auto">
              ¿Buscas que las IAs te reconozcan como referente, no solo aparecer? Esa es la capa de entidad y citabilidad:{' '}
              <Link href="/servicio-seo/autoridad-digital-ias" className="underline">
                Autoridad Digital para IAs
              </Link>
              .
            </p>
          </div>
        </section>

        <SeoServiceChooser
          current="posicionamiento"
          title="Dónde encaja el trabajo mensual"
          subtitle="El posicionamiento es la implementación continua. Si aún no sabes qué falla, o si buscas la capa de entidad para IAs, estos son los otros dos momentos del proceso."
        />

        {/* FAQ */}
        <section id="faq" className="section" aria-labelledby="faq-title">
          <div className="container animate-on-scroll">
            <div className="section-heading section-header">
              <h2 id="faq-title" className="section-header__title">
                Preguntas frecuentes sobre el posicionamiento SEO + GEO
              </h2>
            </div>
            <FaqAccordion title="Respuestas rápidas antes de empezar" items={FAQ_ITEMS} />
          </div>
        </section>

        {/* CTA final */}
        <section className="section">
          <div className="container text-center animate-on-scroll">
            <h2 className="mb-lg">Domina los resultados de búsqueda hoy</h2>
            <p className="text-secondary mb-xl max-w-2xl mx-auto">
              El mercado no espera. Asegura tu presencia en los canales donde tus clientes están tomando decisiones de
              compra.
            </p>
            <div className="flex justify-center gap-md">
              <Link href="/contacto" className="btn btn--primary btn--large" data-primary-cta="true">
                Solicitar propuesta
              </Link>
              <Link href="/pricing" className="btn btn--secondary btn--large">
                Ver tarifas detalladas
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
