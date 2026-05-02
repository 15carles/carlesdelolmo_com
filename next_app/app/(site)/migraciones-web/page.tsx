import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
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
  title: 'Migraciones Web seguras | Cambio de web, CMS o estructura sin perder visibilidad',
  description:
    'Servicio de migraciones web seguras para empresas que necesitan cambiar de CMS, hosting, estructura o tecnología sin perder posicionamiento, rendimiento ni estabilidad.',
  exactUrl: `${SITE_URL}/migraciones-web`,
});

const HERO_HIGHLIGHTS = [
  'Continuidad técnica',
  'Protección SEO + GEO',
  'Control de riesgos',
  'Rendimiento y estabilidad',
];

const RISK_ITEMS = [
  {
    title: 'URLs rotas y errores 404',
    description:
      'Cuando la estructura cambia sin mapa ni redirecciones, se pierden páginas valiosas y aparecen fricciones evitables para usuarios y buscadores.',
  },
  {
    title: 'Pérdida de visibilidad y señales SEO',
    description:
      'Una migración improvisada puede alterar jerarquías, enlazado interno, metadatos e indexación justo en los puntos que más afectan al tráfico orgánico.',
  },
  {
    title: 'Fallos que afectan al negocio',
    description:
      'Formularios, analítica, páginas clave o integraciones pueden dejar de responder bien si el cambio se ejecuta sin comprobaciones reales.',
  },
];

const VALUE_POINTS = [
  'Continuidad técnica',
  'Estabilidad operativa',
  'Estructura semántica clara',
  'Protección de señales SEO',
  'Rendimiento y mantenibilidad',
  'Preparación para buscadores y motores generativos',
];

const SERVICE_ITEMS = [
  {
    title: 'Auditoría previa',
    description:
      'Analizo la web actual para entender su estructura, su estado técnico, sus contenidos, sus URLs, sus puntos críticos y los riesgos reales de la migración.',
  },
  {
    title: 'Mapa de migración',
    description:
      'Defino qué se mantiene, qué cambia, qué se redirige y qué debe revisarse antes de publicar para que el cambio tenga una lógica controlada.',
  },
  {
    title: 'Revisión de arquitectura y contenidos',
    description:
      'Compruebo jerarquía, enlazado interno, navegación y papel de cada contenido para no heredar sin más el desorden anterior.',
  },
  {
    title: 'Protección SEO y GEO',
    description:
      'Reviso estructura de URLs, metadatos, rastreabilidad, semántica, enlazado y consistencia general del sitio para no debilitar señales importantes.',
  },
  {
    title: 'Publicación controlada',
    description:
      'La salida a producción se plantea con comprobaciones y revisión de puntos sensibles, no con prisas ni confianza ciega.',
  },
  {
    title: 'Seguimiento posterior',
    description:
      'Después verifico redirecciones, indexación, rendimiento y funcionamiento general para detectar rápido cualquier incidencia real.',
  },
];

const FIT_OPTIONS = [
  {
    variant: 'fit-card--positive',
    title: 'Cuándo tiene sentido',
    items: [
      'Vas a rediseñar la web por completo.',
      'Tu CMS actual se ha quedado pequeño o te limita.',
      'Quieres salir de una base lenta, frágil o difícil de mantener.',
      'Vas a cambiar de dominio, subdominio o estructura de URLs.',
      'Tu web ha crecido sin orden y necesita una reconstrucción seria.',
      'Quieres modernizar el proyecto sin perder lo que ya habías trabajado.',
    ],
  },
  {
    variant: 'fit-card--neutral',
    title: 'Qué conviene proteger',
    items: [
      'Páginas que ya captan tráfico o contactos.',
      'Contenidos con autoridad acumulada.',
      'Formularios e integraciones críticas.',
      'Analítica y medición del negocio.',
      'Claridad estructural para buscadores y sistemas de IA.',
      'Una base técnica que no se deteriore con el cambio.',
    ],
  },
];

const VISIBILITY_ITEMS = [
  {
    title: 'Coherencia de URLs',
    description: 'Evitar cambios arbitrarios y mantener una lógica reconocible ayuda a preservar valor acumulado y rastreo útil.',
  },
  {
    title: 'Jerarquía de contenidos',
    description: 'La nueva base debe seguir siendo entendible, no solo visualmente mejor.',
  },
  {
    title: 'Enlazado interno',
    description: 'Una migración bien planteada conserva relaciones clave entre páginas y evita romper recorridos importantes.',
  },
  {
    title: 'Estructura semántica',
    description: 'El cambio debe seguir dejando claro qué es cada cosa y cómo se relaciona dentro del sitio.',
  },
  {
    title: 'Elementos rastreables e indexables',
    description: 'No basta con publicar: hay que comprobar que buscadores y sistemas de IA entienden y acceden bien a la nueva base.',
  },
  {
    title: 'Claridad para motores generativos',
    description: 'Una arquitectura mejor también ayuda a que el proyecto se interprete con menos ruido en entornos de respuesta.',
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: 'Reviso el estado actual del sitio y detecto riesgos, dependencias y puntos sensibles antes de tocar nada.',
  },
  {
    number: '02',
    title: 'Plan de migración',
    description: 'Defino la lógica del cambio, la arquitectura de destino y el mapa de conservación de activos importantes.',
  },
  {
    number: '03',
    title: 'Preparación',
    description: 'Se dejan listas las bases del nuevo entorno, las revisiones críticas y las comprobaciones previas a publicación.',
  },
  {
    number: '04',
    title: 'Ejecución controlada',
    description: 'La migración se realiza con foco en continuidad, validación y control de errores.',
  },
  {
    number: '05',
    title: 'Revisión posterior',
    description: 'Compruebo redirecciones, indexación, formularios, rendimiento y estabilidad general tras el cambio.',
  },
];

const MIGRATION_TYPES = [
  'Migración de WordPress a una base más rápida o controlable',
  'Migración desde una web antigua a una nueva arquitectura',
  'Migración ligada a rediseño web',
  'Migración de hosting o infraestructura',
  'Reorganización de URLs y secciones',
  'Consolidación de contenidos',
  'Limpieza estructural antes de crecer',
  'Cambio de sistema con protección de SEO y operativa',
];

const BENEFITS = [
  'Menos riesgo durante el cambio',
  'Más seguridad sobre lo que ya funciona',
  'Mejor base técnica para crecer',
  'Más claridad estructural',
  'Menos improvisación',
  'Mejor rendimiento y mantenibilidad',
  'Menos posibilidades de romper visibilidad y captación',
  'Una transición más seria y menos traumática',
];

const ORBITA_ITEMS = [
  {
    title: 'Optimización técnica',
    description: 'Para evitar bases frágiles y que la nueva web nazca con problemas repetidos.',
  },
  {
    title: 'Relevancia semántica',
    description: 'Para mantener claridad estructural y no debilitar la comprensión del proyecto.',
  },
  {
    title: 'Base de autoridad',
    description: 'Para no perder señales acumuladas ni diluir valor ya ganado.',
  },
  {
    title: 'Interpretación por IA',
    description: 'Para que el cambio no rompa cómo se entiende la web en entornos generativos.',
  },
  {
    title: 'Actualización continua',
    description: 'Para que la nueva base pueda seguir evolucionando con lógica después de la migración.',
  },
];

const FAQ_ITEMS = [
  {
    question: '¿Una migración web puede hacerme perder posicionamiento?',
    answer:
      'Sí, si se hace mal. Cambios en URLs, estructura, enlazado, contenidos o redirecciones pueden afectar a la visibilidad orgánica si no se planifican con criterio.',
  },
  {
    question: '¿Migrar una web es solo cambiar de plataforma?',
    answer:
      'No. También implica proteger arquitectura, contenidos, señales SEO, funcionalidad, datos importantes y estabilidad general del proyecto.',
  },
  {
    question: '¿Se puede aprovechar la migración para mejorar la web?',
    answer:
      'Sí. Muchas veces es el mejor momento para corregir problemas técnicos, ordenar contenidos y dejar una base más clara y mantenible.',
  },
  {
    question: '¿Trabajas migraciones ligadas a rediseño?',
    answer:
      'Sí. En muchos proyectos, rediseño y migración forman parte del mismo proceso y deben plantearse de forma conjunta.',
  },
  {
    question: '¿También revisas rendimiento y estructura semántica?',
    answer:
      'Sí. En este enfoque una migración no se revisa solo por funcionamiento técnico, sino también por claridad estructural, rendimiento y rastreabilidad.',
  },
];

const CONTACT_BENEFITS = [
  'Una valoración con criterio técnico y foco real de negocio.',
  'Claridad sobre qué conviene mantener, mejorar o replantear.',
  'Un siguiente paso útil aunque todavía no tengas cerrado el alcance.',
];

export default function MigracionesWebPage() {
  const pageUrl = `${SITE_URL}/migraciones-web`;
  const breadcrumbId = `${pageUrl}#breadcrumbs`;
  const serviceId = `${pageUrl}#service`;
  const offerId = `${pageUrl}#offer`;

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/pricing' },
    { label: 'Migraciones Web Seguras' },
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
        name: 'Migraciones Web seguras para no perder visibilidad ni negocio',
        description:
          'Servicio de migraciones web seguras para cambiar de CMS, hosting, estructura o tecnología sin perder visibilidad, rendimiento ni estabilidad.',
        inLanguage: 'es-ES',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': breadcrumbId },
        about: [{ '@id': `${SITE_URL}/#business` }, { '@id': serviceId }],
        mainEntity: { '@id': serviceId },
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: 'Migraciones Web Seguras',
        description:
          'Servicio de migración web con foco en continuidad técnica, preservación SEO, claridad estructural, rendimiento y reducción de riesgos.',
        provider: { '@id': `${SITE_URL}/#business` },
        serviceType: 'Migraciones web',
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
          { label: 'Servicios', href: '/pricing' },
          { label: 'Migraciones Web Seguras', href: '/migraciones-web' },
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

      <section id="inicio" className="section hero hero-service hero-migraciones" aria-labelledby="hero-title">
        <div className="container hero-migraciones__container">
          <div className="hero-migraciones__inner animate-on-scroll mt-2xl">
            <div className="badge badge--status mb-lg hero-migraciones__badge">
                <span>Servicio estratégico</span>
            </div>

            <h1 id="hero-title" className="mb-md hero-migraciones__title">
              <span className="gradient-text">Migraciones Web Seguras</span> para no perder visibilidad ni negocio
            </h1>

            <p className="hero-description text-secondary mb-xl hero-migraciones__subtitle">
              Si tu web necesita cambiar de CMS, hosting, estructura o tecnología, la migración no debería convertirse en
              una caída de tráfico, errores 404 o pérdida de leads. Planifico migraciones web con foco en continuidad
              técnica, SEO, GEO, rendimiento y control de riesgos.
            </p>

            <div className="hero-actions hero-migraciones__actions mb-xl">
              <Link className="btn btn--primary btn--large" href="/contacto" data-primary-cta="true">
                Quiero valorar mi migración
              </Link>
              <a className="btn btn--secondary btn--large" href="#proceso">
                Ver cómo planteo una migración web
              </a>
            </div>

            <p className="text-secondary mb-xl hero-migraciones__microcopy">
              Antes de cambiar una web conviene tener claro qué debe mantenerse, qué puede mejorarse y qué no se puede romper.
            </p>

            <ul
              id="hero-checklist"
              className="hero-highlights hero-features hero-migraciones__highlights grid grid-cols-2 gap-md mb-0"
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

      <section className="section section-problem" aria-labelledby="problem-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--teal mb-lg">Riesgo real</span>
            <h2 id="problem-title" className="section-header__title">
              Una migración web mal hecha puede salir muy cara
            </h2>
            <p className="section-intro section-header__subtitle">
              Cambiar una web no es solo mover archivos o publicar un rediseño. Cuando una migración se improvisa, suelen
              romperse elementos que afectan directamente al negocio, a la visibilidad y a la confianza en el proyecto.
            </p>
          </div>

          <div className="problem-grid grid grid-cols-3 gap-lg">
            {RISK_ITEMS.map((item) => (
              <article key={item.title} className="problem-card card animate-on-scroll">
                <h3>{item.title}</h3>
                <p className="text-secondary mb-0">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="problem-highlight card card--no-hover animate-on-scroll mt-xl">
            <p className="text-secondary mb-md">
              Muchas empresas descubren el problema demasiado tarde. La nueva web ya está publicada, el tráfico cae,
              aparecen errores, se pierden URLs valiosas o dejan de funcionar formularios, analítica o páginas clave.
            </p>
            <p className="text-secondary mb-0">
              Si una web ya tenía autoridad, tráfico o conversiones, una mala migración puede tirar por tierra en pocos
              días lo que costó meses o años construir.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-services" aria-labelledby="proposal-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--blue mb-lg">Enfoque</span>
            <h2 id="proposal-title" className="section-header__title">
              No planteo la migración como un simple traslado
            </h2>
            <p className="section-intro section-header__subtitle">
              Una migración web bien hecha no consiste en mover una web de un sitio a otro y cruzar los dedos. Consiste en
              proteger lo que aporta valor, detectar lo que debe corregirse y preparar una base más sólida para seguir creciendo.
            </p>
          </div>

          <div className="services-grid grid grid-cols-2 gap-lg">
            {VALUE_POINTS.map((point) => (
              <article key={point} className="service-card animate-on-scroll">
                <h3 className="service-card__title">{point}</h3>
                <p className="service-card__description mb-0">
                  {point === 'Continuidad técnica' && 'El cambio debe ejecutarse sin romper la base que sostiene la web hoy.'}
                  {point === 'Estabilidad operativa' && 'La publicación no puede comprometer formularios, medición, contenidos o procesos importantes.'}
                  {point === 'Estructura semántica clara' && 'La nueva web debe seguir siendo entendible para usuarios, buscadores y sistemas de IA.'}
                  {point === 'Protección de señales SEO' && 'URLs, jerarquías, enlazado y redirecciones necesitan una lógica previa, no decisiones de última hora.'}
                  {point === 'Rendimiento y mantenibilidad' && 'La migración también debe servir para dejar una base más sólida y más fácil de evolucionar.'}
                  {point === 'Preparación para buscadores y motores generativos' && 'El cambio puede aprovecharse para reforzar cómo se interpreta el proyecto en entornos de búsqueda y respuesta.'}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-services" aria-labelledby="services-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--purple mb-lg">Qué incluye</span>
            <h2 id="services-title" className="section-header__title">
              Qué incluye mi servicio de migración web
            </h2>
            <p className="section-intro section-header__subtitle">
              Cada proyecto cambia, pero una migración seria necesita análisis previo, planificación y revisión posterior.
              No trabajo desde la improvisación ni desde una checklist vacía.
            </p>
          </div>

          <div className="services-grid grid grid-cols-2 gap-lg">
            {SERVICE_ITEMS.map((item) => (
              <article key={item.title} className="service-card animate-on-scroll">
                <h3 className="service-card__title">{item.title}</h3>
                <p className="service-card__description mb-0">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="section-note card card--no-hover animate-on-scroll mt-xl">
            <p className="text-secondary mb-0">
              Si antes de migrar necesitas revisar riesgos, estructura o señales de visibilidad, puede tener sentido empezar
              por una <Link href="/servicio-seo/auditoria-seo-geo">auditoría SEO + GEO</Link>. Y si después del cambio la
              nueva base necesita continuidad, también puedo ayudarte con <Link href="/mantenimiento-web-valencia">mantenimiento web</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-fit" aria-labelledby="fit-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--cyan mb-lg">Cuándo encaja</span>
            <h2 id="fit-title" className="section-header__title">
              Cuándo tiene sentido plantear una migración web con criterio
            </h2>
            <p className="section-intro section-header__subtitle">
              No todas las webs necesitan una migración, pero hay escenarios donde cambiar de base sin una planificación
              seria es asumir un riesgo innecesario.
            </p>
          </div>

          <div className="fit-grid grid grid-cols-2 gap-lg">
            {FIT_OPTIONS.map((fitOption) => (
              <article key={fitOption.title} className={`fit-card ${fitOption.variant} animate-on-scroll`}>
                <h3 className="fit-card__title">{fitOption.title}</h3>
                <ul className="fit-card__list" aria-label={fitOption.title}>
                  {fitOption.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-services" aria-labelledby="visibility-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--status mb-lg">Diferenciador</span>
            <h2 id="visibility-title" className="section-header__title">
              Migrar una web también afecta a su visibilidad
            </h2>
            <p className="section-intro section-header__subtitle">
              Cuando una web cambia de estructura, tecnología o contenidos, no solo cambia por fuera. También cambian
              señales que buscadores y sistemas de IA utilizan para interpretar el sitio.
            </p>
          </div>

          <div className="services-grid grid grid-cols-2 gap-lg">
            {VISIBILITY_ITEMS.map((item) => (
              <article key={item.title} className="service-card animate-on-scroll">
                <h3 className="service-card__title">{item.title}</h3>
                <p className="service-card__description mb-0">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="section-note card card--no-hover animate-on-scroll mt-xl">
            <p className="text-secondary mb-md">
              Una web puede cambiar de base sin perder visibilidad, pero eso no ocurre por casualidad. Ocurre cuando la
              migración se plantea con cabeza.
            </p>
            <p className="text-secondary mb-0">
              Si quieres ver un proyecto donde la claridad estructural y el criterio técnico importan de verdad, puedes
              revisar el caso de <Link href="/proyectos/ledescaparate">LEDescaparate</Link>.
            </p>
          </div>
        </div>
      </section>

      <section id="proceso" className="section section-process" aria-labelledby="process-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--status mb-lg">Proceso</span>
            <h2 id="process-title" className="section-header__title">
              Cómo trabajo una migración web
            </h2>
            <p className="section-intro section-header__subtitle">
              El objetivo no es solo ejecutar el cambio. Es dejar preparado el terreno para que la transición sea estable,
              comprensible y útil para el negocio.
            </p>
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

      <section className="section section-scope" aria-labelledby="types-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--teal mb-lg">Tipos de migración</span>
            <h2 id="types-title" className="section-header__title">
              Tipos de migración en los que puedo ayudarte
            </h2>
            <p className="section-intro section-header__subtitle">
              Si el proyecto requiere desarrollo adicional, revisión estratégica o apoyo posterior, la migración puede
              plantearse dentro de una intervención más amplia.
            </p>
          </div>

          <div className="scope-grid grid grid-cols-3 gap-lg">
            {MIGRATION_TYPES.map((item) => (
              <article key={item} className="scope-card animate-on-scroll">
                <h3 className="scope-card__title">{item}</h3>
                <p className="scope-card__description mb-0 text-secondary">
                  La forma concreta de abordarlo depende del punto de partida, pero siempre con foco en continuidad y control.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-services" aria-labelledby="benefits-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--blue mb-lg">Beneficios</span>
            <h2 id="benefits-title" className="section-header__title">
              Qué gana una empresa cuando migra su web con control
            </h2>
          </div>

          <div className="services-grid grid grid-cols-2 gap-lg">
            {BENEFITS.map((item) => (
              <article key={item} className="service-card animate-on-scroll">
                <h3 className="service-card__title">{item}</h3>
                <p className="service-card__description mb-0">
                  {item === 'Menos riesgo durante el cambio' && 'La migración deja de depender de improvisaciones y decisiones de última hora.'}
                  {item === 'Más seguridad sobre lo que ya funciona' && 'Se protege mejor lo que ya aporta valor antes de tocar la base.'}
                  {item === 'Mejor base técnica para crecer' && 'El cambio puede servir para salir de una estructura limitada o frágil.'}
                  {item === 'Más claridad estructural' && 'La nueva arquitectura puede ordenar mejor páginas, secciones y prioridades.'}
                  {item === 'Menos improvisación' && 'Cada decisión importante se toma con una lógica previa, no a posteriori.'}
                  {item === 'Mejor rendimiento y mantenibilidad' && 'La web no solo cambia de sitio: puede quedar más ligera, más clara y más fácil de sostener.'}
                  {item === 'Menos posibilidades de romper visibilidad y captación' && 'Se revisan los puntos donde más suelen aparecer pérdidas evitables.'}
                  {item === 'Una transición más seria y menos traumática' && 'El proyecto pasa por el cambio con más control, menos incertidumbre y menos desgaste.'}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-scope" aria-labelledby="orbita-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--purple mb-lg">ORBITA</span>
            <h2 id="orbita-title" className="section-header__title">
              Una migración bien hecha también sigue una lógica ORBITA
            </h2>
            <p className="section-intro section-header__subtitle">
              En una migración, el reto real es conservar una base técnica sólida, mantener la relevancia semántica,
              proteger la autoridad acumulada y evitar que el cambio rompa la interpretación del sitio.
            </p>
          </div>

          <div className="scope-grid grid grid-cols-3 gap-lg">
            {ORBITA_ITEMS.map((item) => (
              <article key={item.title} className="scope-card animate-on-scroll">
                <h3 className="scope-card__title">{item.title}</h3>
                <p className="scope-card__description mb-0 text-secondary">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-problem" aria-labelledby="trust-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--status mb-lg">Confianza</span>
            <h2 id="trust-title" className="section-header__title">
              Una web no debería cambiar a ciegas
            </h2>
            <p className="section-intro section-header__subtitle">
              Hay proyectos donde una migración puede hacerse con relativa facilidad. Y hay otros donde tocar la web sin
              una estrategia previa es una forma bastante directa de crear problemas nuevos.
            </p>
          </div>

          <div className="problem-highlight card card--no-hover animate-on-scroll">
            <p className="text-secondary mb-md">
              Si tu sitio ya tiene tráfico, páginas posicionadas, formularios, contenido trabajado o una estructura que
              sostiene parte del negocio, conviene tratar el cambio con la seriedad que merece.
            </p>
            <p className="text-secondary mb-0">
              No se trata de dramatizar. Se trata de entender que modernizar una web sin control puede salir caro, y
              hacerlo bien puede ahorrarte muchas horas, muchos errores y bastante dolor evitable.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container animate-on-scroll">
          <div className="section-heading section-header">
            <span className="section-eyebrow badge badge--cyan mb-lg">FAQ</span>
            <h2 id="faq-title" className="section-header__title">
              Preguntas frecuentes sobre migraciones web
            </h2>
          </div>

          <FaqAccordion title="Respuestas rápidas antes de migrar una web" items={FAQ_ITEMS} />
        </div>
      </section>

        <section className="section section-contact" aria-labelledby="contact-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--teal mb-lg">Siguiente paso</span>
            <h2 id="contact-title" className="section-header__title">
              Si tu web necesita cambiar, mejor hacerlo con control
            </h2>
            <p className="section-intro section-header__subtitle">
              Una migración web no debería obligarte a elegir entre modernizar el proyecto o proteger lo que ya habías
              construido. Ambas cosas pueden ir juntas cuando el cambio se plantea con criterio técnico y visión estructural.
            </p>
          </div>

          <div className="contact-layout">
            <div className="contact-content-stack">
              <div className="contact-content card card--no-hover animate-on-scroll">
                <h3 className="contact-content__title">Qué puedes esperar</h3>

                <ul className="contact-benefits" aria-label="Qué puedes esperar">
                  {CONTACT_BENEFITS.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>

                <p className="contact-supporting-text text-secondary mb-0">
                  Puedes escribirme aunque aún no tengas claro el alcance exacto. A veces el primer paso útil no es migrar
                  ya, sino ordenar bien la decisión.
                </p>
              </div>

              <div className="contact-next-step card card--no-hover animate-on-scroll">
                <h3 className="contact-next-step__title">Qué ocurre después</h3>
                <p className="contact-next-step__text text-secondary mb-0">
                  Reviso tu caso y valoro si la migración encaja tal como la estás planteando o si conviene revisar antes
                  la estructura, el alcance o los riesgos reales del cambio.
                </p>
                <div className="plan-note__actions mt-lg">
                  <Link className="btn btn--secondary" href="/contacto" data-primary-cta="true">
                    Cuéntame tu caso
                  </Link>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper animate-on-scroll">
              <ContactForm className="contact-form" defaultServiciosInteres={['Migraciones']} />
            </div>
          </div>
        </div>
        </section>
      </main>
    </>
  );
}
