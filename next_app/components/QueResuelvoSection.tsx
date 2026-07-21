import React from 'react';
import Image from 'next/image';
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
    title: 'Estructura que ni Google ni las IAs entienden',
    description:
      'Si la base semántica no está bien planteada, cuesta posicionar en buscadores y, cada vez más, que los sistemas de IA entiendan y citen tu marca cuando alguien pregunta por lo que ofreces.',
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
        <div className="split-section split-section--reverse">
          <div className="split-section__aside animate-on-scroll">
            <header className="section-header section-header--left que-resuelvo-heading">
              <p className="section-header__eyebrow">Qué resuelvo</p>
              <h2 id="que-resuelvo-title" className="section-header__title">Una web no debería estar solo para estar</h2>
              <p className="section-header__subtitle">
                Muchas empresas ya tienen página web, pero eso no significa que esté bien planteada.
                Si no explica bien lo que haces, no transmite confianza y no guía al usuario,
                difícilmente te ayudará a captar oportunidades.
              </p>
            </header>

            <div className="section-actions section-actions--left mt-xl" role="group" aria-label="Enlaces de solución">
              <Link href="/diseno-web/valencia" className="btn btn--primary">Ver servicio principal</Link>
              <Link href="/pricing" className="action-link">Ver servicios y precios</Link>
              <Link href="/blog/estructura-ideal-pagina-web-empresas" className="action-link">Ver guía de estructura</Link>
            </div>
          </div>

          <ol className="editorial-list split-section__body animate-on-scroll">
            {problemas.map((problema, index) => (
              <li key={problema.title} className="editorial-item">
                <span className="editorial-item__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="editorial-item__title">{problema.title}</h3>
                  <p className="editorial-item__description">{problema.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="que-resuelvo-figure animate-on-scroll mt-2xl">
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
      </div>
    </section>
  );
}
