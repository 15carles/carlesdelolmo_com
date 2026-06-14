"use client";

import React, { useEffect, useRef } from 'react';

export type CanvasVariant =
  | 'wireframe'
  | 'map'
  | 'bars'
  | 'migrate'
  | 'nodes'
  | 'audit'
  | 'code'
  | 'shield'
  | 'valencia'
  | 'alicante'
  | 'castellon';

interface GenerativeCanvasProps {
  className?: string;
  /** Número de partículas del flow field */
  density?: number;
  /** Proporción de trazos en color de acento (0-1) para los segmentos no marcados */
  accentRatio?: number;
  ariaLabel?: string;
  /** Figura que el campo dibuja al converger */
  variant?: CanvasVariant;
  /** Semilla para variar figuras parametrizables (p. ej. el mapa por ciudad) */
  seed?: number;
}

interface RawSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  accent?: boolean;
}

interface Segment {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  len: number;
  accent: boolean;
}

interface Particle {
  x: number;
  y: number;
  accent: boolean;
  /** Índice del segmento de la figura al que se adhiere en fase de formación */
  seg: number;
  /** Posición paramétrica (0-1) a lo largo del segmento */
  t: number;
}

const DEFAULT_ARIA: Record<CanvasVariant, string> = {
  wireframe: 'Animación decorativa: partículas que trazan el esquema de una página web',
  map: 'Animación decorativa: partículas que trazan un marcador de ubicación sobre un mapa',
  bars: 'Animación decorativa: partículas que trazan un gráfico de posiciones en ascenso',
  migrate: 'Animación decorativa: partículas que trazan una migración entre dos sitios web',
  nodes: 'Animación decorativa: partículas que trazan una red de nodos conectados',
  audit: 'Animación decorativa: partículas que trazan una lupa sobre una lista de verificación',
  code: 'Animación decorativa: partículas que trazan el editor de código de una web a medida',
  shield: 'Animación decorativa: partículas que trazan un escudo con una marca de verificación',
  valencia: 'Animación decorativa: partículas que trazan las Torres de Serranos de Valencia',
  alicante: 'Animación decorativa: partículas que trazan el Castillo de Santa Bárbara de Alicante',
  castellon: 'Animación decorativa: partículas que trazan la torre El Fadrí de Castellón',
};

/**
 * Geometría de cada figura en coordenadas normalizadas (0-1) dentro de un
 * recuadro con margen. Cada figura es una lista de segmentos rectos; las curvas
 * (pin del mapa) se aproximan con polilíneas. `accent: true` marca los segmentos
 * que deben trazarse en verde de forma intencionada.
 */
function geometryFor(variant: CanvasVariant, seed = 0): RawSegment[] {
  const segs: RawSegment[] = [];
  const line = (x1: number, y1: number, x2: number, y2: number, accent = false) =>
    segs.push({ x1, y1, x2, y2, accent });
  const rect = (x: number, y: number, w: number, h: number, accent = false) => {
    line(x, y, x + w, y, accent);
    line(x + w, y, x + w, y + h, accent);
    line(x + w, y + h, x, y + h, accent);
    line(x, y + h, x, y, accent);
  };
  const ring = (cx: number, cy: number, r: number, steps: number, accent = false) => {
    let px = cx + r;
    let py = cy;
    for (let i = 1; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const nx = cx + Math.cos(a) * r;
      const ny = cy + Math.sin(a) * r;
      line(px, py, nx, ny, accent);
      px = nx;
      py = ny;
    }
  };
  const poly = (pts: Array<[number, number]>, accent = false) => {
    for (let i = 0; i < pts.length - 1; i++) {
      line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], accent);
    }
  };
  const check = (cx: number, cy: number, accent = true) =>
    poly([[cx, cy], [cx + 0.025, cy + 0.04], [cx + 0.08, cy - 0.05]], accent);
  // Almenas: n merlones entre x0 y x1, base en y, altura h. Empieza y acaba en
  // merlón (esquinas hacia arriba) para un remate de torre limpio.
  const crenel = (x0: number, x1: number, y: number, h: number, n: number, accent = false) => {
    const u = (x1 - x0) / (2 * n - 1);
    const pts: Array<[number, number]> = [[x0, y]];
    for (let i = 0; i < 2 * n - 1; i++) {
      const yy = i % 2 === 0 ? y - h : y;
      pts.push([x0 + i * u, yy], [x0 + (i + 1) * u, yy]);
    }
    pts.push([x1, y]);
    poly(pts, accent);
  };
  // Almenas marcadas: línea de remate sólida + n merlones anchos (cajas abiertas
  // por abajo) bien separados. Lee más limpio que crenel a tamaño pequeño.
  const battlement = (x0: number, x1: number, y: number, h: number, n: number, accent = false) => {
    line(x0, y, x1, y, accent);
    const total = x1 - x0;
    const mw = total * 0.26;
    const gap = n > 1 ? (total - n * mw) / (n - 1) : 0;
    for (let i = 0; i < n; i++) {
      const mx0 = x0 + i * (mw + gap);
      poly([[mx0, y], [mx0, y - h], [mx0 + mw, y - h], [mx0 + mw, y]], accent);
    }
  };

  switch (variant) {
    // Gráfico de posiciones en ascenso (SEO/GEO): ejes, barras crecientes y flecha de tendencia
    case 'bars': {
      line(0.10, 0.14, 0.10, 0.86);
      line(0.10, 0.86, 0.92, 0.86);
      rect(0.17, 0.70, 0.10, 0.16);
      rect(0.32, 0.58, 0.10, 0.28);
      rect(0.47, 0.46, 0.10, 0.40);
      rect(0.62, 0.34, 0.10, 0.52);
      rect(0.77, 0.22, 0.10, 0.64, true);
      line(0.12, 0.74, 0.86, 0.20, true);
      line(0.86, 0.20, 0.79, 0.22, true);
      line(0.86, 0.20, 0.83, 0.29, true);
      break;
    }
    // Migración A → B: dos webs (la destino, mayor y en acento) unidas por una flecha
    case 'migrate': {
      rect(0.06, 0.30, 0.32, 0.40);
      line(0.11, 0.42, 0.30, 0.42);
      line(0.11, 0.52, 0.24, 0.52);
      rect(0.60, 0.24, 0.34, 0.52, true);
      line(0.66, 0.36, 0.86, 0.36, true);
      line(0.66, 0.46, 0.80, 0.46, true);
      line(0.40, 0.50, 0.56, 0.50, true);
      line(0.56, 0.50, 0.50, 0.46, true);
      line(0.56, 0.50, 0.50, 0.54, true);
      break;
    }
    // Marcador de ubicación (SEO local): trama de calles + pin con su punto central en acento.
    // `seed` (0-2) varía la trama de calles y la posición del pin para diferenciar ciudades.
    case 'map': {
      const s = ((seed % 3) + 3) % 3;
      if (s === 1) {
        line(0.10, 0.86, 0.90, 0.86);
        line(0.30, 0.74, 0.30, 0.95);
        line(0.30, 0.82, 0.86, 0.82);
        line(0.64, 0.74, 0.64, 0.95);
      } else if (s === 2) {
        line(0.14, 0.80, 0.86, 0.88);
        line(0.16, 0.92, 0.82, 0.84);
        line(0.52, 0.80, 0.58, 0.95);
      } else {
        line(0.12, 0.84, 0.88, 0.84);
        line(0.22, 0.92, 0.50, 0.78);
        line(0.50, 0.78, 0.84, 0.90);
        line(0.40, 0.84, 0.40, 0.92);
      }
      const px = s === 1 ? 0.40 : s === 2 ? 0.60 : 0.50;
      ring(px, 0.36, 0.16, 22);
      line(px - 0.095, 0.45, px, 0.70);
      line(px + 0.095, 0.45, px, 0.70);
      ring(px, 0.36, 0.055, 12, true);
      break;
    }
    // Red de nodos conectados (IA / GEO): nodo central en acento y cuatro satélites
    case 'nodes': {
      line(0.50, 0.50, 0.22, 0.26);
      line(0.50, 0.50, 0.80, 0.24);
      line(0.50, 0.50, 0.26, 0.78);
      line(0.50, 0.50, 0.78, 0.74);
      line(0.80, 0.24, 0.78, 0.74);
      ring(0.22, 0.26, 0.05, 12);
      ring(0.80, 0.24, 0.05, 12);
      ring(0.26, 0.78, 0.05, 12);
      ring(0.78, 0.74, 0.05, 12);
      ring(0.50, 0.50, 0.075, 16, true);
      break;
    }
    // Lupa sobre una lista de verificación (auditoría)
    case 'audit': {
      check(0.10, 0.30);
      line(0.21, 0.30, 0.60, 0.30);
      check(0.10, 0.44);
      line(0.21, 0.44, 0.52, 0.44);
      check(0.10, 0.58);
      line(0.21, 0.58, 0.58, 0.58);
      ring(0.70, 0.66, 0.18, 20);
      line(0.83, 0.79, 0.93, 0.92);
      break;
    }
    // Editor de código (desarrollo a medida): ventana con barra y líneas indentadas
    case 'code': {
      rect(0.10, 0.16, 0.80, 0.66);
      line(0.10, 0.30, 0.90, 0.30);
      ring(0.15, 0.23, 0.014, 6);
      ring(0.20, 0.23, 0.014, 6);
      ring(0.25, 0.23, 0.014, 6);
      line(0.16, 0.41, 0.40, 0.41);
      line(0.22, 0.50, 0.56, 0.50, true);
      line(0.22, 0.59, 0.46, 0.59);
      line(0.16, 0.68, 0.36, 0.68);
      break;
    }
    // Escudo con marca de verificación (mantenimiento)
    case 'shield': {
      poly([
        [0.50, 0.12],
        [0.82, 0.24],
        [0.82, 0.52],
        [0.74, 0.68],
        [0.50, 0.86],
        [0.26, 0.68],
        [0.18, 0.52],
        [0.18, 0.24],
        [0.50, 0.12],
      ]);
      poly([[0.36, 0.46], [0.46, 0.58], [0.66, 0.34]], true);
      break;
    }
    // Valencia — Torres de Serranos: dos torres almenadas y una puerta central con arco
    case 'valencia': {
      line(0.08, 0.90, 0.92, 0.90);
      // Torre izquierda
      line(0.12, 0.90, 0.12, 0.30);
      line(0.36, 0.90, 0.36, 0.30);
      battlement(0.12, 0.36, 0.30, 0.06, 3);
      line(0.12, 0.44, 0.36, 0.44);
      rect(0.19, 0.52, 0.10, 0.15);
      // Torre derecha
      line(0.64, 0.90, 0.64, 0.30);
      line(0.88, 0.90, 0.88, 0.30);
      battlement(0.64, 0.88, 0.30, 0.06, 3);
      line(0.64, 0.44, 0.88, 0.44);
      rect(0.71, 0.52, 0.10, 0.15);
      // Cuerpo central (puerta), más bajo
      battlement(0.36, 0.64, 0.48, 0.045, 3);
      // Arco de entrada (acento)
      line(0.44, 0.90, 0.44, 0.68, true);
      poly([[0.44, 0.68], [0.47, 0.635], [0.50, 0.625], [0.53, 0.635], [0.56, 0.68]], true);
      line(0.56, 0.90, 0.56, 0.68, true);
      break;
    }
    // Alicante — Castillo de Santa Bárbara: fortaleza almenada sobre el monte Benacantil
    case 'alicante': {
      line(0.04, 0.90, 0.96, 0.90);
      // Ladera del monte
      poly([[0.04, 0.90], [0.30, 0.60], [0.42, 0.56], [0.64, 0.56], [0.80, 0.68], [0.96, 0.90]]);
      // Torre del homenaje
      line(0.42, 0.56, 0.42, 0.34);
      line(0.54, 0.56, 0.54, 0.34);
      crenel(0.42, 0.54, 0.34, 0.04, 2);
      rect(0.46, 0.44, 0.04, 0.09, true);
      // Asta y bandera (acento)
      line(0.48, 0.30, 0.48, 0.24, true);
      poly([[0.48, 0.24], [0.53, 0.262], [0.48, 0.285]], true);
      // Muralla a la derecha de la torre
      line(0.54, 0.46, 0.66, 0.46);
      line(0.66, 0.46, 0.66, 0.56);
      crenel(0.54, 0.66, 0.46, 0.035, 2);
      break;
    }
    // Castellón — El Fadrí: campanario octogonal exento, esbelto, con reloj
    case 'castellon': {
      line(0.22, 0.90, 0.78, 0.90);
      // Fuste ligeramente troncocónico
      line(0.40, 0.90, 0.43, 0.20);
      line(0.60, 0.90, 0.57, 0.20);
      // Cuerpos (divisiones horizontales)
      line(0.415, 0.38, 0.585, 0.38);
      line(0.405, 0.54, 0.595, 0.54);
      line(0.40, 0.70, 0.60, 0.70);
      // Balaustrada superior (almenas pequeñas)
      crenel(0.43, 0.57, 0.20, 0.035, 3);
      // Reloj (acento)
      ring(0.50, 0.30, 0.045, 12, true);
      // Ventana del campanario
      rect(0.46, 0.44, 0.08, 0.08);
      // Puerta
      rect(0.455, 0.78, 0.09, 0.12);
      break;
    }
    // Esqueleto de una landing: nav, hero (texto + imagen) y fila de tres tarjetas
    case 'wireframe':
    default: {
      line(0, 0.05, 0.13, 0.05);
      line(0.55, 0.05, 0.66, 0.05);
      line(0.70, 0.05, 0.80, 0.05);
      line(0.84, 0.05, 0.95, 0.05);
      line(0, 0.27, 0.46, 0.27);
      line(0, 0.34, 0.34, 0.34);
      line(0, 0.42, 0.40, 0.42);
      rect(0, 0.50, 0.17, 0.07);
      rect(0.56, 0.22, 0.44, 0.34);
      line(0.62, 0.49, 0.72, 0.40);
      line(0.72, 0.40, 0.82, 0.49);
      for (const cx of [0, 0.35, 0.70]) {
        rect(cx, 0.67, 0.30, 0.26);
        line(cx + 0.04, 0.72, cx + 0.20, 0.72);
      }
      break;
    }
  }

  return segs;
}

/**
 * "Campo orgánico que se ordena": flow field generativo en Canvas 2D.
 *
 * En reposo, trazos finos de tinta derivan sobre el fondo crema (con una pequeña
 * proporción en verde). De forma cíclica, las partículas convergen y trazan una
 * figura —según `variant`— que representa el servicio de la página, y después se
 * dispersan de nuevo. Sin dependencias externas.
 *
 * Salvaguardas de rendimiento:
 * - rAF pausado cuando el canvas sale del viewport o la pestaña se oculta
 * - dpr limitado a 2
 * - prefers-reduced-motion: render estático de la figura ya formada, sin animación
 */
export default function GenerativeCanvas({
  className,
  density = 150,
  accentRatio = 0.08,
  ariaLabel,
  variant = 'wireframe',
  seed = 0,
}: GenerativeCanvasProps) {
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

    const rawSegments = geometryFor(variant, seed);

    // Geometría escalada al canvas + longitudes acumuladas
    let segments: Segment[] = [];
    let cumulativeLen: number[] = [];
    let totalLen = 0;

    // Reloj propio acumulado (inmune a pausas) que gobierna el ciclo de fases
    let clock = 0;
    let lastTs = 0;

    // Duración de cada fase del ciclo (ms): deriva → forma → mantiene → dispersa
    const PHASE_FLOW = 4800;
    const PHASE_FORM = 2600;
    const PHASE_HOLD = 4200;
    const PHASE_RELEASE = 2400;
    const LOOP = PHASE_FLOW + PHASE_FORM + PHASE_HOLD + PHASE_RELEASE;

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

    const buildSegments = () => {
      const pad = 0.07;
      const mapX = (x: number) => (pad + x * (1 - 2 * pad)) * width;
      const mapY = (y: number) => (pad + y * (1 - 2 * pad)) * height;

      segments = rawSegments.map((s) => {
        const ax = mapX(s.x1);
        const ay = mapY(s.y1);
        const bx = mapX(s.x2);
        const by = mapY(s.y2);
        return { ax, ay, bx, by, len: Math.hypot(bx - ax, by - ay), accent: !!s.accent };
      });

      cumulativeLen = [];
      totalLen = 0;
      for (const s of segments) {
        totalLen += s.len;
        cumulativeLen.push(totalLen);
      }
    };

    // Elige un segmento con probabilidad proporcional a su longitud (reparto uniforme de tinta)
    const pickSegment = (): number => {
      if (totalLen === 0) return 0;
      const target = Math.random() * totalLen;
      let lo = 0;
      let hi = cumulativeLen.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (cumulativeLen[mid] < target) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    };

    const spawnParticle = (): Particle => {
      const seg = pickSegment();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        accent: segments[seg]?.accent || Math.random() < accentRatio,
        seg,
        t: Math.random(),
      };
    };

    const resetParticles = () => {
      particles = Array.from({ length: density }, spawnParticle);
    };

    const paintBackground = (alpha: number) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
    };

    /**
     * Avanza y dibuja una partícula. `formStrength` (0-1) mezcla el campo de
     * ruido con la adherencia al segmento de la figura: 0 = deriva libre,
     * 1 = recorre y traza su línea.
     */
    const stepParticle = (p: Particle, stepLength: number, formStrength: number) => {
      const angle = fieldAngle(p.x, p.y, zOffset);
      let nx = p.x + Math.cos(angle) * stepLength;
      let ny = p.y + Math.sin(angle) * stepLength;

      if (formStrength > 0.001 && segments.length > 0) {
        const s = segments[p.seg];
        // Desliza el ancla a lo largo del segmento para que la partícula lo recorra
        p.t += (stepLength / Math.max(s.len, 1)) * 0.85;
        if (p.t >= 1) {
          p.t -= 1;
          // Al reiniciar el recorrido, salta al inicio sin dibujar el trazo de retorno
          if (formStrength > 0.5) {
            p.x = s.ax + (s.bx - s.ax) * p.t;
            p.y = s.ay + (s.by - s.ay) * p.t;
            return;
          }
        }
        const ax = s.ax + (s.bx - s.ax) * p.t;
        const ay = s.ay + (s.by - s.ay) * p.t;
        // Persigue el ancla y mezcla con la deriva según la fuerza de formación
        const cx = p.x + (ax - p.x) * 0.18;
        const cy = p.y + (ay - p.y) * 0.18;
        nx = nx + (cx - nx) * formStrength;
        ny = ny + (cy - ny) * formStrength;
      }

      ctx.strokeStyle = p.accent ? accentColor : inkColor;
      ctx.globalAlpha = p.accent ? 0.5 : 0.09 + 0.16 * formStrength;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      ctx.globalAlpha = 1;

      p.x = nx;
      p.y = ny;

      // Solo se reabsorbe al salir de cuadro mientras deriva (no durante la formación)
      if (
        formStrength < 0.4 &&
        (p.x < -10 || p.x > width + 10 || p.y < -10 || p.y > height + 10)
      ) {
        Object.assign(p, spawnParticle());
      }
    };

    // Estado del ciclo a partir del reloj acumulado
    const phaseAt = (t: number): { formStrength: number; fade: number } => {
      const local = t % LOOP;
      let formStrength: number;
      if (local < PHASE_FLOW) {
        formStrength = 0;
      } else if (local < PHASE_FLOW + PHASE_FORM) {
        formStrength = smooth((local - PHASE_FLOW) / PHASE_FORM);
      } else if (local < PHASE_FLOW + PHASE_FORM + PHASE_HOLD) {
        formStrength = 1;
      } else {
        formStrength = 1 - smooth((local - PHASE_FLOW - PHASE_FORM - PHASE_HOLD) / PHASE_RELEASE);
      }
      // Velo de fondo: más tenue cuando hay figura (la deja asentarse), más fuerte al dispersar
      const fade = 0.02 - 0.009 * formStrength;
      return { formStrength, fade };
    };

    const frame = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = Math.min(ts - lastTs, 50);
      lastTs = ts;
      clock += dt;

      const { formStrength, fade } = phaseAt(clock);
      paintBackground(fade);
      zOffset += 0.0015;
      for (const p of particles) stepParticle(p, 1.6, formStrength);
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reducedMotionQuery.matches) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    // Versión estática para prefers-reduced-motion: figura ya formada, un solo render
    const renderStatic = () => {
      stop();
      paintBackground(1);
      const staticParticles = Array.from({ length: density * 2 }, spawnParticle);
      for (const p of staticParticles) {
        const s = segments[p.seg];
        if (s) {
          p.x = s.ax;
          p.y = s.ay;
          p.t = 0;
        }
        for (let i = 0; i < 70; i++) stepParticle(p, 1.6, 1);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildSegments();
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
  }, [density, accentRatio, variant, seed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label={ariaLabel ?? DEFAULT_ARIA[variant]}
    />
  );
}
