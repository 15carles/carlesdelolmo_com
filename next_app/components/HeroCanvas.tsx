"use client";

import React, { useEffect, useRef } from 'react';

interface HeroCanvasProps {
  className?: string;
  /** Número de partículas del flow field */
  density?: number;
  /** Proporción de trazos en color de acento (0-1) */
  accentRatio?: number;
  ariaLabel?: string;
}

interface Particle {
  x: number;
  y: number;
  accent: boolean;
}

/**
 * "Campo orgánico": flow field generativo dibujado en Canvas 2D.
 * Trazos finos de tinta que derivan lentamente sobre el fondo crema,
 * con una pequeña proporción en verde. Sin dependencias externas.
 *
 * Salvaguardas de rendimiento:
 * - rAF pausado cuando el canvas sale del viewport o la pestaña se oculta
 * - dpr limitado a 2
 * - prefers-reduced-motion: render estático único, sin animación
 */
export default function HeroCanvas({
  className,
  density = 110,
  accentRatio = 0.06,
  ariaLabel = 'Animación decorativa',
}: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const inkColor = styles.getPropertyValue('--color-text-primary').trim() || '#1D1B16';
    const accentColor = styles.getPropertyValue('--color-accent-bright').trim() || '#2FA866';
    const bgColor = styles.getPropertyValue('--color-bg-primary').trim() || '#FAF7F1';

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let rafId = 0;
    let running = false;
    let zOffset = Math.random() * 100;
    let particles: Particle[] = [];

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Value noise por hash de enteros: barato y suficiente para un campo orgánico
    const hash = (ix: number, iy: number): number => {
      let h = ix * 374761393 + iy * 668265263;
      h = (h ^ (h >> 13)) * 1274126177;
      return ((h ^ (h >> 16)) >>> 0) / 4294967295;
    };

    const smooth = (t: number) => t * t * (3 - 2 * t);

    const noise = (x: number, y: number): number => {
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      const fx = smooth(x - ix);
      const fy = smooth(y - iy);
      const a = hash(ix, iy);
      const b = hash(ix + 1, iy);
      const c = hash(ix, iy + 1);
      const d = hash(ix + 1, iy + 1);
      return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
    };

    const fieldAngle = (x: number, y: number, z: number): number =>
      noise(x * 0.004 + z, y * 0.004 - z) * Math.PI * 4;

    const spawnParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      accent: Math.random() < accentRatio,
    });

    const resetParticles = () => {
      particles = Array.from({ length: density }, spawnParticle);
    };

    const paintBackground = (alpha: number) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
    };

    const stepParticle = (p: Particle, stepLength: number) => {
      const angle = fieldAngle(p.x, p.y, zOffset);
      const nx = p.x + Math.cos(angle) * stepLength;
      const ny = p.y + Math.sin(angle) * stepLength;

      ctx.strokeStyle = p.accent ? accentColor : inkColor;
      ctx.globalAlpha = p.accent ? 0.5 : 0.09;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      ctx.globalAlpha = 1;

      p.x = nx;
      p.y = ny;

      if (p.x < -10 || p.x > width + 10 || p.y < -10 || p.y > height + 10) {
        Object.assign(p, spawnParticle());
      }
    };

    const frame = () => {
      if (!running) return;
      // Estela: velo muy suave del color de fondo en lugar de clear
      paintBackground(0.02);
      zOffset += 0.0015;
      for (const p of particles) stepParticle(p, 1.6);
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reducedMotionQuery.matches) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    // Versión estática para prefers-reduced-motion: trazos pre-avanzados, un solo render
    const renderStatic = () => {
      stop();
      paintBackground(1);
      const staticParticles = Array.from({ length: density * 3 }, spawnParticle);
      for (const p of staticParticles) {
        for (let i = 0; i < 40; i++) stepParticle(p, 1.6);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintBackground(1);
      resetParticles();
      if (reducedMotionQuery.matches) renderStatic();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          start();
        } else {
          stop();
        }
      },
      { threshold: [0, 0.15] }
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const onMotionPreferenceChange = () => {
      if (reducedMotionQuery.matches) {
        renderStatic();
      } else {
        start();
      }
    };
    reducedMotionQuery.addEventListener('change', onMotionPreferenceChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotionQuery.removeEventListener('change', onMotionPreferenceChange);
    };
  }, [density, accentRatio]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label={ariaLabel}
    />
  );
}
