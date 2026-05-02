import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import { constructMetadata } from '@/lib/seo/metadata';
import { safeJsonLd } from '@/lib/seo/jsonLd';
import {
  BUSINESS_SCHEMA,
  PERSON_SCHEMA,
  SITE_URL,
  generateBreadcrumbSchema,
  generateFaqPageNode,
} from '@/lib/seo/schemas';
import { Check } from 'lucide-react';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'Autoridad Digital para IAs | SEO y GEO para marcas visibles',
  description:
    'Servicio de autoridad digital para IAs: estructura tu web, contenidos y señales semánticas para que buscadores y sistemas de IA entiendan mejor tu marca.',
  exactUrl: `${SITE_URL}/servicio-seo/autoridad-digital-ias`,
});

const SERVICE_AREAS = [
  {
    title: '1. Diagnóstico de entidad digital',
    description:
      'Reviso cómo aparece representada tu marca en internet y si tu web explica con claridad quién eres, qué haces, qué servicios ofreces y qué señales externas respaldan tu actividad.',
    items: [
      'Quién está detrás del proyecto',
      'Qué servicios se entienden como principales',
      'Qué especialización estás comunicando realmente',
      'Qué inconsistencias debilitan tu autoridad',
    ],
  },
  {
    title: '2. Arquitectura semántica del sitio',
    description:
      'Analizo la relación entre páginas de servicio, contenidos, casos y señales externas para que la web funcione como un sistema y no como páginas sueltas que compiten entre sí.',
    items: [
      'Jerarquía clara por líneas de servicio',
      'Relación entre páginas comerciales y contenidos',
      'Conexión entre pruebas de experiencia y oferta',
      'Rutas de lectura útiles para buscadores y usuarios',
    ],
  },
  {
    title: '3. Optimización de páginas clave',
    description:
      'Priorizo las páginas que más pesan en confianza y conversión para que expliquen mejor problema, encaje, enfoque, límites y propuesta de valor.',
    items: [
      'Home y páginas de servicio',
      'Página sobre ti o sobre la empresa',
      'Casos de estudio y prueba social',
      'Puntos críticos de objeción antes del contacto',
    ],
  },
  {
    title: '4. Contenido LLM-friendly',
    description:
      'Trabajo contenido claro, estructurado y reutilizable para facilitar interpretación, síntesis y contexto en sistemas generativos sin perder naturalidad para personas.',
    items: [
      'Definiciones claras y encabezados útiles',
      'Respuestas directas a preguntas reales',
      'Bloques autocontenidos y listas accionables',
      'Menos ambigüedad y menos relleno',
    ],
  },
  {
    title: '5. Datos estructurados y Schema.org',
    description:
      'Refuerzo la claridad semántica con marcado coherente con la realidad de la marca, sin aplicar schema por inercia ni maquillaje técnico.',
    items: [
      'Entidad principal (persona o empresa)',
      'Servicios y páginas clave',
      'FAQ y contenido editorial relevante',
      'Relaciones internas entre entidades',
    ],
  },
  {
    title: '6. Interlinking estratégico',
    description:
      'Reorganizo enlaces internos para que cada página aporte al conjunto: servicio, contenido, prueba de experiencia y siguiente paso comercial.',
    items: [
      'Servicio -> caso o contenido de apoyo',
      'Blog -> página comercial relacionada',
      'FAQ -> valoración o auditoría',
      'Sobre mí/empresa -> servicios prioritarios',
    ],
  },
  {
    title: '7. Señales de confianza y consistencia externa',
    description:
      'Reviso coherencia entre web y perfiles externos para evitar contradicciones de identidad, especialización o contexto de marca.',
    items: [
      'Google Business Profile',
      'LinkedIn y perfiles profesionales',
      'Menciones y referencias públicas',
      'Datos de contacto, ubicación y área de servicio',
    ],
  },
  {
    title: '8. Estrategia de autoridad temática',
    description:
      'Defino qué contenidos conviene crear, mejorar o conectar para construir profundidad temática real y no un blog decorativo sin función estratégica.',
    items: [
      'Responder dudas con intención comercial',
      'Reforzar páginas de servicio',
      'Resolver objeciones antes del contacto',
      'Construir especialización acumulativa',
    ],
  },
];

const WHEN_IT_FITS = [
  {
    title: 'Empresas con servicios complejos',
    text: 'Si vendes servicios que requieren explicación, comparación o confianza previa, la claridad estructural y temática es decisiva.',
  },
  {
    title: 'Marcas personales expertas',
    text: 'Cuando tu autoridad depende de criterio y especialización, tu web debe funcionar como base pública de confianza y no solo como escaparate.',
  },
  {
    title: 'Negocios locales que quieren reforzar confianza',
    text: 'Cada vez más usuarios comparan señales antes de contactar: reseñas, claridad de servicios, coherencia y especialización.',
  },
  {
    title: 'Empresas con contenido pero sin sistema',
    text: 'Hay webs con blog y páginas comerciales, pero mal conectadas. Aquí suele ganar más ordenar que publicar más sin dirección.',
  },
  {
    title: 'Proyectos que quieren prepararse para el futuro',
    text: 'No para perseguir modas, sino para construir una base clara y acumulativa en buscadores tradicionales y entornos generativos.',
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Diagnóstico inicial',
    description:
      'Analizo páginas clave, contenido, estructura, interlinking y señales externas para detectar ambigüedades de entidad.',
  },
  {
    number: '02',
    title: 'Mapa de entidad y servicios',
    description:
      'Defino cómo debe entenderse la marca, qué especialización reforzar y qué relación debe existir entre servicios, contenidos y autoridad.',
  },
  {
    number: '03',
    title: 'Priorización de páginas clave',
    description:
      'Trabajo primero las piezas que más impactan en comprensión y conversión: home, servicios, sobre, casos y contenidos estratégicos.',
  },
  {
    number: '04',
    title: 'Optimización semántica y editorial',
    description:
      'Reescribo o reorganizo bloques para ganar claridad, precisión y utilidad real sin inflar copy innecesariamente.',
  },
  {
    number: '05',
    title: 'Relaciones internas y capa técnica',
    description:
      'Refuerzo enlaces internos, breadcrumbs y datos estructurados cuando tiene sentido y siempre alineados con el contenido visible.',
  },
  {
    number: '06',
    title: 'Plan de autoridad temática',
    description:
      'Defino contenidos a crear, mejorar o conectar para construir especialización de forma acumulativa.',
  },
  {
    number: '07',
    title: 'Seguimiento y mejora continua',
    description:
      'La autoridad digital evoluciona: revisamos, priorizamos y reforzamos la base según objetivos y contexto de cada etapa.',
  },
];

const EXPECT_ITEMS = [
  'Más claridad sobre quién eres, qué haces y para quién trabajas',
  'Mejor conexión entre servicios, contenidos y prueba de experiencia',
  'Menos ambigüedad en tu información pública',
  'Mayor consistencia entre web y señales externas',
  'Contenido más útil para personas y más interpretable para sistemas generativos',
  'Una base de autoridad temática más sólida a medio plazo',
  'Mejor preparación para SEO + GEO trabajando juntos',
  'Decisiones editoriales y semánticas con criterio comercial',
];

const MONTHLY_INCLUDE_ITEMS = [
  'Diagnóstico inicial de entidad digital',
  'Revisión de páginas clave',
  'Propuestas de mejora semántica',
  'Optimización de contenidos existentes',
  'Creación o planificación de contenidos LLM-friendly',
  'Revisión de interlinking interno',
  'Recomendaciones de Schema.org y datos estructurados',
  'Análisis de coherencia entre web y perfiles externos',
  'Priorización de acciones SEO/GEO',
  'Mejora de FAQs estratégicas',
  'Revisión de señales de confianza',
  'Seguimiento de evolución y nuevas oportunidades',
];

const HERO_HIGHLIGHTS = [
  'Estructura semántica clara',
  'Contenido LLM-friendly',
  'Señales de confianza consistentes',
  'Estrategia SEO + GEO acumulativa',
];

const FAQ_ITEMS = [
  {
    question: '¿La autoridad digital para IAs garantiza aparecer en ChatGPT?',
    answer:
      'No. Ningún servicio serio puede garantizar que una marca aparezca en ChatGPT, Perplexity, Gemini, Copilot u otro sistema. Lo que sí se trabaja es claridad, estructura, consistencia y autoridad para aumentar las posibilidades de ser comprendida como fuente fiable.',
  },
  {
    question: '¿En qué se diferencia del SEO tradicional?',
    answer:
      'El SEO tradicional busca mejorar visibilidad en buscadores. La autoridad digital para IAs añade una capa orientada a que la marca sea más fácil de entender, resumir y relacionar por sistemas generativos. Son enfoques complementarios.',
  },
  {
    question: '¿Necesito tener blog para trabajar autoridad digital para IAs?',
    answer:
      'No siempre, pero suele ayudar. Un blog bien planteado permite responder dudas reales, demostrar criterio y reforzar páginas de servicio. El problema no es no tener blog, sino tener contenido sin estrategia.',
  },
  {
    question: '¿Cuánto tiempo tarda en notarse este trabajo?',
    answer:
      'Depende del estado inicial, sector, competencia y frecuencia de implementación. Es un trabajo acumulativo: primero mejora claridad y consistencia; después se refuerza autoridad temática y señal semántica con continuidad.',
  },
  {
    question: '¿Tiene sentido para negocios locales?',
    answer:
      'Sí, especialmente en sectores donde confianza y comparación previa son clave. La coherencia entre web, Google Business Profile, reseñas, servicios y ubicación puede marcar una diferencia relevante.',
  },
  {
    question: '¿Qué necesito antes de contratar este servicio?',
    answer:
      'Lo ideal es tener una web activa, servicios definidos y una intención clara de construir visibilidad a medio plazo. Si la base todavía es débil, puede convenir empezar por auditoría, arquitectura o mejora de página de servicio.',
  },
];

export default function AutoridadDigitalIas() {
  const pageUrl = `${SITE_URL}/servicio-seo/autoridad-digital-ias`;
  const breadcrumbId = `${pageUrl}#breadcrumbs`;
  const serviceId = `${pageUrl}#service`;
  const offerId = `${pageUrl}#offer`;

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios SEO', href: '/pricing#geo-seo' },
    { label: 'Autoridad Digital para IAs' },
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
        name: 'Autoridad Digital para IAs',
        description:
          'Servicio de autoridad digital para IAs para estructurar web, contenidos y señales semánticas con foco en claridad, consistencia y visibilidad sostenible.',
        inLanguage: 'es-ES',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': breadcrumbId },
        about: [{ '@id': `${SITE_URL}/#business` }, { '@id': serviceId }],
        mainEntity: { '@id': serviceId },
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: 'Autoridad Digital para IAs',
        description:
          'Servicio SEO + GEO orientado a reforzar la estructura semántica, la claridad editorial y las señales de confianza de una marca para buscadores y sistemas generativos.',
        provider: { '@id': `${SITE_URL}/#business` },
        serviceType: 'Autoridad Digital para IAs',
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
        itemOffered: { '@id': serviceId },
      },
      generateBreadcrumbSchema(
        [
          { label: 'Inicio', href: '/' },
          { label: 'Servicios SEO', href: '/pricing#geo-seo' },
          { label: 'Autoridad Digital para IAs', href: '/servicio-seo/autoridad-digital-ias' },
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

        <section id="inicio" className="section hero hero-service" aria-labelledby="hero-title">
          <div className="container">
            <div className="mt-2xl animate-on-scroll">
              <div className="badge badge--status mb-lg helper-center-mobile">
                <span>Optimización Avanzada</span>
              </div>

              <h1 id="hero-title" className="mb-md helper-center-mobile">
                Autoridad Digital para <span className="gradient-text">IAs</span>
              </h1>

              <p className="hero-description text-secondary mb-lg helper-center-mobile">
                Preparo la estructura, el contenido y las señales de confianza de tu web para que buscadores y sistemas de
                inteligencia artificial entiendan mejor tu marca, tus servicios y tu especialización.
              </p>

              <p className="text-secondary mb-md helper-center-mobile">
                La visibilidad digital ya no depende solo de aparecer en Google. Cada vez más usuarios preguntan
                directamente a sistemas de IA, asistentes conversacionales y motores generativos antes de decidir.
              </p>

              <p className="text-secondary mb-xl helper-center-mobile">
                Este servicio trabaja la capa semántica, técnica y estratégica de tu presencia digital para construir una
                marca más comprensible, consistente y preparada para el nuevo entorno de búsqueda.
              </p>

              <div className="hero-actions mb-xl helper-flex-center-mobile">
                <Link href="/contacto" data-primary-cta="true" className="btn btn--primary btn--large">
                  Solicitar valoración de mi caso
                </Link>
                <a href="#incluye-servicio" className="btn btn--secondary btn--large">
                  Ver qué incluye el servicio
                </a>
              </div>

              <p className="text-secondary mb-xl helper-center-mobile text-sm">
                Servicio orientado a marcas, profesionales y empresas que quieren construir visibilidad digital a medio
                plazo, sin depender de promesas rápidas ni tácticas superficiales.
              </p>

              <ul
                id="hero-checklist"
                className="hero-highlights hero-features grid grid-cols-2 gap-md mb-0 animate-on-scroll"
                aria-label="Puntos clave del servicio"
              >
                {HERO_HIGHLIGHTS.map((highlight) => (
                  <li key={highlight} className="hero-features__item">
                    <span className="hero-features__icon-wrapper" aria-hidden="true">
                      <Check size={20} strokeWidth={3} />
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section section-problem" aria-labelledby="problema-ia-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--teal mb-lg">Cambio de escenario</span>
              <h2 id="problema-ia-title" className="section-header__title">
                Tu web puede existir, posicionar y aun así no ser entendida por la IA
              </h2>
            </div>

            <div className="problem-highlight card card--no-hover animate-on-scroll">
              <p className="text-secondary mb-md">
                Durante años, muchas empresas han trabajado su visibilidad digital pensando casi exclusivamente en los
                buscadores tradicionales. Ese escenario sigue siendo importante, pero ya no es el único.
              </p>
              <p className="text-secondary mb-md">
                Hoy una persona puede preguntar a ChatGPT, Perplexity, Gemini, Copilot u otro sistema qué proveedor elegir,
                qué solución necesita o cómo comparar opciones antes de contactar.
              </p>
              <p className="text-secondary mb-md">
                En ese contexto, la web deja de ser solo una página que quiere posicionar. También se convierte en una
                fuente de información que debe ser entendida, resumida, comparada y conectada con otras señales públicas.
              </p>
              <p className="text-secondary mb-md">
                Muchas webs no están preparadas para eso: textos genéricos, servicios poco claros, señales de autoridad
                dispersas y datos de marca inconsistentes. A ojos de una persona pueden parecer correctas. A ojos de un
                sistema de IA, pueden resultar ambiguas.
              </p>
              <p className="text-secondary mb-0">
                Y cuando una web es ambigua, pierde fuerza. Si quieres ver ese problema explicado con detalle, aquí tienes
                el análisis sobre{' '}
                <Link href="/blog/por-que-webs-no-aparecen-respuestas-ia">
                  por qué muchas webs no aparecen en respuestas de IA
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section section-services" aria-labelledby="definicion-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--blue mb-lg">Definición</span>
              <h2 id="definicion-title" className="section-header__title">
                Qué es la autoridad digital para IAs
              </h2>
              <p className="section-header__subtitle">
                Es el trabajo de estructurar la información pública de una marca para que buscadores, modelos de lenguaje y
                sistemas generativos entiendan mejor su identidad, su experiencia, sus servicios y sus señales de confianza.
              </p>
            </div>

            <div className="services-grid grid grid-cols-2 gap-lg">
              <article className="service-card animate-on-scroll">
                <h3 className="service-card__title">Lo que no es</h3>
                <ul className="plan-card__list">
                  <li>No consiste en “trucar” a la IA.</li>
                  <li>No consiste en llenar una web de palabras de moda.</li>
                  <li>No consiste en prometer apariciones automáticas.</li>
                </ul>
              </article>

              <article className="service-card animate-on-scroll">
                <h3 className="service-card__title">Lo que sí es</h3>
                <ul className="plan-card__list">
                  <li>Construir una presencia digital clara, verificable y coherente.</li>
                  <li>Conectar contenido, servicios y pruebas de experiencia.</li>
                  <li>Reforzar entidad, contexto y consistencia semántica.</li>
                </ul>
              </article>
            </div>

            <div className="section-note card card--no-hover animate-on-scroll mt-xl">
              <p className="text-secondary mb-0">
                La autoridad digital no se construye con una frase bonita en el hero. Se construye con arquitectura,
                contenido, consistencia y tiempo.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-problem" aria-labelledby="importa-ahora-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--cyan mb-lg">Por qué ahora</span>
              <h2 id="importa-ahora-title" className="section-header__title">
                Por qué este servicio importa ahora
              </h2>
              <p className="section-header__subtitle">
                Una empresa ya no compite solo por una posición en una lista de resultados. También compite por ser
                entendida como fuente útil dentro de respuestas generadas y resúmenes automáticos.
              </p>
            </div>

            <div className="problem-grid grid grid-cols-3 gap-lg">
              <article className="problem-card card animate-on-scroll">
                <h3>Mensajes genéricos</h3>
                <p className="text-secondary mb-0">
                  Muchas webs usan frases intercambiables que podrían pertenecer a cualquier empresa del sector.
                </p>
              </article>
              <article className="problem-card card animate-on-scroll">
                <h3>Señales desordenadas</h3>
                <p className="text-secondary mb-0">
                  La web dice una cosa, LinkedIn otra y el perfil público refuerza una especialización distinta.
                </p>
              </article>
              <article className="problem-card card animate-on-scroll">
                <h3>Sin capa de entidad</h3>
                <p className="text-secondary mb-0">
                  El contenido puede estar “correcto”, pero no explica bien la marca como sistema coherente.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="incluye-servicio" className="section section-services" aria-labelledby="incluye-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--purple mb-lg">Qué incluye</span>
              <h2 id="incluye-title" className="section-header__title">
                Qué trabajo dentro del servicio de Autoridad Digital para IAs
              </h2>
              <p className="section-header__subtitle">
                Este servicio combina estrategia SEO, arquitectura semántica, contenido estructurado y optimización GEO.
                Si antes de esta capa conviene diagnóstico, puedes empezar por una{' '}
                <Link href="/servicio-seo/auditoria-seo-geo">auditoría SEO + GEO</Link>.
              </p>
            </div>

            <div className="services-grid grid grid-cols-2 gap-lg">
              {SERVICE_AREAS.map((area) => (
                <article key={area.title} className="service-card animate-on-scroll">
                  <h3 className="service-card__title">{area.title}</h3>
                  <p className="service-card__description">{area.description}</p>
                  <ul className="plan-card__list" aria-label={area.title}>
                    {area.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="section-note card card--no-hover animate-on-scroll mt-xl">
              <p className="text-secondary mb-0">
                Si quieres profundizar en estas líneas, puedes revisar también mis{' '}
                <Link href="/blog">contenidos sobre SEO técnico y GEO</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-fit" aria-labelledby="seo-vs-geo-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--status mb-lg">Enfoque</span>
              <h2 id="seo-vs-geo-title" className="section-header__title">
                Autoridad digital para IAs no es lo mismo que SEO tradicional
              </h2>
              <p className="section-header__subtitle">
                El SEO sigue siendo clave. La autoridad digital para IAs no lo sustituye: lo amplía con una capa orientada
                a comprensión de entidad, contexto y consistencia semántica.
              </p>
            </div>

            <div className="fit-grid grid grid-cols-2 gap-lg">
              <article className="fit-card fit-card--positive animate-on-scroll">
                <h3 className="fit-card__title">SEO tradicional</h3>
                <ul className="fit-card__list">
                  <li>Qué busca el usuario</li>
                  <li>Qué intención cubrir</li>
                  <li>Qué página debe posicionar</li>
                  <li>Qué señales necesita el buscador</li>
                </ul>
              </article>
              <article className="fit-card fit-card--neutral animate-on-scroll">
                <h3 className="fit-card__title">Autoridad digital para IAs</h3>
                <ul className="fit-card__list">
                  <li>Qué entidad representa la marca</li>
                  <li>Qué especialización se asocia a ella</li>
                  <li>Qué contenido demuestra criterio</li>
                  <li>Qué señales externas verifican su fiabilidad</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-scope" aria-labelledby="cuando-si-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--teal mb-lg">Cuándo encaja</span>
              <h2 id="cuando-si-title" className="section-header__title">
                Cuándo tiene sentido trabajar la autoridad digital para IAs
              </h2>
            </div>

            <div className="scope-grid grid grid-cols-3 gap-lg">
              {WHEN_IT_FITS.map((item) => (
                <article key={item.title} className="scope-card animate-on-scroll">
                  <h3 className="scope-card__title">{item.title}</h3>
                  <p className="scope-card__description mb-0 text-secondary">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-scope" aria-labelledby="cuando-no-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--status mb-lg">Importante</span>
              <h2 id="cuando-no-title" className="section-header__title">
                Cuándo no empezaría por este servicio
              </h2>
            </div>

            <div className="section-note scope-note card card--no-hover animate-on-scroll">
              <p className="text-secondary mb-md">
                No todos los proyectos deberían empezar por aquí. Esta capa funciona mejor cuando ya existe una base mínima
                de web, oferta y estructura sobre la que construir.
              </p>
              <p className="text-secondary mb-md">
                Si aún no está claro qué vendes, si los servicios no están definidos o si hay problemas técnicos graves,
                puede convenir empezar por una auditoría o por base web.
              </p>
              <p className="text-secondary mb-0">
                En esos casos, normalmente tiene más sentido arrancar por{' '}
                <Link href="/servicio-seo/auditoria-seo-geo">auditoría SEO + GEO</Link> o por una revisión de{' '}
                <Link href="/diseno-web/valencia">diseño web en Valencia</Link> antes de añadir una capa avanzada.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-process" aria-labelledby="proceso-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--status mb-lg">Cómo trabajo</span>
              <h2 id="proceso-title" className="section-header__title">
                Cómo trabajo la autoridad digital para IAs
              </h2>
            </div>

            <div className="process-steps grid grid-cols-2 gap-lg">
              {PROCESS_STEPS.map((step) => (
                <article key={step.number} className="process-step animate-on-scroll">
                  <span className="process-step__number" aria-hidden="true">
                    {step.number}
                  </span>
                  <h3 className="process-step__title">{step.title}</h3>
                  <p className="process-step__description mb-0">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-services" aria-labelledby="esperar-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--blue mb-lg">Resultados esperables</span>
              <h2 id="esperar-title" className="section-header__title">
                Qué puedes esperar de este servicio
              </h2>
              <p className="section-header__subtitle">
                No prometo apariciones garantizadas en respuestas de IA. Lo que sí puedes esperar es una mejora real en
                estructura, claridad y consistencia de tu presencia digital.
              </p>
            </div>

            <div className="services-grid grid grid-cols-2 gap-lg">
              {EXPECT_ITEMS.map((item) => (
                <article key={item} className="service-card animate-on-scroll">
                  <h3 className="service-card__title">{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="servicio-mensual" className="section section-plans" aria-labelledby="mensual-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--purple mb-lg">Servicio mensual</span>
              <h2 id="mensual-title" className="section-header__title">
                Qué incluye el servicio mensual
              </h2>
              <p className="section-header__subtitle">
                El acompañamiento se adapta al estado del proyecto. No funciona como paquete cerrado de acciones mecánicas,
                sino como dirección estratégica y operativa de autoridad digital.
              </p>
            </div>

            <div className="plans-grid grid grid-cols-2 gap-lg">
              <article className="plan-card animate-on-scroll">
                <div className="plan-card__header">
                  <span className="plan-card__tag">Incluye</span>
                  <h3 className="plan-card__title">Dirección estratégica y operativa</h3>
                </div>
                <ul className="plan-card__list" aria-label="Incluye el servicio mensual">
                  {MONTHLY_INCLUDE_ITEMS.slice(0, 6).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="plan-card animate-on-scroll">
                <div className="plan-card__header">
                  <span className="plan-card__tag">Continuidad</span>
                  <h3 className="plan-card__title">Refuerzo acumulativo</h3>
                </div>
                <ul className="plan-card__list" aria-label="Incluye el servicio mensual (continuación)">
                  {MONTHLY_INCLUDE_ITEMS.slice(6).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="section-note plan-note card card--no-hover animate-on-scroll mt-xl">
              <p className="text-secondary mb-0">
                La prioridad de cada mes se define según el estado real de la web. No todas las marcas necesitan lo mismo
                en cada etapa.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-plans" aria-labelledby="precio-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--teal mb-lg">Precio</span>
              <h2 id="precio-title" className="section-header__title">
                Precio del servicio
              </h2>
            </div>

            <div className="plans-grid grid grid-cols-2 gap-lg">
              <article className="plan-card animate-on-scroll">
                <div className="plan-card__header">
                  <span className="plan-card__tag">Desde</span>
                  <h3 className="plan-card__title gradient-text">500 €/mes</h3>
                </div>
                <p className="plan-card__description">
                  Servicio pensado para empresas y marcas que quieren construir una presencia digital más sólida a medio
                  plazo, sin promesas rápidas ni atajos artificiales.
                </p>
                <ul className="plan-card__list">
                  <li>Revisión mensual de prioridades SEO + GEO</li>
                  <li>Mejoras semánticas y de contenido con criterio</li>
                  <li>Enfoque acumulativo de autoridad temática</li>
                </ul>
              </article>

              <article className="plan-card animate-on-scroll">
                <div className="plan-card__header">
                  <span className="plan-card__tag">Antes de empezar</span>
                  <h3 className="plan-card__title">Validación de encaje</h3>
                </div>
                <p className="plan-card__description">
                  Si tu base aún necesita orden técnico o redefinición de oferta, te diré con claridad qué conviene resolver
                  primero.
                </p>
                <div className="plan-note__actions mt-lg">
                  <Link href="/contacto" data-primary-cta="true" className="btn btn--primary btn--large">
                    Solicitar una valoración personalizada
                  </Link>
                </div>
                <p className="text-secondary mb-0 mt-lg text-sm">
                  Cuéntame en qué punto está tu web y revisaré si este servicio encaja con lo que necesitas ahora.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="faq" className="section" aria-labelledby="faq-title">
          <div className="container animate-on-scroll">
            <div className="section-heading section-header">
              <h2 id="faq-title" className="section-header__title">
                Preguntas frecuentes sobre autoridad digital para IAs
              </h2>
            </div>
            <FaqAccordion title="Respuestas rápidas antes de contratar" items={FAQ_ITEMS} />
          </div>
        </section>

        <section className="section section-contact" aria-labelledby="cierre-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--teal mb-lg">Cierre</span>
              <h2 id="cierre-title" className="section-header__title">
                Construye una marca que pueda ser entendida, no solo encontrada
              </h2>
              <p className="section-header__subtitle">
                Si quieres que tu web deje de ser solo una presencia online y empiece a funcionar como una base real de
                autoridad, este servicio puede ayudarte a construir el sistema correcto.
              </p>
            </div>

            <div className="contact-layout grid grid-cols-2">
              <div className="contact-content card card--no-hover animate-on-scroll">
                <h3 className="contact-content__title">Qué cambia cuando esta base está bien trabajada</h3>
                <ul className="contact-benefits" aria-label="Beneficios esperables">
                  <li>Más claridad para usuarios, buscadores y sistemas generativos.</li>
                  <li>Más coherencia entre identidad de marca, servicios y contenido.</li>
                  <li>Más capacidad para competir en búsquedas tradicionales y generativas.</li>
                </ul>
              </div>

              <div className="contact-next-step card card--no-hover animate-on-scroll">
                <h3 className="contact-next-step__title">Siguiente paso</h3>
                <p className="contact-next-step__text text-secondary mb-0">
                  Revisaré tu situación actual y te diré si tiene sentido empezar por autoridad digital para IAs o si
                  conviene reforzar antes otra parte de la web.
                </p>
                <div className="plan-note__actions mt-lg">
                  <Link href="/contacto" data-primary-cta="true" className="btn btn--primary btn--large">
                    Solicitar valoración de mi caso
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
