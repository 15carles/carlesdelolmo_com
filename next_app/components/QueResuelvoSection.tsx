import React from 'react';
import Image from 'next/image';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface ProblemaItem {
  title: string;
  description: string;
}

const problemas: ProblemaItem[] = [
  {
    title: 'Mensajes poco claros',
    description:
      'Cuando una web no deja claro qué hace una empresa, para quién trabaja o por qué elegirla, el visitante pierde interés rápido.',
  },
  {
    title: 'Diseño sin dirección',
    description:
      'No basta con que una web se vea bien. También debe ordenar la información, generar confianza y facilitar el siguiente paso.',
  },
  {
    title: 'Estructura débil para posicionar',
    description:
      'Si la base de la web no está bien planteada, es más difícil que ayude a mejorar la visibilidad en buscadores o que tenga sentido para sistemas de IA.',
  },
  {
    title: 'Poca utilidad comercial',
    description:
      'Una web profesional debe apoyar al negocio: presentar bien la propuesta, reforzar la autoridad y facilitar contactos o solicitudes.',
  },
];

export default function QueResuelvoSection() {
  return (
    <section id="que-resuelvo" className="section" aria-labelledby="que-resuelvo-title">
      <div className="container">
        <header className="section-header animate-on-scroll que-resuelvo-heading">
          <h2 id="que-resuelvo-title" className="section-header__title">Una web no debería estar solo para estar</h2>
          <p className="section-header__subtitle">
            Muchas empresas ya tienen página web, pero eso no significa que esté bien planteada.
            Si no explica bien lo que haces, no transmite confianza y no guía al usuario,
            difícilmente te ayudará a captar oportunidades.
          </p>
        </header>

        <figure className="que-resuelvo-figure animate-on-scroll">
          <div className="que-resuelvo-figure__media">
            <Image
              src="/assets/images/mockups/mockup_multi.webp"
              alt="Ejemplo de página web profesional con estructura clara, jerarquía visual y enfoque orientado a negocio"
              width={1600}
              height={900}
              loading="lazy"
              className="que-resuelvo-figure__image"
            />
          </div>
          <figcaption className="que-resuelvo-figure__caption">
            Una web útil no solo se ve bien: también ordena la información, transmite confianza y facilita el siguiente paso.
          </figcaption>
        </figure>

        <div className="grid grid-cols-2 problemas-grid">
          {problemas.map((problema) => (
            <article key={problema.title} className="card problema-item animate-on-scroll">
              <div className="problema-item__heading">
                <span className="problema-item__icon" aria-hidden="true">
                  <AlertTriangle size={16} strokeWidth={2.5} />
                </span>
                <h3 className="problema-item__title">{problema.title}</h3>
              </div>
              <p className="problema-item__description">{problema.description}</p>
            </article>
          ))}
        </div>

        <div className="section-actions animate-on-scroll" role="group" aria-label="Enlaces de solución">
          <Link href="/diseno-web/valencia" className="btn btn--primary">Ver servicio principal</Link>
          <Link href="/pricing" className="btn btn--secondary">Ver servicios y precios</Link>
          <Link href="/blog/estructura-ideal-pagina-web-empresas" className="btn btn--secondary">Ver guía de estructura</Link>
        </div>
      </div>
    </section>
  );
}
