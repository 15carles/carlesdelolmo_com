import React from 'react';
import Link from 'next/link';
import PricingTabs from '@/components/PricingTabs';
import PricingCard from '@/components/PricingCard';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';
import { ArrowRight } from 'lucide-react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SITE_URL, generateFaqPageSchema } from '@/lib/seo/schemas';
import { safeJsonLd } from '@/lib/seo/jsonLd';

export const metadata = constructMetadata({
  title: 'Servicios y Precios | Carles del Olmo - Diseño Web en Valencia, SEO y GEO',
  description: 'Servicios y tarifas de Carles del Olmo: diseño web a medida en Valencia, posicionamiento SEO/GEO y mantenimiento. Precios transparentes y sin letra pequeña.',
  exactUrl: `${SITE_URL}/pricing`,
});

const PRICING_FAQS_DISENO = [
  { question: "¿Cuánto cuesta realmente una página web profesional?", answer: "El precio depende del tipo de proyecto. Una landing page estratégica parte desde 530€, una web corporativa desde 2.000€ y un desarrollo a medida desde 4.000€. El coste final varía según funcionalidades, número de secciones e integraciones necesarias. Siempre trabajo con presupuesto cerrado y sin sorpresas." },
  { question: "¿Qué incluye exactamente el precio de la web?", answer: "Todos mis proyectos incluyen diseño personalizado, estructura estratégica orientada a objetivos, optimización SEO técnica inicial, adaptación completa a móviles, configuración básica de seguridad y formularios de contacto. No utilizo plantillas genéricas sin estrategia: cada web está pensada para cumplir una función concreta dentro de tu negocio." },
  { question: "¿La web estará optimizada para posicionar en Google?", answer: "Sí. Todas mis webs incluyen SEO técnico de base: estructura semántica correcta, metadatos optimizados, velocidad de carga mejorada, diseño responsive e indexación preparada para buscadores. Esto permite que Google pueda rastrear y posicionar tu web correctamente desde el inicio." },
  { question: "¿Cuánto tiempo se tarda en desarrollar una web?", answer: "Depende del alcance del proyecto. Una landing page puede estar lista en 2-3 semanas, una web corporativa en 4-8 semanas y un desarrollo a medida puede requerir entre 5 y 10 semanas. Desde el inicio trabajo con planificación y calendario claro." },
  { question: "¿Ofreces mantenimiento web después del lanzamiento?", answer: "Sí, puedo encargarme del mantenimiento técnico, actualizaciones de seguridad y soporte continuo si lo necesitas. También puedes gestionarla internamente si lo prefieres. Me adapto al modelo que mejor encaje con tu negocio." },
  { question: "¿Podré ampliar la web en el futuro?", answer: "Sí. Todas mis webs están preparadas para crecer: puedes añadir nuevas secciones, funcionalidades, integraciones o escalar hacia un desarrollo más avanzado cuando tu negocio lo necesite." }
];

const PRICING_FAQS_SEO_GEO = [
  { question: "¿Qué es GEO (Generative Engine Optimization)?", answer: "GEO (Generative Engine Optimization) es la optimización orientada a motores generativos e inteligencias artificiales como ChatGPT, Gemini o buscadores con respuestas automáticas. Mientras el SEO tradicional posiciona en Google, el GEO busca que tu web pueda ser entendida, citada y utilizada como fuente en respuestas generadas por IA." },
  { question: "¿Qué diferencia hay entre SEO y Autoridad Digital para IAs?", answer: "El SEO trabaja principalmente para posicionar en resultados de búsqueda tradicionales. La Autoridad Digital para IAs optimiza la estructura, semántica y señales de confianza de tu web para que modelos de lenguaje y buscadores generativos la identifiquen como una fuente fiable y estructurada. Son estrategias complementarias." },
  { question: "¿Se puede garantizar aparecer en respuestas de IA?", answer: "No se puede garantizar aparecer en una respuesta concreta de una IA, ya que los modelos generan contenido dinámicamente. Lo que sí hago es optimizar tu web para que sea clara, estructurada y relevante, aumentando las probabilidades de que pueda ser utilizada como referencia en entornos generativos." },
  { question: "¿Este servicio sustituye al SEO tradicional?", answer: "No. La optimización para IAs complementa al SEO tradicional. Una estrategia digital sólida hoy debe trabajar visibilidad tanto en buscadores clásicos como en entornos de búsqueda conversacional y generativa." },
  { question: "¿Por qué es un servicio mensual?", answer: "La autoridad digital no es estática. Los algoritmos evolucionan, el contenido cambia y la competencia se mueve. El trabajo mensual permite reforzar estructura, contenido, señales semánticas y autoridad temática de forma continua." },
  { question: "¿Cómo se mide la visibilidad en motores de IA?", answer: "Analizo menciones, presencia en respuestas generativas, evolución de autoridad temática y señales semánticas. También evaluo cómo se presenta tu marca en búsquedas conversacionales y consultas complejas relacionadas con tu sector." }
];

const PRICING_FAQS_MANTENIMIENTO = [
  { question: "¿Realmente necesito mantenimiento web si mi página funciona bien?", answer: "Sí. Aunque tu web funcione correctamente, los sistemas, plugins y servidores reciben actualizaciones constantes. No mantenerla al día puede provocar vulnerabilidades, errores inesperados o caídas. El mantenimiento es preventivo: evita problemas antes de que afecten a tu negocio." },
  { question: "¿Qué pasa si mi web se cae o sufre un problema técnico?", answer: "Cuento con monitorización continua y copias de seguridad verificadas. En caso de incidencia, puedo restaurar la web y resolver el problema minimizando el impacto y el tiempo de inactividad." },
  { question: "¿Perderé posicionamiento SEO durante una migración?", answer: "No. Realizo redirecciones 301, reviso la indexación y verifico que la estructura se mantenga correctamente. El objetivo es preservar tu posicionamiento actual y evitar pérdidas de tráfico." },
  { question: "¿Cuánto tiempo tarda una migración web?", answer: "Depende del tamaño y complejidad del sitio, pero la mayoría de migraciones estándar se completan en 24–72 horas. Planifico el proceso para que la interrupción sea mínima." },
  { question: "¿Incluye la migración soporte después del traslado?", answer: "Sí. Tras la migración realizo verificaciones finales y supervisión para garantizar que todo funcione correctamente en el nuevo entorno." },
  { question: "¿Cuál es la diferencia entre mantenimiento y migración?", answer: "El mantenimiento es un servicio continuo para mantener tu web segura y actualizada. La migración es un proceso puntual para trasladar tu sitio a un nuevo servidor, dominio o entorno sin afectar su funcionamiento ni su posicionamiento." }
];

const PRICING_FAQS_ALL = [
  ...PRICING_FAQS_DISENO,
  ...PRICING_FAQS_SEO_GEO,
  ...PRICING_FAQS_MANTENIMIENTO,
];

export default function PricingPage() {
  const jsonLd = generateFaqPageSchema(PRICING_FAQS_ALL, `${SITE_URL}/pricing#faq`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <PricingTabs />
      <main className="page">
        <div className="page__content">
          {/* CABECERA DE PÁGINA */}
          <header className="page-header">
            <div className="container text-center">
              <h1 className="page-header__title">Servicios de Carles del Olmo</h1>
              <p className="page-header__subtitle">
                Servicios y tarifas simplificados y sin letra pequeña.<br />También puedes pedir tu presupuesto personalizado.
              </p>
            </div>
          </header>

          {/* SECCIÓN 1: DISEÑO WEB */}
          <section id="diseno-web" className="pricing-section">
            <div className="container">
              <div className="pricing-section__header">
                <h2 className="pricing-section__title">Diseño web</h2>
                <p className="pricing-section__subtitle">Diseño web a medida. Solo para ti</p>
              </div>

              <div className="pricing-grid pricing-grid--3col">
                <PricingCard
                  title="Landing page"
                  description="<strong>Pensada para convertir, no solo para estar online.</strong><br>Una página estratégica diseñada para captar atención, generar confianza y transformar visitas en oportunidades reales de negocio."
                  price="Desde 530€"
                  features={[
                    "Estructura enfocada 100% a conversión.",
                    "Mensaje claro, directo y orientado a resultados.",
                    "Diseño optimizado para móvil y carga rápida.",
                    "Llamadas a la acción estratégicamente ubicadas.",
                    "Ideal para campañas de publicidad o lanzamiento de servicios."
                  ]}
                  ctaText="Solicitar presupuesto"
                  ctaHref="#contacto"
                  illustration={
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="10" width="52" height="44" rx="4" />
                      <line x1="6" y1="20" x2="58" y2="20" />
                      <rect x="12" y="28" width="14" height="18" rx="2" />
                      <circle cx="19" cy="34" r="3" />
                      <path d="M15 42c0-2 2-3 4-3s4 1 4 3" />
                      <line x1="32" y1="28" x2="50" y2="28" />
                      <line x1="32" y1="34" x2="46" y2="34" />
                      <line x1="32" y1="40" x2="50" y2="40" />
                      <line x1="32" y1="46" x2="42" y2="46" />
                    </svg>
                  }
                />

                <PricingCard
                  title="Web corporativa"
                  description="<strong>Tu negocio bien presentado. Profesional, claro y preparado para crecer.</strong><br>Una web sólida que transmite confianza, explica tus servicios con claridad y refuerza tu marca desde el primer vistazo."
                  price="Desde 2.000€"
                  features={[
                    "Arquitectura pensada para guiar al usuario.",
                    "Secciones estratégicas: servicios, equipo, contacto, etc.",
                    "Refuerza tu identidad y posicionamiento de marca.",
                    "Formularios y puntos de captación integrados.",
                    "Optimización SEO y adaptación completa a móviles."
                  ]}
                  ctaText="Solicitar presupuesto"
                  ctaHref="#contacto"
                  illustration={
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="6" y="10" width="52" height="48" rx="4" />
                      <line x1="6" y1="20" x2="58" y2="20" />
                      <rect x="12" y="26" width="16" height="16" rx="2" />
                      <line x1="34" y1="28" x2="52" y2="28" />
                      <line x1="34" y1="34" x2="48" y2="34" />
                      <line x1="34" y1="40" x2="44" y2="40" />
                    </svg>
                  }
                />

                <PricingCard
                  title="Web a medida"
                  description="<strong>Soluciones digitales sin límites. Diseñadas alrededor de tu negocio.</strong><br>Desarrollo completamente personalizado para proyectos que requieren funcionalidades específicas, integraciones o procesos automatizados."
                  price="Desde 4.000€"
                  features={[
                    "Desarrollo 100% personalizado.",
                    "Funcionalidades avanzadas y procesos automatizados.",
                    "Integraciones con APIs y herramientas externas.",
                    "Escalabilidad preparada para crecer contigo.",
                    "Enfoque en rendimiento, seguridad y estabilidad."
                  ]}
                  ctaText="Solicitar presupuesto"
                  ctaHref="#contacto"
                  illustration={
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M24 16l-16 16 16 16" />
                      <path d="M40 16l16 16-16 16" />
                      <line x1="36" y1="10" x2="28" y2="54" />
                    </svg>
                  }
                />
              </div>

              {/* CTA de sección */}
              <div className="pricing-section-cta">
                <Link href="#contacto" className="pricing-section-cta__btn">
                  Quiero una web
                  <span className="pricing-section-cta__icon">
                    <ArrowRight size={20} />
                  </span>
                </Link>
              </div>

              {/* FAQ Section */}
              <FaqAccordion
                title="Preguntas frecuentes sobre diseño y desarrollo web"
                items={PRICING_FAQS_DISENO}
              />
            </div>
          </section>

          {/* SECCIÓN 2: SERVICIOS GEO Y SEO */}
          <section id="geo-seo" className="pricing-section">
            <div className="container">
              <div className="pricing-section__header">
                <h2 className="pricing-section__title">Servicios GEO y SEO</h2>
                <p className="pricing-section__subtitle">Posicionamiento que te encuentra. En buscadores y en IAs</p>
              </div>

              <div className="pricing-grid pricing-grid--3col">
                <PricingCard
                  title="Auditoría SEO + GEO"
                  description="Reviso tu visibilidad en Google y en respuestas de IA (ChatGPT, Gemini, etc.). Detecto oportunidades y te doy un plan claro para mejorar tu posicionamiento en buscadores y en motores generativos (GEO)."
                  price="Desde 750€"
                  features={[
                    "Análisis de visibilidad en Google y en respuestas de IA.",
                    "Auditoría técnica y SEO on-page (indexación, arquitectura, rendimiento).",
                    "Revisión GEO: entidades, claridad semántica y “citabilidad”.",
                    "Plan de acción priorizado (quick wins + medio plazo)."
                  ]}
                  ctaText="Solicitar auditoría"
                  ctaHref="#contacto"
                  illustration={
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="10" width="52" height="44" rx="4" />
                      <line x1="6" y1="20" x2="58" y2="20" />
                      <line x1="14" y1="30" x2="32" y2="30" />
                      <line x1="14" y1="38" x2="28" y2="38" />
                      <line x1="14" y1="46" x2="36" y2="46" />
                      <circle cx="44" cy="38" r="9" />
                      <line x1="51" y1="45" x2="56" y2="50" />
                      <path d="M41 38l2 2 4-4" />
                    </svg>
                  }
                />

                <PricingCard
                  title="Posicionamiento Local SEO + GEO"
                  description="Optimización de tu Google Business Profile y tu SEO local para captar clientes en tu zona. Además, creo páginas pensadas para que buscadores e IAs entiendan tu negocio y lo recomienden (GEO)."
                  price="Desde 600€/mes"
                  priceNote={"Tiempo mínimo de trabajo: 6 meses\n* Precio sin IVA"}
                  features={[
                    "Optimización completa de Google Business Profile.",
                    "SEO local: categorías, servicios, reseñas y señales locales.",
                    "Páginas locales orientadas a búsqueda y a IA (GEO).",
                    "Seguimiento mensual + reporting con acciones."
                  ]}
                  ctaText="Empezar ahora"
                  ctaHref="#contacto"
                  illustration={
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="10" width="52" height="44" rx="4" />
                      <line x1="6" y1="20" x2="58" y2="20" />
                      <path d="M12 44l10-10 8 6 18-14" />
                      <path d="M42 26h8v8" />
                      <circle cx="30" cy="36" r="9" />
                    </svg>
                  }
                />

                <PricingCard
                  title="Autoridad Digital para IAs"
                  description="Preparo tu web y su arquitectura técnica para que sea entendida, citada y recomendada por motores de IA y modelos de lenguaje (LLMs). Convierto tu sitio web en una fuente clara, estructurada y confiable para buscadores generativos."
                  price="Desde 500€/mes"
                  priceNote={"Tiempo mínimo de trabajo: 5 meses\n* Precio sin IVA"}
                  features={[
                    "Optimización semántica avanzada (entidades y contexto).",
                    "Mejora de estructura y datos estructurados (schema).",
                    "Refuerzo de señales de autoridad y citabilidad.",
                    "Adaptación del contenido para motores generativos (GEO).",
                    "Monitorización de menciones y visibilidad en IAs."
                  ]}
                  ctaText="Solicitar estrategia"
                  ctaHref="#contacto"
                  illustration={
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 28c0-8.8 7.2-16 16-16s16 7.2 16 16v20c0 4.4-3.6 8-8 8H24c-4.4 0-8-3.6-8-8V28z" />
                      <line x1="32" y1="12" x2="32" y2="6" />
                      <circle cx="32" cy="6" r="1" fill="currentColor" stroke="none" />
                      <circle cx="26" cy="30" r="3" />
                      <circle cx="38" cy="30" r="3" />
                      <line x1="24" y1="42" x2="40" y2="42" />
                      <line x1="28" y1="39" x2="28" y2="45" />
                      <line x1="32" y1="39" x2="32" y2="45" />
                      <line x1="36" y1="39" x2="36" y2="45" />
                    </svg>
                  }
                />
              </div>

              {/* FAQ SEO/GEO */}
              <FaqAccordion
                title="Preguntas frecuentes sobre SEO, GEO y Autoridad para IAs"
                items={PRICING_FAQS_SEO_GEO}
              />
            </div>
          </section>

          {/* SECCIÓN 3: MANTENIMIENTO */}
          <section id="mantenimiento" className="pricing-section">
            <div className="container">
              <div className="pricing-section__header">
                <h2 className="pricing-section__title">Mantenimiento</h2>
                <p className="pricing-section__subtitle">Tu web siempre actualizada, segura y funcionando</p>
              </div>

              <div className="pricing-grid pricing-grid--2col">
                <PricingCard
                  title="Mantenimiento Web Proactivo"
                  description="Servicio continuo para mantener tu web segura, estable y actualizada. Evita fallos, vulnerabilidades y pérdidas de rendimiento antes de que se conviertan en un problema."
                  price="Desde 100€/mes"
                  features={[
                    "Actualizaciones mensuales de núcleo, plugins y sistema.",
                    "Copias de seguridad automáticas y verificadas.",
                    "Monitorización 24/7 de disponibilidad y errores críticos.",
                    "Revisión básica de seguridad y vulnerabilidades."
                  ]}
                  ctaText="Quiero mantener mi web"
                  ctaHref="#contacto"
                  illustration={
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                      <g transform="scale(2)">
                        <path
                          d="m29.532 25.76-5.655-5.655.754-.754-.754-.754-2.261 2.261-3.771-3.77 4.53-4.532a5.6 5.6 0 0 0 1.882.324 5.56 5.56 0 0 0 3.954-1.637 5.57 5.57 0 0 0 1.178-6.174l-.311-.722-2.43 2.43-1.956.027.026-1.866 2.477-2.477-.72-.312a5.6 5.6 0 0 0-2.229-.461 5.55 5.55 0 0 0-3.952 1.637 5.56 5.56 0 0 0-1.311 5.84l-4.529 4.529-6.409-6.408.754-.754-4.145-4.146L2.39 4.647l4.147 4.147.753-.754 6.409 6.408-4.529 4.529a5.6 5.6 0 0 0-1.888-.326 5.56 5.56 0 0 0-3.953 1.637 5.565 5.565 0 0 0-1.176 6.181l.312.72 2.477-2.477 1.865-.025-.027 1.956-2.43 2.43.722.311a5.6 5.6 0 0 0 2.221.458 5.55 5.55 0 0 0 3.952-1.636 5.57 5.57 0 0 0 1.314-5.833l4.532-4.532 3.771 3.769-2.263 2.263.754.754.754-.754 5.654 5.654c.503.504 1.174.781 1.885.781s1.381-.277 1.885-.781a2.67 2.67 0 0 0 0-3.769zM3.899 4.648l.754-.753 2.638 2.638-.754.754zm7.549 17.808a4.51 4.51 0 0 1-.955 4.999 4.5 4.5 0 0 1-3.198 1.324q-.522 0-1.021-.116l1.569-1.569.047-3.485-3.394.046-1.619 1.619a4.5 4.5 0 0 1 1.208-4.229 4.5 4.5 0 0 1 3.199-1.325c.626 0 1.233.125 1.806.373l.333.144L20.242 9.418l-.144-.333a4.505 4.505 0 0 1 .952-5.004 4.5 4.5 0 0 1 3.198-1.325q.526 0 1.03.117L23.66 4.491l-.047 3.394 3.485-.047 1.57-1.57a4.5 4.5 0 0 1-1.209 4.221 4.5 4.5 0 0 1-3.2 1.325c-.624 0-1.23-.125-1.801-.371l-.332-.143-10.821 10.823.143.332zm17.331 6.319c-.302.302-.704.469-1.131.469s-.829-.167-1.131-.469l-5.654-5.654 2.262-2.262 5.655 5.655a1.6 1.6 0 0 1 .001 2.261z"
                          fill="currentColor" stroke="none" />
                      </g>
                    </svg>
                  }
                />

                <PricingCard
                  title="Migraciones Web Seguras"
                  description="Traslado tu sitio web a un nuevo servidor, dominio o entorno sin pérdida de datos ni impacto negativo en SEO. Proceso controlado, seguro y con mínima interrupción."
                  price="Desde 400€"
                  features={[
                    "Migración completa de archivos y base de datos.",
                    "Configuración del nuevo servidor y entorno.",
                    "Redirecciones 301 para preservar posicionamiento SEO.",
                    "Verificación de enlaces, formularios y funcionalidades.",
                    "Test de rendimiento post-migración."
                  ]}
                  ctaText="Migrar mi web"
                  ctaHref="/migraciones-web"
                  illustration={
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M32 6l-20 9v15c0 16 20 28 20 28s20-12 20-28V15l-20-9z" />
                      <path d="M22 32l6 6 14-14" />
                      <circle cx="32" cy="6" r="1" fill="currentColor" stroke="none" />
                      <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
                      <circle cx="52" cy="15" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  }
                />
              </div>

              {/* CTA Mantenimiento */}
              <div className="pricing-section-cta">
                <Link href="#contacto" className="pricing-section-cta__btn">
                  Quiero mantener mi web
                  <span className="pricing-section-cta__icon">
                    <ArrowRight size={20} />
                  </span>
                </Link>
              </div>

              {/* FAQ Mantenimiento */}
              <FaqAccordion
                title="Preguntas frecuentes sobre mantenimiento y migraciones web"
                items={PRICING_FAQS_MANTENIMIENTO}
              />
            </div>
          </section>

          {/* CONTACTO */}
          <section id="contacto" className="pricing-contact">
            <div className="container">
              <ContactForm />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
