import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ProjectCard } from '@/components/ProjectsSection';
import FaqAccordion from '@/components/FaqAccordion';
import { Code, MapPin, Zap, Search, Layout, MousePointer2, Check, Shield, Gauge, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PERSON_SCHEMA, BUSINESS_SCHEMA, generateBreadcrumbSchema, generateFaqPageNode, SITE_URL } from '@/lib/seo/schemas';
import { safeJsonLd } from '@/lib/seo/jsonLd';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Diseño web en Valencia | Carles del Olmo - SEO y GEO',
  description: 'Diseño web estratégico en Valencia. Optimización para buscadores y motores de IA para destacar en la era digital.',
  exactUrl: `${SITE_URL}/diseno-web/valencia`,
});

export default function DisenoWebValencia() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Diseño web', href: '/diseno-web' },
    { label: 'Valencia' }
  ];

  const cityServices = [
    {
      title: 'Diseño web profesional',
      href: '/diseno-web',
      description: 'Construyo tu web de forma estratégica para que sea tu mejor herramienta de ventas en Valencia.',
      icon: Code,
      colorClass: 'service-card__icon-wrapper--purple'
    },
    {
      title: 'Diseño web Castellón',
      href: '/diseno-web/castellon',
      description: 'Diseño web profesional en Castellón con enfoque en resultados y experiencia de usuario optimizada.',
      icon: MapPin,
      colorClass: 'service-card__icon-wrapper--blue'
    },
    {
      title: 'Diseño web Alicante',
      href: '/diseno-web/alicante',
      description: 'Te ayudo a tener una web atractiva y funcional que capture la esencia de tu negocio en Alicante.',
      icon: Zap,
      colorClass: 'service-card__icon-wrapper--cyan'
    }
  ];

  const portfolio = [
    {
      title: "LEDescaparate",
      href: "/proyectos/ledescaparate",
      colorClass: "project-card__image--purple",
      image: "/assets/images/muestras/ledescaparate_muestra.webp",
      badges: [
        { text: "SEO", color: "badge--teal" },
        { text: "GEO", color: "badge--blue" },
        { text: "Diseño Web", color: "badge--purple" }
      ],
      description: "Web de captación de Leads optimizada para respuestas de IA con automatización de procesos. +\nAumento del +250% en tráfico orgánico desde ChatGPT y Perplexity."
    },
    {
      title: "CloudMetrics",
      href: "#contacto",
      colorClass: "project-card__image--blue",
      icon: "cloud" as const,
      badges: [
        { text: "GEO", color: "badge--purple" },
        { text: "SaaS", color: "badge--cyan" }
      ],
      description: "Plataforma SaaS con contenido estructurado para IAs.\nPrimera posición en respuestas de Gemini y Claude."
    },
    {
      title: "FinanceAI Hub",
      href: "#contacto",
      colorClass: "project-card__image--cyan",
      icon: "finance" as const,
      badges: [
        { text: "GEO", color: "badge--purple" },
        { text: "Startup", color: "badge--teal" }
      ],
      description: "Web financiera con datos estructurados para LLMs.\nCitado en más de 500 respuestas de IA mensuales."
    }
  ];

  const features = [
    {
      title: 'Personalización',
      description: 'Imagen corporativa coherente y fotografías propias que transmiten cercanía y profesionalidad real.',
      icon: Layout,
      color: 'service-card__icon-wrapper--purple'
    },
    {
      title: 'SEO-Friendly',
      description: 'Arquitectura diseñada para buscadores, asegurando que tu web sea fácilmente indexable y relevante.',
      icon: Search,
      color: 'service-card__icon-wrapper--blue'
    },
    {
      title: 'Autogestionable',
      description: 'Control total sobre tus contenidos. Actualiza textos e imágenes de forma sencilla sin depender de terceros.',
      icon: Settings,
      color: 'service-card__icon-wrapper--cyan'
    },
    {
      title: 'Responsive',
      description: 'Optimización perfecta para móviles y tablets. Tu web se verá impecable en cualquier pantalla.',
      icon: MousePointer2,
      color: 'service-card__icon-wrapper--blue'
    },
    {
      title: 'Velocidad y rendimiento',
      description: 'Webs optimizadas para cargar rápido y ofrecer una experiencia fluida que mejora SEO y conversiones.',
      icon: Gauge,
      color: 'service-card__icon-wrapper--cyan'
    },
    {
      title: 'Seguridad',
      description: 'Medidas técnicas avanzadas para proteger tu sitio y la información de tus clientes.',
      icon: Shield,
      color: 'service-card__icon-wrapper--purple'
    }
  ];

  const inclusions = [
    { title: 'Análisis y auditoría', desc: 'Keyword research exhaustivo desde el primer minuto.' },
    { title: 'Páginas optimizadas', desc: 'Configuración técnica avanzada para Rank Math y SEO.' },
    { title: 'SEO on-page', desc: 'Integración perfecta con Search Console y Sitemap.' },
    { title: 'Diseño móvil', desc: 'Experiencia premium en cualquier dispositivo.' },
    { title: 'Newsletter', desc: 'Conexión con Active Campaign, Brevo o Mailchimp.' },
    { title: 'Estrategia Blog', desc: 'Estructura preparada para marketing de contenidos.' },
    { title: 'Redes sociales', desc: 'Integración de perfiles y botones de compartir.' },
    { title: 'WhatsApp', desc: 'Canal directo de captación configurado.' },
  ];

  const keywords = [
    "Posicionamiento web Valencia", "SEO Valencia", "Empresa de diseño web en Valencia",
    "Diseñador web freelance Valencia", "Optimización web", "Diseño web profesional",
    "Agencia SEO Valencia", "Desarrollo web a medida", "Diseño de páginas web en Valencia",
    "Diseñador web Valencia", "Precio diseño web Valencia", "Creación de páginas web Valencia"
  ];

  const tools = [
    { name: 'Google Analytics 4', light: '/assets/images/logos-herramientas/logo-google-analytics-4.webp', dark: '/assets/images/logos-herramientas/logo-google-analytics-4-blanco.webp' },
    { name: 'Google', light: '/assets/images/logos-herramientas/logo-google.webp', dark: '/assets/images/logos-herramientas/logo-google-blanco.webp' },
    { name: 'Rank Math SEO', light: '/assets/images/logos-herramientas/logo-rank-math.webp', dark: '/assets/images/logos-herramientas/logo-rank-math-blanco.webp' },
    { name: 'Semrush', light: '/assets/images/logos-herramientas/logo-semrush.webp', dark: '/assets/images/logos-herramientas/logo-semrush-blanco.webp' },
    { name: 'Ahrefs', light: '/assets/images/logos-herramientas/logo-ahrefs.webp', dark: '/assets/images/logos-herramientas/logo-ahrefs-blanco.webp' },
    { name: 'Looker', light: '/assets/images/logos-herramientas/logo-looker.webp', dark: '/assets/images/logos-herramientas/logo-looker-blanco.webp' },
    { name: 'Search Console', light: '/assets/images/logos-herramientas/logo-google-search-console.webp', dark: '/assets/images/logos-herramientas/logo-google-search-console-blanco.webp' },
    { name: 'Gemini', light: '/assets/images/logos-herramientas/logo-gemini.webp', dark: '/assets/images/logos-herramientas/logo-gemini-blanco.webp' },
    { name: 'ChatGPT', light: '/assets/images/logos-herramientas/logo-chat-gpt.webp', dark: '/assets/images/logos-herramientas/logo-chat-gpt-blanco.webp' },
    { name: 'Claude', light: '/assets/images/logos-herramientas/logo-claude.webp', dark: '/assets/images/logos-herramientas/logo-claude-blanco.webp' },
  ];

  const faqs = [
    {
      question: '¿Cuánto tiempo se tarda en hacer mi web?',
      answer: 'Depende de la complejidad, pero una web corporativa estándar suele estar lista en unos 2 meses, asegurando todos los estándares de calidad y SEO.'
    },
    {
      question: '¿Qué precio tiene una página web profesional?',
      answer: 'Depende de páginas, objetivos y complejidad. Prefiero darte precio tras revisar tu caso: así el presupuesto es realista y alineado con resultados (no “plantillas” sin estrategia). Dar precios cerrados sin conocer el proyecto lleva a sorpresas. Conmigo esto no ocurre.'
    },
    {
      question: '¿Mi web será rápida y responsive?',
      answer: 'Absolutamente. Optimizo la velocidad de carga (Core Web Vitals) y garantizo que sea totalmente responsive para móviles y tablets. Esto es fundamental para el SEO y la experiencia de usuario. Si la web no es rápida y responsive, no posiciona en Google y los usuarios la abandonan.'
    },
    {
      question: '¿Incluye posicionamiento SEO?',
      answer: 'Sí, tu web incluye una estructura SEO técnica on-page desde el primer día, etiquetas optimizadas e indexación en Google.'
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      BUSINESS_SCHEMA,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/diseno-web/valencia#webpage`,
        "url": `${SITE_URL}/diseno-web/valencia`,
        "name": "Diseño web en Valencia preparado para buscadores e inteligencia artificial",
        "description": "Diseño y desarrollo web en Valencia con enfoque en arquitectura semántica, rendimiento (Core Web Vitals), SEO técnico y Generative Engine Optimization (GEO).",
        "isPartOf": { "@id": `${SITE_URL}/#website` },
        "breadcrumb": { "@id": `${SITE_URL}/diseno-web/valencia#breadcrumbs` }
      },
      generateBreadcrumbSchema([
        { label: 'Inicio', href: '/' },
        { label: 'Diseño web', href: '/diseno-web' },
        { label: 'Valencia', href: '/diseno-web/valencia' }
      ]),
      generateFaqPageNode(faqs, `${SITE_URL}/diseno-web/valencia#faq`)
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <main className="page__content">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <section id="inicio" className="section">
          <div className="container">
            <div className="grid grid-cols-2 mt-2xl">
              <div className="animate-on-scroll hero-content-wrapper">
                <div className="badge badge--status mb-lg helper-center-mobile">
                  <span>Especialista en Valencia</span>
                </div>

                <h1 className="mb-md helper-center-mobile">
                  Diseño web <span className="gradient-text">Valencia</span>, SEO y Optimización web
                </h1>

                <p className="text-secondary mb-xl helper-center-mobile">
                  Valencia es un ecosistema empresarial competitivo y cada vez más digital. En este contexto,
                  el diseño web en Valencia no puede limitarse a la estética: necesita arquitectura técnica,
                  rendimiento y optimización estratégica para destacar tanto en Google como en las respuestas
                  generadas por inteligencia artificial.
                </p>

                <div className="flex gap-md mb-xl helper-flex-center-mobile">
                  <Link href="#info" className="btn btn--primary btn--large">Diseño web Valencia</Link>
                </div>

                <div id="hero-checklist" className="hero-features grid grid-cols-2 gap-md mb-xl animate-on-scroll">
                  <div className="hero-features__item">
                    <span className="hero-features__icon-wrapper">
                      <Check size={20} strokeWidth={3} />
                    </span>
                    <span>Arquitectura + UX</span>
                  </div>
                  <div className="hero-features__item">
                    <span className="hero-features__icon-wrapper">
                      <Check size={20} strokeWidth={3} />
                    </span>
                    <span>SEO Local</span>
                  </div>
                  <div className="hero-features__item">
                    <span className="hero-features__icon-wrapper">
                      <Check size={20} strokeWidth={3} />
                    </span>
                    <span>GEO (IA)</span>
                  </div>
                </div>
              </div>

              <div className="animate-on-scroll flex flex-col justify-center pb-3xl hero-right-col hidden-mobile">
                <div className="relative w-full aspect-[3/2]">
                  <Image
                    src="/assets/images/stock/ciudad-artes-y-ciencias-valencia.webp"
                    alt="Ciudad de las Artes y las Ciencias de Valencia"
                    fill
                    className="img--responsive img--glass object-cover rounded-xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Servicios Geográficos */}
        <section id="servicios-geo" className="section bg-dark-soft">
          <div className="container">
            <header className="section-header animate-on-scroll">
              <h2 className="section-header__title">Servicios de Diseño Web Profesional</h2>
              <p className="section-header__subtitle">
                Soluciones digitales adaptadas a tu ubicación para dominar el mercado local.
              </p>
            </header>

            <div className="grid grid-cols-3">
              {cityServices.map((service, index) => (
                <article key={index} className="service-card animate-on-scroll">
                  <div className={`service-card__icon-wrapper ${service.colorClass}`}>
                    <service.icon size={24} />
                  </div>
                  <h3 className="service-card__title">
                    <Link href={service.href}>{service.title}</Link>
                  </h3>
                  <p className="service-card__description">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Intermedio */}
        <section id="info" className="section">
          <div className="container">
            <div className="cta-section animate-on-scroll">
              <h2 className="cta-section__title">Tu diseñador web en Valencia</h2>
              <p className="cta-section__text">
                Descubre cómo se realiza una web a medida, con una estructura SEO optimizada desde el primer día
                para maximizar tu visibilidad.
              </p>
              <div className="cta-section__buttons">
                <Link href="/contacto" className="btn btn--primary" data-primary-cta="true">Pide presupuesto</Link>
                <Link href="/contacto" className="btn btn--secondary" data-primary-cta="true">Contacto</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bloque Conceptual */}
        <section className="section bg-dark-soft">
          <div className="container">
            <header className="section-header animate-on-scroll">
              <h2 id="escaparate-digital" className="section-header__title">Diseño de páginas Web en Valencia</h2>
              <p className="section-header__subtitle">
                Estrategia digital y diseño de vanguardia para posicionar tu negocio en lo más alto.
              </p>
            </header>

            <div className="grid grid-cols-3 gap-xl items-center">
              <div className="animate-on-scroll flex justify-center">
                <div className="relative w-full aspect-[3/2] max-w-[300px]">
                  <Image
                    src="/assets/images/stock/bandera-valencia.webp"
                    alt="Bandera de la Comunitat Valenciana"
                    fill
                    className="img--responsive img--glass object-cover rounded-lg"
                  />
                </div>
              </div>

              <article className="article-content animate-on-scroll col-span-2">
                <div className="article-box">
                  <p>
                    ¿Necesitas una página web en Valencia? La página web de cualquier empresa en la actualidad
                    es su <strong>escaparate digital</strong>. Es el primer punto de contacto con tus clientes
                    potenciales y la herramienta principal para transmitir confianza y profesionalidad.
                  </p>
                  <p>
                    Teniendo en cuenta estas premisas, trabajo cada proyecto con una página web bonita,
                    sencilla y, sobre todo, pensada tanto para los <strong>usuarios</strong> como para los
                    <strong>algoritmos de búsqueda e IA</strong>.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="proyectos-valencia" className="section">
          <div className="container">
            <header className="section-header animate-on-scroll">
              <h2 className="section-header__title">¿Qué hago para trabajar cada web?</h2>
              <p className="section-header__subtitle">
                Algunos de mis trabajos de diseño Web para empresas en Valencia que ya están dominando su sector.
              </p>
            </header>

            <div className="grid grid-cols-3">
              {portfolio.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>

            <div className="flex justify-center mt-xl">
              <Link href="/#proyectos" className="btn btn--secondary">Ver todos los proyectos</Link>
            </div>
          </div>
        </section>

        {/* Metodología */}
        <section className="section bg-dark-soft">
          <div className="container">
            <header className="section-header animate-on-scroll">
              <h2 className="section-header__title">Desarrollo web en Valencia personalizado</h2>
              <p className="section-header__subtitle">
                Descubre el proceso que realizo para crear tu página web profesional y cómo marcar la diferencia.
              </p>
            </header>

            <article className="article-content animate-on-scroll">
              <div className="article-box">
                <h3>Cómo hacer una página Web en Valencia</h3>
                <p>
                  El objetivo principal de cualquier negocio es <strong>captar clientes</strong>. Tu presencia
                  online debe tener en cuenta la experiencia de usuario (UX) para asegurar que cada visita
                  tenga el potencial de convertirse en una oportunidad real.
                </p>
                <p>
                  No se trata solo de estética; se trata de una <strong>arquitectura técnica robusta</strong>
                  que permita a los buscadores posicionarte en lo más alto mientras ofreces una navegación
                  fluida y rápida en cualquier dispositivo.
                </p>
                <div className="flex mt-lg">
                  <Link href="/contacto" className="btn btn--primary" data-primary-cta="true">Pide presupuesto</Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Características Técnicas */}
        <section className="section">
          <div className="container">
            <header className="section-header animate-on-scroll">
              <h2 className="section-header__title">Cómo me gusta hacer las páginas web</h2>
              <p className="section-header__subtitle">
                Pilares técnicos imprescindibles para que tu web sea un activo rentable y duradero.
              </p>
            </header>

            <div className="grid grid-cols-3">
              {features.map((feature, index) => (
                <article key={index} className="service-card animate-on-scroll">
                  <div className={`service-card__icon-wrapper ${feature.color}`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="service-card__title">{feature.title}</h3>
                  <p className="service-card__description">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Mis Webs incluyen */}
        <section className="section bg-dark-soft">
          <div className="container">
            <header className="section-header animate-on-scroll">
              <h2 className="section-header__title">Mis Webs incluyen</h2>
              <p className="section-header__subtitle">
                Un ecosistema completo diseñado para el rendimiento y la conversión.
              </p>
            </header>

            <article className="article-content animate-on-scroll">
              <div className="article-box">
                <ul className="grid grid-cols-2 gap-md list-unstyled">
                  {inclusions.map((item, index) => (
                    <li key={index} className="pricing-card__feature">
                      <Check className="pricing-card__check" size={20} />
                      <span><strong>{item.title}:</strong> {item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* Keywords Cloud */}
        <section className="section">
          <div className="container">
            <header className="section-header animate-on-scroll">
              <h2 className="section-header__title">Búsquedas de diseño Web Valencia</h2>
              <p className="section-header__subtitle">
                Por qué términos me encuentran.
              </p>
            </header>

            <div className="grid--keywords animate-on-scroll">
              {keywords.map((kw, index) => (
                <span key={index} className="keyword-card">{kw}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Herramientas SEO */}
        <section className="section bg-dark-soft">
          <div className="container text-center">
            <header className="section-header animate-on-scroll">
              <h2 className="section-header__title">Herramientas SEO que utilizo</h2>
              <p className="section-header__subtitle">Tecnología de vanguardia para garantizar resultados medibles.</p>
            </header>

            <div className="tools-grid animate-on-scroll">
              {tools.map((tool, index) => (
                <div key={index} className="tools-card">
                  <Image
                    src={tool.light}
                    alt={`logo de ${tool.name}`}
                    width={120}
                    height={40}
                    className="tools-logo show-in-light object-contain"
                  />
                  <Image
                    src={tool.dark}
                    alt={`logo de ${tool.name}`}
                    width={120}
                    height={40}
                    className="tools-logo show-in-dark object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section">
          <div className="container">
            <FaqAccordion title="Preguntas frecuentes de diseño web en Valencia" items={faqs} />
          </div>
        </section>
      </main>
    </>
  );
}
