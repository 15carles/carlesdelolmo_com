'use client';

import React, { useState, useEffect } from 'react';

const steps = [
  {
    letter: 'O',
    title: 'Optimización técnica',
    desc: 'Base sólida: rendimiento extremo, estructura de código limpia y arquitectura preparada para escalar sin límites.'
  },
  {
    letter: 'R',
    title: 'Relevancia semántica',
    desc: 'Tu web comunica con total claridad qué haces, a quién te diriges y por qué eres la mejor opción para tu cliente ideal.'
  },
  {
    letter: 'B',
    title: 'Base de autoridad',
    desc: 'Estructura de contenidos e interlinking inteligente que construye credibilidad real ante buscadores e inteligencia artificial.'
  },
  {
    letter: 'I',
    title: 'Interpretación por IA',
    desc: 'Preparación estructural JSON-LD para que motores como ChatGPT, Perplexity o Gemini extraigan y recomienden tu contenido.'
  },
  {
    letter: 'T',
    title: 'Tráfico cualificado',
    desc: 'El sistema no atrae visitas genéricas; atrae usuarios en fase de decisión preparados para convertirse en negocio.'
  },
  {
    letter: 'A',
    title: 'Actualización continua',
    desc: 'Un sistema vivo que evoluciona, se mide y se adapta para mantenerse siempre visible y rentable en el tiempo.'
  }
];

export default function OrbitaMethod() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Definimos el intervalo de 3 segundos
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    // Limpieza: cada vez que el componente se desmonte o el activeStep cambie
    // (por un clic), el intervalo anterior se destruye y empieza uno nuevo de 3s.
    return () => clearInterval(interval);
  }, [activeStep]); // Importante: [activeStep] hace que el timer se reinicie al hacer clic

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <div className="orbita-container w-full">

      {/* VERSIÓN ESCRITORIO (Circular) */}
      <div className="orbita-wrapper">
        <div className="orbita-path"></div>
        {steps.map((step, index) => (
          <button
            key={`desk-${step.letter}`}
            className={`orbita-node ${activeStep === index ? 'orbita-node--active' : ''}`}
            onClick={() => handleStepClick(index)}
            aria-label={`Paso ${step.letter}: ${step.title}`}
          >
            {step.letter}
          </button>
        ))}

        <div className="orbita-center" key={`desk-content-${activeStep}`}>
          <h3>{steps[activeStep].title}</h3>
          <p>{steps[activeStep].desc}</p>
        </div>
      </div>

      {/* VERSIÓN MÓVIL (Panel de Control) */}
      <div className="orbita-mobile-container">
        <div className="orbita-mobile-grid">
          {steps.map((step, index) => (
            <button
              key={`mob-${step.letter}`}
              className={`orbita-node-mobile ${activeStep === index ? 'orbita-node-mobile--active' : ''}`}
              onClick={() => handleStepClick(index)}
            >
              {step.letter}
            </button>
          ))}
        </div>

        <div className="orbita-content-mobile" key={`mob-content-${activeStep}`}>
          <h3>{steps[activeStep].title}</h3>
          <p>{steps[activeStep].desc}</p>
        </div>
      </div>

    </div>
  );
}