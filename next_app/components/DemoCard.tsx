import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface DemoBadge {
  text: string;
  color: string;
}

interface DemoCardProps {
  /** Nombre del proyecto/demo */
  title: string;
  /** Descripción breve del proyecto */
  description: string;
  /** URL externa de la demo (ej. https://demo1.carlesdelolmo.com) */
  demoUrl: string;
  /** Ruta a la captura de pantalla en /public */
  image: string;
  /** Texto alternativo para la imagen */
  imageAlt: string;
  /** Etiquetas de categoría */
  badges: DemoBadge[];
}

/**
 * Tarjeta reutilizable para mostrar una demo interactiva.
 * Enlaza a un subdominio externo donde el usuario puede probar la demo.
 */
export default function DemoCard({
  title,
  description,
  demoUrl,
  image,
  imageAlt,
  badges,
}: DemoCardProps) {
  return (
    <article className="demo-card animate-on-scroll">
      {/* Imagen/captura de la demo con enlace */}
      <a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="demo-card__image-wrap"
        style={{ display: 'block' }}
      >
        <Image
          src={image}
          alt={imageAlt}
          width={600}
          height={375}
          className="demo-card__image"
          loading="lazy"
        />
        {/* Overlay con efecto hover */}
        <div className="demo-card__overlay">
          <span className="demo-card__overlay-text">
            <ExternalLink size={18} aria-hidden="true" />
            Probar demo
          </span>
        </div>
      </a>

      {/* Contenido de la tarjeta */}
      <div className="demo-card__content">
        <h3 className="demo-card__title">{title}</h3>

        {/* Badges */}
        <div className="demo-card__badges">
          {badges.map((badge, index) => (
            <span key={index} className={`badge badge--tag ${badge.color}`}>
              {badge.text}
            </span>
          ))}
        </div>

        {/* Descripción */}
        <p className="demo-card__description">{description}</p>

        {/* Botón CTA a la demo externa */}
        <div className="demo-card__cta-group">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary demo-card__cta"
          >
            <ExternalLink size={16} aria-hidden="true" />
            Probar demo en vivo
          </a>
        </div>
      </div>
    </article>
  );
}
