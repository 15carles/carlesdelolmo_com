import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Terminal from '@/components/Terminal';
import PagespeedMetrics from '@/components/PagespeedMetrics';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { generateProjectSchema, SITE_URL } from '@/lib/seo/schemas';
import { constructMetadata } from '@/lib/seo/metadata';
import { reader } from '@/lib/keystatic';
import { DocumentRenderer } from '@keystatic/core/renderer';

import ScrollReveal from '@/components/ScrollReveal';

export async function generateStaticParams() {
  const slugs = await reader.collections.projects.list();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await reader.collections.projects.read(slug);
  if (!project) return {};
  
  return constructMetadata({
    title: project.metaTitle || '',
    description: project.metaDescription || '',
    exactUrl: `${SITE_URL}/proyectos/${slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await reader.collections.projects.read(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = generateProjectSchema({
    slug: slug,
    title: typeof project.title === 'string' ? project.title : (project.title as any).name,
    description: project.metaDescription || '',
    isoDate: project.isoDate || '',
    sector: project.sector || '',
    foco: project.foco || '',
    client: project.client ? {
      name: project.client.name || '',
      url: project.client.url || undefined,
      logo: project.client.logo || undefined,
    } : undefined,
    testimonial: project.testimonial ? {
      text: project.testimonial.text || '',
      author: project.testimonial.author || '',
      role: project.testimonial.role || '',
    } : undefined,
  });

  const content = await project.content();

  return (
    <>
      <ScrollReveal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="page__content">
        {/* El Hero ahora se puede añadir como un bloque 'projectHero' en la parte superior 
            para mayor flexibilidad, o se renderiza por defecto si no hay contenido complejo */}
        {!content || content.length === 0 ? (
          <header className="page-header animate-on-scroll">
            <div className="container">
              {/* Breadcrumbs */}
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link href="/" className="breadcrumbs__link">Inicio</Link>
                    <span className="breadcrumbs__separator">/</span>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link href="/#proyectos" className="breadcrumbs__link">Proyectos</Link>
                    <span className="breadcrumbs__separator">/</span>
                  </li>
                  <li className="breadcrumbs__item breadcrumbs__current" aria-current="page">
                    Caso {typeof project.title === 'string' ? project.title : (project.title as any).name}
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-sm mb-md">
                {(project.badges || []).map((badge, i) => (
                  <span key={i} className={`badge badge--${i === 0 ? 'teal' : i === 1 ? 'blue' : 'purple'}`}>
                    {badge}
                  </span>
                ))}
              </div>

              <h1 className="page-header__title">
                {typeof project.title === 'string' ? project.title : (project.title as any).name}:
                <br />{project.subtitle}
              </h1>

              {project.summary && (
                <p className="page-header__subtitle">
                  {project.summary}
                </p>
              )}

              {/* Project Meta */}
              <div className="page-header__meta">
                <span><strong>Sector:</strong> {project.sector}</span>
                <span className="hidden-mobile">|</span>
                <span><strong>Foco:</strong> {project.foco}</span>
              </div>
            </div>
          </header>
        ) : null}

        <DocumentRenderer 
          document={content}
          renderers={{
            block: {
              heading: (props) => {
                const Tag = `h${props.level}` as any;
                return (
                  <div className="article-content mx-auto">
                    <Tag className="mb-md mt-xl">
                      {props.children}
                    </Tag>
                  </div>
                );
              },
              paragraph: (props) => (
                <div className="article-content mx-auto">
                  <p>{props.children}</p>
                </div>
              ),
              list: (props) => (
                <div className="article-content mx-auto">
                  {props.type === 'ordered' ? (
                    <ol>{props.children}</ol>
                  ) : (
                    <ul>{props.children}</ul>
                  )}
                </div>
              ),
              divider: () => (
                <div className="article-content mx-auto">
                  <hr className="my-xl border-t opacity-20" />
                </div>
              ),
              image: (props) => (
                <div className={`article-content my-lg mx-auto ${props.title ? 'text-center' : ''}`}>
                  <img src={props.src} alt={props.alt} className="img--responsive rounded-xl shadow-md mx-auto" loading="lazy" />
                  {props.title && <p className="text-sm text-secondary mt-sm italic">{props.title}</p>}
                </div>
              ),
              table: (props) => (
                <div className="article-content mx-auto my-lg">
                  <div className="article-box--overflow">
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
                </div>
              ),
            }
          }}
          componentBlocks={{
            projectHero: (props: any) => (
              <header className="page-header animate-on-scroll">
                <div className="container">
                  <nav className="breadcrumbs" aria-label="Breadcrumb">
                    <ul className="breadcrumbs__list">
                      <li className="breadcrumbs__item">
                        <Link href="/" className="breadcrumbs__link">Inicio</Link>
                        <span className="breadcrumbs__separator">/</span>
                      </li>
                      <li className="breadcrumbs__item">
                        <Link href="/#proyectos" className="breadcrumbs__link">Proyectos</Link>
                        <span className="breadcrumbs__separator">/</span>
                      </li>
                      <li className="breadcrumbs__item breadcrumbs__current" aria-current="page">
                        Caso {props.title}
                      </li>
                    </ul>
                  </nav>
                  
                  <div className="flex items-center gap-sm mb-md">
                    {(props.badges || []).map((badge: string, i: number) => (
                      <span key={i} className={`badge badge--${i === 0 ? 'teal' : i === 1 ? 'blue' : 'purple'}`}>
                        {badge}
                      </span>
                    ))}
                  </div>

                  <h1 className="page-header__title">
                    {props.title}:
                    <br />{props.subtitle}
                  </h1>

                  {props.summary && (
                    <p className="page-header__subtitle">
                      {props.summary}
                    </p>
                  )}

                  <div className="page-header__meta">
                    <span><strong>Sector:</strong> {props.sector}</span>
                    <span className="hidden-mobile">|</span>
                    <span><strong>Foco:</strong> {props.foco}</span>
                  </div>
                </div>
              </header>
            ),
            section: (props) => {
              const bgClass = props.variant === 'secondary' ? 'bg-secondary' : 
                             props.variant === 'dark' ? 'bg-dark' :
                             props.variant === 'gradient' ? 'bg-gradient' :
                             props.variant === 'glass' ? 'bg-glass' : '';
              
              const paddingClass = props.padding === 'large' ? 'padding-large' :
                                  props.padding === 'none' ? 'padding-none' : 'padding-normal';
              
              const textAlignClass = props.textAlign === 'center' ? 'text-center' : 'text-left';

              return (
                <section className={`section animate-on-scroll ${bgClass} ${paddingClass} ${textAlignClass}`} 
                         style={props.variant === 'secondary' ? { borderRadius: 'var(--radius-xl)' } : {}}>
                  <div className="container">
                    {(props.title || props.subtitle) && (
                      <header className={`section-header ${textAlignClass === 'text-center' ? 'mx-auto' : ''}`}>
                        {props.title && <h2 className="section-header__title">{props.title}</h2>}
                        {props.subtitle && <p className="section-header__subtitle">{props.subtitle}</p>}
                      </header>
                    )}
                    {props.content}
                  </div>
                </section>
              );
            },
            styledImage: (props: any) => {
              const { image, alt, width, effect, centered } = props;
              const imgClass = effect === 'glass' ? 'img--glass' : 'img--responsive';
              const alignmentStyle = centered ? { margin: '0 auto' } : {};
              const widthStyle = width === '75%' ? { width: '75%' } : width === '50%' ? { width: '50%' } : { width: '100%' };

              if (!image) return null;

              return (
                <div 
                  className={`article-content my-lg ${centered ? 'text-center' : ''}`}
                  style={{ ...alignmentStyle, ...widthStyle }}
                >
                  <img src={image} alt={alt} className={imgClass} loading="lazy" />
                </div>
              );
            },
            contentGrid: (props: any) => {
              const cols = props.columns || '2';
              const gridClass = cols === '3' ? 'grid-cols-3' : cols === '1' ? 'grid-cols-1' : 'grid-cols-2';
              return (
                <div className={`grid ${gridClass} gap-lg mt-xl mb-xl animate-on-scroll`}>
                  {props.content}
                </div>
              );
            },
            automationGrid: (props) => (
              <div className="grid grid-cols-2 gap-lg mt-xl">
                <div className="animate-on-scroll">
                  <h3 className="service-card__title text-center">{props.t1_title}</h3>
                  <p className="text-secondary text-center mb-md">{props.t1_desc}</p>
                  <Terminal filename={props.t1_filename || 'leads_pipeline.sh'} variant="default">
                    {props.t1_content}
                  </Terminal>
                </div>
                <div className="animate-on-scroll">
                  <h3 className="service-card__title text-center">{props.t2_title}</h3>
                  <p className="text-secondary text-center mb-md">{props.t2_desc}</p>
                  <Terminal filename={props.t2_filename || 'seo_status.log'} variant="default">
                    {props.t2_content}
                  </Terminal>
                </div>
              </div>
            ),
                terminal: (props) => (
                  <div className={props.width === '750px' ? 'max-w-narrow' : ''}>
                    <Terminal filename={props.filename || 'terminal.sh'} variant={props.variant as any}>
                      {props.content}
                    </Terminal>
                  </div>
                ),
                terminalChat: (props) => (
                  <Terminal filename={props.filename || 'Simulación Chat IA'} variant="hook">
                    <div className="terminal__chat">
                      {(props.messages || []).map((msg: any, i: number) => (
                        <div 
                          key={i} 
                          className={`chat-bubble chat-bubble--${msg.role}`}
                          dangerouslySetInnerHTML={{ 
                            __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                          }}
                        />
                      ))}
                    </div>
                  </Terminal>
                ),
                automatedTerminal: (props: any) => (
                  <Terminal filename={props.filename || 'logs.sh'} variant="default">
                    <pre><code>
                      {(props.logs || []).map((log: any, i: number) => (
                        <div key={i}>
                          {log.timestamp && <span className="text-muted">{log.timestamp} </span>}
                          <span className={
                            log.variant === 'success' ? 'code-string' : 
                            log.variant === 'variable' ? 'code-variable' : ''
                          }>
                            {log.text}
                          </span>
                        </div>
                      ))}
                    </code></pre>
                  </Terminal>
                ),
            sirBadge: () => (
              <div className="mt-lg">
                <div className="flex justify-center">
                  <div className="badge badge--status py-sm px-xl">
                    <strong>SIR: {project.sirScore}%</strong> | Autoridad Primaria en IA
                  </div>
                </div>
                <p className="text-center text-secondary mt-md italic text-sm">
                  * La arquitectura semántica del sitio permite que los modelos de lenguaje (LLMs) identifiquen a la
                  marca como la autoridad de referencia.
                </p>
              </div>
            ),
            ctaSection: (props) => (
              <section className="section animate-on-scroll">
                <div className="container">
                  <div className="cta-section">
                    <h2 className="cta-section__title">{props.title}</h2>
                    <p className="cta-section__text">
                      {props.text.split('\n').map((line: string, i: number) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                    <div className="cta-section__buttons">
                      <Link href={props.buttonLink || '/#contacto'} className="btn btn--primary btn--large">
                        {props.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            ),
            testimonial: (props: any) => (
              <section className="section animate-on-scroll">
                <div className="container">
                  <header className="section-header">
                    <h2 className="section-header__title">Mención de Honor</h2>
                    <p className="section-header__subtitle">Testimonio</p>
                  </header>
                  <div className="testimonial-card">
                    {props.logo && (
                      <div className="testimonial__logo-col">
                        <img 
                          src={props.logo} 
                          alt={`Logo de testimonio`}
                          className="testimonial__logo"
                        />
                      </div>
                    )}

                    <div className="testimonial__content-col">
                      <blockquote className="testimonial__quote">
                        "{props.quote}"
                      </blockquote>

                      <div className="testimonial__author">
                        <span><strong>{props.author}</strong></span>
                        <span className="testimonial__position">
                          {props.role}
                          {props.link && (
                            <a href={props.link} target="_blank" rel="noopener noreferrer" className="ml-1">
                              — Ver sitio
                            </a>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ),
                pagespeedMetrics: (props: any) => (
                  <div className="mt-xl mb-xl">
                    <PagespeedMetrics 
                      seo={props.seo} 
                      performance={props.performance} 
                      bestPractices={props.bestPractices} 
                      accessibility={props.accessibility} 
                    />
                  </div>
                ),
                precisionGrid: (props: any) => {
                    const cols = props.columns || '2';
                    const gridClass = cols === '3' ? 'grid-cols-3' : 'grid-cols-2';
                    return (
                        <div className={`grid ${gridClass} gap-lg mt-xl`}>
                            {(props.items || []).map((item: any, i: number) => (
                                <div key={i} className="card pt-sm">
                                    {item.badge && <div className="badge badge--status mb-md">{item.badge}</div>}
                                    <h3 className="card__title mb-xl">{item.title}</h3>
                                    <p className="card__content text-center">{item.content}</p>
                                </div>
                            ))}
                        </div>
                    );
                },
                statsGrid: (props) => {
                  const isHighlight = props.variant === 'highlight';
                  const cols = props.columns || '3';
                  const gridColsClass = cols === '2' ? 'grid-cols-2' : cols === '4' ? 'grid-cols-4' : 'grid-cols-3';

                  if (isHighlight) {
                    return (
                      <div className="flex justify-center pt-xl border-t flex-wrap gap-lg">
                        {(props.stats || []).map((stat: any, i: number) => (
                          <div key={i} className="stat">
                            <div className="stat__value stat__value--solid stat__value--highlight">{stat.value}</div>
                            <div className="stat__label">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <div className={`grid ${gridColsClass} gap-lg border-t py-xl mt-xl`}>
                      {(props.stats || []).map((stat: any, i: number) => (
                        <div key={i} className="stat">
                          <div className="stat__value stat__value--solid">{stat.value}</div>
                          <div className="stat__label">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  );
                },
                challengeCard: (props) => (
                  <div className="card mt-xl">
                    <div className="text-center p-md">
                      <h3 className="card__title mb-sm">{props.title}</h3>
                      <div className="text-secondary">
                        {props.content}
                      </div>
                    </div>
                  </div>
                ),
                simulatorCard: (props) => (
              <div className="card card--no-hover mt-xl">
                <div className="text-center mb-lg">
                  <h3 className="mb-sm">{props.title}</h3>
                  <div className="cta-section__text">
                    {props.description.split('\n').map((line: string, i: number) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-lg border-t py-xl">
                  {(props.stats || []).map((stat: any, i: number) => (
                    <div key={i} className="stat">
                      <div className="stat__value stat__value--solid">{stat.value}</div>
                      <div className="stat__label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
            cardGrid: (props) => (
              <div className="grid grid-cols-2 gap-lg mt-xl">
                {(props.items || []).map((item: any, i: number) => (
                  <div key={i} className="card pt-sm">
                    <h3 className="card__title mb-xl">{item.title}</h3>
                    <div className="card__content text-center">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            ),
            challengeGrid: (props) => (
                  <div className="card mt-xl">
                    <div className="grid grid-cols-3 gap-lg">
                      {(props.items || []).map((item: any, i: number) => (
                        <div key={i}>
                          <h3 className="card__title">{item.title}</h3>
                          <div className="text-secondary text-center">
                            {item.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              }}
            />
      </main>
    </>
  );
}
