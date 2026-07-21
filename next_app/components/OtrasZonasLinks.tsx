import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export type ZonaId = 'valencia' | 'castellon' | 'alicante';

interface Zona {
  id: ZonaId;
  label: string;
  href: string;
  description: string;
}

const ZONAS: Zona[] = [
  {
    id: 'valencia',
    label: 'Diseño web en Valencia',
    href: '/diseno-web/valencia',
    description: 'SEO local y diseño estratégico en Valencia y su área metropolitana.',
  },
  {
    id: 'castellon',
    label: 'Diseño web en Castellón',
    href: '/diseno-web/castellon',
    description: 'Webs profesionales en Castellón con SEO técnico y optimización para IA.',
  },
  {
    id: 'alicante',
    label: 'Diseño web en Alicante',
    href: '/diseno-web/alicante',
    description: 'Diseño web orientado a resultados en Alicante, preparado para posicionar.',
  },
];

interface OtrasZonasLinksProps {
  current: ZonaId;
}

export default function OtrasZonasLinks({ current }: OtrasZonasLinksProps) {
  const otras = ZONAS.filter((zona) => zona.id !== current);

  return (
    <section className="section" aria-labelledby="otras-zonas-title">
      <div className="container">
        <header className="section-header text-center animate-on-scroll">
          <h2 id="otras-zonas-title" className="section-header__title">
            Diseño web en <span className="gradient-text">otras zonas</span>
          </h2>
          <p className="section-header__subtitle max-w-3xl mx-auto">
            ¿Tu negocio está en otra provincia? También trabajo el diseño web y el SEO local en estas zonas.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-lg mt-2xl">
          {otras.map((zona) => (
            <Link key={zona.id} href={zona.href} className="service-card animate-on-scroll">
              <h3 className="service-card__title">{zona.label}</h3>
              <p className="service-card__description">{zona.description}</p>
              <span className="action-link">
                Ver más <ArrowRight size={16} />
              </span>
            </Link>
          ))}
          <Link href="/diseno-web" className="service-card animate-on-scroll">
            <h3 className="service-card__title">Diseño web profesional</h3>
            <p className="service-card__description">
              El servicio general de diseño y desarrollo web, con el método y el enfoque que aplico en cada proyecto.
            </p>
            <span className="action-link">
              Ver servicio de diseño web <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
