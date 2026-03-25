import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Cpu, Network, Database, ShieldCheck, Zap, BrainCircuit, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Autoridad Digital para IAs | Carles del Olmo - SEO y GEO',
  description: 'Preparamos tu web para ser la fuente de confianza de los modelos de inteligencia artificial. Optimización de arquitectura, datos estructurados y semántica avanzada.',
  alternates: {
    canonical: 'https://carlesdelolmo.com/servicio-seo/autoridad-digital-ias',
  },
};

export default function AutoridadDigitalIas() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios SEO', href: '/pricing#geo-seo' },
    { label: 'Autoridad Digital para IAs' }
  ];

  const pillars = [
    {
      title: 'Arquitectura Técnica LLM-Ready',
      description: 'Estructuramos tu sitio para que sea fácilmente "escaneable" y comprensible por agentes de inteligencia artificial.',
      icon: Network,
      color: 'text-purple-400'
    },
    {
      title: 'Grafos de Conocimiento y Entidades',
      description: 'Definimos claramente quién es tu empresa, qué hace y para quién, estableciendo relaciones semánticas sólidas.',
      icon: Database,
      color: 'text-blue-400'
    },
    {
      title: 'Señales de Confianza (E-E-A-T)',
      description: 'Reforzamos las señales de Experiencia, Autoridad y Confianza para que las IAs te consideren una fuente fiable.',
      icon: ShieldCheck,
      color: 'text-cyan-400'
    }
  ];

  return (
    <main className="page__content">
      <Breadcrumbs items={breadcrumbs} />

      <section className="section">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <div className="badge badge--status mb-lg">
              <span>Optimización Avanzada</span>
            </div>
            <h1 className="section-header__title">Autoridad Digital para <span className="gradient-text">IAs</span></h1>
            <p className="section-header__subtitle">
              Convertimos tu sitio web en una fuente estructurada, fiable y prioritaria para los grandes modelos de lenguaje (LLMs).
            </p>
          </header>

          <div className="grid grid-cols-2 mt-2xl items-center gap-xl">
            <div className="animate-on-scroll">
              <h2 className="mb-lg">Habla el lenguaje de las máquinas</h2>
              <p className="text-secondary mb-lg">
                Las IAs no &quot;leen&quot; como los humanos, ni &quot;rastrean&quot; exactamente como Google. Buscan patrones semánticos, relaciones entre entidades y señales de veracidad en los datos.
              </p>
              <p className="text-secondary mb-xl">
                Nuestro servicio de Autoridad Digital prepara tu infraestructura para que cuando un usuario pregunte a su IA de confianza, tu marca sea la respuesta recomendada.
              </p>
              
              <div className="card card--no-hover p-lg border-purple-900/20 bg-dark-soft">
                <div className="flex items-center gap-4 mb-md">
                  <span className="text-2xl font-bold gradient-text">500€/mes</span>
                  <span className="text-muted text-sm">(Optimización de infraestructura semántica)</span>
                </div>
                <Link href="/contacto" data-primary-cta="true" className="btn btn--primary btn--block">Consultar disponibilidad</Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-md animate-on-scroll">
              {pillars.map((pillar, index) => (
                <article key={index} className="card p-lg flex items-start gap-4 glass-effect">
                  <div className={`${pillar.color} mt-1`}>
                    <pillar.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{pillar.title}</h3>
                    <p className="text-secondary text-sm">{pillar.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-dark-soft">
        <div className="container">
          <h2 className="text-center mb-xl">Nuestro enfoque tecnológico</h2>
          <div className="grid grid-cols-3 gap-lg">
            <div className="text-center animate-on-scroll">
              <div className="mb-md mx-auto w-12 h-12 flex items-center justify-center bg-purple-900/20 rounded-full text-purple-400">
                <BrainCircuit size={24} />
              </div>
              <h4 className="mb-2">Semántica Profunda</h4>
              <p className="text-xs text-secondary">Etiquetado JSON-LD avanzado para definir productos, servicios y áreas de experiencia.</p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="mb-md mx-auto w-12 h-12 flex items-center justify-center bg-blue-900/20 rounded-full text-blue-400">
                <Cpu size={24} />
              </div>
              <h4 className="mb-2">Optimización LLM</h4>
              <p className="text-xs text-secondary">Ajuste de contenido para ser fácilmente procesable por sistemas de recuperación aumentada (RAG).</p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="mb-md mx-auto w-12 h-12 flex items-center justify-center bg-cyan-900/20 rounded-full text-cyan-400">
                <Zap size={24} />
              </div>
              <h4 className="mb-2">Rendimiento Extremo</h4>
              <p className="text-xs text-secondary">Velocidad de respuesta que minimiza la latencia para crawlers y bots de IA.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Block */}
      <section className="section">
        <div className="container">
          <div className="article-box animate-on-scroll">
            <h3 className="mb-lg">¿Por qué es crítico para tu negocio?</h3>
            <p className="text-secondary mb-md">
              A medida que la búsqueda se vuelve conversacional, el tráfico directo desde Google disminuirá para consultas generales. La verdadera oportunidad reside en ser la <strong>fuente citada</strong> por la IA.
            </p>
            <p className="text-secondary">
              Si la IA no entiende quién eres o no confía en tus datos, simplemente no existirás en la respuesta que el usuario recibe. Nosotros evitamos que eso ocurra.
            </p>
            <div className="mt-xl">
               <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-purple-400" size={18} />
                    <span>Preparación para SearchGPT y OpenAI Operators.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-purple-400" size={18} />
                    <span>Mejora de la mención de marca en prompts complejos.</span>
                  </li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section">
        <div className="container text-center animate-on-scroll">
          <h2 className="mb-lg">Sé la autoridad que las IAs recomiendan</h2>
          <p className="text-secondary mb-xl max-w-2xl mx-auto">
            El futuro de la búsqueda es generativo. Prepara tu infraestructura técnica 
            para liderar esta nueva era digital.
          </p>
          <Link href="/contacto" data-primary-cta="true" className="btn btn--primary btn--large">Agendar consultoría técnica</Link>
        </div>
      </section>
    </main>
  );
}
