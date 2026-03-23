"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface MetricProps {
  label: string;
  value: number;
  offset: number;
  animatedValue: number;
  animatedOffset: number;
}

const CIRCLE_LENGTH = 213.6;
const INITIAL_ANIMATION_BASE_MS = 1300;
const INITIAL_ANIMATION_STAGGER_MS = 130;

function clampMetric(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function calculateOffset(value: number): number {
  return (CIRCLE_LENGTH * (100 - clampMetric(value))) / 100;
}

function PageSpeedCircle({ label, value, animatedValue, animatedOffset }: MetricProps) {
  return (
    <div className="pagespeed-item">
      <div className="pagespeed-circle" aria-label={`${label}: ${value}`}>
        <svg viewBox="0 0 80 80">
          <circle className="bg" cx="40" cy="40" r="34" />
          <circle 
            className="progress" 
            cx="40" 
            cy="40" 
            r="34" 
            style={{ 
              strokeDasharray: CIRCLE_LENGTH.toString(),
              strokeDashoffset: animatedOffset.toString(),
            }} 
          />
        </svg>
        <span className="pagespeed-value">{animatedValue}</span>
      </div>
      <span className="pagespeed-label">{label}</span>
    </div>
  );
}

export default function PagespeedMetrics({ seo = 100, performance: performanceScore = 100, bestPractices = 98, accessibility = 100 }: { seo?: number, performance?: number, bestPractices?: number, accessibility?: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafIdsRef = useRef<number[]>([]);
  const hasPlayedInitialRef = useRef(false);
  const metrics = useMemo(() => {
    return [
      { label: 'SEO', value: clampMetric(seo), offset: calculateOffset(seo) },
      { label: 'Rendimiento', value: clampMetric(performanceScore), offset: calculateOffset(performanceScore) },
      { label: 'Prácticas', value: clampMetric(bestPractices), offset: calculateOffset(bestPractices) },
      { label: 'Accesibilidad', value: clampMetric(accessibility), offset: calculateOffset(accessibility) },
    ];
  }, [seo, performanceScore, bestPractices, accessibility]);
  const [animatedValues, setAnimatedValues] = useState<number[]>(() => metrics.map(() => 0));
  const [animatedOffsets, setAnimatedOffsets] = useState<number[]>(() => metrics.map(() => CIRCLE_LENGTH));

  const cancelMetricAnimation = useCallback((index: number) => {
    const id = rafIdsRef.current[index];
    if (id) {
      cancelAnimationFrame(id);
      rafIdsRef.current[index] = 0;
    }
  }, []);

  const animateMetric = useCallback((index: number, durationMs = 1100) => {
    const targetValue = metrics[index].value;
    const targetOffset = metrics[index].offset;
    cancelMetricAnimation(index);
    setAnimatedValues(prev => {
      const next = [...prev];
      next[index] = 0;
      return next;
    });
    setAnimatedOffsets(prev => {
      const next = [...prev];
      next[index] = CIRCLE_LENGTH;
      return next;
    });

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(targetValue * eased);
      const currentOffset = CIRCLE_LENGTH - (CIRCLE_LENGTH - targetOffset) * eased;

      setAnimatedValues(prev => {
        const next = [...prev];
        next[index] = currentValue;
        return next;
      });
      setAnimatedOffsets(prev => {
        const next = [...prev];
        next[index] = currentOffset;
        return next;
      });

      if (progress < 1) {
        rafIdsRef.current[index] = requestAnimationFrame(tick);
      } else {
        setAnimatedValues(prev => {
          const next = [...prev];
          next[index] = targetValue;
          return next;
        });
        setAnimatedOffsets(prev => {
          const next = [...prev];
          next[index] = targetOffset;
          return next;
        });
        rafIdsRef.current[index] = 0;
      }
    };

    rafIdsRef.current[index] = requestAnimationFrame(tick);
  }, [cancelMetricAnimation, metrics]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      const reducedMotionRaf = requestAnimationFrame(() => {
        setAnimatedValues(metrics.map(metric => metric.value));
        setAnimatedOffsets(metrics.map(metric => metric.offset));
      });
      hasPlayedInitialRef.current = true;
      return () => cancelAnimationFrame(reducedMotionRaf);
    }

    const node = containerRef.current;
    if (!node) return;
    const rafIds = rafIdsRef.current;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting || hasPlayedInitialRef.current) return;
        hasPlayedInitialRef.current = true;
        metrics.forEach((_, index) => {
          animateMetric(index, INITIAL_ANIMATION_BASE_MS + index * INITIAL_ANIMATION_STAGGER_MS);
        });
        observer.disconnect();
      },
      { threshold: 0.45 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      rafIds.forEach(id => {
        if (id) cancelAnimationFrame(id);
      });
    };
  }, [animateMetric, metrics]);

  useEffect(() => {
    if (!hasPlayedInitialRef.current) return;
    const syncRaf = requestAnimationFrame(() => {
      setAnimatedValues(metrics.map(metric => metric.value));
      setAnimatedOffsets(metrics.map(metric => metric.offset));
    });
    return () => cancelAnimationFrame(syncRaf);
  }, [metrics]);

  return (
    <div className="pagespeed-container" ref={containerRef}>
      {metrics.map((metric, index) => (
        <PageSpeedCircle
          key={metric.label}
          {...metric}
          animatedValue={animatedValues[index] ?? 0}
          animatedOffset={animatedOffsets[index] ?? CIRCLE_LENGTH}
        />
      ))}
    </div>
  );
}
