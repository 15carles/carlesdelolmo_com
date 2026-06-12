import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import LiveVitals from '@/components/LiveVitals';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/schemas';
import { safeJsonLd } from '@/lib/seo/jsonLd';

export const metadata = constructMetadata({
  title: 'Colofón: cómo está hecha esta web | Carles del Olmo',
  description:
    'Stack, tipografía, rendimiento medido en directo, capa semántica y privacidad de carlesdelolmo.com. La misma base que aplico en los proyectos de mis clientes.',
  exactUrl: `${SITE_URL}/colofon`,
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/colofon#webpage`,
  url: `${SITE_URL}/colofon`,
  name: 'Colofón: cómo está hecha esta web',
  description:
    'Documentación técnica de carlesdelolmo.com: stack, tipografía, rendimiento, capa semántica y privacidad.',
  inLanguage: 'es-ES',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#website` },
};

interface ColofonItem {
  title: string;
  description: string;
}

const stackItems: ColofonItem[] = [
  {
    title: 'Generación estática con Next.js y React',
    description:
      'Cada página se construye de antemano y se sirve como HTML ya renderizado. No hay servidor esperando peticiones ni base de datos que consultar en cada visita.',
  },
  {
    title: 'Contenido versionado en Git, sin CMS pesado',
    description:
      'Los artículos y proyectos viven como archivos de texto en el repositorio (Keystatic). Sin base de datos que mantener, atacar o que se caiga.',
  },
  {
    title: 'Distribución en el borde de la red',
    description:
      'La web se sirve desde la red global de Cloudflare: el HTML viaja desde el punto más cercano a quien visita, no desde un único servidor.',
  },
  {
    title: 'CSS artesanal, sin framework',
    description:
      'Todo el sistema visual (tokens, componentes, composición editorial) está escrito a medida. Sin Bootstrap, sin Tailwind, sin kilos de utilidades sin usar.',
  },
];

const typeItems: ColofonItem[] = [
  {
    title: 'Fraunces, para los titulares',
    description:
      'Una serif de display con carácter de imprenta. Fuente variable: una sola descarga de 66 KB cubre todos los pesos y estilos.',
  },
  {
    title: 'Instrument Sans, para el cuerpo',
    description:
      'Una sans humanista clara y cercana. También variable: 30 KB para toda la familia.',
  },
  {
    title: 'Auto-alojadas, sin Google Fonts',
    description:
      'Las fuentes se sirven desde este mismo dominio. Ninguna petición a servidores de terceros por tipografía: más velocidad y más privacidad.',
  },
  {
    title: 'Microtipografía',
    description:
      'Titulares balanceados para evitar líneas viudas, párrafos compuestos con text-wrap pretty y selección de texto en verde de marca. Detalles que se notan sin verse.',
  },
];

const semanticItems: ColofonItem[] = [
  {
    title: 'Datos estructurados en cada página',
    description:
      'JSON-LD con las entidades del negocio: persona, empresa local, servicios, artículos y preguntas frecuentes. Los buscadores y los modelos de lenguaje no tienen que adivinar nada.',
  },
  {
    title: 'Arquitectura de entidades coherente',
    description:
      'Cada página declara qué es, de qué trata y cómo se relaciona con el resto. La web funciona como un sistema, no como páginas sueltas.',
  },
  {
    title: 'Preparada para motores generativos',
    description:
      'Jerarquía clara de encabezados, contenido fragmentable y respuestas directas: la base GEO que aplico a mis clientes, aplicada aquí primero.',
  },
];

const privacyItems: ColofonItem[] = [
  {
    title: 'Analítica solo con tu consentimiento',
    description:
      'Google Analytics arranca con el almacenamiento denegado por defecto (Consent Mode v2). Hasta que no aceptas las cookies, no hay medición.',
  },
  {
    title: 'Movimiento que respeta tus preferencias',
    description:
      'Todas las animaciones, incluido el lienzo generativo de la portada, se desactivan si tu sistema indica prefers-reduced-motion.',
  },
  {
    title: 'Funciona sin conexión',
    description:
      'La web es una PWA con página offline propia. Y si algo se rompe, hasta el error 404 tiene un pequeño juego.',
  },
];

function ColofonList({ items }: { items: ColofonItem[] }) {
  return (
    <ol className="editorial-list split-section__body animate-on-scroll">
      {items.map((item, index) => (
        <li key={item.title} className="editorial-item">
          <span className="editorial-item__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3 className="editorial-item__title">{item.title}</h3>
            <p className="editorial-item__description">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ColofonPage() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Colofón' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <main className="page__content">
        <header className="page-header animate-on-scroll">
          <div className="container">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="page-header__title mt-xl">Cómo está hecha esta web</h1>
            <p className="page-header__subtitle">
              Las revistas impresas cierran con un colofón: papel, tipos y taller.
              Esta es la versión digital, y la mejor prueba de cómo trabajo.
            </p>
          </div>
        </header>

        <section className="section" aria-labelledby="vitals-title">
          <div className="container">
            <header className="section-header section-header--left animate-on-scroll mb-2xl">
              <p className="section-header__eyebrow">En directo</p>
              <h2 id="vitals-title" className="section-header__title">Medida ahora mismo, en tu dispositivo</h2>
              <p className="section-header__subtitle">
                No te pido que confíes en una captura de PageSpeed: tu navegador está midiendo
                esta página mientras la lees.
              </p>
            </header>
            <div className="animate-on-scroll">
              <LiveVitals />
            </div>
          </div>
        </section>

        <section className="section section--band" aria-labelledby="stack-title">
          <div className="container">
            <div className="split-section">
              <div className="split-section__aside animate-on-scroll">
                <header className="section-header section-header--left">
                  <p className="section-header__eyebrow">El taller</p>
                  <h2 id="stack-title" className="section-header__title">Construida sin atajos</h2>
                  <p className="section-header__subtitle">
                    Las decisiones técnicas de esta web son las mismas que defiendo en los
                    proyectos de mis clientes: menos piezas, mejor elegidas.
                  </p>
                </header>
              </div>
              <ColofonList items={stackItems} />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="tipografia-title">
          <div className="container">
            <div className="split-section split-section--reverse">
              <div className="split-section__aside animate-on-scroll">
                <header className="section-header section-header--left">
                  <p className="section-header__eyebrow">Los tipos</p>
                  <h2 id="tipografia-title" className="section-header__title">Tipografía con intención</h2>
                  <p className="section-header__subtitle">
                    Dos familias variables, 96 KB en total, servidas desde este dominio.
                    El carácter editorial de la web empieza aquí.
                  </p>
                </header>
              </div>
              <ColofonList items={typeItems} />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="semantica-title">
          <div className="container">
            <div className="split-section">
              <div className="split-section__aside animate-on-scroll">
                <header className="section-header section-header--left">
                  <p className="section-header__eyebrow">La capa invisible</p>
                  <h2 id="semantica-title" className="section-header__title">Semántica y GEO</h2>
                  <p className="section-header__subtitle">
                    Lo que no se ve es lo que hace que buscadores y sistemas de IA
                    entiendan y citen esta web.
                  </p>
                </header>
              </div>
              <ColofonList items={semanticItems} />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="privacidad-title">
          <div className="container">
            <div className="split-section split-section--reverse">
              <div className="split-section__aside animate-on-scroll">
                <header className="section-header section-header--left">
                  <p className="section-header__eyebrow">Respeto</p>
                  <h2 id="privacidad-title" className="section-header__title">Privacidad y cuidado</h2>
                  <p className="section-header__subtitle">
                    Una web de calidad también se mide en cómo trata a quien la visita.
                  </p>
                </header>
              </div>
              <ColofonList items={privacyItems} />
            </div>
          </div>
        </section>

        <section className="section" aria-label="Cierre del colofón">
          <div className="container">
            <aside className="editorial-note animate-on-scroll" style={{ maxWidth: '48rem' }}>
              <p>
                Esta web está construida con el mismo método que aplico a cada proyecto.
                Si quieres este nivel de cuidado en tu negocio, {' '}
                <Link href="/contacto" className="underline">cuéntame tu caso</Link> o pide una {' '}
                <Link href="/auditoria-gratuita" className="underline">auditoría gratuita</Link>.
              </p>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
