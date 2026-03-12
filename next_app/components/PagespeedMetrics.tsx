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

export default function PagespeedMetrics() {
  const metrics = [
    { label: 'SEO', value: 100, offset: 0 },
    { label: 'Rendimiento', value: 100, offset: 4.2 },
    { label: 'Prácticas', value: 98, offset: 8.5 },
    { label: 'Accesibilidad', value: 97, offset: 14.9 },
  ];

  return (
    <div className="pagespeed-container">
      {metrics.map((metric, index) => (
        <PageSpeedCircle key={index} {...metric} />
      ))}
    </div>
  );
}
