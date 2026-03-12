import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { generateBlogSchema, SITE_URL } from '@/lib/seo/schemas';
import { constructMetadata } from '@/lib/seo/metadata';

interface PostData {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  isoDate: string;
  categories: string[];
  content: React.ReactNode;
  metadata: {
    title: string;
    description: string;
  };
  keywords?: string[];
}

const postsData: Record<string, PostData> = {
  'el-fin-del-seo-la-era-del-geo': {
    slug: 'el-fin-del-seo-la-era-del-geo',
    title: 'El fin del SEO tal como lo conocemos: La era del GEO',
    subtitle: 'De posicionar enlaces en Google a ser la fuente de respuesta en motores generativos de IA.',
    date: '24 Feb, 2026',
    isoDate: '2026-02-24',
    categories: ['GEO', 'SEO Avanzado', 'Estrategia'],
    keywords: ["GEO", "Generative Engine Optimization", "SEO", "SEO técnico", "motores generativos", "ChatGPT", "Gemini", "Perplexity", "Copilot"],
    metadata: {
      title: 'El fin del SEO tal como lo conocemos: La era del GEO | Carles del Olmo',
      description: 'El SEO ha evolucionado. Descubre qué es el GEO (Generative Engine Optimization) y cómo adaptar tu web para aparecer en las respuestas de IA (ChatGPT, Gemini).',
    },
    content: (
      <>
        <h2>El cambio ya ha empezado</h2>
        <div className="article-box">
          <p className="text-secondary" style={{ fontSize: '1.125rem', fontWeight: 500 }}>
            Durante más de dos décadas, el SEO ha sido el canal principal para generar visibilidad online. Optimizar para Google significaba optimizar para internet. Pero eso ha cambiado.
          </p>
          <p className="text-secondary">
            Hoy, millones de personas ya no buscan únicamente en Google. Preguntan directamente a motores generativos como ChatGPT, Perplexity, Gemini o Copilot. Y estas plataformas no muestran una lista de enlaces: generan respuestas.
          </p>
          <p>
            Aquí es donde nace el concepto de GEO (Generative Engine Optimization). No se trata solo de posicionar en una SERP. Se trata de que tu web sea seleccionada, interpretada y citada por sistemas de inteligencia artificial.
          </p>
          <p>
            En mi trabajo desarrollando webs optimizadas para SEO técnico y motores generativos, veo cada día el mismo patrón: muchas empresas siguen compitiendo por rankings tradicionales mientras ignoran cómo funcionan los motores de IA.
          </p>
          <p><strong>Esa brecha es la nueva oportunidad competitiva.</strong></p>
        </div>

        <h2>¿Qué es exactamente el GEO?</h2>
        <div className="article-box">
          <p>
            GEO (Generative Engine Optimization) es la evolución natural del SEO en un entorno dominado por inteligencia artificial generativa.
          </p>
          <p>
            Si el SEO busca posicionar páginas en resultados de búsqueda, el GEO busca que tu contenido sea utilizado como fuente dentro de respuestas generadas por IA.
          </p>
          <p>Eso implica algo diferente:</p>
          <ul>
            <li>No basta con aparecer en el puesto #1.</li>
            <li>Hay que ser estructuralmente comprensible.</li>
            <li>Hay que demostrar autoridad real.</li>
            <li>Hay que aportar información clara, verificable y bien organizada.</li>
          </ul>
          <blockquote>El GEO no sustituye al SEO. Lo amplía.</blockquote>
        </div>

        <h2>Diferencias clave entre SEO tradicional y GEO</h2>
        <div className="article-box article-box--overflow">
          <table className="article-table">
            <thead>
              <tr>
                <th>Característica</th>
                <th>SEO Tradicional</th>
                <th>GEO (Generative Engine Optimization)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Objetivo</strong></td>
                <td>Posicionamiento en SERPs.</td>
                <td>Citabilidad en respuestas generativas.</td>
              </tr>
              <tr>
                <td><strong>Métricas</strong></td>
                <td>Mide rankings, CTR y tráfico orgánico.</td>
                <td>Mide visibilidad en respuestas de IA, menciones de marca y tráfico derivado de motores generativos.</td>
              </tr>
              <tr>
                <td><strong>Señales prioritarias</strong></td>
                <td>Backlinks y optimización on-page.</td>
                <td>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                    <li>Arquitectura semántica clara</li>
                    <li>Datos estructurados</li>
                    <li>Autoridad temática profunda</li>
                    <li>Contenido original y útil</li>
                    <li>Presencia en fuentes externas confiables</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Por qué esto importa para tu negocio</h2>
        <div className="article-box">
          <p>Si tu potencial cliente pregunta:</p>
          <ul>
            <li><em>“¿Cuál es la mejor herramienta de SaaS?”</em></li>
            <li><em>“¿Cómo desgravar impuestos?”</em></li>
            <li><em>“¿Qué empresas ofrecen X servicio en Valencia?”</em></li>
          </ul>
          <p>
            Y tu marca no aparece en esa respuesta… <strong>Estás fuera de la conversación antes incluso de empezar.</strong>
          </p>
          <p>
            El cambio no es solo técnico. Es estratégico. Las empresas que adapten su web a motores generativos ganarán visibilidad cualificada antes que su competencia.
          </p>
        </div>

        <h2>Cómo funcionan los motores generativos al elegir fuentes</h2>
        <div className="article-box">
          <p><strong>No todas las plataformas funcionan igual, pero comparten patrones comunes:</strong></p>
          <ul>
            <li>Analizan autoridad del dominio.</li>
            <li>Detectan estructura semántica.</li>
            <li>Extraen entidades claras.</li>
            <li>Priorizan contenido bien organizado.</li>
            <li>Valoran actualidad y claridad.</li>
          </ul>
          <p><strong>Cuando trabajo un proyecto orientado a GEO, no pienso solo en keywords. Pienso en:</strong></p>
          <ul>
            <li>Entidades.</li>
            <li>Relaciones.</li>
            <li>Contexto.</li>
            <li>Claridad estructural.</li>
            <li>Datos que puedan ser citados.</li>
          </ul>
          <p>Ese enfoque cambia completamente la forma de construir una web.</p>
        </div>

        <h2>Señales que aumentan la probabilidad de ser citado por IA</h2>
        <div className="article-box article-box--overflow">
          <table className="article-table">
            <thead>
              <tr>
                <th>Señal GEO</th>
                <th>Descripción y Requisitos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Contenido profundo y específico</strong></td>
                <td>Las IAs no buscan textos genéricos. Buscan respuestas claras.</td>
              </tr>
              <tr>
                <td><strong>Estructura semántica sólida</strong></td>
                <td>Uso marcado Schema, organización clara de encabezados y definición explícita de entidades clave.</td>
              </tr>
              <tr>
                <td><strong>Datos originales</strong></td>
                <td>Estudios propios, benchmarks, casos reales.</td>
              </tr>
              <tr>
                <td><strong>Arquitectura limpia y técnica sólida</strong></td>
                <td>Core Web Vitals optimizados. Carga rápida. Sin bloqueos para bots.</td>
              </tr>
              <tr>
                <td><strong>Autoridad temática consistente</strong></td>
                <td>No basta con un artículo aislado. Se necesita coherencia global.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Cómo aplico GEO en mis proyectos</h2>
        <div className="article-box">
          <p>Cuando desarrollo una web o rediseño una existente, sigo un proceso claro:</p>
          <table className="article-table">
            <thead>
              <tr>
                <th>Medida</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Auditoría de citabilidad</strong></td>
                <td>Analizo si el contenido es extraíble, comprensible, estructurado y citable.</td>
              </tr>
              <tr>
                <td><strong>Arquitectura orientada a entidades</strong></td>
                <td>Diseño la estructura pensando en servicios, procesos, categorías y relaciones semánticas.</td>
              </tr>
              <tr>
                <td><strong>Implementación de SEO técnico avanzado</strong></td>
                <td>Optimización de Schema JSON-LD, Core Web Vitals, indexación y arquitectura interna.</td>
              </tr>
              <tr>
                <td><strong>Integración con automatizaciones</strong></td>
                <td>No tiene sentido atraer tráfico si no convierte. Por eso integro automatizaciones de captación, flujos de seguimiento y sistemas de lead scoring.</td>
              </tr>
              <tr>
                <td><strong>Seguimiento y análisis</strong></td>
                <td>Para poder cuantificar la conversión y poder saber si funciona o debemos reformular la estrategia, realizo informes detallados.</td>
              </tr>
            </tbody>
          </table>
          <br />
          <p>El objetivo no es solo visibilidad.<strong> Es negocio.</strong></p>
        </div>

        <div className="cta-section mt-2xl">
          <h2 className="cta-section__title" style={{ fontSize: '1.5rem' }}>¿Tu web está preparada para aparecer en respuestas IA?</h2>
          <p className="cta-section__text">
            Hoy la visibilidad ya no se gana solo posicionando en Google. Se gana siendo la fuente que los motores generativos utilizan para construir sus respuestas.
          </p>
          <div className="cta-section__buttons" style={{ marginTop: '2rem' }}>
            <Link href="/contacto" className="btn btn--primary">Agenda una auditoría estratégica</Link>
          </div>
        </div>
      </>
    )
  },
  'por-que-muchas-webs-no-aparecen-en-respuestas-de-ia': {
    slug: 'por-que-muchas-webs-no-aparecen-en-respuestas-de-ia',
    title: 'Por qué muchas webs no aparecen en respuestas de IA',
    subtitle: 'Introducción al GEO (Generative Engine Optimization) y al modelo DELTA de visibilidad generativa.',
    date: '9 Mar, 2026',
    isoDate: '2026-03-09',
    categories: ['SEO Avanzado', 'GEO', 'Arquitectura Web'],
    keywords: ["GEO", "Generative Engine Optimization", "SEO", "IA", "ChatGPT", "Perplexity", "Copilot", "Gemini", "modelo DELTA", "visibilidad generativa"],
    metadata: {
      title: 'Por qué muchas webs no aparecen en respuestas de IA | Carles del Olmo',
      description: 'Descubre por qué muchas webs no aparecen en respuestas generadas por IA, qué es el GEO y cómo el modelo DELTA ayuda a mejorar la visibilidad en motores generativos.',
    },
    content: (
      <>
        <h2>Introducción</h2>
        <div className="article-box">
          <p>
            Durante más de dos décadas, el posicionamiento en buscadores ha sido una de las disciplinas más importantes del marketing digital. El objetivo era claro: aparecer en los primeros resultados de buscadores como Google Search o Microsoft Bing.
          </p>
          <p>
            Sin embargo, la forma en que las personas acceden a la información en internet está cambiando rápidamente.
          </p>
          <p>
            Cada vez más usuarios no realizan búsquedas tradicionales, sino que formulan preguntas directamente a sistemas de inteligencia artificial conversacional como ChatGPT, Perplexity AI, Microsoft Copilot o Google Gemini.
          </p>
          <p>
            Estos sistemas no se limitan a mostrar enlaces. En su lugar, generan respuestas completas y sintetizadas, elaboradas a partir de múltiples fuentes.
          </p>
        </div>

        <h2>La paradoja de visibilidad de la IA</h2>
        <div className="article-box">
          <p>
            Uno de los fenómenos más interesantes que están apareciendo en esta nueva etapa de internet es lo que podemos denominar la paradoja de visibilidad de la IA.
          </p>
          <p><strong>Definición</strong></p>
          <p>
            “La paradoja de visibilidad de la IA describe la situación en la que una web puede posicionar correctamente en buscadores tradicionales, pero no aparece como fuente en respuestas generadas por sistemas de inteligencia artificial.”
          </p>
          <p>
            Este fenómeno se está volviendo cada vez más común debido a que los criterios de selección de información de los LLMs difieren de los algoritmos de búsqueda tradicionales.
          </p>
        </div>

        <h2>El modelo DELTA de visibilidad en GEO</h2>
        <div className="article-box">
          <p>
            Dentro del marco del GEO, propongo lo que denomino modelo DELTA de visibilidad en motores generativos.
          </p>
          <p><strong>Definición</strong></p>
          <p>
            “El modelo DELTA describe cinco factores que aumentan la probabilidad de que un contenido sea utilizado como fuente por sistemas de inteligencia artificial dentro de estrategias de Generative Engine Optimization.”
          </p>
          <ul className="mt-md">
            <li><strong>D</strong> — Definiciones claras: Las IAs reutilizan con facilidad contenidos que incluyen definiciones explícitas.</li>
            <li><strong>E</strong> — Estructura semántica: Información organizada de forma clara y jerárquica con encabezados bien definidos.</li>
            <li><strong>L</strong> — Liderazgo conceptual: Introducción de nuevos términos, marcos o perspectivas originales.</li>
            <li><strong>T</strong> — Tematicidad profunda: Autoridad demostrada a través de múltiples contenidos interconectados.</li>
            <li><strong>A</strong> — Atomicidad del conocimiento: Información presentada en unidades lógicas fáciles de extraer y sintetizar.</li>
          </ul>
        </div>

        <div className="cta-section mt-2xl">
          <h2 className="cta-section__title" style={{ fontSize: '1.5rem' }}>¿Quieres que la IA cite tu web?</h2>
          <p className="cta-section__text">
            Analizamos tu infraestructura actual y aplicamos el modelo DELTA para maximizar tu visibilidad generativa.
          </p>
          <div className="cta-section__buttons" style={{ marginTop: '2rem' }}>
            <Link href="/contacto" className="btn btn--primary">Hablemos de tu estrategia</Link>
          </div>
        </div>
      </>
    )
  },
  'semantica-avanzada-motores-ia': {
    slug: 'semantica-avanzada-motores-ia',
    title: 'Cómo la semántica avanzada está cambiando el tráfico desde Perplexity y motores de IA',
    subtitle: 'Por qué la estructura semántica y las entidades determinan si una IA puede entender —y citar— tu web.',
    date: '8 Mar, 2026',
    isoDate: '2026-03-08',
    categories: ['SEO Avanzado', 'GEO', 'Arquitectura Web'],
    keywords: ["semántica web", "semántica avanzada", "SEO semántico", "GEO", "Perplexity", "motores generativos", "entidades", "Schema.org", "ChatGPT", "Gemini", "Copilot"],
    metadata: {
      title: 'Cómo la semántica avanzada está cambiando el tráfico desde Perplexity | Carles del Olmo',
      description: 'La semántica avanzada, las entidades y la arquitectura web están cambiando cómo los motores generativos como Perplexity interpretan y citan contenido.',
    },
    content: (
      <>
        <h2>Introducción - No es tráfico, es interpretación</h2>
        <div className="article-box">
          <p>
            Durante años hemos optimizado para palabras clave. Hoy optimizamos para significado.
          </p>
          <p>
            Motores como Perplexity, ChatGPT con navegación, Gemini o Copilot no funcionan como un buscador clásico. No clasifican páginas únicamente por coincidencia de términos. Interpretan contexto, relaciones y entidades.
          </p>
          <p>
            Y esa diferencia cambia completamente la forma en que una web puede recibir tráfico. No se trata de rankear. Se trata de ser entendido.
          </p>
        </div>

        <h2>Qué significa realmente “semántica avanzada” en la web</h2>
        <div className="article-box">
          <p>
            Cuando hablamos de semántica avanzada no hablamos solo de usar encabezados correctamente. Hablamos de:
          </p>
          <ul>
            <li>Definir entidades claras (empresa, servicio, categoría, proceso).</li>
            <li>Establecer relaciones entre ellas.</li>
            <li>Utilizar datos estructurados (Schema.org).</li>
            <li>Crear arquitectura coherente e íntegra.</li>
            <li>Evitar ambigüedades conceptuales.</li>
          </ul>
        </div>

        <h2>Entidades y relaciones — el verdadero lenguaje de la IA</h2>
        <div className="article-box">
          <p>Una entidad es algo identificable y único como una empresa, un servicio o una metodología. Pero lo importante no es solo definir la entidad, es definir cómo se relaciona con el resto del ecosistema.</p>
          <p><strong>Ejemplo:</strong></p>
          <ul>
            <li>Entidad: SEO técnico</li>
            <li>Relacionada con: Core Web Vitals, Indexación, Arquitectura web.</li>
          </ul>
          <p>
            Cuando esa red está clara en tu web, la IA puede comprender tu especialización. Si no existe esa red, tu contenido es simplemente ruido para un modelo de lenguaje.
          </p>
        </div>

        <div className="cta-section mt-2xl">
          <h2 className="cta-section__title" style={{ fontSize: '1.5rem' }}>Prepara tu web para ser la fuente de autoridad</h2>
          <p className="cta-section__text">
            Construimos grafos de conocimiento sobre tu propia web para que las IAs te reconozcan como líder en tu sector.
          </p>
          <div className="cta-section__buttons" style={{ marginTop: '2rem' }}>
            <Link href="/contacto" className="btn btn--primary">Cuéntame tu proyecto</Link>
          </div>
        </div>
      </>
    )
  }
};

export async function generateStaticParams() {
  return Object.keys(postsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = postsData[params.slug];
  if (!post) return {};
  return constructMetadata({
    title: post.metadata.title,
    description: post.metadata.description,
    exactUrl: `${SITE_URL}/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.isoDate,
  });
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = postsData[params.slug];

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title }
  ];

  const jsonLd = generateBlogSchema({
    slug: post.slug,
    title: post.title,
    description: post.metadata.description,
    isoDate: post.isoDate,
    keywords: post.keywords,
    categories: post.categories
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="page__content">
        <header className="page-header animate-on-scroll">
          <div className="container">
            <Breadcrumbs items={breadcrumbs} />
            
            <h1 className="page-header__title mt-xl">{post.title}</h1>
            <p className="page-header__subtitle">{post.subtitle}</p>

            <div className="page-header__meta">
              <time dateTime={post.isoDate}>{post.date}</time>
              {post.categories.map((cat, i) => (
                <span key={i} className={`badge badge--${i === 0 ? 'teal' : i === 1 ? 'blue' : 'purple'}`}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </header>

        <article className="section animate-on-scroll">
          <div className="container">
            <div className="article-content">
              {post.content}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

