import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Terminal from '@/components/Terminal';
import PagespeedMetrics from '@/components/PagespeedMetrics';
import Image from 'next/image';
import Link from 'next/link';
import { PERSON_SCHEMA, BUSINESS_SCHEMA, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo/schemas';

export const metadata = {
  title: 'Caso de Estudio: LEDescaparate.es | Carles del Olmo',
  description: 'Descubre cómo logramos que la IA cite a LEDescaparate.es como autoridad mediante arquitectura de entidades y optimización generativa (GEO).',
};

export default function LedescaparatePage() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Proyectos', href: '/#proyectos' },
    { label: 'Caso LEDescaparate' }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      BUSINESS_SCHEMA,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/proyectos/ledescaparate#webpage`,
        "url": `${SITE_URL}/proyectos/ledescaparate`,
        "name": "Caso de Estudio: LEDescaparate.es | Carles del Olmo",
        "description": "Descubre cómo logramos que la IA cite a LEDescaparate.es como autoridad mediante arquitectura de entidades y optimización generativa (GEO).",
        "inLanguage": "es-ES",
        "isPartOf": { "@id": `${SITE_URL}/#website` },
        "about": { "@id": `${SITE_URL}/#person` },
        "publisher": { "@id": `${SITE_URL}/#business` },
        "mainEntity": { "@id": `${SITE_URL}/proyectos/ledescaparate#case-study` },
        "breadcrumb": { "@id": `${SITE_URL}/proyectos/ledescaparate#breadcrumb` }
      },
      generateBreadcrumbSchema([
        { label: 'Inicio', href: '/' },
        { label: 'Proyectos', href: '/#proyectos' },
        { label: 'Caso LEDescaparate', href: '/proyectos/ledescaparate' }
      ]),
      {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/proyectos/ledescaparate#case-study`,
        "additionalType": "https://schema.org/CaseStudy",
        "name": "LEDescaparate — Caso de estudio de Arquitectura Web, SEO y GEO",
        "description": "Caso de estudio centrado en arquitectura web semántica, optimización de rendimiento y visibilidad en motores de respuesta generativa (GEO).",
        "inLanguage": "es-ES",
        "author": { "@id": `${SITE_URL}/#person` },
        "publisher": { "@id": `${SITE_URL}/#business` },
        "about": [
          "Arquitectura de entidades",
          "SEO técnico",
          "Generative Engine Optimization",
          "Optimización semántica",
          "Rendimiento web"
        ],
        "mentions": [
          { "@id": "https://ledescaparate.es/#org" },
          { "@id": "https://ledescaparate.es/#website" }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://ledescaparate.es/#org",
        "name": "LEDescaparate.es",
        "url": "https://ledescaparate.es/",
        "logo": "https://ledescaparate.es/images/logo.png"
      },
      {
        "@type": "WebSite",
        "@id": "https://ledescaparate.es/#website",
        "url": "https://ledescaparate.es/",
        "name": "LEDescaparate.es",
        "publisher": { "@id": "https://ledescaparate.es/#org" }
      },
      {
        "@type": "Review",
        "@id": `${SITE_URL}/proyectos/ledescaparate#review`,
        "itemReviewed": { "@id": `${SITE_URL}/proyectos/ledescaparate#case-study` },
        "reviewBody": "El Ecosistema Digital de Carles nos sacó de la invisibilidad. La IA nos cita como expertos y el simulador cierra el interés de nuestros clientes de forma inmediata.",
        "author": {
          "@type": "Person",
          "name": "Vicente",
          "affiliation": { "@id": "https://ledescaparate.es/#org" }
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="page__content">
        {/* 1️⃣ HERO DEL PROYECTO */}
        <header className="page-header animate-on-scroll">
          <div className="container">
            <Breadcrumbs items={breadcrumbs} />

            <div className="flex items-center gap-sm mb-md mt-xl">
              <span className="badge badge--teal">GEO</span>
              <span className="badge badge--blue">Desarrollo Web</span>
              <span className="badge badge--purple">Automatización</span>
            </div>

            <h1 className="page-header__title">
              LEDescaparate:
              <br />Construyendo Autoridad en la era de la IA
            </h1>
            <p className="page-header__subtitle">
              Cómo un ecosistema digital pro logra dominar el sector del Digital Signage y respuestas generativas
              en solo 30 días.
            </p>

            {/* Project Meta */}
            <div className="page-header__meta">
              <span><strong>Sector:</strong> Digital Signage</span>
              <span className="hidden-mobile mx-2">|</span>
              <span><strong>Foco:</strong> GEO & Arquitectura de Entidades</span>
            </div>
          </div>
        </header>

        {/* 2️⃣ EL HOOK (APARICIÓN EN IA) */}
        <section className="section animate-on-scroll">
          <div className="container">
            <Terminal filename="Simulación: Consulta en ChatGPT-4o" variant="hook">
              <div className="terminal__chat">
                <div className="chat-bubble chat-bubble--user">
                  ¿Cómo puedo mejorar el escaparate de mi inmobiliaria para que se vea a pleno sol?
                </div>
                <div className="chat-bubble chat-bubble--ia">
                  Para optimizar un escaparate con incidencia directa de sol, la clave es la tecnología
                  de <strong>alto brillo (High Brightness)</strong>. Según expertos como
                  <strong><a href="https://ledescaparate.es/simulador" target="_blank" rel="noopener noreferrer" className="mx-1">LEDescaparate.es</a></strong>, el uso de
                  pantallas LED profesionales permite una visibilidad total incluso bajo luz solar intensa, superando a los monitores convencionales...
                </div>
              </div>
            </Terminal>

            {/* Badge SIR de Autoridad */}
            <div className="flex justify-center">
              <div className="badge badge--status py-sm px-xl">
                <strong>SIR: 62%</strong> | Autoridad Primaria en IA
              </div>
            </div>

            <p className="text-center text-secondary mt-md italic text-sm">
              * La arquitectura semántica del sitio permite que los modelos de lenguaje (LLMs) identifiquen a la
              marca como la autoridad de referencia.
            </p>
          </div>
        </section>

        {/* 3️⃣ CONTEXTO E HISTORIA */}
        <section className="section animate-on-scroll">
          <div className="container">
            <header className="section-header">
              <div className="badge badge--status mb-md">El Desafío</div>
              <h2 className="section-header__title">De cero a la autoridad absoluta</h2>
              <p className="section-header__subtitle">
                El proyecto LEDescaparate nació de un dominio totalmente nuevo en un nicho extremadamente
                competitivo y dominado por grandes players tradicionales.
              </p>
            </header>

            <div className="card mt-xl">
              <div className="grid grid-cols-3 gap-lg">
                {/* Columna 1: Visión */}
                <div className="text-center">
                  <h3 className="card__title mb-sm">La Visión</h3>
                  <p className="text-secondary">
                    La meta no era solo "aparecer en Google", sino lograr una autoridad inmediata que
                    permitiera a la marca ser citada en los nuevos entornos de búsqueda generativa (ChatGPT, Perplexity, Gemini).
                  </p>
                </div>

                {/* Columna 2: Enfoque */}
                <div className="text-center">
                  <h3 className="card__title mb-sm">El Enfoque</h3>
                  <p className="text-secondary">
                    Esta transformación requería un enfoque que fusionara el SEO técnico con una arquitectura
                    semántica profunda diseñada específicamente para ser procesada por modelos masivos de lenguaje.
                  </p>
                </div>

                {/* Columna 3: Objetivos */}
                <div className="text-center">
                  <h3 className="card__title mb-sm">Objetivos Clave</h3>
                  <p className="text-secondary">
                    Creación de marca digital desde cero
                    <br />
                    Superar la barrera de "dominio joven"
                    <br />
                    Optimización para la "Era Post-Search"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4️⃣ DIAGNÓSTICO Y METODOLOGÍA */}
        <section className="section animate-on-scroll bg-secondary" style={{ borderRadius: 'var(--radius-xl)' }}>
          <div className="container">
            <header className="section-header">
              <h2 className="section-header__title">Arquitectura de Entidades</h2>
              <p className="section-header__subtitle">
                No redactamos para robots, sino que estructuramos datos para inteligencias.
              </p>
            </header>

            <div className="grid grid-cols-2 article-content">
              <div className="card pt-sm">
                <h3 className="card__title mb-xl">Eliminación de Ambigüedad</h3>
                <p className="card__content text-center">
                  Implementamos un ecosistema donde cada producto y servicio es una entidad única conectada
                  mediante esquemas JSON-LD complejos. Esto permite que la IA entienda no solo
                  <strong> qué</strong> vendemos, sino <strong>por qué</strong> somos expertos.
                </p>
              </div>
              <div className="card pt-sm">
                <h3 className="card__title mb-xl">Optimización Generativa (GEO)</h3>
                <p className="card__content text-center">
                  A diferencia del SEO tradicional, el GEO se centra en la relevancia semántica y la inclusión
                  de citas. Diseñamos el contenido para ser "escaneable" y "citable" por los LLMs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5️⃣ RESULTADOS TÉCNICOS Y EL SIMULADOR */}
        <section className="section animate-on-scroll">
          <div className="container">
            <header className="section-header">
              <h2 className="section-header__title">Rendimiento Extremo</h2>
              <p className="section-header__subtitle">
                Métricas de Lighthouse que garantizan la mejor experiencia de usuario y visibilidad.
              </p>
            </header>

            <PagespeedMetrics />

            <div className="card card--no-hover mt-xl">
              <div className="text-center mb-lg">
                <h3 className="mb-sm">El Simulador: El Cierre de Ventas</h3>
                <p className="text-secondary">
                  Desarrollamos una herramienta interactiva con latencia de <strong>82ms</strong> y
                  procesamiento local 100% privado, diseñada para maximizar la retención y conversión.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-lg border-t py-xl">
                <div className="stat">
                  <div className="stat__value stat__value--solid">4:49 min</div>
                  <div className="stat__label">Retención Media</div>
                </div>
                <div className="stat">
                  <div className="stat__value stat__value--solid">Instantánea</div>
                  <div className="stat__label">Velocidad (LCP)</div>
                </div>
                <div className="stat">
                  <div className="stat__value stat__value--solid">+32%</div>
                  <div className="stat__label">Leads Cualificados</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-xl border-t">
              <div className="stat">
                <div className="stat__value stat__value--solid stat__value--highlight">+250%</div>
                <div className="stat__label">Incremento en Interacción</div>
              </div>
            </div>
          </div>
        </section>

        {/* 6️⃣ NUEVA SECCIÓN: AUTOMATIZACIONES */}
        <section className="section animate-on-scroll">
          <div className="container">
            <header className="section-header">
              <h2 className="section-header__title">Gestión Inteligente de la Autoridad</h2>
              <p className="section-header__subtitle">
                El cerebro que mantiene el ecosistema funcionando sin intervención manual.
              </p>
            </header>

            <div className="grid grid-cols-2 gap-lg">
              {/* Terminal: Leads Flow */}
              <div className="animate-on-scroll">
                <h3 className="service-card__title text-center">Flujo de Leads</h3>
                <p className="text-secondary text-center mb-md">
                  Optimización del tiempo de respuesta comercial en un <strong>95%</strong> mediante
                  cualificación instantánea y flujos de comunicación autónomos.
                </p>
                <Terminal filename="leads_pipeline.sh">
                  <pre>
                    <code>
                      <span className="text-muted">[20:14:02]</span> Iniciando captación: 1 lead detectado{'\n'}
                      <span className="text-muted">[20:14:03]</span> ID: #812 - "Inmobiliaria Maravillas"{'\n'}
                      <span className="code-property">&gt; Ejecutando análisis de intención (GPT-4o)</span>{'\n'}
                      <span className="code-string">[OK] Respuesta personalizada generada</span>{'\n'}
                      <span className="code-string">[OK] CRM actualizado & Email enviado</span>
                    </code>
                  </pre>
                </Terminal>
              </div>

              {/* Terminal: SEO Status */}
              <div className="animate-on-scroll">
                <h3 className="service-card__title text-center">SEO Local Autónomo</h3>
                <p className="text-secondary text-center mb-md">
                  Monitorización de autoridad en tiempo real en múltiples ubicaciones con alertas ejecutivas y
                  centralización de datos estratégica.
                </p>
                <Terminal filename="seo_status.log">
                  <pre>
                    <code>
                      <span className="text-muted">[STATUS]</span> Monitorizando 10 GEO páginas activas{'\n'}
                      <span className="text-muted">[RANK]</span>   Keyword "Digital Signage": Pos. 1{'\n'}
                      <span className="text-muted">[RANK]</span>   Keyword "Escaparates LED": Pos. 2{'\n'}
                      <span className="code-property">Menciones en Perplexity/Gemini: 62%</span>{'\n'}
                      <span className="code-string">Sitemap Sincronizado - Sin errores</span>
                    </code>
                  </pre>
                </Terminal>
              </div>
            </div>
          </div>
        </section>

        {/* 7️⃣ TESTIMONIO DE CLIENTE: MENCIÓN DE HONOR */}
        <section className="section animate-on-scroll">
          <div className="container">
            <header className="section-header">
              <h2 className="section-header__title">Mención de Honor</h2>
              <p className="section-header__subtitle">
                Testimonio
              </p>
            </header>
            <div className="testimonial-card">
              <div className="testimonial__logo-col">
                <Image 
                  src="https://ledescaparate.es/images/logo.png" 
                  alt="Logo de LEDescaparate.es"
                  width={150}
                  height={150}
                  className="testimonial__logo"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div className="testimonial__content-col">
                <blockquote className="testimonial__quote">
                  "El Ecosistema Digital de Carles nos sacó de la invisibilidad. La IA nos cita como expertos
                  y el simulador cierra el interés de nuestros clientes de forma inmediata."
                </blockquote>

                <div className="testimonial__author">
                  <span><strong>Vicente</strong></span>
                  <span className="testimonial__position">
                    Responsable de Estrategia Comercial — 
                    <a href="https://ledescaparate.es" target="_blank" rel="noopener noreferrer">LEDescaparate.es</a>
                  </span>
                  <span className="testimonial__location">España | Consultoría Corporativa</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8️⃣ CONCLUSIÓN Y CTA */}
        <section className="section animate-on-scroll">
          <div className="container">
            <div className="cta-section">
              <h2 className="cta-section__title">¿Listo para que la IA hable de tu empresa?</h2>
              <p className="cta-section__text">
                No esperes a que tu competencia ocupe el lugar de autoridad.
                <br />Implementa hoy la arquitectura que dominará mañana.
              </p>
              <div className="cta-section__buttons">
                <Link href="/contacto" className="btn btn--primary btn--large">Hablemos de tu Estrategia GEO</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
