import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ProjectCard } from '@/components/ProjectsSection';
import FaqAccordion from '@/components/FaqAccordion';
import { Code, MapPin, Zap, Search, Layout, MousePointer2, Check, Shield, Gauge, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_URL, generateFaqPageSchema } from '@/lib/seo/schemas';
import { safeJsonLd } from '@/lib/seo/jsonLd';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Diseño web en Alicante | Carles del Olmo - SEO y GEO',
  description: 'Diseño web profesional en Alicante. Especialista en SEO técnico y optimización para Inteligencia Artificial (GEO). Impulsa tu negocio con una web que posiciona.',
  exactUrl: `${SITE_URL}/diseno-web/alicante`,
});

export default function DisenoWebAlicante() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Diseño web Alicante' }
  ];

  const cityServices = [
    {
      title: 'Diseño web Valencia',
      href: '/diseno-web/valencia',
      description: 'Diseño web estratégico y SEO local en la capital del Turia.',
      icon: MapPin,
      colorClass: 'service-card__icon-wrapper--purple'
    },
    {
      title: 'Diseño web Castellón',
      href: '/diseno-web/castellon',
      description: 'Diseño web profesional en Castellón con enfoque en resultados y experiencia de usuario optimizada.',
      icon: Code,
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
      title: "CostaLife Real Estate",
      href: "#contacto",
      colorClass: "project-card__image--blue",
      icon: "cloud" as const,
      badges: [
        { text: "SEO Local", color: "badge--purple" },
        { text: "Inmobiliaria", color: "badge--cyan" }
      ],
      description: "Portal inmobiliario optimizado para búsquedas en la Costa Blanca.\nIncremento del 40% en leads cualificados."
    },
    {
      title: "TurismoAlicante Hub",
      href: "#contacto",
      colorClass: "project-card__image--cyan",
      icon: "finance" as const,
      badges: [
        { text: "GEO", color: "badge--purple" },
        { text: "Turismo", color: "badge--teal" }
      ],
      description: "Estructura semántica avanzada para respuestas de IA sobre ocio y turismo.\nReferencia directa en Google Search Generative Experience."
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

  const faqs = [
    {
      question: '¿Por qué elegir un diseñador web en Alicante?',
      answer: 'Alicante tiene un mercado muy dinámico, especialmente en turismo y servicios. Un diseñador local entiende las necesidades de la zona y cómo destacar frente a la competencia local.'
    },
    {
      question: '¿Qué precio tiene una página web profesional en Alicante?',
      answer: 'El coste varía según los objetivos. Ofrezco presupuestos personalizados tras analizar tu proyecto para asegurar que pagas por lo que realmente necesitas para crecer.'
    },
    {
      question: '¿Mi web aparecerá en Google para búsquedas en Alicante?',
      answer: 'Sí, implementamos estrategias de SEO Local específicas para que aparezcas cuando tus clientes busquen servicios en la zona de Alicante y la Costa Blanca.'
    },
    {
      question: '¿Sus webs están preparadas para la IA?',
      answer: 'Absolutamente. Todas nuestras webs incluyen arquitectura GEO (Generative Engine Optimization) para ser citadas en ChatGPT, Gemini y Perplexity.'
    }
  ];

  const jsonLd = generateFaqPageSchema(faqs, `${SITE_URL}/diseno-web/alicante#faq`);

  return (
    <main className="page__content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section id="inicio" className="section">
        <div className="container">
          <div className="grid grid-cols-2 mt-2xl">
            <div className="animate-on-scroll hero-content-wrapper">
              <div className="badge badge--status mb-lg helper-center-mobile">
                <span>Especialista en Alicante</span>
              </div>

              <h1 className="mb-md helper-center-mobile">
                Diseño web <span className="gradient-text">Alicante</span>, SEO y Resultados
              </h1>

              <p className="text-secondary mb-xl helper-center-mobile">
                Alicante y la Costa Blanca demandan una presencia digital de alto impacto. 
                No se trata solo de tener una web bonita, sino de contar con una plataforma 
                optimizada para convertir tráfico en negocio real y posicionarse con autoridad 
                en la era de la IA.
              </p>

              <div className="flex gap-md mb-xl helper-flex-center-mobile">
                <Link href="#info" className="btn btn--primary btn--large">Diseño web Alicante</Link>
              </div>

              <div id="hero-checklist" className="hero-features grid grid-cols-2 gap-md mb-xl animate-on-scroll">
                <div className="hero-features__item">
                  <span className="hero-features__icon-wrapper">
                    <Check size={20} strokeWidth={3} />
                  </span>
                  <span>Conversión Directa</span>
                </div>
                <div className="hero-features__item">
                  <span className="hero-features__icon-wrapper">
                    <Check size={20} strokeWidth={3} />
                  </span>
                  <span>SEO Costa Blanca</span>
                </div>
                <div className="hero-features__item">
                  <span className="hero-features__icon-wrapper">
                    <Check size={20} strokeWidth={3} />
                  </span>
                  <span>Arquitectura GEO</span>
                </div>
              </div>
            </div>

            <div className="animate-on-scroll flex flex-col justify-center pb-3xl hero-right-col hidden-mobile">
              <div className="relative w-full aspect-[3/2]">
                <Image 
                  src="/assets/images/stock/puerto-alicante-nocturno.webp"
                  alt="Puerto de Alicante"
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
            <h2 className="section-header__title">Infraestructura Digital en Alicante</h2>
            <p className="section-header__subtitle">
              Soluciones diseñadas para destacar en el competitivo mercado de la Costa Blanca.
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
            <h2 className="cta-section__title">Potencia tu negocio en Alicante</h2>
            <p className="cta-section__text">
              Lleva tu presencia online al siguiente nivel con una web estratégica pensada 
              para dominar los resultados locales y generativos.
            </p>
            <div className="cta-section__buttons">
              <Link href="/contacto" data-primary-cta="true" className="btn btn--primary">Pide presupuesto</Link>
              <Link href="/contacto" data-primary-cta="true" className="btn btn--secondary">Contacto</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Alicante */}
      <section id="proyectos-alicante" className="section">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h2 className="section-header__title">Proyectos destacados</h2>
            <p className="section-header__subtitle">
              Ayudamos a empresas de Alicante a transformar su canal digital.
            </p>
          </header>

          <div className="grid grid-cols-3">
            {portfolio.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          <div className="flex justify-center mt-xl">
            <Link href="/#proyectos" className="btn btn--secondary">Explorar portafolio completo</Link>
          </div>
        </div>
      </section>

      {/* Metodología */}
      <section className="section bg-dark-soft">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h2 className="section-header__title">Diseño de páginas Web en Alicante</h2>
            <p className="section-header__subtitle">
              No hacemos webs, creamos activos digitales rentables.
            </p>
          </header>

          <article className="article-content animate-on-scroll">
            <div className="article-box">
              <h3>Tu socio digital en la provincia de Alicante</h3>
              <p>
                Entendemos que el diseño web en Alicante requiere un equilibrio entre 
                visibilidad internacional y cercanía local. Optimizamos cada detalle 
                para que tu empresa sea la respuesta que buscan tus futuros clientes.
              </p>
              <div className="flex mt-lg">
                <Link href="/contacto" data-primary-cta="true" className="btn btn--primary">Hablemos de tu web</Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Características Técnicas */}
      <section className="section">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h2 className="section-header__title">Estándares de excelencia</h2>
            <p className="section-header__subtitle">
              Cada web que sale de nuestro estudio cumple con los más altos estándares técnicos.
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

      {/* FAQs */}
      <section className="section bg-dark-soft">
        <div className="container">
          <FaqAccordion title="Preguntas frecuentes sobre diseño web en Alicante" items={faqs} />
        </div>
      </section>
    </main>
  );
}
