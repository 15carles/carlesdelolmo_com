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
  title: 'Desarrollo web a medida en Valencia | Carles del Olmo',
  description:
    'Desarrollo web a medida para empresas que necesitan herramientas, plataformas y soluciones digitales adaptadas a su negocio. Webs rápidas, claras, escalables y preparadas para SEO y GEO.',
  exactUrl: `${SITE_URL}/desarrollo-web-a-medida`,
});

const HERO_HIGHLIGHTS = [
  'Desarrollo a medida',
  'SEO técnico y GEO',
  'Rendimiento y arquitectura',
  'Automatización de procesos',
];

const USE_CASES = [
  {
    title: 'Herramientas internas para empresas',
    description:
      'Cuando el proceso crece, una herramienta web interna puede ordenar el flujo, centralizar información y reducir tareas repetitivas.',
  },
  {
    title: 'Aplicaciones web sencillas o plataformas privadas',
    description:
      'Crear solo lo necesario evita cargar el proyecto con módulos que nadie va a usar.',
  },
  {
    title: 'Calculadoras, simuladores y comparadores',
    description:
      'Las herramientas interactivas mejoran la experiencia, captan leads cualificados y pueden reforzar SEO + GEO.',
  },
  {
    title: 'Formularios avanzados y captación estructurada',
    description:
      'Una captación bien diseñada clasifica solicitudes, recoge contexto relevante y activa procesos internos.',
  },
  {
    title: 'Integraciones con herramientas externas',
    description:
      'Conectar CRM, analítica, bases de datos o sistemas internos evita que la web funcione como una isla.',
  },
];

const SERVICE_LAYERS = [
  {
    title: '1. Análisis del objetivo y del proceso',
    description:
      'Primero aclaro objetivo, requisitos reales, usuarios y funcionalidades para evitar construir cosas que no aportan valor.',
  },
  {
    title: '2. Arquitectura funcional',
    description:
      'Pantallas, flujos, tipos de usuario, acciones, formularios, datos y relaciones para convertir funcionalidades en sistema coherente.',
  },
  {
    title: '3. Diseño de experiencia y contenido',
    description:
      'Interfaz clara, textos útiles y llamadas a la acción bien orientadas para que cada paso tenga sentido.',
  },
  {
    title: '4. Desarrollo técnico',
    description:
      'Base limpia, rápida y mantenible para que la solución pueda evolucionar sin convertirse en una zona de parches.',
  },
  {
    title: '5. SEO técnico y estructura semántica',
    description:
      'Cuando hay parte pública, se integra indexación, jerarquía, metadatos y estructura desde el planteamiento.',
  },
  {
    title: '6. Preparación para GEO e IA',
    description:
      'La información se organiza para ser más comprensible en buscadores tradicionales y motores generativos.',
  },
  {
    title: '7. Automatización e integración de datos',
    description:
      'Conectar solicitudes, avisos, clasificación de leads y procesos reduce trabajo manual cuando realmente aporta valor.',
  },
];

const ORBITA_ITEMS = [
  {
    title: 'O: Optimización técnica',
    description: 'Base rápida, clara, segura y mantenible.',
  },
  {
    title: 'R: Relevancia semántica',
    description: 'Explicar mejor qué hace la solución y para quién sirve.',
  },
  {
    title: 'B: Base de autoridad',
    description: 'Conectar con servicios, contenidos y casos que refuercen confianza.',
  },
  {
    title: 'I: Interpretación por IA',
    description: 'Estructurar para facilitar comprensión en sistemas generativos.',
  },
  {
    title: 'T: Tráfico cualificado',
    description: 'Atraer y atender usuarios relevantes, no interacción vacía.',
  },
  {
    title: 'A: Actualización continua',
    description: 'Preparar la solución para evolucionar con el negocio.',
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Diagnóstico inicial',
    description: 'Defino qué necesitas resolver y si realmente tiene sentido hacerlo a medida.',
  },
  {
    number: '02',
    title: 'Definición de alcance',
    description: 'Ordeno prioridades, funcionalidades, contenidos, integraciones y criterios de éxito.',
  },
  {
    number: '03',
    title: 'Propuesta de estructura',
    description: 'Planteo estructura funcional y estratégica: qué tendrá la solución y qué debe resolver cada parte.',
  },
  {
    number: '04',
    title: 'Diseño y desarrollo',
    description: 'Construyo la base cuidando experiencia, rendimiento y facilidad de uso.',
  },
  {
    number: '05',
    title: 'Revisión y puesta en marcha',
    description: 'Reviso funcionamiento, flujos, textos y puntos críticos antes de publicar.',
  },
  {
    number: '06',
    title: 'Evolución posterior',
    description: 'Si conviene, planteo mejoras, mantenimiento, automatizaciones y nuevas funcionalidades.',
  },
];

const BENEFITS = [
  'Reducir tareas manuales repetitivas',
  'Ordenar procesos que ahora dependen de correos o Excel',
  'Mejorar la captación de solicitudes cualificadas',
  'Crear herramientas útiles para clientes o equipos internos',
  'Diferenciar la web frente a competidores genéricos',
  'Mejorar rendimiento y experiencia de usuario',
  'Preparar estructura para SEO y GEO',
  'Facilitar evolución futura del proyecto',
  'Conectar la web con automatizaciones y sistemas internos',
];

const EXAMPLES = [
  'Web corporativa avanzada con estructura SEO y GEO',
  'Plataforma privada para clientes',
  'Área interna para gestión de solicitudes',
  'Formularios inteligentes conectados a automatizaciones',
  'Calculadora de presupuesto orientativa',
  'Simulador interactivo de producto o servicio',
  'Comparador de opciones para captar leads',
  'Microsite para validar una nueva línea de negocio',
  'Panel sencillo de gestión de datos',
  'Sistema de captación conectado con base de datos',
  'Página de servicio con componentes interactivos',
  'Demo comercial para explicar un producto complejo',
];

const FIT_OPTIONS = [
  {
    variant: 'fit-card--positive',
    title: 'Encaja especialmente bien si…',
    items: [
      'Tu empresa ya tiene web, pero se ha quedado limitada.',
      'Necesitas resolver un proceso concreto con una herramienta real.',
      'Quieres captar leads con algo más útil que un formulario básico.',
      'Necesitas conectar web con automatizaciones o datos internos.',
      'Buscas una base preparada para SEO, GEO y crecimiento.',
      'Tienes una idea de herramienta y necesitas aterrizarla con criterio.',
    ],
  },
  {
    variant: 'fit-card--neutral',
    title: 'Puede no encajar si…',
    items: [
      'Solo buscas la opción más barata sin objetivo funcional claro.',
      'Necesitas una web publicada en dos días sin fase de definición.',
      'Quieres muchas funcionalidades sin una prioridad real de negocio.',
      'No hay proceso que resolver, solo presencia informativa básica.',
      'No existe foco sobre qué problema concreto debe atacar la solución.',
      'No quieres documentar decisiones ni alcance del proyecto.',
    ],
  },
];

const WHY_WITH_ME = [
  'Trabajo con criterio técnico, explicando decisiones de forma clara.',
  'Priorizo rendimiento, estructura y mantenibilidad.',
  'Integro SEO y GEO desde el planteamiento cuando hay parte pública.',
  'Evito funcionalidades innecesarias que solo añaden coste y complejidad.',
  'Diseño soluciones para procesos reales, no para lucir en una presentación.',
  'Busco que cada pieza tenga una función clara dentro del negocio.',
];

const FAQ_ITEMS = [
  {
    question: '¿Qué es el desarrollo web a medida?',
    answer:
      'Es la creación de una solución digital diseñada según las necesidades concretas de una empresa. Puede incluir webs avanzadas, herramientas internas, plataformas privadas, formularios inteligentes, calculadoras, simuladores e integraciones.',
  },
  {
    question: '¿Cuándo merece la pena hacer una web a medida?',
    answer:
      'Cuando una plantilla, constructor visual o un CMS no pueden resolver bien el proceso que necesitas: funcionalidades específicas, integraciones, automatización, rendimiento más controlado o arquitectura SEO y GEO más precisa.',
  },
  {
    question: '¿El desarrollo web a medida es siempre mejor que WordPress?',
    answer:
      'No. WordPress puede ser suficiente para proyectos sencillos. El desarrollo a medida tiene más sentido cuando necesitas control, rendimiento, lógica propia o adaptación a procesos concretos.',
  },
  {
    question: '¿Puedes desarrollar herramientas internas para empresas?',
    answer:
      'Sí. Una solución web a medida puede ordenar solicitudes, gestionar datos, centralizar información y sustituir hojas de cálculo complejas. El alcance depende de la necesidad real y del nivel de complejidad.',
  },
  {
    question: '¿También trabajas SEO en proyectos a medida?',
    answer:
      'Sí, cuando el proyecto tiene una parte pública. En ese caso, la estructura se plantea desde el inicio con SEO técnico, claridad semántica, rendimiento y preparación para GEO.',
  },
  {
    question: '¿Trabajas solo en Valencia?',
    answer:
      'Trabajo desde Valencia y también en remoto para empresas de otras zonas de España. Lo importante es definir bien el alcance, documentar decisiones y mantener un proceso claro.',
  },
  {
    question: '¿Cuánto cuesta una solución web a medida?',
    answer:
      'Depende del alcance, la complejidad funcional, las integraciones, el nivel de diseño, la parte SEO y las necesidades de mantenimiento. Lo adecuado es revisar primero el proyecto y preparar una propuesta ajustada a lo que realmente necesitas.',
  },
];

export default function DesarrolloWebAMedidaPage() {
  const pageUrl = `${SITE_URL}/desarrollo-web-a-medida`;
  const breadcrumbId = `${pageUrl}#breadcrumbs`;
  const serviceId = `${pageUrl}#service`;
  const offerId = `${pageUrl}#offer`;

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/pricing' },
    { label: 'Desarrollo web a medida' },
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
        name: 'Desarrollo web a medida',
        description:
          'Servicio de desarrollo web a medida para empresas que necesitan herramientas, plataformas y soluciones digitales adaptadas a procesos reales de negocio.',
        inLanguage: 'es-ES',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': breadcrumbId },
        about: [{ '@id': `${SITE_URL}/#business` }, { '@id': serviceId }],
        mainEntity: { '@id': serviceId },
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: 'Desarrollo web a medida',
        description:
          'Desarrollo de soluciones web a medida para empresas: herramientas internas, plataformas, integraciones y funcionalidades orientadas a negocio.',
        provider: { '@id': `${SITE_URL}/#business` },
        serviceType: 'Desarrollo web a medida',
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
          { label: 'Desarrollo web a medida', href: '/desarrollo-web-a-medida' },
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
                <span>Desarrollo web a medida</span>
              </div>

              <h1 id="hero-title" className="mb-md helper-center-mobile">
                Desarrollo web a medida para empresas que necesitan algo más que una web estándar
              </h1>

              <p className="hero-description text-secondary mb-xl helper-center-mobile">
                Diseño y desarrollo soluciones web adaptadas a procesos reales de negocio: plataformas, herramientas
                internas, áreas privadas, calculadoras, sistemas de captación, integraciones y funcionalidades que una
                plantilla no puede resolver bien.
              </p>

              <div className="hero-actions mb-xl helper-flex-center-mobile">
                <Link href="/contacto" data-primary-cta="true" className="btn btn--primary btn--large">
                  Cuéntame tu proyecto
                </Link>
                <a href="#proceso" className="btn btn--secondary btn--large">
                  Ver cómo trabajo
                </a>
              </div>

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

        <section className="section section-problem" aria-labelledby="problema-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--teal mb-lg">Cuándo pasa</span>
              <h2 id="problema-title" className="section-header__title">
                Cuando una web estándar se queda corta
              </h2>
            </div>

            <div className="problem-highlight card card--no-hover animate-on-scroll">
              <p className="text-secondary mb-md">
                Hay proyectos que no necesitan solo una página bonita. Necesitan una herramienta. Una web corporativa puede
                ser suficiente para explicar servicios y facilitar contacto, pero a veces el negocio necesita capturar datos,
                ordenar solicitudes, mostrar información dinámica, automatizar procesos o conectar sistemas.
              </p>
              <p className="text-secondary mb-md">
                Ahí entra el desarrollo web a medida: adaptar la estructura digital al proceso real del negocio, no al límite
                de una plantilla. No es una respuesta universal, pero cuando hay una necesidad funcional concreta evita muchos
                parches futuros.
              </p>
              <p className="text-secondary mb-0">
                Si hoy necesitas una base más estándar antes de una solución personalizada, puede encajar mejor empezar por
                <Link href="/diseno-web/valencia"> diseño web en Valencia</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-services" aria-labelledby="que-es-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--blue mb-lg">Definición</span>
              <h2 id="que-es-title" className="section-header__title">
                Qué es el desarrollo web a medida
              </h2>
              <p className="section-intro section-header__subtitle">
                Es la creación de una solución digital diseñada según objetivos y procesos concretos de una empresa. Puede
                ser una plataforma, una herramienta interna, una calculadora, un área privada o una integración entre servicios.
              </p>
            </div>

            <div className="services-grid grid grid-cols-2 gap-lg">
              <article className="service-card animate-on-scroll">
                <h3 className="service-card__title">Preguntas que debe responder</h3>
                <ul className="plan-card__list">
                  <li>Qué problema debe resolver</li>
                  <li>Qué usuario la va a usar</li>
                  <li>Qué información debe mostrar o recoger</li>
                  <li>Qué proceso debe simplificar</li>
                  <li>Qué datos debe ordenar</li>
                  <li>Qué herramientas debe conectar</li>
                  <li>Qué acción final debe facilitar</li>
                </ul>
              </article>

              <article className="service-card animate-on-scroll">
                <h3 className="service-card__title">Enfoque de trabajo</h3>
                <p className="service-card__description mb-0">
                  Mi enfoque no empieza preguntando qué tecnología quieres usar, sino qué necesitas conseguir. La tecnología
                  importa, pero elegirla antes de entender el problema suele generar sobrecoste y soluciones mal orientadas.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-scope" aria-labelledby="casos-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--cyan mb-lg">Casos de uso</span>
                <h2 id="casos-title" className="section-header__title">
                  Para qué tipo de proyectos tiene sentido
                </h2>
              </div>

            <div className="scope-grid grid grid-cols-3 gap-lg">
              {USE_CASES.map((item) => (
                <article key={item.title} className="scope-card animate-on-scroll">
                  <h3 className="scope-card__title">{item.title}</h3>
                  <p className="scope-card__description mb-0 text-secondary">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="incluye-servicio" className="section section-services" aria-labelledby="incluye-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--purple mb-lg">Qué incluye</span>
              <h2 id="incluye-title" className="section-header__title">
                Qué incluye el servicio de desarrollo web a medida
              </h2>
            </div>

            <div className="services-grid grid grid-cols-2 gap-lg">
              {SERVICE_LAYERS.map((item) => (
                <article key={item.title} className="service-card animate-on-scroll">
                  <h3 className="service-card__title">{item.title}</h3>
                  <p className="service-card__description mb-0">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="section-note card card--no-hover animate-on-scroll mt-xl">
              <p className="text-secondary mb-0">
                Si quieres profundizar en la capa generativa, aquí puedes ver el servicio de{' '}
                <Link href="/servicio-seo/autoridad-digital-ias">autoridad digital para IAs</Link>. Y para la capa de
                visibilidad, este enfoque se complementa con <Link href="/servicio-seo/posicionamiento-seo-geo">posicionamiento SEO y GEO</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-fit" aria-labelledby="orbita-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--status mb-lg">Método ORBITA</span>
              <h2 id="orbita-title" className="section-header__title">
                Mi enfoque: desarrollo web con método ORBITA
              </h2>
            </div>

            <div className="fit-grid grid grid-cols-2 gap-lg">
              {ORBITA_ITEMS.map((item, index) => (
                <article key={item.title} className={`fit-card ${index % 2 === 0 ? 'fit-card--positive' : 'fit-card--neutral'} animate-on-scroll`}>
                  <h3 className="fit-card__title">{item.title}</h3>
                  <p className="text-secondary mb-0">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="proceso" className="section section-process" aria-labelledby="proceso-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--status mb-lg">Proceso</span>
              <h2 id="proceso-title" className="section-header__title">
                Cómo es el proceso de trabajo
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

        <section className="section section-services" aria-labelledby="beneficios-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--blue mb-lg">Beneficios</span>
              <h2 id="beneficios-title" className="section-header__title">
                Qué puedes conseguir con una solución web a medida
              </h2>
            </div>

            <div className="services-grid grid grid-cols-2 gap-lg">
              {BENEFITS.map((item) => (
                <article key={item} className="service-card animate-on-scroll">
                  <h3 className="service-card__title">{item}</h3>
                </article>
              ))}
            </div>

            <div className="section-note card card--no-hover animate-on-scroll mt-xl">
              <p className="text-secondary mb-0">
                Una buena solución a medida no debe impresionar durante cinco segundos: debe ahorrar tiempo, ordenar
                información y facilitar decisiones. Si quieres ver un ejemplo real, revisa el{' '}
                <Link href="/proyectos/ledescaparate">caso de estudio de LEDescaparate</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-scope" aria-labelledby="ejemplos-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--teal mb-lg">Ejemplos</span>
              <h2 id="ejemplos-title" className="section-header__title">
                Ejemplos de soluciones que puedo desarrollar
              </h2>
            </div>

            <div className="scope-grid grid grid-cols-3 gap-lg">
              {EXAMPLES.map((item) => (
                <article key={item} className="scope-card animate-on-scroll">
                  <h3 className="scope-card__title">{item}</h3>
                </article>
              ))}
            </div>

            <div className="section-note scope-note card card--no-hover animate-on-scroll mt-xl">
              <p className="text-secondary mb-0">
                Si quieres ver enfoque aplicado en experiencias funcionales, puedes revisar también las{' '}
                <Link href="/demos-interactivas">demos interactivas</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-fit" aria-labelledby="encaje-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--cyan mb-lg">Para quién es</span>
              <h2 id="encaje-title" className="section-header__title">
                Para quién es este servicio
              </h2>
            </div>

            <div className="fit-grid grid grid-cols-2 gap-lg">
              {FIT_OPTIONS.map((item) => (
                <article key={item.title} className={`fit-card ${item.variant} animate-on-scroll`}>
                  <h3 className="fit-card__title">{item.title}</h3>
                  <ul className="fit-card__list" aria-label={item.title}>
                    {item.items.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-problem" aria-labelledby="valencia-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--status mb-lg">Valencia y remoto</span>
              <h2 id="valencia-title" className="section-header__title">
                Desarrollo web a medida en Valencia y remoto para empresas
              </h2>
            </div>

            <div className="problem-highlight card card--no-hover animate-on-scroll">
              <p className="text-secondary mb-md">
                Trabajo desde Valencia con empresas locales y también con proyectos en remoto en España. Lo importante no
                es la distancia, sino definir bien el proceso, documentar decisiones y mantener objetivos claros en cada fase.
              </p>
              <p className="text-secondary mb-0">
                Cuando el proyecto lo requiere, este servicio puede integrarse con estrategia de diseño web, SEO local, GEO,
                automatización y mejora de procesos digitales.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-services" aria-labelledby="porque-conmigo-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--purple mb-lg">Por qué conmigo</span>
              <h2 id="porque-conmigo-title" className="section-header__title">
                Por qué trabajar conmigo
              </h2>
            </div>

            <div className="services-grid grid grid-cols-2 gap-lg">
              {WHY_WITH_ME.map((item) => (
                <article key={item} className="service-card animate-on-scroll">
                  <h3 className="service-card__title">{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section" aria-labelledby="faq-title">
          <div className="container animate-on-scroll">
            <div className="section-heading section-header">
              <h2 id="faq-title" className="section-header__title">
                Preguntas frecuentes sobre desarrollo web a medida
              </h2>
            </div>
            <FaqAccordion title="Respuestas rápidas antes de plantear el desarrollo" items={FAQ_ITEMS} />
          </div>
        </section>

        <section className="section section-contact" aria-labelledby="cta-final-title">
          <div className="container">
            <div className="section-heading section-header animate-on-scroll">
              <span className="section-eyebrow badge badge--teal mb-lg">Siguiente paso</span>
              <h2 id="cta-final-title" className="section-header__title">
                Hablemos de tu proyecto
              </h2>
              <p className="section-header__subtitle">
                No hace falta llegar con una especificación perfecta. Muchas veces el primer trabajo consiste en ordenar la
                idea, separar lo imprescindible y definir una primera versión útil.
              </p>
            </div>

            <div className="contact-layout grid grid-cols-2" style={{ alignItems: 'stretch' }}>
              <div className="contact-content card card--no-hover animate-on-scroll" style={{ height: '100%' }}>
                <h3 className="contact-content__title">Qué reviso</h3>
                <ul className="contact-benefits" aria-label="Qué reviso">
                  <li>Qué necesitas resolver y qué tienes ahora.</li>
                  <li>Qué alcance tiene sentido para una primera versión útil.</li>
                  <li>Qué resultado esperas conseguir y cómo medirlo.</li>
                </ul>
              </div>

              <div className="contact-next-step card card--no-hover animate-on-scroll" style={{ height: '100%' }}>
                <h3 className="contact-content__title mb-sm">Acción</h3>
                <p className="contact-next-step__text text-secondary mb-0">
                  A partir de ahí valoro si conviene una solución a medida, qué forma debería tener y cuál es la manera más
                  razonable de construirla.
                </p>
                <div className="plan-note__actions mt-lg">
                  <Link href="/contacto" data-primary-cta="true" className="btn btn--primary btn--large">
                    Solicitar propuesta
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
