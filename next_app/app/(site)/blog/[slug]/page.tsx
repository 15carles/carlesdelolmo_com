/* eslint-disable @typescript-eslint/no-explicit-any -- Keystatic payloads are dynamic and currently not strictly typed. */
/* eslint-disable @next/next/no-img-element -- Rich text/component blocks render runtime image sources. */
import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { generateBlogSchema, SITE_URL } from '@/lib/seo/schemas';
import { constructMetadata } from '@/lib/seo/metadata';
import { resolvePostOpenGraphImage } from '@/lib/seo/openGraph';
import { reader } from '@/lib/keystatic';
import { isPostVisible } from '@/lib/contentVisibility';
import { DocumentRenderer } from '@keystatic/core/renderer';
import FaqAccordion from '@/components/FaqAccordion';

export const revalidate = 3600;

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            <div className="article-content">
              <DocumentRenderer
                document={content}
                renderers={{
                  block: {
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
                    const colors = {
                      info: 'var(--color-accent-blue)',
                      warning: 'var(--color-accent-purple)',
                      tip: 'var(--color-accent-green)'
                    };
                    const icons = {
                      info: 'ℹ️',
                      warning: '⚠️',
                      tip: '💡'
                    };
                    return (
                      <div
                        className="article-box mt-lg mb-lg"
                        style={{ borderLeft: `4px solid ${colors[props.type as keyof typeof colors] || colors.info}` }}
                      >
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', color: colors[props.type as keyof typeof colors] }}>
                          <span>{icons[props.type as keyof typeof icons] || icons.info}</span>
                          <span style={{ textTransform: 'uppercase' }}>{props.type}</span>
                        </div>
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
                  )
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
        </article>
      </main>
    </>
  );
}
