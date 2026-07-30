import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogCard from '@/components/BlogCard';
import { reader } from '@/lib/keystatic';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL, generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { safeJsonLd } from '@/lib/seo/jsonLd';
import { isPostVisible } from '@/lib/contentVisibility';
import { CLUSTERS, clusterBySlug, type ClusterValue } from '@/lib/content/clusters';

export const revalidate = 3600;

function colorForCluster(cluster: ClusterValue): 'blue' | 'cyan' | 'purple' | 'teal' {
  switch (cluster) {
    case 'geo-ia': return 'blue';
    case 'diseno-web-local': return 'teal';
    case 'mantenimiento-mejora': return 'cyan';
    default: return 'purple';
  }
}

function postTitle(title: unknown): string {
  if (typeof title === 'string') return title;
  if (title && typeof title === 'object') {
    const name = (title as Record<string, unknown>).name;
    if (typeof name === 'string') return name;
  }
  return String(title ?? '');
}

export async function generateStaticParams() {
  return CLUSTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cluster = clusterBySlug(slug);
  if (!cluster) return {};
  return constructMetadata({
    title: `${cluster.label} | Blog | Carles del Olmo`,
    description: cluster.description,
    exactUrl: `${SITE_URL}/blog/categoria/${cluster.slug}`,
  });
}

export default async function CategoryHub({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cluster = clusterBySlug(slug);
  if (!cluster) notFound();

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: cluster.label },
  ];

  const postsData = await reader.collections.posts.all();
  const posts = postsData
    .filter((p) => isPostVisible({ status: p.entry.status, isoDate: p.entry.isoDate }))
    .filter((p) => (p.entry.cluster as string) === cluster.value)
    .map((p) => ({
      title: postTitle(p.entry.title),
      excerpt: p.entry.subtitle || p.entry.metaDescription,
      slug: p.slug,
      date: p.entry.date,
      isoDate: p.entry.isoDate ?? undefined,
    }))
    .sort((a, b) => Date.parse(b.isoDate || '0') - Date.parse(a.isoDate || '0'));

  const url = `${SITE_URL}/blog/categoria/${cluster.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: `${cluster.label} | Blog`,
        description: cluster.description,
        inLanguage: 'es-ES',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${url}#breadcrumbs` },
        mainEntity: { '@id': `${url}#list` },
      },
      generateBreadcrumbSchema(breadcrumbs, `${url}#breadcrumbs`),
      {
        '@type': 'ItemList',
        '@id': `${url}#list`,
        numberOfItems: posts.length,
        itemListElement: posts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/blog/${p.slug}`,
          name: p.title,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <main className="page__content">
        <header className="page-header">
          <div className="container">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="page-header__title mt-xl">{cluster.label}</h1>
            <p className="page-header__subtitle">{cluster.description}</p>
            <div className="page-header__meta mt-lg">
              <Link href={cluster.pillar} className="badge badge--tag badge--teal">
                Ver servicio relacionado
              </Link>
              {CLUSTERS.filter((c) => c.value !== cluster.value).map((c) => (
                <Link key={c.value} href={`/blog/categoria/${c.slug}`} className="badge badge--tag badge--purple">
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
                {posts.map((p) => (
                  <BlogCard
                    key={p.slug}
                    {...p}
                    category={cluster.label}
                    categoryColor={colorForCluster(cluster.value)}
                    categoryHref={`/blog/categoria/${cluster.slug}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
