import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  href: string;
  badges: { text: string; color: string }[];
  description: string;
  image?: string;
  colorClass: string;
}

export function ProjectCard({ title, href, badges, description, image, colorClass }: ProjectCardProps) {
  return (
    <article className="project-card animate-on-scroll">
      {/* Project Image */}
      <div className={`project-card__image ${colorClass}`}>
        {image && (
          <Image
            src={image}
            alt={`Sitio web de ${title}`}
            width={400}
            height={250}
            loading="lazy"
          />
        )}
      </div>

      {/* Project Content */}
      <div className="project-card__content">
        <h3 className="project-card__title">
          <Link href={href}>{title}</Link>
        </h3>

        {/* Badges */}
        <div className="project-card__badges">
          {badges.map((badge, index) => (
            <span key={index} className={`badge badge--tag ${badge.color}`}>
              {badge.text}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="project-card__description">{description}</p>

        {/* CTA Button */}
        <Link href={href} className="project-card__link">
          Ver caso
          <ArrowRight className="project-card__link-icon" size={16} />
        </Link>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const projects: ProjectCardProps[] = [
    {
      title: "LEDescaparate",
      href: "/proyectos/ledescaparate",
      colorClass: "project-card__image--purple",
      image: "/assets/images/muestras/ledescaparate_muestra.webp",
      badges: [
        { text: "SEO", color: "badge--teal" },
        { text: "GEO", color: "badge--blue" },
        { text: "Diseño Web", color: "badge--purple" }
      ],
      description: "Web de captación de Leads optimizada para respuestas de IA con automatización de procesos.\nAumento del +250% en tráfico orgánico desde ChatGPT y Perplexity en sus primeros 30 días."
    }
  ];

  return (
    <section id="proyectos" className="section">
      <div className="container">
        {/* Section Header */}
        <header className="section-header animate-on-scroll">
          <p className="section-header__eyebrow">Proyectos</p>
          <h2 className="section-header__title">Proyecto destacado</h2>
          <p className="section-header__subtitle">
            Soluciones web optimizadas para la era de la inteligencia artificial
          </p>
        </header>

        {/* Featured Project */}
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
