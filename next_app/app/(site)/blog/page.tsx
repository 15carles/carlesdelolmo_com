import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogCard from '@/components/BlogCard';
import { reader } from '@/lib/keystatic';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/schemas';

type BlogListItem = {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  isoDate?: string;
  category: string;
  categoryColor: 'blue' | 'cyan' | 'purple' | 'teal';
};

function toTimestamp(isoDate: string | undefined, displayDate: string): number {
  if (isoDate) {
    const parsedIsoDate = Date.parse(isoDate);
    if (!Number.isNaN(parsedIsoDate)) return parsedIsoDate;
  }

  const parsedDisplayDate = Date.parse(displayDate);
  return Number.isNaN(parsedDisplayDate) ? 0 : parsedDisplayDate;
}

export const metadata = constructMetadata({
  title: 'Blog - Análisis sobre GEO, SEO e IA | Carles del Olmo',
  description: 'Análisis, aprendizajes y casos reales sobre webs, buscadores e inteligencia artificial. Criterio técnico para la era generativa.',
  exactUrl: `${SITE_URL}/blog`,
});


export default async function BlogIndex() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Blog' }
  ];

  const postsData = await reader.collections.posts.all();

  const posts: BlogListItem[] = postsData.map(post => ({
    title:
      typeof post.entry.title === 'string'
        ? post.entry.title
        : (() => {
            const titleRecord = post.entry.title as Record<string, unknown>;
            return typeof titleRecord.name === 'string'
              ? titleRecord.name
              : String(post.entry.title ?? '');
          })(),
    excerpt: post.entry.subtitle || post.entry.metaDescription,
    slug: post.slug,
    date: post.entry.date,
    isoDate: post.entry.isoDate ?? undefined,
    category: post.entry.categories[0] || 'Blog',
    // Mantenemos colores por categoría si es necesario, pero asignamos un default:
    categoryColor: (post.entry.categories[0] === 'GEO' ? 'blue' :
      post.entry.categories[0] === 'Análisis' ? 'cyan' : 'purple') as 'blue' | 'cyan' | 'purple' | 'teal'
  })).sort((a, b) => toTimestamp(b.isoDate, b.date) - toTimestamp(a.isoDate, a.date));

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
              {posts.map((post) => (
                <BlogCard key={post.slug} {...post} />
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
