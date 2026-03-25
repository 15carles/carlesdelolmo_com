"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observerOptions = {
      threshold: 0,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          // Una vez animado, dejamos de observar
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Pequeño timeout para permitir que el DOM se actualice tras el cambio de ruta
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll:not(.animate-fade-in-up)');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pathname]);

  return null; // Este componente no renderiza nada, solo activa la lógica
}
