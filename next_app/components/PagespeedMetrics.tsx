import React from 'react';

interface MetricProps {
  label: string;
  value: number;
  offset: number;
}

function PageSpeedCircle({ label, value, offset }: MetricProps) {
  return (
    <div className="pagespeed-item">
      <div className="pagespeed-circle">
        <svg viewBox="0 0 80 80">
          <circle className="bg" cx="40" cy="40" r="34" />
          <circle 
            className="progress" 
            cx="40" 
            cy="40" 
            r="34" 
            style={{ 
              strokeDasharray: '213.6', 
              strokeDashoffset: offset.toString() 
            }} 
          />
        </svg>
        <span className="pagespeed-value">{value}</span>
      </div>
      <span className="pagespeed-label">{label}</span>
    </div>
  );
}

export default function PagespeedMetrics({ seo = 100, performance = 100, bestPractices = 98, accessibility = 100 }: { seo?: number, performance?: number, bestPractices?: number, accessibility?: number }) {
  const calculateOffset = (val: number) => {
    // 213.6 es la circunferencia total (dasharray)
    // val 100 -> offset 0
    // val 0 -> offset 213.6
    return (213.6 * (100 - val)) / 100;
  };

  const metrics = [
    { label: 'SEO', value: seo, offset: calculateOffset(seo) },
    { label: 'Rendimiento', value: performance, offset: calculateOffset(performance) },
    { label: 'Prácticas', value: bestPractices, offset: calculateOffset(bestPractices) },
    { label: 'Accesibilidad', value: accessibility, offset: calculateOffset(accessibility) },
  ];

  return (
    <div className="pagespeed-container">
      {metrics.map((metric, index) => (
        <PageSpeedCircle key={index} {...metric} />
      ))}
    </div>
  );
}
