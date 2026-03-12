"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const tabs = [
  { id: 'diseno-web', label: 'Diseño web' },
  { id: 'geo-seo', label: 'Servicios GEO y SEO' },
  { id: 'mantenimiento', label: 'Mantenimiento' }
];

export default function PricingTabs() {
  const [activeTab, setActiveTab] = useState('diseno-web');
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveTab(id);
            // Scroll tab into view if needed
            const tabElement = document.querySelector(`[data-tab-id="${id}"]`);
            if (tabElement) {
              tabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
          }
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

    tabs.forEach(tab => {
      const element = document.getElementById(tab.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pricing-tabs" role="navigation" aria-label="Selector de servicios">
      <div className="container pricing-tabs__container" ref={tabsContainerRef}>
        {tabs.map(tab => (
          <Link 
            key={tab.id}
            href={`#${tab.id}`} 
            className={`pricing-tab ${activeTab === tab.id ? 'pricing-tab--active' : ''}`}
            data-tab-id={tab.id}
            onClick={(e) => {
              e.preventDefault();
              handleClick(tab.id);
            }}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
