/* eslint-disable @typescript-eslint/no-explicit-any -- Keystatic payloads are dynamic and currently not strictly typed. */
/* eslint-disable @next/next/no-img-element -- Rich text/component blocks render runtime image sources. */
import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { generateBlogSchema, SITE_URL } from '@/lib/seo/schemas';
import { safeJsonLd } from '@/lib/seo/jsonLd';
import { constructMetadata } from '@/lib/seo/metadata';
import { resolvePostOpenGraphImage } from '@/lib/seo/openGraph';
import { reader } from '@/lib/keystatic';
import { isPostVisible } from '@/lib/contentVisibility';
import { DocumentRenderer } from '@keystatic/core/renderer';
import FaqAccordion from '@/components/FaqAccordion';

export const revalidate = 3600;

// Slug estable para anclas de encabezados (TOC de la barra lateral)
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extrae el texto plano de los hijos de un nodo del documento
function extractNodeText(node: any): string {
  if (typeof node?.text === 'string') return node.text;
  if (Array.isArray(node?.children)) return node.children.map(extractNodeText).join('');
  return '';
}

export async function generateStaticParams() {
  const posts = await reader.collections.posts.all();

  return posts
    .filter((post) => isPostVisible({ status: post.entry.status, isoDate: post.entry.isoDate }))
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);
  if (!post || !isPostVisible({ status: post.status, isoDate: post.isoDate })) return {};
  const openGraphImage = await resolvePostOpenGraphImage(slug);
  return constructMetadata({
    title: post.metaTitle || '',
    description: post.metaDescription || '',
    exactUrl: `${SITE_URL}/blog/${slug}`,
    openGraphImage,
    type: 'article',
    publishedTime: post.isoDate || undefined,
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post || !isPostVisible({ status: post.status, isoDate: post.isoDate })) {
    notFound();
  }

  const author = post.author ? await reader.collections.authors.read(post.author as string) : null;

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: (post.title as any)?.name || post.title || 'Post' }
  ];
  const openGraphImage = await resolvePostOpenGraphImage(slug);

  const jsonLd = generateBlogSchema({
    slug: slug,
    title: (post.title as any)?.name || post.title || '',
    description: post.metaDescription || '',
    isoDate: post.isoDate || '',
    image: openGraphImage,
    keywords: [...(post.keywords || [])],
    categories: [...(post.categories || [])],
    faqs: [...(post.faqs || [])],
    author: author ? {
      name: (author.name as any)?.name || author.name || '',
      email: (author as any).email,
      schemaId: (author as any).schemaId,
      specialties: (author as any).specialties,
      socialLinks: (author as any).socialLinks,
    } : null
  });

  const content = await post.content();

  // Tabla de contenidos: h2 del documento (solo si hay al menos 2).
  // h2Ids guarda el id de cada h2 en orden de documento para que el
  // renderer de headings los asigne secuencialmente.
  const h2Ids: (string | undefined)[] = (Array.isArray(content) ? content : [])
    .filter((node: any) => node?.type === 'heading' && node?.level === 2)
    .map((node: any) => {
      const text = extractNodeText(node).trim();
      return text ? slugifyHeading(text) : undefined;
    });
  const tocItems = (Array.isArray(content) ? content : [])
    .filter((node: any) => node?.type === 'heading' && node?.level === 2)
    .map((node: any) => {
      const text = extractNodeText(node).trim();
      return { text, id: slugifyHeading(text) };
    })
    .filter((item) => item.text.length > 0);
  const showToc = tocItems.length >= 2;
  let h2RenderIndex = 0;

  // Posts relacionados para la barra lateral: misma categoría primero, luego recientes
  const allPosts = await reader.collections.posts.all();
  const currentCategories = new Set(post.categories || []);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && isPostVisible({ status: p.entry.status, isoDate: p.entry.isoDate }))
    .map((p) => ({
      slug: p.slug,
      title:
        typeof p.entry.title === 'string'
          ? p.entry.title
          : String((p.entry.title as any)?.name ?? p.entry.title ?? ''),
      date: p.entry.date,
      isoDate: p.entry.isoDate ?? '',
      shared: (p.entry.categories || []).some((c) => currentCategories.has(c)) ? 1 : 0,
    }))
    .sort((a, b) => b.shared - a.shared || Date.parse(b.isoDate || '0') - Date.parse(a.isoDate || '0'))
    .slice(0, 4);

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

            <h1 className="page-header__title mt-xl">{(post.title as any)?.name || post.title || ''}</h1>
            <p className="page-header__subtitle">{post.subtitle || ''}</p>

            <div className="page-header__meta">
              <time dateTime={post.isoDate || undefined}>{post.date}</time>
              {(post.categories || []).map((cat, i) => (
                <span key={i} className={`badge badge--${i === 0 ? 'teal' : i === 1 ? 'blue' : 'purple'}`}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </header>

        <article className="section animate-on-scroll">
          <div className="container">
            <div className="article-layout">
            <div className="article-main">
            <div className="article-content article-content--post">
              <DocumentRenderer
                document={content}
                renderers={{
                  block: {
                    heading: ({ level, children, textAlign }) => {
                      const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
                      const id = level === 2 ? h2Ids[h2RenderIndex++] : undefined;
                      return (
                        <Tag id={id} style={textAlign ? { textAlign } : undefined}>
                          {children}
                        </Tag>
                      );
                    },
                    table: (props) => (
                      <div className="article-box--overflow mb-lg">
                        <table className="article-table">
                          {props.head && (
                            <thead>
                              <tr>
                                {props.head.map((cell, i) => (
                                  <th key={i} colSpan={cell.colSpan} rowSpan={cell.rowSpan}>
                                    {cell.children}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                          )}
                          <tbody>
                            {props.body.map((row, i) => (
                              <tr key={i}>
                                {row.map((cell, j) => (
                                  <td key={j} colSpan={cell.colSpan} rowSpan={cell.rowSpan}>
                                    {cell.children}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ),
                  }
                }}
                componentBlocks={{
                  articleBox: (props) => (
                    <div className={`article-box ${props.overflow ? 'article-box--overflow' : ''}`}>
                      {props.content}
                    </div>
                  ),
                  button: (props) => (
                    <div className={`mt-lg mb-lg ${props.centered ? 'text-center' : ''}`}>
                      <Link
                        href={props.link || '#'}
                        className={`btn btn--${props.variant} ${props.size === 'large' ? 'btn--large' : ''}`}
                      >
                        {props.label}
                      </Link>
                    </div>
                  ),
                  styledImage: (props) => (
                    <div className={`mt-xl mb-xl ${props.centered ? 'text-center' : ''}`}>
                      {props.image && (
                        <img
                          src={props.image}
                          alt={props.alt || ''}
                          className={props.effect === 'glass' ? 'img--glass' : 'img--responsive'}
                          style={{
                            width: props.width,
                            height: 'auto',
                            marginLeft: props.centered ? 'auto' : '0',
                            marginRight: props.centered ? 'auto' : '0'
                          }}
                        />
                      )}
                    </div>
                  ),
                  ctaSection: (props) => (
                    <div className="cta-section mt-2xl">
                      <h2 className="cta-section__title" style={{ fontSize: '1.5rem' }}>{props.title}</h2>
                      <p className="cta-section__text">{props.text}</p>
                      <div className="cta-section__buttons" style={{ marginTop: '2rem' }}>
                        <Link
                          href={props.buttonLink || '/contacto'}
                          className={`btn btn--${props.buttonVariant || 'primary'}`}
                        >
                          {props.buttonText}
                        </Link>
                      </div>
                    </div>
                  ),
                  notice: (props) => {
                    const labels: Record<string, string> = {
                      info: 'Información',
                      warning: 'Aviso',
                      tip: 'Consejo',
                    };
                    const type = labels[props.type as string] ? (props.type as string) : 'info';
                    return (
                      <div className={`notice notice--${type}`} role="note">
                        <p className="notice__label">{labels[type]}</p>
                        {props.content}
                      </div>
                    );
                  },
                  imageGallery: (props) => (
                    <div className={`grid grid-cols-${props.columns} gap-md mt-xl mb-xl`}>
                      {(props.images || []).map((item: any, i: number) => (
                        <div key={i} className="animate-on-scroll">
                          <img
                            src={item.image}
                            alt={item.alt || ''}
                            className="img--glass"
                            style={{ width: '100%', height: 'auto', aspectRatio: '4/3', objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                  ),
                  section: (props) => {
                    const variantClass = props.variant === 'secondary' ? 'bg-secondary'
                      : props.variant === 'dark' ? 'bg-dark'
                      : props.variant === 'accent' ? 'bg-gradient'
                      : '';
                    const padClass = props.padding === 'large' ? 'post-section--lg'
                      : props.padding === 'none' ? 'post-section--none' : '';
                    const alignClass = props.textAlign === 'center' ? 'text-center' : '';
                    return (
                      <section className={`post-section ${variantClass} ${padClass} ${alignClass}`.replace(/\s+/g, ' ').trim()}>
                        {(props.eyebrow || props.title || props.subtitle) && (
                          <header className="post-section__header">
                            {props.eyebrow && <div className="section-header__eyebrow">{props.eyebrow}</div>}
                            {props.title && <h2 className="section-header__title">{props.title}</h2>}
                            {props.subtitle && <p className="section-header__subtitle">{props.subtitle}</p>}
                          </header>
                        )}
                        {props.content}
                      </section>
                    );
                  }
                }}
              />
            </div>

            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-3xl">
                <FaqAccordion
                  title="Preguntas Frecuentes"
                  items={post.faqs}
                />
              </div>
            )}
            </div>

            <aside className="article-aside" aria-label="Contenido relacionado">
              <div className="article-aside__inner">
                {showToc && (
                  <nav aria-labelledby="toc-title" className="article-aside__toc">
                    <p id="toc-title" className="article-aside__title">En este artículo</p>
                    <ol className="article-aside__toc-list">
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <a href={`#${item.id}`} className="article-aside__toc-link">
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}

                {relatedPosts.length > 0 && (
                  <nav aria-labelledby="related-posts-title">
                    <p id="related-posts-title" className="article-aside__title">Más artículos</p>
                    <ul className="article-aside__list">
                      {relatedPosts.map((related) => (
                        <li key={related.slug} className="article-aside__item">
                          <Link href={`/blog/${related.slug}`} className="article-aside__link">
                            {related.title}
                            <span className="article-aside__date">{related.date}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                <div className="article-aside__cta">
                  <p className="article-aside__cta-title">¿Tu web necesita un repaso?</p>
                  <p className="article-aside__cta-text">
                    Pide una auditoría gratuita y descubre qué está frenando tu visibilidad.
                  </p>
                  <Link href="/auditoria-gratuita" className="btn btn--primary">
                    Auditoría gratuita
                  </Link>
                </div>
              </div>
            </aside>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
