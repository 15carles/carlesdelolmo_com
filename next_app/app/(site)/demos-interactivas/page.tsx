import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import DemoCard from '@/components/DemoCard';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/schemas';
import { safeJsonLd } from '@/lib/seo/jsonLd';

/* ───────────────────────── SEO ───────────────────────── */

export const metadata = constructMetadata({
  title: 'Demos interactivas de desarrollo web | Carles del Olmo',
  description:
    'Explora demos interactivas de desarrollo web, automatización y arquitectura digital. Ejemplos reales de cómo se construyen sistemas que funcionan.',
  exactUrl: `${SITE_URL}/demos-interactivas`,
});

/* ───────────────────── Datos de demos ────────────────── */

interface DemoData {
  title: string;
  description: string;
  demoUrl: string;
  image: string;
  imageAlt: string;
  badges: { text: string; color: string }[];
}

const DEMOS: DemoData[] = [
  {
    title: 'Flowdesk',
    description:
      'Plataforma de gestión de flujos de trabajo con interfaz moderna y optimizada para conversión. Explora la experiencia de usuario completa.',
    demoUrl: 'https://demo1.carlesdelolmo.com',
    image: '/assets/demos/demo-flowdesk.webp',
    imageAlt: 'Captura de pantalla de la demo Flowdesk',
    badges: [
      { text: 'Diseño Web', color: 'badge--purple' },
      { text: 'UX', color: 'badge--teal' },
    ],
  },
  {
    title: 'LocalExpert Gestoría',
    description:
      'Web de captación para gestoría local con enfoque en SEO local y automatización de leads. Diseñada para generar confianza y conversiones.',
    demoUrl: 'https://demo2.carlesdelolmo.com',
    image: '/assets/demos/demo-localexpert.webp',
    imageAlt: 'Captura de pantalla de la demo LocalExpert Gestoría',
    badges: [
      { text: 'SEO Local', color: 'badge--teal' },
      { text: 'Captación', color: 'badge--blue' },
    ],
  },
];

/* ─────────────── JSON-LD (CollectionPage schema) ────── */

function generateDemosSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Demos interactivas de desarrollo web',
    description:
      'Explora demos interactivas de desarrollo web, automatización y arquitectura digital. Ejemplos reales de cómo se construyen sistemas que funcionan.',
    url: `${SITE_URL}/demos-interactivas`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: DEMOS.length,
      itemListElement: DEMOS.map((demo, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: demo.title,
        url: demo.demoUrl,
      })),
    },
  };
}

/* ─────────────────────── Página ──────────────────────── */

export default function DemosInteractivasPage() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Demos Interactivas' },
  ];

  const jsonLd = generateDemosSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <main className="page__content">
        {/* ── Hero / Header ── */}
        <header className="page-header animate-on-scroll">
          <div className="container">
            <Breadcrumbs items={breadcrumbs} />

            <h1 className="page-header__title mt-xl">
              Demos interactivas:<br />cómo trabajo y qué construyo
            </h1>
            <p className="page-header__subtitle max-w-3xl mx-auto">
              Una web no se entiende viendo una lista de servicios.
              Se entiende viendo cómo está construida, cómo responde
              y cómo resuelve problemas reales.
            </p>
          </div>
        </header>

        {/* ── Demos disponibles (Grid principal movido arriba) ── */}
        <section className="section bg-glass py-xl animate-on-scroll">
          <div className="container">
            <header className="section-header">
              <h2 className="section-header__title">Proyectos en vivo</h2>
              <p className="section-header__subtitle">
                No son ejemplos decorativos. Son pequeñas piezas de sistemas reales. 
                Cada demo incluye un enfoque técnico para problemas reales.
              </p>
            </header>

            <div className="grid grid-cols-2 demos-grid">
              {DEMOS.map((demo, index) => (
                <DemoCard key={index} {...demo} />
              ))}
            </div>
            
            <div className="mt-xl text-center text-secondary">
              <p>Te recomiendo probarlas con calma. Lo interesante es entender qué están resolviendo.</p>
            </div>
          </div>
        </section>

        {/* ── Qué estás viendo & Decisiones (Tarjetas a 2 columnas) ── */}
        <section className="section pt-xl pb-md animate-on-scroll">
          <div className="container">
            <div className="grid grid-cols-2 gap-lg">
              {/* Tarjeta 1 */}
              <div className="card h-full">
                <h2 className="card__title text-left mb-sm">Qué estás viendo realmente</h2>
                <div className="card__content">
                  <p>
                    Cada demo es una representación simplificada de algo más grande.
                    No están pensadas para impresionar visualmente, están pensadas para enseñar cómo se construye una base sólida.
                  </p>
                  <p className="mt-sm">En ellas puedes ver:</p>
                  <ul className="mt-xs">
                    <li>Cómo se estructura una interfaz para que tenga sentido</li>
                    <li>Cómo se conecta lógica con experiencia de usuario</li>
                    <li>Cómo se plantea un sistema antes de escalarlo</li>
                    <li>Cómo se diseñan flujos que después se pueden automatizar</li>
                  </ul>
                  <p className="mt-sm">
                    Esto es lo que normalmente no se ve en una web terminada. Pero es lo que determina si funcionará o no.
                  </p>
                </div>
              </div>

              {/* Tarjeta 2 */}
              <div className="card h-full">
                <h2 className="card__title text-left mb-sm">No son &quot;features&quot;, son decisiones</h2>
                <div className="card__content">
                  <p>
                    Una de las diferencias entre una web que funciona y una que no es el tipo de decisiones que hay detrás.
                    Las demos no muestran funcionalidades sueltas. Muestran decisiones:
                  </p>
                  <ul className="mt-sm">
                    <li>Qué problema se está resolviendo</li>
                    <li>Cómo se estructura la información</li>
                    <li>Qué se prioriza y qué no</li>
                    <li>Cómo se conecta todo dentro del sistema</li>
                  </ul>
                  <p className="mt-sm">
                    Esto es especialmente importante cuando se trabaja con{' '}
                    <strong><Link href="/servicio-seo/posicionamiento-seo-geo">SEO técnico</Link></strong> y{' '}
                    <strong><Link href="/servicio-seo/autoridad-digital-ias">GEO</Link></strong>.
                    Porque lo que se optimiza no es solo contenido. Es la forma en la que ese contenido existe dentro de la arquitectura.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SEO/GEO & Método ORBITA (Layout asimétrico o de bloques) ── */}
        <section className="section pb-xl animate-on-scroll">
          <div className="container">
            <div className="grid grid-cols-2 gap-lg items-center">
              {/* Bloque Texto */}
              <div>
                <div className="badge badge--status mb-md">Para humanos y sistemas</div>
                <h2 className="section-header__title text-left mb-sm">
                  Relación con el SEO y el GEO
                </h2>
                <div className="article-content">
                  <p>
                    Una web no aparece en buscadores ni en respuestas de IA por casualidad. Aparece cuando está construida de forma que pueda ser entendida.
                  </p>
                  <p>
                    El <strong>SEO</strong> trabaja la visibilidad en buscadores tradicionales. El <strong>GEO</strong> trabaja la capacidad de una web para ser utilizada como fuente en respuestas generadas por inteligencia artificial.
                  </p>
                  <p>
                    Estas demos reflejan ese enfoque. No se trata solo de posicionar. Se trata de construir algo que tenga sentido para humanos y para sistemas.{' '}
                    <Link href="/blog/por-que-webs-no-aparecen-respuestas-ia">
                      Leer más sobre esto
                    </Link>.
                  </p>
                </div>
              </div>

              {/* Tarjeta destacada */}
              <div className="card bg-glass">
                <h3 className="card__title text-left mb-sm">
                  El enfoque detrás: <Link href="/blog/metodo-orbita" className="text-primary hover:underline">método ORBITA</Link>
                </h3>
                <div className="card__content">
                  <p>
                    Detrás de cada demo hay una forma de trabajar que entiende la web como el centro del sistema digital de una empresa. Esto implica que la web debe:
                  </p>
                  <ul className="mt-sm">
                    <li>Tener una base técnica sólida</li>
                    <li>Ser comprensible semánticamente</li>
                    <li>Poder posicionar en buscadores e IA</li>
                    <li>Evolucionar con el tiempo</li>
                  </ul>
                  <p className="mt-md">
                    Mi trabajo real consiste en construir estos sistemas completos. Si quieres ver cómo se aplica en un proyecto real, revisa el <Link href="/proyectos/ledescaparate">caso LEDescaparate</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Expectativas y Conclusión ── */}
        <section className="section bg-glass animate-on-scroll">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div className="text-center" style={{ maxWidth: '800px', width: '100%' }}>
                <h2 className="section-header__title mb-md">Qué puedes esperar si trabajamos juntos</h2>
                <div className="article-content" style={{ margin: '0 auto' }}>
                  <p>
                    Si decides trabajar conmigo, el enfoque no será replicar una demo. Será construir algo adaptado a tu caso. Eso implica analizar el punto de partida, definir qué se necesita realmente, y estructurar la web como un sistema con una base técnica sólida.
                  </p>
                  <p className="mt-sm font-bold text-primary">
                    No trabajo sobre plantillas genéricas. Trabajo sobre problemas concretos.
                  </p>
                  <hr className="my-md opacity-20" style={{ margin: '2rem auto' }} />
                  <p>
                    Las demos no sustituyen a un proyecto real. Pero sí permiten ver algo importante: <strong>cómo se piensa antes de construir</strong>. En un entorno donde muchas webs se parecen entre sí, la diferencia real está en la estructura, en la lógica y en las decisiones. Eso es lo que intentan enseñar estas demos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Final ── */}
        <section className="section animate-on-scroll">
          <div className="container">
            <div className="cta-section">
              <h2 className="cta-section__title">
                ¿Quieres aplicar este enfoque a tu caso?
              </h2>
              <p className="cta-section__text">
                Cuéntame qué necesitas y vemos si tiene sentido trabajar juntos.
              </p>
              <div className="cta-section__buttons">
                <Link href="/contacto" className="btn btn--primary btn--large">
                  Hablemos
                </Link>
              </div>

              {/* Interlinks contextuales */}
              <nav className="demos-interlinks" aria-label="Enlaces relacionados">
                <Link href="/pricing" className="demos-interlinks__link">
                  Ver planes y precios
                </Link>
                <Link href="/#servicios" className="demos-interlinks__link">
                  Servicios que ofrezco
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
