import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

export const metadata = {
  title: 'Blog - Análisis sobre GEO, SEO e IA | Carles del Olmo',
  description: 'Análisis, aprendizajes y casos reales sobre webs, buscadores e inteligencia artificial. Criterio técnico para la era generativa.',
};

const posts = [
  {
    title: 'Cómo la semántica avanzada está cambiando el tráfico desde Perplexity y motores de IA',
    excerpt: 'Motores como Perplexity, ChatGPT con navegación, Gemini o Copilot no funcionan como un buscador clásico. No clasifican páginas únicamente por coincidencia de términos. Interpretan contexto, relaciones y entidades.',
    slug: 'semantica-avanzada-motores-ia',
    date: '8 Mar, 2026',
    category: 'GEO',
    categoryColor: 'blue' as const
  },
  {
    title: 'El fin del SEO tal como lo conocemos: La era del GEO',
    excerpt: 'Reflexiones sobre la transición tecnológica que estamos viviendo y cómo adaptar las estrategias de contenido.',
    slug: 'el-fin-del-seo-la-era-del-geo',
    date: '24 Feb, 2026',
    category: 'Análisis',
    categoryColor: 'cyan' as const
  },
  {
    title: 'Por qué muchas webs no aparecen en respuestas de IA',
    excerpt: 'Un análisis detallado sobre los errores estructurales que impiden que los modelos de lenguaje citen tu contenido como fuente.',
    slug: 'por-que-muchas-webs-no-aparecen-en-respuestas-de-ia',
    date: '8 Ene, 2026',
    category: 'GEO',
    categoryColor: 'purple' as const
  }
];

export default function BlogIndex() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Blog' }
  ];

  return (
    <main className="page__content">
      <header className="page-header animate-on-scroll">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-header__title mt-xl">Blog</h1>
          <p className="page-header__subtitle">
            Análisis, aprendizajes y casos reales sobre webs, buscadores e inteligencia artificial.
          </p>
        </div>
      </header>

      <section className="section animate-on-scroll">
        <div className="container">
          <div className="article-content">
            <div className="post-list">
              {posts.map((post, index) => (
                <BlogCard key={index} {...post} />
              ))}
            </div>

            {/* Pagination Placeholder */}
            <nav className="pagination mt-2xl" aria-label="Paginación de artículos">
              <span className="pagination__link pagination__link--disabled" aria-disabled="true">Anterior</span>
              <span className="pagination__link pagination__link--active" aria-current="page"><strong>1</strong></span>
              <span className="pagination__link">Siguiente</span>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
