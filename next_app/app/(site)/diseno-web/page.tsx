import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Check, ArrowRight, Layout, Zap, MessageSquare, Shield, MousePointer, Search, BarChart, Globe, Rocket, Code, Layers, Cpu, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectsSection from '@/components/ProjectsSection';
import FaqAccordion from '@/components/FaqAccordion';
import OrbitaMethod from './OrbitaMethod';
import WorkflowTimeline from './WorkflowTimeline';

const disenoWebFaqs = [
  {
    question: "¿Cómo sé si mi empresa necesita una nueva web?",
    answer: "Si la página actual no explica bien los servicios del negocio, tarda en cargar, no se adapta bien a móviles o no genera contactos, probablemente ha llegado el momento de replantear la web. Una página bien estructurada puede mejorar mucho la forma en que los clientes entienden y encuentran la empresa."
  },
  {
    question: "¿Qué diferencia hay entre rediseñar una web y crear una desde cero?",
    answer: "Un rediseño consiste en mejorar una web existente manteniendo parte de su estructura o contenidos. Crear una web desde cero implica definir completamente la arquitectura del sitio, el diseño y la base técnica. La decisión depende del estado actual de la web y de los objetivos del proyecto."
  },
  {
    question: "¿Puedo ampliar la web en el futuro?",
    answer: "Sí. Una web bien desarrollada debe permitir añadir nuevas páginas, servicios o contenidos con el tiempo. Esto permite que el sitio evolucione junto con el negocio sin necesidad de rehacer todo el proyecto."
  },
  {
    question: "¿Una web profesional ayuda realmente a captar clientes?",
    answer: "Cuando la estructura del contenido es clara y la web está optimizada para buscadores, aumenta la probabilidad de que los usuarios encuentren el negocio y entiendan rápidamente qué servicios ofrece. Esto facilita que el visitante termine contactando o solicitando información."
  },
  {
    question: "¿Qué papel tiene la estructura de la web en el posicionamiento?",
    answer: "La forma en que se organiza la información dentro de una web influye directamente en cómo los buscadores interpretan el contenido. Una arquitectura clara ayuda tanto a los usuarios como a los motores de búsqueda a entender mejor cada página del sitio."
  }
];

export const metadata = {
  title: 'Diseño Web Profesional pensado para posicionar | Carles del Olmo',
  description: 'Diseño y desarrollo de páginas web rápidas, claras y optimizadas para buscadores y motores de inteligencia artificial.',
};

export default function DisenoWebPage() {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Diseño web' }
  ];

  return (
    <main className="page__content">
      <Breadcrumbs items={breadcrumbs} />

      {/* SECCIÓN 1 — HERO */}
      <section className="section pb-xl">
        <div className="container">
          <div className="grid grid-cols-2">
            {/* Left Column: Content */}
            <div className="animate-on-scroll hero-content-wrapper">
              <h1 className="mb-md helper-center-mobile">
                Diseño web profesional <br />
                <span className="gradient-text">pensado para posicionar</span>
              </h1>

              <p className="text-secondary mb-xl helper-center-mobile text-lg">
                Diseño y desarrollo <strong>páginas web rápidas, claras y optimizadas</strong> para buscadores y motores de inteligencia artificial.
                <br />Una página web no es solo diseño. Es una herramienta para atraer clientes, explicar bien lo que haces y generar confianza.
              </p>

              <div className="flex flex-wrap gap-md mb-xl helper-flex-center-mobile">
                <Link href="/contacto" className="btn btn--primary btn--large">
                  Cuéntame tu proyecto
                </Link>
                <Link href="#proyectos" className="btn btn--secondary btn--large">
                  Ver proyectos
                </Link>
              </div>

              <div id="hero-checklist" className="hero-features flex gap-lg mb-xl helper-flex-center-mobile">
                <div className="hero-features__item">
                  <span className="hero-features__icon-wrapper">
                    <Check size={20} strokeWidth={3} />
                  </span>
                  <span>Estructura clara</span>
                </div>
                <div className="hero-features__item">
                  <span className="hero-features__icon-wrapper">
                    <Check size={20} strokeWidth={3} />
                  </span>
                  <span>Velocidad</span>
                </div>
              </div>
            </div>

            {/* Right Column: Code Terminal */}
            <div className="animate-on-scroll flex flex-col justify-center pb-3xl hero-right-col hidden-mobile">
              <div className="terminal">
                <div className="terminal__header">
                  <span className="terminal__dot terminal__dot--red"></span>
                  <span className="terminal__dot terminal__dot--yellow"></span>
                  <span className="terminal__dot terminal__dot--green"></span>
                  <span className="terminal__filename">arquitectura-web.tsx</span>
                </div>
                <div className="terminal__code">
                  <pre><code>
                    <span className="code-keyword">interface</span> <span className="code-variable">WebProject</span> {'{'}{"\n"}
                    <span className="code-property">performance</span>: <span className="code-string">"100%"</span>,{"\n"}
                    <span className="code-property">seo_ready</span>: <span className="code-boolean">true</span>,{"\n"}
                    <span className="code-property">ai_optimized</span>: <span className="code-boolean">true</span>,{"\n"}
                    <span className="code-property">user_experience</span>: <span className="code-string">"premium"</span>{"\n"}
                    {'}'}
                  </code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — QUÉ ES EL DISEÑO WEB PROFESIONAL */}
      <section className="section bg-dark-soft">
        <div className="container">
          <div className="grid grid-cols-3 gap-xl items-center animate-on-scroll">

            {/* Columna Izquierda: 2/3 (Ocupa 2 de las 3 columnas) */}
            <div className="col-span-2 text-left pr-lg">
              <h2 className="mb-md">Qué es realmente el <br /><span className="gradient-text">diseño web profesional</span></h2>

              <div className="space-y-md text-secondary text-lg mb-xl">
                <p>
                  Cuando se habla de diseño web muchas veces se piensa solo en la parte visual. Pero una web profesional va mucho más allá del aspecto estético.
                </p>
                <p>
                  Por eso el diseño web profesional combina tres elementos fundamentales: <strong>estructura clara</strong>, <strong>experiencia de usuario</strong> y una <strong>base técnica optimizada</strong> para buscadores. El objetivo no es solo que la web se vea bien, sino que funcione como una herramienta real para atraer clientes y hacer crecer el negocio.
                </p>
              </div>

              <Link href="/contacto" className="btn btn--primary">
                Consulta tu proyecto
              </Link>
            </div>

            {/* Columna Derecha: 1/3 (Ocupa la columna restante) */}
            <div className="col-span-1 flex justify-center items-center w-full">
              <div style={{ transform: 'scale(1.3)' }}>
                <img
                  src="/assets/images/mockups/mockup_ecohoagr.webp"
                  alt="Mockup de diseño web profesional para EcoHogar"
                  className="img--glass"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 3 — QUÉ PROBLEMAS SOLUCIONA UNA BUENA WEB */}
      <section className="section">
        <div className="container">
          <header className="section-header text-center animate-on-scroll">
            <h2 className="section-header__title">Qué problemas soluciona una <span className="gradient-text">buena página web</span></h2>
            <p className="section-header__subtitle max-w-3xl mx-auto">
              Muchas empresas tienen una web, pero eso no significa que esté cumpliendo realmente su función.
              Una web bien diseñada soluciona los problemas más habituales de los negocios en internet.
            </p>
          </header>

          <div className="grid grid-cols-2 gap-lg mt-xl">
            <article className="card animate-on-scroll">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--purple mb-md">
                <MessageSquare size={24} />
              </div>
              <h3 className="card__title text-center">No se entiende bien qué hace la empresa</h3>
              <p className="card__content text-center">
                Uno de los problemas más comunes es que la web no explica claramente qué hace la empresa. Una estructura clara permite que cualquier persona entienda en pocos segundos qué hace el negocio y cómo puede ayudarle.
              </p>
            </article>

            <article className="card animate-on-scroll">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--cyan mb-md">
                <MousePointer size={24} />
              </div>
              <h3 className="card__title text-center">La web no genera contactos ni oportunidades</h3>
              <p className="card__content text-center">
                Muchas páginas funcionan como una simple tarjeta de presentación. Un buen diseño web organiza los contenidos y las llamadas a la acción para facilitar que el visitante dé el siguiente paso.
              </p>
            </article>

            <article className="card animate-on-scroll">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--blue mb-md">
                <Zap size={24} />
              </div>
              <h3 className="card__title text-center">La página carga lenta o funciona mal en móvil</h3>
              <p className="card__content text-center">
                Si la web es lenta o difícil de usar desde el teléfono, muchos usuarios abandonan. La velocidad de carga y la adaptación móvil son factores fundamentales para retener visitas.
              </p>
            </article>

            <article className="card animate-on-scroll">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--purple mb-md">
                <Search size={24} />
              </div>
              <h3 className="card__title text-center">La web no aparece en buscadores</h3>
              <p className="card__content text-center">
                Si no está bien estructurada, es difícil que aparezca en Google. El diseño web profesional tiene en cuenta aspectos técnicos que ayudan a mejorar la visibilidad online significativamente.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4 — QUÉ INCLUYE MI SERVICIO DE DISEÑO WEB */}
      <section className="section bg-dark-soft">
        <div className="container">
          <header className="section-header text-center animate-on-scroll">
            <h2 className="section-header__title">Qué incluye mi <span className="gradient-text">servicio de diseño web</span></h2>
            <p className="section-header__subtitle max-w-3xl mx-auto">
              Para que una web funcione como herramienta de negocio, trabajo distintos aspectos: desde la estructura de la información hasta el rendimiento técnico y el SEO.
            </p>
          </header>

          <div className="grid grid-cols-2 gap-lg mt-xl">
            <article className="card animate-on-scroll">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--cyan mb-md">
                <Layout size={24} />
              </div>
              <h3 className="card__title text-center">Estructura clara</h3>
              <p className="card__content text-secondary text-center">Organización del contenido para que se entienda qué haces en pocos segundos.</p>
            </article>

            <article className="card animate-on-scroll">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--purple mb-md">
                <Shield size={24} />
              </div>
              <h3 className="card__title text-center">Experiencia de usuario</h3>
              <p className="card__content text-secondary text-center">Diseño orientado a facilitar la navegación y que el visitante avance de forma natural.</p>
            </article>

            <article className="card animate-on-scroll">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--blue mb-md">
                <BarChart size={24} />
              </div>
              <h3 className="card__title text-center">Optimización técnica</h3>
              <p className="card__content text-secondary text-center">Webs que cargan rápido y funcionan perfectamente en cualquier dispositivo.</p>
            </article>

            <article className="card animate-on-scroll">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--cyan mb-md">
                <Search size={24} />
              </div>
              <h3 className="card__title text-center">Preparada para SEO</h3>
              <p className="card__content text-secondary text-center">Arquitectura diseñada para que los buscadores entiendan y posicionen tu sitio.</p>
            </article>
          </div>
        </div>
      </section>
      {/* SECCIÓN 5 — TIPOS DE PÁGINAS WEB */}
      <section className="section">
        <div className="container">
          <header className="section-header text-center animate-on-scroll">
            <h2 className="section-header__title">Tipos de páginas web <span className="gradient-text">que desarrollo</span></h2>
            <p className="section-header__subtitle max-w-3xl mx-auto">
              Cada negocio tiene necesidades diferentes. Por eso el diseño web no consiste en aplicar una plantilla estándar, sino en construir una web adaptada al tipo de empresa.
            </p>
          </header>

          <div className="grid grid-cols-2 gap-lg mt-xl">
            <article className="card animate-on-scroll">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--blue mb-md">
                <Globe size={24} />
              </div>
              <h3 className="card__title text-center">Web corporativa</h3>
              <p className="card__content text-secondary text-center">
                El tipo de web más habitual para empresas y profesionales. Su objetivo es presentar la empresa, explicar los servicios y facilitar que los clientes potenciales puedan contactar o solicitar información.
              </p>
            </article>

            <article className="card animate-on-scroll">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--purple mb-md">
                <Rocket size={24} />
              </div>
              <h3 className="card__title text-center">Landing page</h3>
              <p className="card__content text-secondary text-center">
                Pensadas para una acción concreta: promocionar un servicio, captar contactos o apoyar campañas de marketing. Son páginas más directas y enfocadas en la conversión.
              </p>
            </article>

            <article className="card animate-on-scroll col-span-2">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--cyan mb-md">
                <Code size={24} />
              </div>
              <h3 className="card__title text-center">Web a medida</h3>
              <p className="card__content text-secondary text-center">
                Para proyectos que requieren funcionalidades específicas o una estructura más compleja. En estos casos se desarrolla una web adaptada completamente a las necesidades del negocio, optimizando cada detalle según tus objetivos reales.
              </p>
            </article>
          </div>

          <div className="flex justify-center mt-xl animate-on-scroll">
            <Link href="/pricing" className="btn btn--secondary">
              Ver tarifas y servicios
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6 — SEO TÉCNICO Y OPTIMIZACIÓN PARA IA */}
      <section className="section bg-dark-soft">
        <div className="container">

          <header className="section-header text-center animate-on-scroll">
            <h2 className="section-header__title">SEO técnico y optimización para <span className="gradient-text">inteligencia artificial</span></h2>
            <p className="section-header__subtitle max-w-3xl mx-auto">
              Hoy en día una página web no solo debe verse bien. También debe estar preparada para que los buscadores y motores de IA puedan entenderla correctamente.
            </p>
          </header>

          <div className="grid grid-cols-3 gap-lg mt-xl animate-on-scroll">
            <div className="card card--no-hover border-border/50 flex flex-col gap-sm">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--purple mb-sm">
                <Layers size={24} />
              </div>
              <h3 className="text-xl text-center font-bold mb-xs">Arquitectura web clara</h3>
              <p className="text-secondary text-sm text-center">Organizada de forma lógica para que tanto usuarios como buscadores puedan entender fácilmente el contenido y la jerarquía de cada página.</p>
            </div>

            <div className="card card--no-hover border-border/50 flex flex-col gap-sm">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--blue mb-sm">
                <Search size={24} />
              </div>
              <h3 className="text-xl text-center font-bold mb-xs">Optimización para buscadores</h3>
              <p className="text-secondary text-center text-sm">Elementos técnicos que ayudan al posicionamiento, como la estructura del contenido, la jerarquía de títulos o el rendimiento.</p>
            </div>

            <div className="card card--no-hover border-border/50 flex flex-col gap-sm">
              <div className="service-card__icon-wrapper service-card__icon-wrapper--cyan mb-sm">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl text-center font-bold mb-xs">Preparada para motores de IA</h3>
              <p className="text-secondary text-center text-sm">Información organizada de forma clara y comprensible para que motores como ChatGPT o Perplexity puedan generar respuestas directas.</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECCIÓN 7 — MÉTODO ORBITA INTERACTIVO */}
      <section className="section bg-glass">
        <div className="container">
          <header className="section-header text-center animate-on-scroll">
            <h2 className="section-header__title">El método ORBITA:<br></br>una web que <span className="gradient-text">trabaja como sistema</span></h2>
            <p className="section-header__subtitle max-w-3xl mx-auto">
              No desarrollo páginas web aisladas. Trabajo con un enfoque estructurado que convierte la web en el centro del ecosistema digital de una empresa.
            </p>
          </header>

          <OrbitaMethod />

          <div className="max-w-4xl mx-auto mt-lg text-center animate-on-scroll">
            <p className="text-lg text-primary font-semibold mb-lg">
              El objetivo es que la web no sea solo una presencia online, sino una herramienta real para generar oportunidades de negocio.
            </p>
            <Link
              href="/blog/metodo-orbita"
              className="btn btn--secondary inline-flex items-center gap-2 group"
            >
              Saber más sobre el método ORBITA
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-dark-soft">
        <div className="container">
          {/* Cabecera de la sección a ancho completo */}
          <div className="animate-on-scroll mb-2xl text-center max-w-4xl mx-auto">
            <h2 className="mb-md">Tecnología orientada a rendimiento, <br className="hidden lg:block" /><span className="gradient-text">SEO y visibilidad</span></h2>
            <p className="text-secondary text-lg mb-sm">
              La tecnología no es un simple detalle técnico. Es uno de los factores que más influyen en el rendimiento y la capacidad de crecimiento de tu web.
            </p>
            <p className="text-secondary text-lg">
              Por eso no trabajo con plantillas genéricas. Desarrollo cada proyecto con <strong>tecnología moderna</strong> para crear webs estables, rápidas y preparadas para el futuro.
            </p>
          </div>

          {/* Fila única con las 3 tarjetas principales - USANDO GRID PARA CONSISTENCIA */}
          <div className="grid grid-cols-3 gap-lg mb-2xl animate-on-scroll">
            {/* TARJETA 1: NEXT.JS & REACT */}
            <div className="card card--no-hover border-purple-900/30 flex flex-col items-center text-center gap-md p-lg group h-auto">
              <div className="shrink-0 w-16 h-16 flex items-center justify-center relative mb-xs">
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-500/30 transition-colors"></div>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-glow-purple">
                  <circle cx="24" cy="24" r="20" stroke="url(#gradient-p1)" strokeWidth="2" strokeDasharray="80 40" />
                  <path d="M14 24L22 32L34 16" stroke="#c4b5fd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M24 8V12M24 36V40M8 24H12M36 24H40" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gradient-p1" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#8b5cf6" />
                      <stop offset="1" stopColor="#d946ef" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col h-full">
                <strong className="text-primary block text-lg mb-xs">Next.js & React</strong>
                <p className="text-secondary text-sm m-0 leading-relaxed">Webs que cargan al instante con renderizado híbrido y componentes optimizados para la máxima velocidad.</p>
              </div>
            </div>

            {/* TARJETA 2: ARQUITECTURA SIN CMS TRADICIONAL */}
            <div className="card card--no-hover border-blue-900/30 flex flex-col items-center text-center gap-md p-lg group h-auto">
              <div className="shrink-0 w-16 h-16 flex items-center justify-center relative mb-xs">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-colors"></div>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-glow-blue">
                  <rect x="10" y="10" width="28" height="28" rx="4" stroke="url(#gradient-b1)" strokeWidth="2" />
                  <path d="M18 18H30M18 24H30M18 30H24" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="38" cy="10" r="6" fill="#1d4ed8" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1" />
                  <path d="M36 10L38 12L41 8" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="gradient-b1" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#2dd4bf" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col h-full">
                <strong className="text-primary block text-lg mb-xs">Arquitectura sin CMS tradicional</strong>
                <p className="text-secondary text-sm m-0 leading-relaxed">Seguridad total y cero latencia al eliminar la dependencia de servidores de bases de datos lentos y vulnerables.</p>
              </div>
            </div>

            {/* TARJETA 3: SEMÁNTICA & IA */}
            <div className="card card--no-hover border-cyan-900/30 flex flex-col items-center text-center gap-md p-lg group h-auto">
              <div className="shrink-0 w-16 h-16 flex items-center justify-center relative mb-xs">
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full group-hover:bg-cyan-500/30 transition-colors"></div>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-glow-cyan">
                  <path d="M8 24L16 12L32 12L40 24L32 36L16 36L8 24Z" stroke="url(#gradient-c1)" strokeWidth="2" />
                  <circle cx="24" cy="24" r="4" fill="#22d3ee" />
                  <path d="M24 12V20M24 28V36M12 21L18 24M30 24L36 27" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gradient-c1" x1="8" y1="12" x2="40" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#06b6d4" />
                      <stop offset="1" stopColor="#2dd4bf" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col h-full">
                <strong className="text-primary block text-lg mb-xs">Semántica y Datos Estructurados</strong>
                <p className="text-secondary text-sm m-0 leading-relaxed">Código estructurado con JSON-LD para que los motores de IA y Google entiendan cada dato de tu negocio.</p>
              </div>
            </div>
          </div>

          {/* Parte inferior con keywords y mensaje final */}
          <div className="animate-on-scroll flex flex-col items-center">
            <div className="grid--keywords w-full max-w-4xl gap-md mb-xl">
              <div className="keyword-card flex items-center justify-center p-md text-sm">Next.js 14</div>
              <div className="keyword-card flex items-center justify-center p-md text-sm">React 18</div>
              <div className="keyword-card flex items-center justify-center p-md text-sm">Core Web Vitals</div>
              <div className="keyword-card flex items-center justify-center p-md text-sm">JSON-LD</div>
              <div className="keyword-card flex items-center justify-center p-md text-sm">TailwindCSS</div>
              <div className="keyword-card flex items-center justify-center p-md text-sm">Astro</div>
              <div className="keyword-card flex items-center justify-center p-md text-sm">Schema.org</div>
              <div className="keyword-card flex items-center justify-center p-md text-sm">LLM Ready</div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-l-2 border-purple-500 p-md rounded-r-lg max-w-2xl">
              <p className="text-primary font-semibold m-0 flex items-center gap-sm">
                <CheckCircle className="text-purple-400 shrink-0" size={20} />
                El resultado es una web premium que posiciona y convierte mejor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 9 — PROYECTOS REALES */}
      <ProjectsSection />

      {/* SECCIÓN 10 — CÓMO TRABAJO CADA PROYECTO WEB */}
      <section className="section bg-dark-soft">
        <div className="container">
          <header className="section-header text-center animate-on-scroll">
            <h2 className="section-header__title">Cómo trabajo <span className="gradient-text">cada proyecto web</span></h2>
            <p className="section-header__subtitle max-w-3xl mx-auto">
              Cada página web es diferente, pero el proceso de trabajo sigue una estructura clara que permite desarrollar webs bien organizadas, rápidas y preparadas para posicionarse.
            </p>
          </header>

          <WorkflowTimeline />
        </div>
      </section>

      {/* SECCIÓN 11 — PREGUNTAS FRECUENTES */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto animate-on-scroll">
            <FaqAccordion title="Preguntas frecuentes sobre diseño web" items={disenoWebFaqs} />
          </div>
        </div>
      </section>

      {/* SECCIÓN 12 — CONTACTO */}
      <section className="section bg-dark-soft">
        <div className="container">
          <div className="card text-center p-xl border-purple-900/30 animate-on-scroll">
            <h2 className="mb-md section-header__title">¿Hablamos de <span className="gradient-text">tu proyecto</span>?</h2>
            <p className="text-secondary max-w-2xl mx-auto mb-xl text-lg">
              Si estás pensando en crear una nueva web o mejorar la que ya tienes, puedes contarme qué necesitas y cuál es la idea que tienes en mente.
              A partir de ahí podremos ver qué tipo de web encaja mejor con tu negocio y cómo estructurar el proyecto para que realmente cumpla su objetivo.
            </p>
            <div className="flex flex-col items-center gap-sm">
              <Link href="/contacto" className="btn btn--primary btn--large">
                Cuéntame tu proyecto
              </Link>
              <span className="text-sm text-secondary mt-xs">Respuesta en menos de 24 horas</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}