import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL, PERSON_SCHEMA, BUSINESS_SCHEMA } from '@/lib/seo/schemas';
import { safeJsonLd } from '@/lib/seo/jsonLd';

/* ───────────────────────── SEO ───────────────────────── */

const PAGE_TITLE = 'Sobre Carles del Olmo | Diseñador web en Valencia';
const PAGE_DESCRIPTION =
  'Conoce cómo trabaja Carles del Olmo, diseñador web en Valencia especializado en rendimiento, SEO y GEO, con un enfoque basado en entender el negocio antes de construir.';

export const metadata = constructMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  exactUrl: `${SITE_URL}/sobre-carles-del-olmo`,
});

/* ─────────────── JSON-LD (ProfilePage schema) ────── */

function generateAboutSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      PERSON_SCHEMA,
      BUSINESS_SCHEMA,
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/sobre-carles-del-olmo#webpage`,
        url: `${SITE_URL}/sobre-carles-del-olmo`,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: 'es-ES',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };
}

/* ─────────────────────── Página ──────────────────────── */

export default function SobreCarlesDelOlmoPage() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Sobre mí' },
  ];

  const jsonLd = generateAboutSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <main className="page__content">

        {/* ── HERO SOBRE MÍ ── */}
        <header className="section page-header pb-xl" id="inicio">
          <div className="container max-w-4xl mx-auto">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-xl">
              <div className="badge badge--status mb-md">Sobre mí</div>
              <h1 className="page-header__title mb-md">
                Antes de construir una web, <span className="gradient-text">necesito entender el negocio</span>
              </h1>
              <p className="page-header__subtitle max-w-2xl mx-auto mb-md">
                Soy Carles del Olmo, diseñador y desarrollador web en Valencia especializado en rendimiento, SEO y GEO.
              </p>
              <p className="page-header__subtitle max-w-2xl mx-auto">
                No empiezo preguntando qué diseño te gusta o qué tecnología quieres utilizar. Primero necesito comprender cómo funciona tu negocio, qué espera realmente tu cliente y qué está impidiendo que tu presencia digital aporte más valor.
              </p>
              <div className="flex flex-wrap gap-md justify-center mt-xl">
                <Link href="/contacto" data-primary-cta="true" className="btn btn--primary btn--large w-full">
                  Cuéntame tu proyecto
                </Link>
                <Link href="/proyectos" className="btn btn--secondary btn--large w-full">
                  Ver proyectos
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* ── INTRODUCCIÓN & BACKGROUND ── */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-2 gap-xl items-start mb-2xl">
              <div className="animate-on-scroll h-full">
                <p className="section-header__eyebrow">Mi base</p>
                <h2 className="text-2xl mb-md">No empecé en el diseño web. <span className="gradient-text">Empecé entendiendo procesos</span></h2>
                <div className="text-secondary text-lg text-left">
                  <p className="mb-sm">Mi trayectoria profesional comenzó en administración, coordinando tareas, resolviendo incidencias y trabajando con procesos que afectaban al funcionamiento diario de una empresa.</p>
                  <p className="mb-sm">Esa etapa me enseñó que muchos problemas no aparecen porque falten herramientas o porque las personas trabajen poco. Aparecen porque el sistema está mal planteado.</p>
                  <p className="mb-sm">Cuando una tarea se repite sin necesidad o una incidencia vuelve una y otra vez, mi reacción natural es buscar la causa. No me interesa aplicar un parche que permita salir del paso si el problema seguirá apareciendo después.</p>
                  <p className="mb-sm">Durante una etapa de desgaste profesional empecé a estudiar programación con más seriedad. Descubrí que me permitía convertir una idea en una herramienta, ordenar procesos y construir soluciones que otras personas pudieran utilizar.</p>
                  <p className="mb-0">La DANA de Valencia no originó esa decisión, pero sí hizo más difícil seguir aplazándola. Decidí dedicar tiempo real a aprender, construir proyectos y desarrollar una vía profesional más alineada con mi manera de pensar.</p>
                </div>
              </div>

              <div className="animate-on-scroll h-full">
                <p className="section-header__eyebrow">Punto de inflexión</p>
                <h2 className="text-2xl mb-md">LEDescaparate me obligó a <span className="gradient-text">comprender el sistema completo</span></h2>
                <div className="text-secondary text-lg text-left">
                  <p className="mb-sm">El principal punto de inflexión fue crear LEDescaparate desde cero.</p>
                  <p className="mb-sm">Lo que comenzó como una idea de negocio terminó conectando producto, comportamiento del cliente, diseño y desarrollo web, SEO, contenidos, automatización, captación y conversión.</p>
                  <p className="mb-sm">No bastaba con construir una página atractiva. El negocio debía entenderse, la web tenía que funcionar, los potenciales clientes debían poder encontrarla y las solicitudes necesitaban gestionarse de forma ordenada.</p>
                  <p className="mb-sm">Ese proyecto me confirmó que una web no funciona aislada del negocio. Es una pieza dentro de un sistema más amplio, y cada decisión afecta al resto.</p>
                  <p className="mb-sm">También me enseñó que la técnica solo tiene valor cuando ayuda a resolver una necesidad concreta.</p>
                  <p className="mb-0">
                    <Link href="/proyectos/ledescaparate" className="link-inline">Ver el caso de estudio de LEDescaparate</Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="editorial-highlight animate-on-scroll text-center max-w-4xl mx-auto">
              <p className="section-header__eyebrow">Cómo trabajo</p>
              <h2 className="text-2xl mb-md">No empiezo preguntando qué web quieres</h2>
              <div className="text-secondary text-lg text-left max-w-3xl mx-auto">
                <p className="mb-sm">Antes de proponer una solución intento construir una imagen clara del negocio.</p>
                <p className="mb-sm">Necesito entender quién es el cliente, qué valora, qué dudas tiene y por qué elegiría una empresa en lugar de otra. También estudio qué hace bien la competencia, dónde genera frustración y qué expectativas existen en el mercado.</p>
                <p className="text-primary mt-md mb-md text-xl">Hay una diferencia importante entre la necesidad que el negocio cree tener y la que tiene realmente.</p>
                <p className="mb-sm">Una empresa puede pensar que necesita una web nueva cuando el problema está en su propuesta, en la forma de explicar sus servicios, en una estructura digital contradictoria o en un proceso que dificulta convertir el interés en una oportunidad comercial.</p>
                <p className="mb-sm">Solo después de entender ese contexto decido qué merece la pena construir, qué prioridad tiene y cómo debe relacionarse con el resto del proyecto.</p>
                <p className="mb-sm">Cada decisión importante debe poder explicarse. Qué problema resuelve, a quién ayuda, qué coste implica y cómo se mantendrá con el tiempo.</p>
                <p className="mb-0">También debe poder revisarse. Si aparecen mejores argumentos o nuevos datos, prefiero cambiar el planteamiento antes que defender una idea por orgullo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECCIÓN 3: Qué hago actualmente ── */}
        <section className="section bg-dark-soft">
          <div className="container">
            <div className="grid grid-cols-2 gap-xl items-center animate-on-scroll">
              <div className="col-span-2 text-left">
                <h2 className="mb-md">Qué hago <span className="gradient-text">actualmente</span></h2>
                <div className="text-secondary text-lg">
                  <p className="mb-sm">Diseño y desarrollo webs claras, rápidas y preparadas para crecer.</p>
                  <p className="mb-sm">Trabajo el SEO desde la estructura del proyecto, no como una capa que se añade cuando la web ya está terminada. También incorporo criterios de GEO para facilitar que la empresa, sus servicios y sus contenidos puedan ser interpretados correctamente por sistemas de inteligencia artificial.</p>
                  <p className="mb-sm">No entiendo el GEO como un conjunto de trucos para conseguir que una IA mencione una marca. Antes de buscar esa visibilidad, la empresa debe explicar con coherencia quién es, qué ofrece y por qué puede considerarse una fuente fiable.</p>
                  <p className="mb-sm">Cuando el proyecto lo necesita, también desarrollo automatizaciones que reducen tareas manuales, organizan información o mejoran la gestión de solicitudes.</p>
                  <p className="mt-md text-primary mb-0">La herramienta puede cambiar. El criterio para elegirla es siempre el mismo: debe responder a una necesidad real del negocio.</p>
                </div>
              </div>
              <div className="col-span-2">
                <div className="terminal">
                  <div className="terminal__header">
                    <div className="terminal__dot terminal__dot--red"></div>
                    <div className="terminal__dot terminal__dot--yellow"></div>
                    <div className="terminal__dot terminal__dot--green"></div>
                    <div className="terminal__filename">~ /dev/mi-enfoque.json</div>
                  </div>
                  <div className="terminal__code">
                    <pre>
<span className="code-keyword">{'{'}</span>
  <span className="code-property">"enfoque"</span>: <span className="code-keyword">{'['}</span>
    <span className="code-string">"Rendimiento real"</span>,
    <span className="code-string">"Estructura semántica"</span>,
    <span className="code-string">"Claridad del mensaje"</span>,
    <span className="code-string">"Arquitectura de contenidos"</span>,
    <span className="code-string">"SEO técnico"</span>,
    <span className="code-string">"Preparación motores generativos"</span>,
    <span className="code-string">"Coherencia negocio-tecnología"</span>
  <span className="code-keyword">{']'}</span>
<span className="code-keyword">{'}'}</span>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECCIÓN 4: Qué puedes esperar si trabajamos juntos ── */}
        <section className="section bg-glass">
          <div className="container">
            <header className="section-header text-center animate-on-scroll">
              <h2 className="section-header__title">Qué puedes esperar <span className="gradient-text">si trabajamos juntos</span></h2>
            </header>

            <div className="grid grid-cols-3 gap-lg mt-xl">
              <article className="comparison-col animate-on-scroll">
                <div className="editorial-step-num" aria-hidden="true">01</div>
                <h3 className="text-xl mb-md">Comprensión antes que ejecución</h3>
                <p className="text-secondary mb-0">
                  Dedicaré tiempo a conocer el negocio, el cliente y el contexto antes de recomendar una solución.
                </p>
              </article>

              <article className="comparison-col animate-on-scroll">
                <div className="editorial-step-num" aria-hidden="true">02</div>
                <h3 className="text-xl mb-md">Criterio técnico bien explicado</h3>
                <p className="text-secondary mb-0">
                  No necesitas dominar programación, SEO o inteligencia artificial. Mi responsabilidad es explicar las decisiones de forma comprensible y relacionarlas con sus consecuencias.
                </p>
              </article>

              <article className="comparison-col animate-on-scroll">
                <div className="editorial-step-num" aria-hidden="true">03</div>
                <h3 className="text-xl mb-md">Honestidad sobre los límites</h3>
                <p className="text-secondary mb-0">
                  No necesito aparentar que conozco todas las respuestas. Cuando algo requiere investigación, lo reconozco y profundizo hasta comprenderlo.
                </p>
              </article>

              <article className="comparison-col animate-on-scroll">
                <div className="editorial-step-num" aria-hidden="true">04</div>
                <h3 className="text-xl mb-md">Visión de largo plazo</h3>
                <p className="text-secondary mb-0">
                  Intento evitar soluciones que funcionan durante unas semanas, pero dejan una base difícil de mantener, posicionar o ampliar.
                </p>
              </article>

              <article className="comparison-col animate-on-scroll">
                <div className="editorial-step-num" aria-hidden="true">05</div>
                <h3 className="text-xl mb-md">Implicación real</h3>
                <p className="text-secondary mb-0">
                  Cuando alguien confía en mí para resolver un problema, interpreto esa confianza como una responsabilidad. No como una invitación a aplicar una solución estándar y pasar al siguiente proyecto.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── SECCIONES FINALES ── */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-2 gap-xl animate-on-scroll">

              <div className="h-full">
                <p className="section-header__eyebrow">Con quién trabajo</p>
                <h2 className="text-2xl mb-md">Con qué tipo de proyectos <span className="gradient-text">encajo mejor</span></h2>
                <div className="text-secondary text-lg text-left">
                  <p className="mb-sm">Trabajo especialmente bien con pequeñas y medianas empresas, negocios locales y proyectos que entienden la importancia de construir una presencia digital con una base seria.</p>
                  <p className="mb-0">Probablemente encajemos bien si buscas un profesional cercano que pueda comprender la parte técnica sin perder de vista al cliente, el funcionamiento de la empresa y los objetivos reales del proyecto.</p>
                </div>
              </div>

              <div className="card bg-dark-soft h-full flex flex-col justify-center">
                <div className="terminal__chat">
                  <div className="chat-bubble chat-bubble--user">
                    ¿Necesito tener definido el diseño, la estructura o las herramientas antes de empezar?
                  </div>
                  <div className="chat-bubble chat-bubble--ia">
                    <strong>No necesitas tener definido el diseño, la estructura o las herramientas.</strong> Sí es importante que estés dispuesto a explicar cómo funciona el negocio, revisar algunas suposiciones y tomar decisiones pensando más allá de la publicación inicial.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECCIÓN 7.5: Reseñas ── */}
        <GoogleReviewsSection className="bg-dark-soft" />

        {/* ── SECCIÓN 8: CTA Final ── */}
        <section className="section animate-on-scroll py-2xl">
          <div className="container">
            <div className="cta-section">
              <h2 className="cta-section__title text-2xl">
                Una web <span className="gradient-text">no debería empezar por la web</span>
              </h2>

              <div className="text-secondary mb-xl max-w-3xl mx-auto text-lg">
                <p className="mb-sm">Debería empezar por el negocio, por el cliente y por el problema que merece la pena resolver.</p>
                <p className="mb-sm">Después llegará el diseño, el desarrollo, el SEO, el GEO o la automatización que tenga sentido aplicar.</p>
                <p>Si estás valorando crear una nueva web o mejorar la que ya tienes, podemos empezar poniendo el problema en orden y entendiendo qué necesita realmente el proyecto.</p>
              </div>

              <div className="flex flex-col items-center justify-center gap-md">
                <Link href="/contacto" data-primary-cta="true" className="btn btn--primary btn--large w-full">
                  Cuéntame tu proyecto
                </Link>
              </div>

              {/* Interlinks contextuales */}
              <nav className="demos-interlinks mt-xl" aria-label="Enlaces relacionados">
                <Link href="/proyectos" className="demos-interlinks__link">
                  Ver proyectos
                </Link>
                <Link href="/demos-interactivas" className="demos-interlinks__link">
                  Ver demos interactivas
                </Link>
                <Link href="/blog" className="demos-interlinks__link">
                  Leer el blog
                </Link>
              </nav>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
