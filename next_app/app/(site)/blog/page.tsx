import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogCard from '@/components/BlogCard';
import { reader } from '@/lib/keystatic';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/schemas';
import { isPostVisible } from '@/lib/contentVisibility';
import { CLUSTERS, clusterByValue } from '@/lib/content/clusters';

type BlogListItem = {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  isoDate?: string;
  category: string;
  categoryColor: 'blue' | 'cyan' | 'purple' | 'teal';
  categoryHref: string;
};

function colorForCluster(cluster: string | undefined): 'blue' | 'cyan' | 'purple' | 'teal' {
  switch (cluster) {
    case 'geo-ia': return 'blue';
    case 'diseno-web-local': return 'teal';
    case 'mantenimiento-mejora': return 'cyan';
    default: return 'purple';
  }
}

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

export const revalidate = 3600;


export default async function BlogIndex() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Blog' }
  ];

  const postsData = await reader.collections.posts.all();

  const posts: BlogListItem[] = postsData
    .filter((post) => isPostVisible({ status: post.entry.status, isoDate: post.entry.isoDate }))
    .map(post => ({
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
      category: clusterByValue(post.entry.cluster)?.label || 'Blog',
      categoryHref: (() => {
        const c = clusterByValue(post.entry.cluster);
        return c ? `/blog/categoria/${c.slug}` : '/blog';
      })(),
      categoryColor: colorForCluster(post.entry.cluster),
    }))
    .sort((a, b) => toTimestamp(b.isoDate, b.date) - toTimestamp(a.isoDate, a.date));

  return (
    <main className="page__content">
      <header className="page-header">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-header__title mt-xl">Blog</h1>
          <p className="page-header__subtitle">
            Análisis, aprendizajes y casos reales sobre webs, buscadores e inteligencia artificial.
          </p>
          <div className="page-header__meta mt-lg">
            {CLUSTERS.map((c) => (
              <Link key={c.value} href={`/blog/categoria/${c.slug}`} className="badge badge--tag badge--teal">
                {c.label}
              </Link>
            ))}
          </div>
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

          </div>
        </div>
      </section>
    </main>
  );
}
