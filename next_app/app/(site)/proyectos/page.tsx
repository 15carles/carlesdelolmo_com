import React from 'react';
import Link from 'next/link';
import { ArrowRight, Rocket } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ProjectCard } from '@/components/ProjectsSection';
import DemoCard from '@/components/DemoCard';
import CtaFinalSection from '@/components/CtaFinalSection';
import { DEMOS } from '@/data/demos';
import { reader } from '@/lib/keystatic';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/schemas';

type ProjectTestimonial = {
  text: string;
  author: string;
  role: string;
  location: string;
  clientName: string;
  clientUrl?: string;
  clientLogo?: string;
};

type ProjectListItem = {
  slug: string;
  title: string;
  summary: string;
  isoDate?: string;
  badges: { text: string; color: string }[];
  image?: string;
  testimonial?: ProjectTestimonial;
};

// Imagen de tarjeta por proyecto (la colección Keystatic no tiene campo de portada).
const PROJECT_CARD_IMAGES: Record<string, string> = {
  ledescaparate: '/assets/images/muestras/ledescaparate_muestra.webp',
};

const BADGE_COLORS: Record<string, string> = {
  SEO: 'badge--teal',
  GEO: 'badge--blue',
  'Diseño Web': 'badge--purple',
  'Desarrollo Web': 'badge--purple',
  'Automatización': 'badge--cyan',
};

// Demos destacadas en la preview del laboratorio.
const FEATURED_DEMOS = ['LocalExpert Gestoría', 'Kinetiq Labs'];

// Mismo stack que la sección de tecnología de /diseno-web.
const STACK_KEYWORDS = [
  'Next.js',
  'React',
  'Core Web Vitals',
  'JSON-LD',
  'TailwindCSS',
  'Astro',
  'Schema.org',
  'LLM Ready',
];

function badgeColor(text: string, index: number): string {
  const fallback = ['badge--blue', 'badge--purple', 'badge--teal', 'badge--cyan'];
  return BADGE_COLORS[text] ?? fallback[index % fallback.length];
}

function toTimestamp(isoDate: string | undefined): number {
  if (!isoDate) return 0;
  const parsed = Date.parse(isoDate);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export const metadata = constructMetadata({
  title: 'Proyectos y casos de éxito | Carles del Olmo',
  description:
    'Casos de éxito reales de webs construidas con el método ORBITA: optimización técnica, relevancia semántica, autoridad e interpretación por IA.',
  exactUrl: `${SITE_URL}/proyectos`,
});

export const revalidate = 3600;

export default async function ProyectosIndex() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Proyectos' }
  ];

  const projectsData = await reader.collections.projects.all();

  const projects: ProjectListItem[] = projectsData
    .map((project) => ({
      slug: project.slug,
      title:
        typeof project.entry.title === 'string'
          ? project.entry.title
          : String((project.entry.title as { name?: string })?.name ?? project.slug),
      summary: project.entry.summary || project.entry.metaDescription,
      isoDate: project.entry.isoDate ?? undefined,
      badges: project.entry.badges.map((badge, index) => ({
        text: badge,
        color: badgeColor(badge, index),
      })),
      image: PROJECT_CARD_IMAGES[project.slug],
      testimonial: project.entry.testimonial?.text
        ? {
            text: project.entry.testimonial.text,
            author: project.entry.testimonial.author,
            role: project.entry.testimonial.role,
            location: project.entry.testimonial.location,
            clientName: project.entry.client.name,
            clientUrl: project.entry.client.url || undefined,
            clientLogo: project.entry.client.logo || undefined,
          }
        : undefined,
    }))
    .sort((a, b) => toTimestamp(b.isoDate) - toTimestamp(a.isoDate));

  const featuredTestimonial = projects.find((project) => project.testimonial)?.testimonial;
  const featuredDemos = DEMOS.filter((demo) => FEATURED_DEMOS.includes(demo.title));

  return (
    <main className="page__content">
      <header className="page-header animate-on-scroll">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-header__title mt-xl">Proyectos y casos de éxito</h1>
          <p className="page-header__subtitle">
            Casos reales: webs planteadas como sistemas de visibilidad en buscadores y en IA, no como escaparates.
          </p>
        </div>
      </header>

      {/* ── Método ORBITA + casos de éxito ── */}
      <section className="section animate-on-scroll" aria-labelledby="proyectos-orbita-title">
        <div className="container">
          <header className="section-header section-header--left mb-2xl">
            <p className="section-header__eyebrow">Método ORBITA</p>
            <h2 id="proyectos-orbita-title" className="section-header__title">
              Cada caso es el método aplicado de principio a fin
            </h2>
            <p className="section-header__subtitle">
              Detrás de cada proyecto está ORBITA: Optimización técnica, Relevancia semántica,
              Base de autoridad, Interpretación por IA, Tráfico cualificado y Actualización continua.
              Seis capas que convierten una web en un activo que comunica, posiciona y evoluciona.
            </p>
            <Link href="/blog/metodo-orbita" className="project-card__link">
              Entender el método ORBITA
              <ArrowRight className="project-card__link-icon" size={16} />
            </Link>
          </header>

          <div className="grid grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                href={`/proyectos/${project.slug}`}
                colorClass="project-card__image--purple"
                image={project.image}
                badges={project.badges}
                description={project.summary}
              />
            ))}

            {/* Tarjeta CTA: siguiente caso de éxito */}
            <article className="project-card animate-on-scroll">
              <div className="project-card__image project-card__image--blue">
                <div className="project-card__icon-container">
                  <Rocket className="project-card__icon" size={48} />
                </div>
              </div>
              <div className="project-card__content">
                <h3 className="project-card__title">
                  <Link href="/contacto">Tu proyecto podría ser el siguiente</Link>
                </h3>
                <div className="project-card__badges">
                  <span className="badge badge--tag badge--teal">SEO</span>
                  <span className="badge badge--tag badge--blue">GEO</span>
                  <span className="badge badge--tag badge--purple">Diseño Web</span>
                </div>
                <p className="project-card__description">
                  Si tu web necesita estructura, visibilidad y un método claro detrás,
                  puedo ayudarte a plantearla como un sistema completo.
                </p>
                <Link href="/contacto" className="project-card__link">
                  Cuéntame tu proyecto
                  <ArrowRight className="project-card__link-icon" size={16} />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── Testimonio del caso más reciente ── */}
      {featuredTestimonial && (
        <section className="section animate-on-scroll" aria-labelledby="proyectos-testimonio-title">
          <div className="container">
            <header className="section-header">
              <p className="section-header__eyebrow">Resultados</p>
              <h2 id="proyectos-testimonio-title" className="section-header__title">
                Lo que dice el cliente
              </h2>
            </header>
            <div className="testimonial-card">
              {featuredTestimonial.clientLogo && (
                <div className="testimonial__logo-col">
                  {/* eslint-disable-next-line @next/next/no-img-element -- logo pequeño gestionado desde Keystatic */}
                  <img
                    src={featuredTestimonial.clientLogo}
                    alt={`Logo de ${featuredTestimonial.clientName}`}
                    className="testimonial__logo"
                  />
                </div>
              )}
              <div className="testimonial__content-col">
                <blockquote className="testimonial__quote">
                  &ldquo;{featuredTestimonial.text}&rdquo;
                </blockquote>
                <div className="testimonial__author">
                  <span><strong>{featuredTestimonial.author}</strong></span>
                  <span className="testimonial__position">
                    {featuredTestimonial.role}
                    {featuredTestimonial.clientUrl && (
                      <>
                        {' '}·{' '}
                        <a href={featuredTestimonial.clientUrl} target="_blank" rel="noopener noreferrer">
                          {featuredTestimonial.clientName}
                        </a>
                      </>
                    )}
                  </span>
                  {featuredTestimonial.location && (
                    <span className="testimonial__location">{featuredTestimonial.location}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Laboratorio: preview de demos ── */}
      <section className="section bg-glass animate-on-scroll" aria-labelledby="proyectos-demos-title">
        <div className="container">
          <header className="section-header">
            <p className="section-header__eyebrow">Laboratorio</p>
            <h2 id="proyectos-demos-title" className="section-header__title">
              Demos de diseño web
            </h2>
            <p className="section-header__subtitle">
              Además de los casos reales, mantengo demos en vivo donde exploro estilos, estructuras
              y patrones de conversión. Son la capa de práctica que después alimenta los proyectos.
            </p>
          </header>

          <div className="grid grid-cols-2 demos-grid">
            {featuredDemos.map((demo) => (
              <DemoCard key={demo.title} {...demo} />
            ))}
          </div>

          <div className="mt-xl text-center">
            <Link href="/demos-interactivas" className="btn btn--secondary">
              Ver las {DEMOS.length} demos interactivas
            </Link>
          </div>
        </div>
      </section>

      {/* ── Herramientas / stack ── */}
      <section className="section animate-on-scroll" aria-labelledby="proyectos-stack-title">
        <div className="container">
          <header className="section-header">
            <p className="section-header__eyebrow">Herramientas</p>
            <h2 id="proyectos-stack-title" className="section-header__title">
              Con qué construyo cada proyecto
            </h2>
            <p className="section-header__subtitle">
              La capa de Optimización técnica de ORBITA empieza por elegir bien la base:
              tecnología moderna, rápida y legible tanto para buscadores como para
              inteligencia artificial. Sin plantillas genéricas ni dependencias frágiles.
            </p>
          </header>

          <div className="flex flex-col items-center">
            <div className="grid--keywords w-full max-w-4xl gap-md">
              {STACK_KEYWORDS.map((keyword) => (
                <div key={keyword} className="keyword-card flex items-center justify-center p-md text-sm">
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <CtaFinalSection />
    </main>
  );
}
