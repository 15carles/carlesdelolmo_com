import React from 'react';
import Link from 'next/link';

interface FitItem {
  title: string;
  description: string;
}

const fitItems: FitItem[] = [
  {
    title: 'Empresas que necesitan una web profesional',
    description:
      'Negocios que quieren transmitir mejor lo que hacen, reforzar confianza y dejar atrás una presencia digital poco clara o desactualizada.',
  },
  {
    title: 'Proyectos que valoran estructura y criterio',
    description:
      'Marcas que no buscan solo una web bonita, sino una base bien pensada para comunicar, posicionar y crecer con más sentido.',
  },
  {
    title: 'Negocios que quieren mejorar visibilidad',
    description:
      'Proyectos que entienden que diseño, contenido, SEO y claridad deben trabajar juntos para generar una presencia digital más sólida.',
  },
  {
    title: 'Empresas con visión de medio y largo plazo',
    description:
      'Proyectos que quieren construir una web útil hoy, pero también preparada para evolucionar sin tener que rehacerlo todo en poco tiempo.',
  },
];

export default function ParaQuienSection() {
  return (
    <section id="para-quien" className="section" aria-labelledby="para-quien-title">
      <div className="container">
        <header className="section-header animate-on-scroll fit-heading">
          <h2 id="para-quien-title" className="section-header__title">
            Este enfoque encaja mejor con ciertos proyectos
          </h2>
          <p className="section-header__subtitle">
            No todas las webs necesitan el mismo nivel de planteamiento. Suelo encajar mejor con
            empresas y profesionales que quieren una presencia digital clara, bien construida
            y preparada para aportar valor real al negocio.
          </p>
        </header>

        <div className="fit-shell animate-on-scroll">
          <div className="fit-grid">
            {fitItems.map((item) => (
              <article key={item.title} className="fit-item">
                <h3 className="fit-item__title">{item.title}</h3>
                <p className="fit-item__description">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="fit-note">
            <p>
              Suelo aportar más valor cuando el proyecto busca algo más que “tener una web”.
              Si hay intención de ordenar mejor la presencia digital, mejorar la base del sitio y
              trabajar con criterio, probablemente encajemos bien.
            </p>
          </div>

          <div className="section-actions fit-actions" role="group" aria-label="Acciones de encaje de proyecto">
            <Link href="/contacto" className="btn btn--primary">Cuéntame tu proyecto</Link>
            <Link href="/pricing" className="btn btn--secondary">Ver servicios y precios</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
