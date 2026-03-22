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

  const renderInlineBold = (text: string) => {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  const renderMultilineText = (text?: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {renderInlineBold(line)}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const getLinkLabel = (href?: string, fallback?: string) => {
    if (fallback?.trim()) return fallback.trim();
    if (!href) return '';
    try {
      const parsed = new URL(href);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      return href;
    }
  };

  const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

  type TerminalMode = 'code' | 'chat' | 'logs';
  type TerminalLogVariant = 'default' | 'property' | 'success' | 'variable';
  type TerminalMessage = { role?: 'user' | 'ia'; content?: string };
  type TerminalLog = { timestamp?: string; text?: string; variant?: TerminalLogVariant };
  type TerminalUnifiedRenderProps = {
    mode?: TerminalMode;
    filename?: string;
    width?: '100%' | '750px';
    content?: React.ReactNode;
    messages?: TerminalMessage[];
    logs?: TerminalLog[];
  };

  const renderTerminalUnified = (props: TerminalUnifiedRenderProps) => {
    const mode = props.mode || 'code';
    const wrapperClass = props.width === '750px' ? 'max-w-narrow' : '';

    if (mode === 'chat') {
      return (
        <div className={wrapperClass}>
          <Terminal filename={props.filename || 'Simulacion Chat IA'} variant="hook">
            <div className="terminal__chat">
              {asArray<TerminalMessage>(props.messages).map((msg, i) => {
                const role = msg.role === 'ia' ? 'ia' : 'user';
                return (
                  <div
                    key={i}
                    className={`chat-bubble chat-bubble--${role}`}
                    dangerouslySetInnerHTML={{
                      __html: (msg.content || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                );
              })}
            </div>
          </Terminal>
        </div>
      );
    }

    if (mode === 'logs') {
      return (
        <div className={wrapperClass}>
          <Terminal filename={props.filename || 'logs.sh'} variant="default">
            <pre><code>
              {asArray<TerminalLog>(props.logs).map((log, i) => (
                <div key={i}>
                  {log.timestamp && <span className="text-muted">{log.timestamp} </span>}
                  <span className={
                    log.variant === 'success' ? 'code-string' :
                    log.variant === 'variable' ? 'code-variable' :
                    log.variant === 'property' ? 'code-property' : ''
                  }>
                    {log.text}
                  </span>
                </div>
              ))}
            </code></pre>
          </Terminal>
        </div>
      );
    }

    return (
      <div className={wrapperClass}>
        <Terminal filename={props.filename || 'terminal.sh'} variant="default">
          {props.content}
        </Terminal>
      </div>
    );
  };

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
                {asArray<string>(project.badges).map((badge, i) => (
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
                            {asArray<any>(props.head).map((cell, i) => (
                              <th key={i} colSpan={cell.colSpan} rowSpan={cell.rowSpan}>
                                {cell.children}
                              </th>
                            ))}
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {asArray<any>(props.body).map((row, i) => (
                          <tr key={i}>
                            {asArray<any>(row).map((cell, j) => (
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
                    {asArray<string>(props.badges).map((badge: string, i: number) => (
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
              const hasCustomBackground = Boolean(props.backgroundColor);
              const bgClass = hasCustomBackground
                ? ''
                : props.variant === 'secondary'
                  ? 'bg-secondary'
                  : props.variant === 'dark'
                    ? 'bg-dark'
                    : props.variant === 'gradient'
                      ? 'bg-gradient'
                      : props.variant === 'glass'
                        ? 'bg-glass'
                        : '';
              
              const paddingClass = props.padding === 'large' ? 'padding-large' :
                                  props.padding === 'none' ? 'padding-none' : 'padding-normal';
              
              const textAlignClass = props.textAlign === 'center' ? 'text-center' : 'text-left';
              const sectionStyle: React.CSSProperties = props.variant === 'secondary'
                ? { borderRadius: 'var(--radius-xl)' }
                : {};
              if (props.backgroundColor) {
                sectionStyle.backgroundColor = props.backgroundColor;
              }

              return (
                <section className={`section animate-on-scroll ${bgClass} ${paddingClass} ${textAlignClass}`} 
                         style={sectionStyle}>
                  <div className="container">
                    {(props.title || props.subtitle) && (
                      <header className={`section-header ${textAlignClass === 'text-center' ? 'mx-auto' : ''}`}>
                        {props.eyebrow && <div className="badge badge--status mb-md">{props.eyebrow}</div>}
                        {props.title && <h2 className="section-header__title">{props.title}</h2>}
                        {props.subtitle && <p className="section-header__subtitle">{props.subtitle}</p>}
                      </header>
                    )}
                    {props.content}
                  </div>
                </section>
              );
            },
            styledImage: (props: any) => (
              <div className={`mt-xl mb-xl ${props.centered ? 'text-center' : ''}`}>
                {props.image && (
                  <img
                    src={props.image}
                    alt={props.alt || ''}
                    className={props.effect === 'glass' ? 'img--glass' : 'img--responsive'}
                    style={{
                      width: props.width || '100%',
                      height: 'auto',
                      marginLeft: props.centered ? 'auto' : '0',
                      marginRight: props.centered ? 'auto' : '0'
                    }}
                    loading="lazy"
                  />
                )}
              </div>
            ),
            imageGallery: (props: any) => (
              <div className={`grid grid-cols-${props.columns || '2'} gap-md mt-xl mb-xl`}>
                {asArray<any>(props.images).map((item: any, i: number) => (
                  <div key={i} className="animate-on-scroll">
                    <img
                      src={item.image}
                      alt={item.alt || ''}
                      className="img--glass"
                      style={{ width: '100%', height: 'auto', aspectRatio: '4/3', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ),
            automationPanels: (props: any) => {
              const gridClass = props.columns === '1' ? 'grid-cols-1' : 'grid-cols-2';
              return (
                <div className={`grid ${gridClass} gap-lg mt-xl`}>
                  {asArray<any>(props.items).map((panel: any, i: number) => (
                    <div key={i} className="animate-on-scroll">
                      <h3 className="service-card__title text-center">{panel.title}</h3>
                      <p className="text-secondary text-center mb-md">{renderMultilineText(panel.description)}</p>
                      <Terminal
                        filename={panel.filename || 'pipeline.log'}
                        variant={panel.variant === 'hook' ? 'hook' : 'default'}
                      >
                        {panel.content}
                      </Terminal>
                    </div>
                  ))}
                </div>
              );
            },
                terminalUnified: (props: TerminalUnifiedRenderProps) => renderTerminalUnified(props),
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
                      {(props.text || '').split('\n').map((line: string, i: number) => (
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
                            <>
                              {' '}
                              —{' '}
                              <a href={props.link} target="_blank" rel="noopener noreferrer">
                                {getLinkLabel(props.link, props.linkText)}
                              </a>
                            </>
                          )}
                        </span>
                        {props.location && <span className="testimonial__location">{props.location}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ),
                insightGrid: (props: any) => {
                  const cols = props.columns || '2';
                  const gridClass = cols === '1' ? 'grid-cols-1' : cols === '3' ? 'grid-cols-3' : 'grid-cols-2';
                  const variant = props.variant || 'challenge';

                  if (variant === 'challenge') {
                    return (
                      <div className="card mt-xl">
                        <div className={`grid ${gridClass} gap-lg`}>
                          {asArray<any>(props.items).map((item: any, i: number) => (
                            <div key={i}>
                              <h3 className="card__title">{item.title}</h3>
                              <div className="text-secondary text-center">{renderMultilineText(item.content)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (variant === 'precision') {
                    return (
                      <div className={`grid ${gridClass} article-content`}>
                        {asArray<any>(props.items).map((item: any, i: number) => (
                          <div key={i} className="card precision-grid-card pt-sm">
                            {item.badge && <div className="badge badge--status mb-md">{item.badge}</div>}
                            <h3 className="card__title mb-xl">{item.title}</h3>
                            <p className="card__content text-center">{renderMultilineText(item.content)}</p>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <div className={`grid ${gridClass} gap-lg mt-xl`}>
                      {asArray<any>(props.items).map((item: any, i: number) => (
                        <div key={i} className="card pt-sm">
                          {item.badge && <div className="badge badge--status mb-md">{item.badge}</div>}
                          <h3 className="card__title mb-xl">{item.title}</h3>
                          <div className="card__content text-center">
                            {renderMultilineText(item.content)}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                },
                metricsPanel: (props: any) => {
                  if (props.mode === 'lighthouse') {
                    return (
                      <div className="mt-xl mb-xl">
                        <PagespeedMetrics
                          seo={props.seo ?? 100}
                          performance={props.performance ?? 100}
                          bestPractices={props.bestPractices ?? 98}
                          accessibility={props.accessibility ?? 100}
                        />
                      </div>
                    );
                  }

                  if (props.mode === 'stats') {
                    const isHighlight = props.variant === 'highlight';
                    const cols = props.columns || '3';
                    const gridColsClass = cols === '2' ? 'grid-cols-2' : cols === '4' ? 'grid-cols-4' : 'grid-cols-3';

                    if (isHighlight) {
                      return (
                        <div className="flex justify-center pt-xl border-t flex-wrap gap-lg">
                          {asArray<any>(props.stats).map((stat: any, i: number) => (
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
                        {asArray<any>(props.stats).map((stat: any, i: number) => (
                          <div key={i} className="stat">
                            <div className="stat__value stat__value--solid">{stat.value}</div>
                            <div className="stat__label">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <div className="card card--no-hover mt-xl">
                      <div className="text-center mb-lg">
                        <h3 className="mb-sm">{props.title}</h3>
                        <div className="cta-section__text">{renderMultilineText(props.description)}</div>
                      </div>

                      <div className="grid grid-cols-3 gap-lg border-t py-xl">
                        {asArray<any>(props.stats).map((stat: any, i: number) => (
                          <div key={i} className="stat">
                            <div className="stat__value stat__value--solid">{stat.value}</div>
                            <div className="stat__label">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                },
              }}
            />
      </main>
    </>
  );
}
