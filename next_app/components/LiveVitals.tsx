'use client';

import React from 'react';

type VitalState = {
  lcp?: number;
  cls?: number;
  inp?: number;
  load?: number;
};

type MetricDef = {
  key: keyof VitalState;
  label: string;
  description: string;
  format: (value: number) => string;
  goodBelow: number;
  goodLabel: string;
};

const METRICS: MetricDef[] = [
  {
    key: 'lcp',
    label: 'Carga (LCP)',
    description: 'Cuánto tarda en pintarse el contenido principal.',
    format: (v) => `${(v / 1000).toFixed(1).replace('.', ',')} s`,
    goodBelow: 2500,
    goodLabel: 'menos de 2,5 s',
  },
  {
    key: 'cls',
    label: 'Estabilidad (CLS)',
    description: 'Cuánto salta el contenido mientras navegas.',
    format: (v) => v.toFixed(3).replace('.', ','),
    goodBelow: 0.1,
    goodLabel: 'menos de 0,1',
  },
  {
    key: 'inp',
    label: 'Respuesta (INP)',
    description: 'Cuánto tarda la página en responder a tus interacciones.',
    format: (v) => `${Math.round(v)} ms`,
    goodBelow: 200,
    goodLabel: 'menos de 200 ms',
  },
  {
    key: 'load',
    label: 'Carga completa',
    description: 'Tiempo hasta que tu navegador terminó de cargarlo todo.',
    format: (v) => `${(v / 1000).toFixed(1).replace('.', ',')} s`,
    goodBelow: 3000,
    goodLabel: 'menos de 3 s',
  },
];

export default function LiveVitals() {
  const [vitals, setVitals] = React.useState<VitalState>({});

  React.useEffect(() => {
    const observers: PerformanceObserver[] = [];

    // LCP: última entrada largest-contentful-paint antes de interacción
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) setVitals((v) => ({ ...v, lcp: last.startTime }));
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      observers.push(lcpObserver);
    } catch { /* sin soporte (Safari): se omite la métrica */ }

    // CLS: suma acumulada de layout-shift sin input reciente
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceEntry[]) {
          const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
          if (!shift.hadRecentInput) clsValue += shift.value;
        }
        setVitals((v) => ({ ...v, cls: clsValue }));
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      // CLS = 0 es un resultado válido: inicializar aunque no haya entradas
      setVitals((v) => ({ ...v, cls: clsValue }));
      observers.push(clsObserver);
    } catch { /* sin soporte: se omite */ }

    // INP (aproximación para visualización): mayor duración de interacción
    try {
      let maxDuration = 0;
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > maxDuration) maxDuration = entry.duration;
        }
        if (maxDuration > 0) setVitals((v) => ({ ...v, inp: maxDuration }));
      });
      inpObserver.observe({ type: 'event', buffered: true, durationThreshold: 40 } as PerformanceObserverInit);
      observers.push(inpObserver);
    } catch { /* sin soporte: se omite */ }

    // Carga completa: navigation timing (soporte universal)
    const setLoad = () => {
      const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (nav && nav.loadEventEnd > 0) {
        setVitals((v) => ({ ...v, load: nav.loadEventEnd }));
        return true;
      }
      return false;
    };
    let loadTimer: ReturnType<typeof setInterval> | undefined;
    if (!setLoad()) {
      loadTimer = setInterval(() => { if (setLoad()) clearInterval(loadTimer); }, 500);
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      if (loadTimer) clearInterval(loadTimer);
    };
  }, []);

  const available = METRICS.filter((m) => vitals[m.key] !== undefined);

  return (
    <div className="vitals" role="group" aria-label="Métricas de rendimiento medidas en tu navegador">
      <div className="vitals__grid">
        {METRICS.map((metric) => {
          const value = vitals[metric.key];
          const measured = value !== undefined;
          const good = measured && (value as number) < metric.goodBelow;
          return (
            <div key={metric.key} className="vitals__metric">
              <p className="vitals__label">{metric.label}</p>
              <p className="vitals__value">
                {measured ? metric.format(value as number) : '—'}
              </p>
              <p className={`vitals__status ${measured ? (good ? 'vitals__status--good' : 'vitals__status--warn') : ''}`}>
                {measured
                  ? good
                    ? `Bueno · objetivo: ${metric.goodLabel}`
                    : `Mejorable · objetivo: ${metric.goodLabel}`
                  : 'Midiendo…'}
              </p>
              <p className="vitals__description">{metric.description}</p>
            </div>
          );
        })}
      </div>
      <p className="vitals__footnote">
        {available.length > 0
          ? 'Medido ahora mismo en tu navegador con las APIs de rendimiento nativas. Sin servicios externos: los datos no salen de tu dispositivo. La estabilidad y la respuesta se siguen actualizando mientras navegas.'
          : 'Tu navegador no expone las APIs de medición de rendimiento; prueba desde Chrome o Edge para ver los datos en directo.'}
      </p>
    </div>
  );
}
