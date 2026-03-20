'use client';

import React, { useState } from 'react';

const phases = [
  {
    id: '01',
    colorTag: 'purple',
    titleClass: 'text-purple-400',
    activeClass: 'border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.1)] bg-neutral-900/60',
    title: 'Análisis del proyecto',
    desc: 'El primer paso es entender el negocio, sus servicios y los objetivos. Esto permite definir qué información debe aparecer, cómo se organizará el contenido y qué papel tendrá la web dentro de la estrategia digital.'
  },
  {
    id: '02',
    colorTag: 'blue',
    titleClass: 'text-blue-400',
    activeClass: 'border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.1)] bg-neutral-900/60',
    title: 'Definición de la estructura',
    desc: 'Una vez claro el objetivo del proyecto, se diseña la arquitectura de la web. Esto incluye la organización de las páginas, la jerarquía del contenido y la forma en que el visitante navegará por el sitio.'
  },
  {
    id: '03',
    colorTag: 'cyan',
    titleClass: 'text-cyan-400',
    activeClass: 'border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.1)] bg-neutral-900/60',
    title: 'Desarrollo y optimización',
    desc: 'Con la estructura definida comienza el desarrollo de la web. Durante esta fase se trabaja tanto el diseño como la base técnica para asegurar buen rendimiento, velocidad de carga y compatibilidad con dispositivos.'
  },
  {
    id: '04',
    colorTag: 'teal',
    titleClass: 'text-teal-400',
    activeClass: 'border-teal-500/40 shadow-[0_0_40px_rgba(20,184,166,0.1)] bg-neutral-900/60',
    title: 'Publicación y evolución',
    desc: 'Una vez publicada, la web se convierte en un activo digital que puede seguir creciendo. A partir de ese momento se pueden mejorar contenidos, ampliar secciones y optimizar el posicionamiento en buscadores.'
  }
];

export default function WorkflowTimeline() {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  return (
    <div className="mt-8 md:mt-12 lg:mt-16 relative">

      {/* DISEÑO BASADO EN CSS NATIVO (Control total de proximidad) */}
      <div className="workflow-timeline workflow-timeline--vertical relative">
        
        {/* Línea Vertical Sincronizada (24px vía CSS) */}
        <div className="workflow-timeline__line"></div>

        {phases.map((phase, index) => {
          const isActive = hoveredPhase === index;
          const isDimmed = hoveredPhase !== null && !isActive;

          return (
            <div 
              key={`row-${phase.id}`} 
              className={`workflow-timeline__item group py-6 md:py-10 transition-all duration-500 ${isDimmed ? 'workflow-timeline__item--dimmed' : ''}`}
              onMouseEnter={() => setHoveredPhase(index)}
              onMouseLeave={() => setHoveredPhase(null)}
            >
              {/* Nodo de la línea temporal (Estructura fija vía CSS) */}
              <div className="workflow-timeline__node-container">
                <div className={`workflow-timeline__node workflow-timeline__node--${phase.colorTag} ${isActive ? 'workflow-timeline__node--active' : ''} border-2 transition-all duration-300`}>
                  {phase.id}
                </div>
              </div>

              {/* Tarjeta de Contenido (Separación controlada por el 'gap' de .workflow-timeline__item) */}
              <article 
                className={`card flex-1 p-6 md:p-8 min-h-[180px] flex flex-col justify-center transition-all duration-500 border ${
                  isActive 
                    ? phase.activeClass 
                    : 'border-transparent bg-neutral-900/40'
                }`}
              >
                {/* Etiqueta de fase solo visible en móvil */}
                <span className={`workflow-timeline__phase-label ${isActive ? phase.titleClass : ''}`}>
                  Fase {phase.id}
                </span>

                <h3 className={`text-lg md:text-xl font-bold mb-2 transition-colors duration-500 ${isActive ? phase.titleClass : 'text-neutral-200'}`}>
                  {phase.title}
                </h3>
                <p className={`text-secondary text-sm md:text-base leading-relaxed transition-all duration-500 ${isActive ? 'text-neutral-200' : 'text-neutral-500 font-normal'}`}>
                  {phase.desc}
                </p>
              </article>
            </div>
          );
        })}
      </div>

    </div>
  );
}