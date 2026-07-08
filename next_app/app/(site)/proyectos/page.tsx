import React from 'react';
import Link from 'next/link';
import { ArrowRight, Rocket } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ProjectCard } from '@/components/ProjectsSection';
import { reader } from '@/lib/keystatic';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/schemas';

type ProjectListItem = {
  slug: string;
  title: string;
  summary: string;
  isoDate?: string;
  badges: { text: string; color: string }[];
  image?: string;
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
    }))
    .sort((a, b) => toTimestamp(b.isoDate) - toTimestamp(a.isoDate));

  return (
    <main className="page__content">
      <header className="page-header animate-on-scroll">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-header__title mt-xl">Proyectos</h1>
          <p className="page-header__subtitle">
            Casos de éxito reales: webs planteadas como sistemas de visibilidad, no como escaparates.
          </p>
        </div>
      </header>

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
    </main>
  );
}
