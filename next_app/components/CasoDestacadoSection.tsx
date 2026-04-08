import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const intervencionItems = [
  'Replanteamiento de la estructura y jerarquía del sitio.',
  'Mejora de la presentación visual y del recorrido del usuario.',
  'Trabajo de base en arquitectura, contenido y enfoque SEO/GEO.',
  'Preparación del sitio como activo digital más sólido y escalable.',
];

export default function CasoDestacadoSection() {
  return (
    <section id="caso-destacado" className="section" aria-labelledby="caso-destacado-title">
      <div className="container">
        <header className="section-header animate-on-scroll case-study-heading">
          <h2 id="caso-destacado-title" className="section-header__title">Caso de estudio destacado</h2>
          <p className="section-header__subtitle">
            Una muestra real de cómo planteo un proyecto web con enfoque estratégico,
            estructura clara y una base preparada para posicionamiento y crecimiento.
          </p>
        </header>

        <article className="case-study-featured animate-on-scroll">
          <div className="case-study-media">
            <figure className="case-study-figure">
              <div className="case-study-figure__media">
                <Image
                  src="/assets/images/muestras/ledescaparate_muestra.webp"
                  alt="Captura del proyecto web LEDescaparate desarrollado por Carles del Olmo"
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="case-study-figure__image"
                />
              </div>
              <figcaption className="case-study-figure__caption">
                Proyecto destacado: LEDescaparate, una web planteada para presentar mejor la propuesta,
                ordenar la información y reforzar la presencia digital del negocio.
              </figcaption>
            </figure>
          </div>

          <div className="case-study-content">
            <p className="badge badge--tag badge--purple case-study-label">Proyecto destacado</p>

            <h3 className="case-study-title">LEDescaparate</h3>

            <p className="case-study-intro">
              Un proyecto trabajado con foco en claridad, estructura, presentación profesional
              del producto y una base digital más sólida para buscadores y entornos de IA.
            </p>

            <section className="case-study-block" aria-labelledby="case-study-inicial-title">
              <h4 id="case-study-inicial-title" className="case-study-block__title">Situación inicial</h4>
              <p className="case-study-block__text">
                El proyecto necesitaba una presencia web más clara, mejor organizada y alineada
                con una propuesta comercial que debía entenderse rápido.
              </p>
            </section>

            <section className="case-study-block" aria-labelledby="case-study-intervencion-title">
              <h4 id="case-study-intervencion-title" className="case-study-block__title">Intervención realizada</h4>
              <ul className="case-study-list">
                {intervencionItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="case-study-block" aria-labelledby="case-study-resultado-title">
              <h4 id="case-study-resultado-title" className="case-study-block__title">Resultado</h4>
              <p className="case-study-block__text">
                El proyecto ganó claridad, coherencia y una base técnica y semántica mucho más útil
                para comunicar mejor, posicionar con más criterio y sostener futuras mejoras.
              </p>
            </section>

            <div className="case-study-actions" role="group" aria-label="Acciones del caso de estudio">
              <Link href="/proyectos/ledescaparate" className="btn btn--primary">Ver caso completo</Link>
              <Link href="/#proyectos" className="btn btn--secondary">Ver más proyectos</Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
