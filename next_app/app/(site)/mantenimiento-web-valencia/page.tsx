import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import { constructMetadata } from '@/lib/seo/metadata';
import { BUSINESS_SCHEMA, PERSON_SCHEMA, SITE_URL, generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { Check } from 'lucide-react';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'Mantenimiento Web Valencia | Carles del Olmo',
  description: 'Mantenimiento web proactivo para empresas: soporte continuo, pequeñas mejoras y seguimiento técnico para mantener tu web estable y útil.',
  exactUrl: `${SITE_URL}/mantenimiento-web-valencia`,
});

const HERO_HIGHLIGHTS = [
  'Soporte continuo',
  'Pequeñas mejoras',
  'Webs propias o ajenas',
];

const PLAN_OPTIONS = [
  {
    tag: 'Opción base',
    title: 'Mantenimiento estándar',
    description:
      'Pensado para empresas que necesitan una web cuidada, supervisada y con capacidad para resolver pequeños cambios y ajustes sin complicarse.',
    items: [
      'Seguimiento recurrente',
      'Soporte sobre la web existente',
      'Correcciones y ajustes razonables',
      'Continuidad sin fricción',
    ],
  },
  {
    tag: 'Según necesidades',
    title: 'Mantenimiento adaptado',
    description:
      'Orientado a proyectos que necesitan más dedicación, más cambios, una evolución más constante o una forma de trabajo ajustada a sus particularidades.',
    items: [
      'Mayor flexibilidad de intervención',
      'Más carga de soporte y cambios',
      'Seguimiento más personalizado',
      'Enfoque ajustado al proyecto',
    ],
  },
];

const FIT_OPTIONS = [
  {
    variant: 'fit-card--positive',
    title: 'Encaja bien si…',
    items: [
      'Tienes una web ya publicada y no quieres dejarla desatendida.',
      'Necesitas soporte fiable para resolver pequeños cambios y ajustes.',
      'Tu web debe transmitir una imagen profesional y actualizada.',
      'Quieres continuidad sin depender de soluciones improvisadas.',
      'Buscas una atención más constante, tanto si la web es tuya como si viene de otro proveedor.',
    ],
  },
  {
    variant: 'fit-card--neutral',
    title: 'Puede que necesites otra cosa si…',
    items: [
      'Tu web arrastra problemas de base más profundos.',
      'La estructura actual ya no responde a lo que tu negocio necesita.',
      'Lo que buscas no es mantenimiento, sino una renovación importante.',
      'Necesitas una nueva base técnica, una reorganización completa o un replanteamiento del proyecto.',
    ],
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Revisión inicial',
    description:
      'Analizo el estado general de la web para entender su punto de partida, detectar necesidades y ver qué tipo de seguimiento tiene sentido.',
  },
  {
    number: '02',
    title: 'Priorización',
    description:
      'Distingo qué conviene resolver primero, qué puede formar parte del mantenimiento recurrente y qué requeriría una intervención más amplia.',
  },
  {
    number: '03',
    title: 'Propuesta de mantenimiento',
    description:
      'Planteo una base estándar o una opción adaptada según las necesidades reales de la web, sin añadir complejidad innecesaria.',
  },
  {
    number: '04',
    title: 'Seguimiento y mejoras',
    description:
      'A partir de ahí, el trabajo consiste en dar continuidad, resolver ajustes y ayudar a que la web siga cuidada, funcional y alineada con el negocio.',
  },
];

const SCOPE_ITEMS = [
  {
    title: 'Cuando la base ya no da más de sí',
    description:
      'Si la web actual ha quedado desfasada, transmite una imagen poco profesional o ya no responde bien a lo que tu negocio necesita, quizá tenga más sentido replantearla desde el diseño y la estructura.',
    leadIn: 'En ese caso, puede encajar mejor un servicio de',
    href: '/diseno-web/diseno-web-valencia',
    linkText: 'diseño web en Valencia',
  },
  {
    title: 'Cuando el problema está en la visibilidad',
    description:
      'Si la web está publicada y funciona, pero el problema principal está en cómo se presenta, cómo se entiende o cómo compite a nivel de búsqueda, entonces el mantenimiento no es el servicio central.',
    leadIn: 'Ahí conviene valorar una',
    href: '/seo-geo/auditoria-seo-geo',
    linkText: 'auditoría SEO + GEO',
  },
  {
    title: 'Cuando hace falta una intervención más delicada',
    description:
      'Algunas webs necesitan cambios más profundos, reorganización técnica o una transición bien planteada para evitar problemas innecesarios durante el proceso.',
    leadIn: 'En esos casos, puede ser más apropiado revisar una solución de',
    href: '/migraciones-web',
    linkText: 'migraciones web',
  },
];

const CONTACT_BENEFITS = [
  'Una valoración con criterio, sin enfoque genérico.',
  'Claridad sobre si encaja un mantenimiento estándar o adaptado.',
  'Orientación honesta si tu web necesita otra intervención distinta.',
];

export default function MantenimientoWebValenciaPage() {
  const pageUrl = `${SITE_URL}/mantenimiento-web-valencia`;
  const breadcrumbId = `${pageUrl}#breadcrumbs`;
  const serviceId = `${pageUrl}#service`;
  const offerId = `${pageUrl}#offer`;

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/pricing' },
    { label: 'Mantenimiento Web Valencia' },
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
        name: 'Mantenimiento Web Valencia',
        description:
          'Servicio de mantenimiento web en Valencia y remoto para empresas que necesitan continuidad, soporte y pequeñas mejoras con criterio.',
        inLanguage: 'es-ES',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': breadcrumbId },
        about: [{ '@id': `${SITE_URL}/#business` }, { '@id': serviceId }],
        mainEntity: { '@id': serviceId },
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: 'Mantenimiento Web Valencia',
        description:
          'Mantenimiento web para empresas con supervisión continua, soporte, correcciones razonables y mejoras para mantener la web estable y útil.',
        provider: { '@id': `${SITE_URL}/#business` },
        serviceType: 'Mantenimiento web',
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
          { label: 'Mantenimiento Web Valencia', href: '/mantenimiento-web-valencia' },
        ],
        breadcrumbId,
      ),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="page__content">
        <Breadcrumbs items={breadcrumbs} />

        <section id="inicio" className="section hero hero-service hero-maintenance" aria-labelledby="hero-title">
          <div className="container">
            <div className="grid grid-cols-2 mt-2xl">
              <div className="animate-on-scroll hero-content-wrapper">
                <div className="badge badge--status mb-lg helper-center-mobile">
                  <span>Valencia y remoto</span>
                </div>

                <h1 id="hero-title" className="mb-md helper-center-mobile">
                  Mantenimiento Web <span className="gradient-text">Valencia</span>
                </h1>

                <p className="hero-description text-secondary mb-xl helper-center-mobile">
                  Mantengo webs ya publicadas para que sigan funcionando bien, transmitan profesionalidad y no se deterioren
                  con el tiempo. Tanto si la web la he desarrollado yo como si viene de otro profesional o agencia.
                </p>

                <div className="hero-actions mb-xl helper-flex-center-mobile">
                  <Link className="btn btn--primary btn--large" href="/contacto">
                    Solicitar mantenimiento
                  </Link>
                </div>

                <ul id="hero-checklist" className="hero-highlights hero-features grid grid-cols-2 gap-md mb-0 animate-on-scroll" aria-label="Puntos clave del servicio">
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
          </div>
        </section>

      <section className="section section-problem" aria-labelledby="problem-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--teal mb-lg">Por qué importa</span>
            <h2 id="problem-title" className="section-header__title">
              Una web puede seguir online y aun así estar fallando
            </h2>
            <p className="section-intro section-header__subtitle">
              Muchas empresas creen que una web solo necesita atención cuando deja de funcionar. El problema es que la
              mayoría no se rompe de golpe: se va deteriorando poco a poco, acumulando pequeños fallos, tareas pendientes y
              señales de abandono que terminan afectando a la imagen del negocio.
            </p>
          </div>

          <div className="problem-grid grid grid-cols-3 gap-lg">
            <article className="problem-card card animate-on-scroll">
              <h3>Errores que pasan desapercibidos</h3>
              <p className="text-secondary mb-0">
                Formularios que fallan, enlaces rotos, botones que no responden como deberían o pequeños problemas que nadie
                detecta hasta que ya han generado fricción.
              </p>
            </article>

            <article className="problem-card card animate-on-scroll">
              <h3>Contenido y estructura desactualizados</h3>
              <p className="text-secondary mb-0">
                Textos que ya no representan bien el servicio, secciones que han quedado viejas o una web que transmite menos
                claridad y menos cuidado del que realmente merece la empresa.
              </p>
            </article>

            <article className="problem-card card animate-on-scroll">
              <h3>Deterioro silencioso con el tiempo</h3>
              <p className="text-secondary mb-0">
                Una web abandonada rara vez da una alarma clara al principio. Normalmente pierde consistencia, confianza y
                utilidad poco a poco, hasta que el problema ya es evidente.
              </p>
            </article>
          </div>

          <div className="problem-highlight card card--no-hover animate-on-scroll mt-xl">
            <p className="text-secondary mb-0">
              El mantenimiento no consiste solo en corregir incidencias cuando aparecen. Consiste en evitar que una web útil
              termine convertida en una web desatendida.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-services" aria-labelledby="services-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--blue mb-lg">Qué incluye</span>
            <h2 id="services-title" className="section-header__title">
              Un mantenimiento pensado para que la web siga bien atendida
            </h2>
            <p className="section-intro section-header__subtitle">
              No se trata solo de intervenir cuando aparece un problema. El mantenimiento web también implica revisar,
              corregir, ajustar y acompañar la evolución de la web para que siga siendo estable, clara y útil con el paso
              del tiempo.
            </p>
          </div>

          <div className="services-grid grid grid-cols-2 gap-lg">
            <article className="service-card animate-on-scroll">
              <h3 className="service-card__title">Supervisión general de la web</h3>
              <p className="service-card__description mb-0">
                Revisión periódica del estado general del sitio para detectar errores visibles, incidencias funcionales o
                pequeños fallos que conviene corregir antes de que se acumulen.
              </p>
            </article>

            <article className="service-card animate-on-scroll">
              <h3 className="service-card__title">Soporte y correcciones menores</h3>
              <p className="service-card__description mb-0">
                Ajustes y correcciones sobre elementos ya existentes para mantener la web cuidada, operativa y alineada con
                las necesidades reales del negocio.
              </p>
            </article>

            <article className="service-card animate-on-scroll">
              <h3 className="service-card__title">Pequeñas mejoras y cambios</h3>
              <p className="service-card__description mb-0">
                Modificaciones razonables en textos, bloques, secciones o contenidos para que la web no quede congelada y
                pueda seguir adaptándose cuando haga falta.
              </p>
            </article>

            <article className="service-card animate-on-scroll">
              <h3 className="service-card__title">Revisión de elementos clave</h3>
              <p className="service-card__description mb-0">
                Comprobación de formularios, enlaces, botones y otros puntos importantes de la web para asegurar que la
                experiencia siga siendo correcta y no se pierdan oportunidades por fallos evitables.
              </p>
            </article>
          </div>

          <div className="section-note card card--no-hover animate-on-scroll mt-xl">
            <p className="text-secondary mb-0">
              El servicio puede aplicarse tanto a webs desarrolladas por mí como a webs ya existentes que necesitan
              continuidad, soporte y una atención más constante.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-plans" aria-labelledby="plans-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--purple mb-lg">Modalidad de servicio</span>
            <h2 id="plans-title" className="section-header__title">
              No todas las webs necesitan el mismo nivel de mantenimiento
            </h2>
            <p className="section-intro section-header__subtitle">
              Hay proyectos que solo necesitan continuidad, seguimiento y pequeños ajustes de forma recurrente. Otros
              requieren una atención más personalizada, más carga de trabajo o una intervención más flexible. Por eso trabajo
              con una base estándar y con opciones adaptadas según cada caso.
            </p>
          </div>

          <div className="plans-grid grid grid-cols-2 gap-lg">
            {PLAN_OPTIONS.map((plan) => (
              <article key={plan.title} className="plan-card animate-on-scroll">
                <div className="plan-card__header">
                  <span className="plan-card__tag">{plan.tag}</span>
                  <h3 className="plan-card__title">{plan.title}</h3>
                </div>

                <p className="plan-card__description">{plan.description}</p>

                <ul className="plan-card__list" aria-label={`Incluye ${plan.title}`}>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="section-note plan-note card card--no-hover animate-on-scroll mt-xl">
            <p className="text-secondary mb-0">
              Si no tienes claro qué modalidad encaja mejor con tu caso, puedo revisar tu web y orientarte antes de
              plantear una propuesta.
            </p>
            <div className="plan-note__actions mt-lg">
              <Link className="btn btn--secondary" href="/contacto">
                Revisar mi web
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-fit" aria-labelledby="fit-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--cyan mb-lg">Encaje del servicio</span>
            <h2 id="fit-title" className="section-header__title">
              Un servicio pensado para webs que necesitan continuidad real
            </h2>
            <p className="section-intro section-header__subtitle">
              El mantenimiento web no siempre es para todo el mundo. Encaja especialmente bien en proyectos donde la web ya
              forma parte de la imagen, la operativa o la captación del negocio y necesita seguir bien atendida con el paso
              del tiempo.
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

          <div className="section-note fit-note card card--no-hover animate-on-scroll mt-xl">
            <p className="text-secondary mb-0">
              Si tu caso requiere algo más que mantenimiento, también puedo ayudarte desde un enfoque más amplio de{' '}
              <Link href="/diseno-web/valencia">diseño web en Valencia</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-process" aria-labelledby="process-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--status mb-lg">Cómo trabajo</span>
            <h2 id="process-title" className="section-header__title">
              Una forma de trabajo clara, sin mantenimiento improvisado
            </h2>
            <p className="section-intro section-header__subtitle">
              El objetivo no es intervenir de forma reactiva cada vez que aparece algo. La idea es entender el estado de la
              web, detectar lo importante y dar continuidad con criterio.
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

      <section className="section section-scope" aria-labelledby="scope-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--status mb-lg">Importante</span>
            <h2 id="scope-title" className="section-header__title">
              No todas las webs necesitan mantenimiento
            </h2>
            <p className="section-intro section-header__subtitle">
              Hay casos en los que el problema no está en la falta de seguimiento, sino en la base de la propia web.
              Cuando la estructura, el enfoque o el estado general del proyecto ya no son adecuados, lo más honesto no es
              plantear mantenimiento, sino otro tipo de intervención.
            </p>
          </div>

          <div className="scope-grid grid grid-cols-3 gap-lg">
            {SCOPE_ITEMS.map((item) => (
              <article key={item.title} className="scope-card animate-on-scroll">
                <h3 className="scope-card__title">{item.title}</h3>
                <p className="scope-card__description text-secondary">{item.description}</p>
                <p className="scope-card__description text-secondary mb-0">
                  {item.leadIn}{' '}
                  <Link href={item.href}>{item.linkText}</Link>.
                </p>
              </article>
            ))}
          </div>

          <div className="section-note scope-note card card--no-hover animate-on-scroll mt-xl">
            <p className="text-secondary mb-0">
              Si no tienes claro si lo que necesitas es mantenimiento o una intervención mayor, puedes{' '}
              <Link href="/contacto">contarme tu caso</Link> y orientamos el siguiente paso con criterio.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-contact" aria-labelledby="contact-title">
        <div className="container">
          <div className="section-heading section-header animate-on-scroll">
            <span className="section-eyebrow badge badge--teal mb-lg">Siguiente paso</span>
            <h2 id="contact-title" className="section-header__title">
              Cuéntame tu caso y vemos qué tipo de mantenimiento encaja
            </h2>
            <p className="section-intro section-header__subtitle">
              Si tu web necesita continuidad, soporte o pequeñas mejoras, podemos valorar qué modalidad tiene más sentido.
              Y si el problema no es mantenimiento, también te lo diré con claridad.
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
                  Si vienes de una web desatendida o de un proveedor anterior, no pasa nada. Lo importante es entender el
                  punto de partida y plantear el siguiente paso con sentido.
                </p>
              </div>

              <div className="contact-next-step card card--no-hover animate-on-scroll">
                <h3 className="contact-next-step__title">Qué ocurre después</h3>
                <p className="contact-next-step__text text-secondary mb-0">
                  Reviso tu mensaje y valoro si encaja como mantenimiento estándar o adaptado. Si hace falta, te propondré
                  una breve llamada o videollamada para entender mejor el caso antes de plantear el siguiente paso.
                </p>
              </div>
            </div>

            <div className="contact-form-wrapper animate-on-scroll">
              <ContactForm className="contact-form" defaultServiciosInteres={['Mantenimiento']} />
            </div>
          </div>
        </div>
        </section>
      </main>
    </>
  );
}
