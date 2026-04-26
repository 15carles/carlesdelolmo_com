import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL, PERSON_SCHEMA, BUSINESS_SCHEMA } from '@/lib/seo/schemas';
import { safeJsonLd } from '@/lib/seo/jsonLd';

/* ───────────────────────── SEO ───────────────────────── */

export const metadata = constructMetadata({
  title: 'Sobre mí | Carles del Olmo',
  description: 'Conoce a Carles del Olmo, diseñador web en Valencia con enfoque en rendimiento, estructura semántica, SEO técnico y GEO.',
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
        name: 'Sobre mí | Carles del Olmo',
        description: 'Conoce a Carles del Olmo, diseñador web en Valencia con enfoque en rendimiento, estructura semántica, SEO técnico y GEO.',
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
            
            <div className="animate-on-scroll mt-xl">
              <div className="badge badge--status mb-md inline-block">Sobre mí</div>
              <h1 className="page-header__title mb-md">
                Diseño web con criterio técnico, estructura y una <span className="gradient-text">decisión muy clara de fondo</span>
              </h1>
              <p className="page-header__subtitle max-w-2xl mx-auto">
                Soy Carles del Olmo, diseñador web en Valencia con foco en rendimiento, estructura semántica, SEO técnico y GEO.
              </p>
              <div className="flex flex-wrap gap-md justify-center mt-xl">
                <Link href="/contacto" data-primary-cta="true" className="btn btn--primary btn--large w-full sm:w-auto">
                  Hablemos de tu proyecto
                </Link>
                <Link href="/proyectos" className="btn btn--secondary btn--large w-full sm:w-auto">
                  Ver proyectos
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* ── INTRODUCCIÓN & BACKGROUND ── */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-2 gap-xl items-center mb-2xl">
              <div className="card animate-on-scroll h-full">
                <div className="badge badge--purple mb-md">El punto de partida</div>
                <h2 className="text-2xl mb-md">No llegué a este camino por casualidad</h2>
                <div className="text-secondary text-lg text-left">
                  <p className="mb-sm">Llegué porque entendí que quería construir algo propio, más sólido y alineado con cómo pienso y cómo trabajo.</p>
                  <p className="mb-0">Convertir mi inquietud técnica en una forma real de crear valor para negocios se volvió mi prioridad absoluta, buscando siempre la forma de materializar ideas en algo útil y estructurado.</p>
                </div>
              </div>

              <div className="card animate-on-scroll h-full">
                <div className="badge badge--cyan mb-md">Mi base</div>
                <h2 className="text-2xl mb-md">No empecé en el diseño web, <span className="gradient-text">empecé entendiendo procesos</span></h2>
                <div className="text-secondary text-lg text-left">
                  <p className="mb-sm">Antes de centrarme en el código, trabajé en administración orientada a procesos. Ahí aprendí que muchos problemas surgen de sistemas mal planteados.</p>
                  <p className="mb-0"><strong>Hoy no veo una web como una pieza visual.</strong> La veo como un sistema que tiene que ser claro, rápido, comprensible y útil para el negocio.</p>
                </div>
              </div>
            </div>

            <div className="card precision-grid-card animate-on-scroll border-cyan-900/30 px-md py-xl md:p-xl text-center max-w-4xl mx-auto">
              <div className="badge badge--status mb-md">Punto de inflexión</div>
              <h2 className="text-2xl md:text-3xl mb-md">La DANA no fue solo un golpe. Fue una llamada de atención</h2>
              <div className="text-secondary text-lg text-left md:text-center max-w-3xl mx-auto">
                <p className="mb-sm">Hay momentos que te obligan a revisar muchas cosas de golpe.</p>
                <p className="mb-sm">En mi caso, la catástrofe natural de la DANA en València me hizo ver con más claridad algo que llevaba tiempo rondándome por dentro: no podía dejar mi futuro completamente en manos de una estructura ajena. Necesitaba construir algo más propio, más preparado y con más recorrido.</p>
                <p className="mb-sm">Ese punto de inflexión no se tradujo en una decisión impulsiva. Se tradujo en acción. Empecé a estudiar programación con más seriedad, a dedicar tiempo real a aprender, a probar, a equivocarme y a construir pequeños proyectos personales. Poco a poco fui ganando base, criterio y dirección.</p>
                <p className="mb-sm">También cambió mi relación con el tiempo. Empecé a notar con más fuerza que muchas ideas no sirven de nada si no se aterrizan. Desde entonces intento hacer algo muy simple, aunque no siempre fácil:</p>
                <p className="font-semibold text-primary mt-md mb-0 text-xl">Tomar acción sobre lo que de verdad merece construirse.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECCIÓN 3: Qué hago hoy ── */}
        <section className="section bg-dark-soft">
          <div className="container">
            <div className="grid grid-cols-2 gap-xl items-center animate-on-scroll">
              <div className="col-span-2 lg:col-span-1 text-left">
                <h2 className="mb-md">Qué hago hoy y <span className="gradient-text">cómo entiendo este trabajo</span></h2>
                <div className="text-secondary text-lg">
                  <p className="mb-sm">Hoy desarrollo webs con una visión que mezcla diseño, estructura, rendimiento y estrategia de visibilidad.</p>
                  <p className="mb-sm">Me interesa que una web se vea bien, por supuesto. Pero me interesa todavía más que esté bien pensada.</p>
                  <p className="mb-sm">Para mí, una web no debería ser solo una presencia online. Debería ser un activo digital estructurado. Uno que represente bien a la empresa, que explique con claridad lo que hace, que facilite el posicionamiento y que esté preparado para un entorno donde ya no solo buscan las personas, sino también los sistemas de inteligencia artificial.</p>
                  <p className="mt-md font-semibold text-primary mb-0">No me interesa crear webs que solo aparenten. Me interesa crear webs que aguanten bien una mirada técnica y también una mirada de negocio.</p>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
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

        {/* ── SECCIÓN 4: Las 3 cosas que más me importan ── */}
        <section className="section bg-glass">
          <div className="container">
            <header className="section-header text-center animate-on-scroll">
              <h2 className="section-header__title">Las tres cosas que <span className="gradient-text">más me importan</span> cuando trabajo un proyecto</h2>
            </header>

            <div className="grid grid-cols-3 gap-lg mt-xl">
              <article className="card precision-grid-card animate-on-scroll flex flex-col items-center">
                <div className="text-4xl font-bold gradient-text mb-sm inline-block">01</div>
                <h3 className="card__title text-center text-xl mb-md">Que todo tenga sentido</h3>
                <p className="card__content text-center mb-0">
                  No me gusta añadir elementos porque sí. Cada bloque, cada mensaje y cada decisión deberían responder a una lógica.
                </p>
              </article>

              <article className="card precision-grid-card animate-on-scroll flex flex-col items-center">
                <div className="text-4xl font-bold gradient-text mb-sm inline-block">02</div>
                <h3 className="card__title text-center text-xl mb-md">Que la estructura ayude</h3>
                <p className="card__content text-center mb-0">
                  Una web puede tener buen diseño y aun así ser confusa. La claridad no aparece sola. Hay que construirla.
                </p>
              </article>

              <article className="card precision-grid-card animate-on-scroll flex flex-col items-center">
                <div className="text-4xl font-bold gradient-text mb-sm inline-block">03</div>
                <h3 className="card__title text-center text-xl mb-md">Que sirva para algo real</h3>
                <p className="card__content text-center mb-0">
                  No trabajo pensando en métricas vacías. Trabajo pensando en utilidad, visibilidad y capacidad de conversión.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── SECCIONES FINALES ── */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-2 gap-xl animate-on-scroll">
              
              <div className="card h-full">
                <div className="badge badge--teal mb-md">Más allá del diseño</div>
                <h2 className="text-2xl mb-md">Conectar técnica con <span className="gradient-text">mentalidad práctica</span></h2>
                <div className="text-secondary text-lg text-left">
                  <p className="mb-sm">Me gusta entender cómo funcionan las cosas, detectar dónde falla un sistema, ordenar y simplificar sin simplificar de más.</p>
                  <p className="mb-sm">Esa combinación me lleva a trabajar con un enfoque metódico. Prefiero entender la base, ver qué está mal planteado y construir desde ahí algo sólido.</p>
                  <p className="mb-0">No entiendo una web como un ejercicio estético. Es una herramienta para que una empresa se presente mejor y gane mejores oportunidades.</p>
                </div>
              </div>

              <div className="card bg-dark-soft h-full flex flex-col justify-center">
                <div className="terminal__chat">
                  <div className="chat-bubble chat-bubble--user">
                    ¿Cómo garantizas que el proyecto funcione de verdad?
                  </div>
                  <div className="chat-bubble chat-bubble--ia">
                    Buena pregunta. Valoro especialmente trabajar sobre <strong>proyectos reales</strong>, donde hay que tomar decisiones concretas, priorizar, ajustar y resolver limitaciones reales. Ahí es donde más se nota si detrás hay solo una capa estética o <strong>una base bien pensada</strong>. Mi objetivo es construir un sistema donde diseño, estructura, SEO técnico y GEO vayan de la mano.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECCIÓN 8: CTA Final ── */}
        <section className="section animate-on-scroll py-2xl">
          <div className="container">
            <div className="cta-section">
              <h2 className="cta-section__title text-2xl md:text-3xl lg:text-4xl">
                Si has llegado hasta aquí, probablemente <span className="gradient-text">no buscas una web cualquiera</span>
              </h2>
              
              <div className="text-secondary mb-xl max-w-3xl mx-auto text-lg">
                <p className="mb-sm">Quizá estás en un punto parecido al que veo a menudo en muchos negocios: sabes que necesitas una web mejor, más seria o mejor planteada, pero no quieres limitarte a encargar algo bonito y cruzar los dedos.</p>
                <p className="mb-sm">Si ese es tu caso, seguramente podamos entendernos bien.</p>
                <p>Me gusta trabajar con personas y proyectos que valoran la claridad, el criterio y las decisiones bien pensadas. Si quieres contarme qué necesitas, estaré encantado de leerlo.</p>
              </div>

              <div className="flex flex-col items-center justify-center gap-md">
                <Link href="/contacto" data-primary-cta="true" className="btn btn--primary btn--large w-full sm:w-auto">
                  Cuéntame tu proyecto
                </Link>
                <p className="text-sm text-secondary mt-xs max-w-lg mx-auto italic">
                  &quot;No hace falta que tengas todo claro para escribirme. A veces el primer paso útil es simplemente poner el problema en orden.&quot;
                </p>
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
