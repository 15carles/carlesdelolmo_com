import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ProjectCard } from '@/components/ProjectsSection';
import FaqAccordion from '@/components/FaqAccordion';
import { Code, MapPin, Zap, Search, Layout, MousePointer2, Check, Shield, Gauge, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_URL } from '@/lib/seo/schemas';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Diseño web en Castellón | Carles del Olmo - SEO y GEO',
  description: 'Diseño web profesional en Castellón. Especialista en SEO técnico y optimización para Inteligencia Artificial (GEO). Impulsa tu negocio con una web que posiciona.',
  exactUrl: `${SITE_URL}/diseno-web/castellon`,
});

export default function DisenoWebCastellon() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Diseño web Castellón' }
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
      title: "Azulejos CeramicPro",
      href: "#contacto",
      colorClass: "project-card__image--blue",
      icon: "cloud" as const,
      badges: [
        { text: "SEO Técnico", color: "badge--purple" },
        { text: "B2B", color: "badge--cyan" }
      ],
      description: "Catálogo digital optimizado para el sector cerámico de Castellón.\nMejora del 60% en la velocidad de carga y experiencia móvil."
    },
    {
      title: "LogísticaCastellón",
      href: "#contacto",
      colorClass: "project-card__image--cyan",
      icon: "finance" as const,
      badges: [
        { text: "GEO", color: "badge--purple" },
        { text: "Industria", color: "badge--teal" }
      ],
      description: "Arquitectura de datos estructurados para servicios logísticos e industriales.\nReferencia de confianza en respuestas de IA empresariales."
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
      question: '¿Por qué contratar un diseñador web en Castellón especializado?',
      answer: 'El tejido industrial y cerámico de Castellón requiere webs con una comunicación clara B2B y una arquitectura técnica muy sólida para posicionar en mercados específicos.'
    },
    {
      question: '¿Cuánto tiempo lleva desarrollar una web para mi empresa en Castellón?',
      answer: 'Depende del tamaño del catálogo o servicios, pero generalmente establecemos un plazo de 6 a 10 semanas para desarrollos a medida de alta calidad.'
    },
    {
      question: '¿La web incluirá SEO Local para Castellón?',
      answer: 'Sí, optimizamos tu presencia para que seas la opción preferida de los usuarios que buscan tus productos o servicios en Castellón de la Plana y provincia.'
    },
    {
      question: '¿Preparáis las webs para el nuevo buscador de OpenAI (SearchGPT)?',
      answer: 'Totalmente. Implementamos protocolos GEO para asegurar que tu empresa sea visible en los nuevos buscadores de IA y asistentes conversacionales.'
    }
  ];

  return (
    <main className="page__content">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section id="inicio" className="section">
        <div className="container">
          <div className="grid grid-cols-2 mt-2xl">
            <div className="animate-on-scroll hero-content-wrapper">
              <div className="badge badge--status mb-lg helper-center-mobile">
                <span>Especialista en Castellón</span>
              </div>

              <h1 className="mb-md helper-center-mobile">
                Diseño web <span className="gradient-text">Castellón</span>, SEO e Innovación
              </h1>

              <p className="text-secondary mb-xl helper-center-mobile">
                Potenciamos el tejido empresarial de Castellón con soluciones digitales de alto rendimiento. 
                Desde el sector industrial hasta el comercial, creamos webs que no solo informan, sino que 
                convierten y posicionan con autoridad.
              </p>

              <div className="flex gap-md mb-xl helper-flex-center-mobile">
                <Link href="#info" className="btn btn--primary btn--large">Diseño web Castellón</Link>
              </div>

              <div id="hero-checklist" className="hero-features grid grid-cols-2 gap-md mb-xl animate-on-scroll">
                <div className="hero-features__item">
                  <span className="hero-features__icon-wrapper">
                    <Check size={20} strokeWidth={3} />
                  </span>
                  <span>Enfoque a Resultados</span>
                </div>
                <div className="hero-features__item">
                  <span className="hero-features__icon-wrapper">
                    <Check size={20} strokeWidth={3} />
                  </span>
                  <span>SEO Industrial</span>
                </div>
                <div className="hero-features__item">
                  <span className="hero-features__icon-wrapper">
                    <Check size={20} strokeWidth={3} />
                  </span>
                  <span>Optimización IA</span>
                </div>
              </div>
            </div>

            <div className="animate-on-scroll flex flex-col justify-center pb-3xl hero-right-col hidden-mobile">
              <div className="relative w-full aspect-[3/2]">
                <Image 
                  src="/assets/images/stock/plaza-santa-clara-castellon.webp"
                  alt="Plaza Santa Clara en Castellón"
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
            <h2 className="section-header__title">Crecimiento Digital en Castellón</h2>
            <p className="section-header__subtitle">
              Estrategias digitales personalizadas para empresas que buscan liderar su sector localmente.
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
            <h2 className="cta-section__title">Lidera tu sector en Castellón</h2>
            <p className="cta-section__text">
              Convierte tu sitio web en una herramienta de captación de clientes 
              preparada para los desafíos del SEO moderno y la IA.
            </p>
            <div className="cta-section__buttons">
              <Link href="/contacto" data-primary-cta="true" className="btn btn--primary">Solicitar auditoría</Link>
              <Link href="/contacto" data-primary-cta="true" className="btn btn--secondary">Contacto</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Castellon */}
      <section id="proyectos-castellon" className="section">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h2 className="section-header__title">Nuestros trabajos en Castellón</h2>
            <p className="section-header__subtitle">
              Haciendo que empresas locales brillen en el entorno global.
            </p>
          </header>

          <div className="grid grid-cols-3">
            {portfolio.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          <div className="flex justify-center mt-xl">
            <Link href="/#proyectos" className="btn btn--secondary">Ver portafolio de proyectos</Link>
          </div>
        </div>
      </section>

      {/* Metodología */}
      <section className="section bg-dark-soft">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h2 className="section-header__title">Diseño de páginas Web en Castellón</h2>
            <p className="section-header__subtitle">
              Fusionamos diseño cerámico y tecnología de vanguardia.
            </p>
          </header>

          <article className="article-content animate-on-scroll">
            <div className="article-box">
              <h3>Diseño web para empresas en la Plana</h3>
              <p>
                En Castellón conocemos la importancia de la sobriedad y la eficacia. 
                Nuestros diseños web para empresas castellonenses se centran en la 
                claridad, el rendimiento y una estructura SEO impecable que garantiza 
                que tu negocio sea encontrado.
              </p>
              <div className="flex mt-lg">
                <Link href="/contacto" data-primary-cta="true" className="btn btn--primary">Empezar mi proyecto</Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Características Técnicas */}
      <section className="section">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h2 className="section-header__title">Calidad sin compromisos</h2>
            <p className="section-header__subtitle">
              Tu web será rápida, segura y estará preparada para escalar.
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
          <FaqAccordion title="Preguntas frecuentes sobre diseño web en Castellón" items={faqs} />
        </div>
      </section>
    </main>
  );
}
