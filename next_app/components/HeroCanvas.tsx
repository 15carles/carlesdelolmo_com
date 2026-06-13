"use client";

import React from 'react';
import GenerativeCanvas from './GenerativeCanvas';

interface HeroCanvasProps {
  className?: string;
  density?: number;
  accentRatio?: number;
  ariaLabel?: string;
}

/**
 * Canvas del hero de la home: el campo orgánico que traza el esqueleto de una web.
 * Es un alias de {@link GenerativeCanvas} con la figura `wireframe` para conservar
 * la API previa y dejar intacto el comportamiento ya validado.
 */
export default function HeroCanvas(props: HeroCanvasProps) {
  return <GenerativeCanvas variant="wireframe" {...props} />;
}
