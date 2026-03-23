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
    title: 'Método ORBITA: mi enfoque para construir webs con más sentido',
    description:
      'Una explicación clara de cómo planteo estructura, relevancia, autoridad, preparación para IA y evolución continua.',
    href: '/blog/metodo-orbita',
    imageSrc: '/assets/blog/metodo-orbita/diagrama-metodo-ORBITA.webp',
    imageAlt: 'Resumen visual del método ORBITA aplicado al desarrollo web, SEO y GEO',
  },
  {
    title: 'El fin del SEO tal y como lo conocemos: la era del GEO',
    description:
      'Qué cambia en la visibilidad digital y por qué combinar estructura técnica, intención de búsqueda y contexto semántico marca la diferencia.',
    href: '/blog/el-fin-del-seo-la-era-del-geo',
    imageSrc: '/assets/images/blog/seo-ux-conversion-web-empresa.webp',
    imageAlt: 'Visual sobre evolución de SEO hacia GEO y criterios modernos de visibilidad digital',
  },
];

export default function InsightsSection() {
  return (
    <section id="insights" className="section" aria-labelledby="insights-title">
      <div className="container">
        <header className="section-header animate-on-scroll insights-heading">
          <h2 id="insights-title" className="section-header__title">
            Insights para entender mejor qué hace que una web funcione
          </h2>
          <p className="section-header__subtitle">
            Comparto análisis, aprendizajes y enfoques prácticos sobre desarrollo web,
            SEO, estructura y preparación para buscadores e inteligencia artificial.
          </p>
        </header>

        <div className="insights-grid">
          {insights.map((insight) => (
            <article key={insight.href} className="insight-card animate-on-scroll">
              <Link href={insight.href} className="insight-card__link">
                <figure className="insight-card__figure">
                  <Image
                    src={insight.imageSrc}
                    alt={insight.imageAlt}
                    width={1200}
                    height={675}
                    loading="lazy"
                    className="insight-card__image"
                  />
                </figure>
                <div className="insight-card__content">
                  <h3 className="insight-card__title">{insight.title}</h3>
                  <p className="insight-card__description">{insight.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="section-actions insights-actions" role="group" aria-label="Acciones de insights">
          <Link href="/blog" className="btn btn--primary">Ver todos los insights</Link>
          <Link href="/contacto" className="btn btn--secondary">Hablemos de tu proyecto</Link>
        </div>
      </div>
    </section>
  );
}
