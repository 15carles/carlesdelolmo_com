import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { reader } from '@/lib/keystatic';
import { isPostVisible } from '@/lib/contentVisibility';
import { clusterByValue, type ClusterValue } from '@/lib/content/clusters';

function postTitle(title: unknown): string {
  if (typeof title === 'string') return title;
  if (title && typeof title === 'object') {
    const name = (title as Record<string, unknown>).name;
    if (typeof name === 'string') return name;
  }
  return String(title ?? '');
}

interface RelatedGuidesProps {
  cluster: ClusterValue;
  title?: string;
  subtitle?: string;
  limit?: number;
}

/**
 * Sección "Guías relacionadas": enlaza una página pillar/servicio con los posts
 * de su cluster (enlazado pillar -> cluster). Server component: lee el contenido
 * con el reader de Keystatic y filtra por el campo `cluster` del frontmatter.
 */
export default async function RelatedGuides({ cluster, title, subtitle, limit = 4 }: RelatedGuidesProps) {
  const cdef = clusterByValue(cluster);
  if (!cdef) return null;

  const postsData = await reader.collections.posts.all();
  const posts = postsData
    .filter((p) => isPostVisible({ status: p.entry.status, isoDate: p.entry.isoDate }))
    .filter((p) => (p.entry.cluster as string) === cluster)
    .map((p) => ({
      slug: p.slug,
      title: postTitle(p.entry.title),
      subtitle: p.entry.subtitle || '',
      isoDate: p.entry.isoDate ?? '',
    }))
    .sort((a, b) => Date.parse(b.isoDate || '0') - Date.parse(a.isoDate || '0'))
    .slice(0, limit);

  if (posts.length === 0) return null;

  return (
    <section className="section" aria-labelledby="related-guides-title">
      <div className="container">
        <header className="section-header text-center animate-on-scroll">
          <h2 id="related-guides-title" className="section-header__title">
            {title || 'Guías relacionadas'}
          </h2>
          <p className="section-header__subtitle max-w-3xl mx-auto">
            {subtitle || `Aprende más sobre ${cdef.label.toLowerCase()} en el blog.`}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-lg mt-2xl">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="service-card animate-on-scroll">
              <h3 className="service-card__title">{p.title}</h3>
              {p.subtitle && <p className="service-card__description">{p.subtitle}</p>}
              <span className="action-link">
                Leer guía <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-xl">
          <Link href={`/blog/categoria/${cdef.slug}`} className="action-link">
            Ver todas las guías de {cdef.label} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
