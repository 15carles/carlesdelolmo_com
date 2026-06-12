import React from 'react';
import Link from 'next/link';

interface DiferenciadorItem {
  title: string;
  description: string;
}

const diferenciadores: DiferenciadorItem[] = [
  {
    title: 'Claridad desde el primer vistazo',
    description:
      'Una web bien planteada deja claro qué haces, para quién trabajas y por qué deberían tenerte en cuenta. Eso mejora la comprensión y reduce fricción.',
  },
  {
    title: 'Estructura con sentido',
    description:
      'La información no debe estar simplemente colocada: debe estar organizada para que usuarios, buscadores y sistemas de IA puedan entender mejor el conjunto.',
  },
  {
    title: 'Base técnica preparada para crecer',
    description:
      'Rendimiento, orden y buena construcción técnica ayudan a que la web funcione mejor hoy y no se convierta mañana en un problema difícil de mantener.',
  },
  {
    title: 'Posicionamiento integrado, no añadido al final',
    description:
      'El SEO y la preparación para IA no deberían ser un parche posterior. Cuanto mejor está pensada la base, más sentido tiene todo lo demás.',
  },
  {
    title: 'Más coherencia entre diseño, contenido y negocio',
    description:
      'Una web útil no separa estética, mensaje y objetivo comercial. Todo debe empujar en la misma dirección.',
  },
  {
    title: 'Preparada para evolucionar',
    description:
      'Una buena web no se agota al publicarse. Debe permitir mejorar contenidos, reforzar autoridad y crecer con el proyecto sin tener que rehacerlo todo cada poco tiempo.',
  },
];

export default function DiferenciadoresSection() {
  return (
    <section id="diferenciadores" className="section" aria-labelledby="diferenciadores-title">
      <div className="container">
        <div className="split-section split-section--reverse">
          <div className="split-section__aside animate-on-scroll">
            <header className="section-header section-header--left diferenciadores-heading">
              <p className="section-header__eyebrow">Por qué conmigo</p>
              <h2 id="diferenciadores-title" className="section-header__title">
                Qué hace que una web esté mejor planteada
              </h2>
              <p className="section-header__subtitle">
                No se trata solo de que una web se vea bien. Una base digital sólida también debe
                ayudar a entender mejor el negocio, transmitir confianza y facilitar una mejor
                visibilidad a medio y largo plazo.
              </p>
            </header>

            <div className="section-actions section-actions--left mt-xl" role="group" aria-label="Acciones de diferenciadores">
              <Link href="/diseno-web/valencia" className="btn btn--primary">Ver enfoque de diseño web</Link>
              <Link href="/contacto" className="action-link">Hablar sobre tu web</Link>
            </div>
          </div>

          <ul className="editorial-list split-section__body animate-on-scroll">
            {diferenciadores.map((item, index) => (
              <li key={item.title} className="editorial-item">
                <span className="editorial-item__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="editorial-item__title">{item.title}</h3>
                  <p className="editorial-item__description">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
