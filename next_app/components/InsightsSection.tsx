import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface InsightItem {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

const insights: InsightItem[] = [
  {
    title: 'Por qué muchas webs no aparecen en respuestas de IA',
    description:
      'Un análisis sobre estructura, claridad y señales que influyen en cómo una web puede ser entendida y reutilizada por sistemas generativos.',
    href: '/blog/por-que-webs-no-aparecen-respuestas-ia',
    imageSrc: '/assets/blog/por-que-webs-no-aparecen-respuestas-ia/generative-engine-optimization-geo-modelo-delta.webp',
    imageAlt: 'Ilustración sobre por qué muchas webs no aparecen en respuestas de inteligencia artificial',
  },
  {
    title: 'La estructura ideal de una página web para empresas',
    description:
      'Qué páginas y jerarquía necesita una web corporativa para posicionar, convertir y crecer sin rehacerse cada dos años.',
    href: '/blog/estructura-ideal-pagina-web-empresas',
    imageSrc: '/assets/blog/estructura-ideal-pagina-web-empresas/estructura-ideal-pagina-web-empresas.webp',
    imageAlt: 'Diagrama de la estructura ideal de una página web para empresas',
  },
  {
    title: 'Una web bien diseñada puede multiplicar tus clientes en Valencia',
    description:
      'Cómo el diseño y la estructura de una web local influyen directamente en la captación de clientes de una empresa de servicios.',
    href: '/blog/web-bien-disenada-multiplicar-clientes-valencia',
    imageSrc: '/assets/blog/web-bien-disenada-multiplicar-clientes-valencia/og-blog-web-bien-disenada-multiplicar-clientes-valencia.png',
    imageAlt: 'Visual sobre cómo una web bien diseñada multiplica los clientes de una empresa en Valencia',
  },
  {
    title: 'Cómo mejorar la web de tu empresa sin rehacerla desde cero',
    description:
      'Qué se puede optimizar en una web existente —rendimiento, estructura y conversión— antes de plantear una reconstrucción completa.',
    href: '/blog/como-mejorar-web-empresa-sin-rehacerla',
    imageSrc: '/assets/images/blog/comparativa-web-mala-vs-web-optimizada.webp',
    imageAlt: 'Comparativa visual entre una web sin optimizar y una web optimizada',
  },
];

export default function InsightsSection() {
  return (
    <section id="insights" className="section" aria-labelledby="insights-title">
      <div className="container">
        <div className="split-section">
          <div className="split-section__aside animate-on-scroll">
            <header className="section-header section-header--left insights-heading">
              <p className="section-header__eyebrow">Del blog</p>
              <h2 id="insights-title" className="section-header__title">
                Insights para entender mejor qué hace que una web funcione
              </h2>
              <p className="section-header__subtitle">
                Comparto análisis, aprendizajes y enfoques prácticos sobre desarrollo web,
                SEO, estructura y preparación para buscadores e inteligencia artificial.
              </p>
            </header>

            <div className="section-actions section-actions--left mt-xl insights-actions" role="group" aria-label="Acciones de insights">
              <Link href="/blog" className="btn btn--primary">Ver todos los insights</Link>
              <Link href="/laboratorio-visibilidad-ia" className="action-link">Comprueba tu visibilidad en IA</Link>
              <Link href="/contacto" className="action-link">Hablemos de tu proyecto</Link>
            </div>
          </div>

          <ul className="insight-list split-section__body animate-on-scroll">
            {insights.map((insight) => (
              <li key={insight.href} className="insight-row">
                <Link href={insight.href} className="insight-row__link">
                  <div>
                    <h3 className="insight-row__title">{insight.title}</h3>
                    <p className="insight-row__description">{insight.description}</p>
                  </div>
                  <figure className="insight-row__figure">
                    <Image
                      src={insight.imageSrc}
                      alt={insight.imageAlt}
                      width={1200}
                      height={675}
                      loading="lazy"
                      className="insight-row__image"
                    />
                  </figure>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
