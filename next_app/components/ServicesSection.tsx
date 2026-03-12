import React from 'react';
import { Zap, Code, Search, Cpu } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  colorClass: string;
  featured?: boolean;
}

export function ServiceCard({ title, description, tags, icon: Icon, colorClass, featured }: ServiceCardProps) {
  return (
    <article className={`service-card ${featured ? 'service-card--featured' : ''} animate-on-scroll`}>
      <div className={`service-card__icon-wrapper ${colorClass}`}>
        <Icon size={24} strokeWidth={2} />
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__description">{description}</p>
      <div className="service-card__tags">
        {tags.map((tag, index) => (
          <span key={index} className="service-card__tag">{tag}</span>
        ))}
      </div>
    </article>
  );
}

export default function ServicesSection() {
  return (
    <section id="servicios" className="section">
      <div className="container">
        {/* Section Header */}
        <header className="section-header animate-on-scroll">
          <h2 className="section-header__title">Soluciones de Autoridad Digital</h2>
          <p className="section-header__subtitle">
            Ingeniería y estrategia para liderar las respuestas de la Inteligencia Artificial
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-3">
          {/* Servicio Destacado */}
          <ServiceCard
            title="Ecosistema Digital Pro"
            description="La integración total de ingeniería, autoridad y procesos inteligentes. Fusionamos rendimiento extremo, arquitectura semántica y flujos autónomos en una infraestructura única. No es una web; es el activo más potente de tu negocio."
            featured
            icon={Zap}
            colorClass="service-card__icon-wrapper--purple"
            tags={["SIR 62%", "Arquitectura de Entidades", "Escalabilidad Total"]}
          />

          {/* Pilar 1 */}
          <ServiceCard
            title="Arquitectura Performance-First"
            description="Código limpio, velocidad extrema y cero deuda técnica. Sitios ultra-rápidos optimizados para Core Web Vitals, diseñados para que usuarios y algoritmos naveguen sin fricción."
            icon={Code}
            colorClass="service-card__icon-wrapper--blue"
            tags={["Lighthouse 95+", "JS Vanilla", "LCP < 2s"]}
          />

          {/* Pilar 2 */}
          <ServiceCard
            title="Visibilidad Local y Generativa"
            description="Hago que tu marca sea la respuesta. Optimizo tu presencia para liderar el SEO Local y garantizo que los modelos de lenguaje (ChatGPT, Perplexity...) te citen como fuente de autoridad."
            icon={Search}
            colorClass="service-card__icon-wrapper--cyan"
            tags={["GEO Optimization", "Entidades Semánticas", "Google Maps"]}
          />

          {/* Pilar 3 */}
          <ServiceCard
            title="Ingeniería de Flujos y Agentes IA"
            description="Diseño cerebros operativos con n8n. Desde agentes autónomos para gestión de clientes hasta flujos complejos que conectan tus herramientas y automatizan tu toma de decisiones."
            icon={Cpu}
            colorClass="service-card__icon-wrapper--purple"
            tags={["Agentes IA", "Flujos n8n", "Eficiencia Operativa"]}
          />
        </div>

        {/* Footer de Sección */}
        <div className="services-footer animate-on-scroll">
          <p className="services-footer__text">
            No solo construyo código; construyo la autoridad que las IAs necesitan para confiar en tu marca. <strong>SIR del 62% probado en proyectos reales.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
