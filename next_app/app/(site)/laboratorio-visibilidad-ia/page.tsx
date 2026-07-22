import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import VisibilityLab from '@/components/aiVisibilityLab/VisibilityLab';
import { constructMetadata } from '@/lib/seo/metadata';
import { safeJsonLd } from '@/lib/seo/jsonLd';
import {
  SITE_URL,
  PERSON_SCHEMA,
  BUSINESS_SCHEMA,
  generateBreadcrumbSchema,
  generateFaqPageNode,
} from '@/lib/seo/schemas';
import { LAB_PATH } from '@/lib/aiVisibilityLab/config';

const PAGE_TITLE =
  'Laboratorio de visibilidad en IA | Comprueba si tu empresa aparece';
const PAGE_DESCRIPTION =
  'Comprueba si ChatGPT, Gemini y Perplexity mencionan o recomiendan tu empresa cuando un cliente busca servicios como los tuyos. Herramienta guiada, sin conexión a APIs de IA.';

export const metadata = constructMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  exactUrl: `${SITE_URL}${LAB_PATH}`,
});

const FAQS = [
  {
    question: '¿El laboratorio se conecta a ChatGPT, Gemini o Perplexity?',
    answer:
      'No. El laboratorio no utiliza ninguna API de inteligencia artificial ni rastrea respuestas de terceros. Genera consultas con plantillas y te guía para que seas tú quien las pruebe manualmente en cada motor y registre lo que aparece.',
  },
  {
    question: '¿Los resultados son definitivos?',
    answer:
      'No. Los resultados representan una muestra obtenida con unas consultas, motores, cuentas y fechas concretas. Las respuestas de los motores de IA varían según el momento, la cuenta, la ubicación y el modelo utilizado, por lo que conviene interpretarlos como patrones y no como una certificación.',
  },
  {
    question: '¿Por qué una empresa puede aparecer en un motor y no en otro?',
    answer:
      'Cada motor utiliza modelos, fuentes y criterios de recuperación distintos, y actualiza su información en momentos diferentes. Por eso una misma consulta puede devolver empresas distintas en ChatGPT, Gemini o Perplexity.',
  },
  {
    question: '¿Qué diferencia existe entre ser mencionada y ser citada?',
    answer:
      'Una mención es que el motor nombre tu empresa en la respuesta. Una cita es que la respuesta enlace o utilice tu web como fuente directa. Son señales distintas: puedes ser mencionada sin que tu dominio aparezca como fuente.',
  },
  {
    question: '¿Se guardan los datos introducidos?',
    answer:
      'Los datos privados del análisis (nombre de la empresa, web, consultas completas, notas y competidores) se guardan únicamente en tu dispositivo y puedes borrarlos cuando quieras. Al usar el laboratorio, los resultados estadísticos indicados antes de empezar —sector, categoría de servicio, provincia, tipo de consulta, motor, valoraciones normalizadas y un identificador irreversible del dominio— se incorporan automáticamente y de forma seudonimizada a la base de investigación del estudio. Nunca se envían el dominio en texto plano, los nombres de competidores, las consultas, las respuestas de las IA ni las notas.',
  },
  {
    question: '¿Qué es la base de investigación del laboratorio?',
    answer:
      'Es un estudio independiente sobre visibilidad empresarial en motores de IA. Los resultados estadísticos de cada análisis se agregan para detectar patrones por sectores, territorios, tipos de consulta y motores. Los datos se utilizan solo de forma agregada: nunca para publicar o evaluar individualmente a una empresa ni para contactar con quien usa la herramienta. El detalle del tratamiento está en la política de privacidad.',
  },
  {
    question: '¿Qué puedo hacer si mis competidores aparecen y mi empresa no?',
    answer:
      'El informe señala en qué consultas aparecieron competidores sin que apareciera tu empresa. Es una señal para investigar qué contenidos, servicios y fuentes externas respaldan a esos competidores. Confirmar la causa requiere una auditoría específica de SEO y GEO.',
  },
];

function buildJsonLd() {
  const url = `${SITE_URL}${LAB_PATH}`;
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Laboratorio de visibilidad en IA' },
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      PERSON_SCHEMA,
      BUSINESS_SCHEMA,
      {
        '@type': 'WebApplication',
        '@id': `${url}#webapp`,
        name: 'Laboratorio de visibilidad en IA',
        url,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: PAGE_DESCRIPTION,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${url}#breadcrumbs` },
      },
      generateBreadcrumbSchema(breadcrumbs, `${url}#breadcrumbs`),
      generateFaqPageNode(FAQS, `${url}#faq`),
    ],
  };
}

const WHAT_IT_MEASURES = [
  {
    title: 'Presencia',
    text: 'En cuántas pruebas evaluables aparece tu empresa, mencionada o recomendada.',
  },
  {
    title: 'Recomendación',
    text: 'En cuántas pruebas el motor destaca o recomienda tu empresa de forma preferente.',
  },
  {
    title: 'Citación',
    text: 'En cuántas respuestas tu dominio aparece como fuente o enlace directo.',
  },
  {
    title: 'Exactitud',
    text: 'Si la información mostrada sobre tu empresa es correcta, parcialmente incorrecta o incorrecta.',
  },
  {
    title: 'Competencia',
    text: 'Con qué frecuencia aparecen competidores y en qué consultas aparecen ellos y no tu empresa.',
  },
];

const WHAT_IT_CANNOT_MEASURE = [
  'Todas las posibles consultas que puede hacer un usuario.',
  'Todos los modelos o configuraciones existentes.',
  'La causa exacta de una ausencia.',
  'La visibilidad futura.',
  'El impacto comercial directo.',
];

const WHY_RESULTS_CHANGE = [
  'Actualización de los modelos.',
  'Fuentes recuperadas en cada respuesta.',
  'Momento en el que se hace la consulta.',
  'Cuenta y contexto de la sesión.',
  'Ubicación desde la que se pregunta.',
  'Variabilidad natural de las respuestas.',
];

const METHODOLOGY_STEPS = [
  {
    title: 'Describe tu empresa',
    description:
      'Nombre, web, servicio principal, ubicación, tipo de cliente y necesidad. Solo lo mínimo para construir consultas realistas.',
  },
  {
    title: 'Se generan tres consultas',
    description:
      'El laboratorio las crea con plantillas deterministas: descubrimiento, recomendación y necesidad concreta. Sin usar IA para generarlas.',
  },
  {
    title: 'Pruébalas en cada motor',
    description:
      'Realizas cada consulta en ChatGPT, Gemini y Perplexity, en una conversación nueva y sin añadir contexto, para que sean comparables.',
  },
  {
    title: 'Registra lo que aparece',
    description:
      'Anotas manualmente si apareces, si te recomiendan, si citan tu web y si aparecen competidores.',
  },
  {
    title: 'Consulta el informe',
    description:
      'Obtienes presencia, recomendación, citación, exactitud y competencia, con hasta tres prioridades sugeridas.',
  },
];

export default function LaboratorioVisibilidadIaPage() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Laboratorio de visibilidad en IA' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(buildJsonLd()) }}
      />

      <main className="page__content">
        <header className="page-header animate-on-scroll no-print">
          <div className="container">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="page-header__title mt-xl">
              Laboratorio de visibilidad en IA
            </h1>
            <p className="page-header__subtitle max-w-narrow mx-auto">
              Comprueba si ChatGPT, Gemini y Perplexity mencionan tu negocio
              cuando una persona busca servicios como los tuyos.
            </p>
          </div>
        </header>

        {/* Herramienta interactiva (cliente, datos solo en el navegador) */}
        <section className="section pt-md pb-xl">
          <div className="container">
            <VisibilityLab />
          </div>
        </section>

        {/* Contenido estático indexable (§19) */}
        <section id="metodologia" className="section bg-glass py-xl animate-on-scroll no-print">
          <div className="container">
            <header className="section-header">
              <h2 className="section-header__title">Cómo funciona la metodología</h2>
              <p className="section-header__subtitle">
                Un método manual y comparable para observar tu visibilidad en los
                motores de IA, sin conectarse a ninguna API.
              </p>
            </header>
            <ol className="editorial-list editorial-list--two-col max-w-4xl mx-auto mt-xl">
              {METHODOLOGY_STEPS.map((step, index) => (
                <li key={step.title} className="editorial-item">
                  <span className="editorial-item__num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="editorial-item__title">{step.title}</h3>
                    {/* En móvil se muestran solo los títulos; la descripción
                        sigue en el HTML (display:none) para no perder SEO. */}
                    <p className="editorial-item__description hidden-mobile">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section py-xl animate-on-scroll no-print">
          <div className="container">
            <header className="section-header">
              <h2 className="section-header__title">Qué mide el laboratorio</h2>
            </header>
            <div className="grid grid-cols-2 gap-md">
              {WHAT_IT_MEASURES.map((item) => (
                <div key={item.title} className="card card--no-hover">
                  <h3 className="card__title text-left mb-sm">{item.title}</h3>
                  <p className="card__content mb-0">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-glass py-xl animate-on-scroll no-print">
          <div className="container">
            <div className="grid grid-cols-2 gap-lg">
              <div className="card card--no-hover">
                <h2 className="card__title text-left mb-sm">Qué no puede medir</h2>
                <ul className="editorial-list">
                  {WHAT_IT_CANNOT_MEASURE.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="card card--no-hover">
                <h2 className="card__title text-left mb-sm">
                  Por qué los resultados pueden cambiar
                </h2>
                <ul className="editorial-list">
                  {WHY_RESULTS_CHANGE.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section py-xl animate-on-scroll no-print">
          <div className="container max-w-narrow">
            <FaqAccordion title="Preguntas frecuentes" items={FAQS} />
          </div>
        </section>
      </main>
    </>
  );
}
