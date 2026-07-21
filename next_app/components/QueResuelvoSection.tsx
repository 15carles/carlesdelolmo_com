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
    description: 'No queda claro qué haces, para quién ni por qué elegirte.',
  },
  {
    title: 'Diseño sin dirección',
    description: 'Bonito pero desordenado: no genera confianza ni guía al siguiente paso.',
  },
  {
    title: 'Estructura que ni Google ni las IAs entienden',
    description: 'Sin base semántica, cuesta posicionar y que la IA te cite.',
  },
  {
    title: 'Poca utilidad comercial',
    description: 'No presenta bien tu propuesta ni facilita el contacto.',
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
                Muchas empresas ya tienen web, pero si no explica bien lo que haces ni guía al usuario, difícilmente te traerá clientes.
              </p>
            </header>

            <div className="section-actions section-actions--left mt-xl" role="group" aria-label="Enlaces de solución">
              <Link href="/diseno-web/valencia" className="btn btn--primary">Ver servicio principal</Link>
              <Link href="/blog/estructura-ideal-pagina-web-empresas" className="action-link">Ver guía de estructura</Link>
            </div>

            <figure className="que-resuelvo-figure que-resuelvo-figure--aside animate-on-scroll">
              <div className="que-resuelvo-figure__media">
                <Image
                  src="/assets/images/blog/comparativa-web-mala-vs-web-optimizada.webp"
                  alt="Comparativa entre una web mal planteada y una web optimizada con estructura clara y enfoque de negocio"
                  width={1200}
                  height={675}
                  loading="lazy"
                  className="que-resuelvo-figure__image"
                />
              </div>
              <figcaption className="que-resuelvo-figure__caption">
                La diferencia entre una web que solo está online y una que comunica, ordena y facilita el siguiente paso.
              </figcaption>
            </figure>
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
      </div>
    </section>
  );
}
