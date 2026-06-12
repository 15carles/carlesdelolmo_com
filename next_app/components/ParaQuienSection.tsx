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
    <section id="para-quien" className="section section--band" aria-labelledby="para-quien-title">
      <div className="container">
        <div className="split-section split-section--reverse">
          <div className="split-section__aside animate-on-scroll">
            <header className="section-header section-header--left fit-heading">
              <p className="section-header__eyebrow">Para quién</p>
              <h2 id="para-quien-title" className="section-header__title">
                Este enfoque encaja mejor con ciertos proyectos
              </h2>
              <p className="section-header__subtitle">
                No todas las webs necesitan el mismo nivel de planteamiento. Suelo encajar mejor con
                empresas y profesionales que quieren una presencia digital clara, bien construida
                y preparada para aportar valor real al negocio.
              </p>
            </header>

            <div className="section-actions section-actions--left mt-xl fit-actions" role="group" aria-label="Acciones de encaje de proyecto">
              <Link href="/contacto" className="btn btn--primary">Cuéntame tu proyecto</Link>
              <Link href="/pricing" className="action-link">Ver servicios y precios</Link>
            </div>
          </div>

          <div className="split-section__body animate-on-scroll">
            <ul className="editorial-list">
              {fitItems.map((item, index) => (
                <li key={item.title} className="editorial-item">
                  <span className="editorial-item__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="editorial-item__title">{item.title}</h3>
                    <p className="editorial-item__description">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="editorial-note">
              <p>
                Suelo aportar más valor cuando el proyecto busca algo más que “tener una web”.
                Si hay intención de ordenar mejor la presencia digital, mejorar la base del sitio y
                trabajar con criterio, probablemente encajemos bien.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
