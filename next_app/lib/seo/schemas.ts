export const SITE_URL = 'https://carlesdelolmo.com';

export const PERSON_SCHEMA = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  "name": "Carles del Olmo",
  "jobTitle": "Diseñador Web y Especialista SEO/GEO",
  "url": SITE_URL,
  "email": "hola@carlesdelolmo.com",
  "image": `${SITE_URL}/assets/images/carles-del-olmo-logo.webp`,
  "sameAs": [
    "https://www.linkedin.com/in/delolmocarles/",
    "https://github.com/15carles"
  ],
  "knowsLanguage": ["es", "en"]
};

export const BUSINESS_SCHEMA = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  "name": "Carles del Olmo",
  "url": SITE_URL,
  "telephone": "+34668676302",
  "email": "hola@carlesdelolmo.com",
  "image": `${SITE_URL}/assets/images/carles-del-olmo-logo.webp`,
  "priceRange": "€€",
  "description": "Servicios profesionales de diseño web en Valencia especializados en SEO técnico y Generative Engine Optimization (GEO).",
  "slogan": "Webs optimizadas para buscadores y motores de inteligencia artificial",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Benetússer",
    "addressRegion": "Valencia",
    "postalCode": "46910",
    "addressCountry": "ES"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Valencia",
      "sameAs": "https://es.wikipedia.org/wiki/Valencia"
    },
    {
      "@type": "Country",
      "name": "España"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "@id": `${SITE_URL}/#catalog`,
    "name": "Servicios digitales de Carles del Olmo",
    "itemListElement": [
      {
        "@type": "Offer",
        "@id": `${SITE_URL}/#offer-diseno-web`,
        "itemOffered": {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-diseno-web`,
          "name": "Diseño web",
          "description": "Servicio de diseño y desarrollo web profesional orientado a claridad, rendimiento, arquitectura semántica y conversión.",
          "provider": { "@id": `${SITE_URL}/#business` },
          "areaServed": [{ "@type": "City", "name": "Valencia" }, { "@type": "Country", "name": "España" }],
          "serviceType": "Diseño web"
        }
      },
      {
        "@type": "Offer",
        "@id": `${SITE_URL}/#offer-landing-page`,
        "itemOffered": {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-landing-page`,
          "name": "Landing Page",
          "description": "Diseño de landing pages enfocadas en captación de leads, claridad de mensaje y conversión.",
          "provider": { "@id": `${SITE_URL}/#business` },
          "areaServed": [{ "@type": "City", "name": "Valencia" }, { "@type": "Country", "name": "España" }],
          "serviceType": "Landing Page"
        }
      },
      {
        "@type": "Offer",
        "@id": `${SITE_URL}/#offer-web-corporativa`,
        "itemOffered": {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-web-corporativa`,
          "name": "Web Corporativa",
          "description": "Creación de webs corporativas para empresas que necesitan presencia digital sólida, profesional y preparada para crecer.",
          "provider": { "@id": `${SITE_URL}/#business` },
          "areaServed": [{ "@type": "City", "name": "Valencia" }, { "@type": "Country", "name": "España" }],
          "serviceType": "Web Corporativa"
        }
      },
      {
        "@type": "Offer",
        "@id": `${SITE_URL}/#offer-web-a-medida`,
        "itemOffered": {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-web-a-medida`,
          "name": "Web a Medida",
          "description": "Desarrollo web a medida para proyectos que requieren estructura, funcionalidades o arquitectura personalizada.",
          "provider": { "@id": `${SITE_URL}/#business` },
          "areaServed": [{ "@type": "City", "name": "Valencia" }, { "@type": "Country", "name": "España" }],
          "serviceType": "Desarrollo web a medida"
        }
      },
      {
        "@type": "Offer",
        "@id": `${SITE_URL}/#offer-auditoria-seo-geo`,
        "itemOffered": {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-auditoria-seo-geo`,
          "name": "Auditoría SEO + GEO",
          "description": "Análisis técnico y semántico de una web para detectar mejoras de posicionamiento en buscadores y visibilidad en motores generativos.",
          "provider": { "@id": `${SITE_URL}/#business` },
          "areaServed": [{ "@type": "City", "name": "Valencia" }, { "@type": "Country", "name": "España" }],
          "serviceType": "Auditoría SEO + GEO"
        }
      },
      {
        "@type": "Offer",
        "@id": `${SITE_URL}/#offer-posicionamiento-local-seo-geo`,
        "itemOffered": {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-posicionamiento-local-seo-geo`,
          "name": "Posicionamiento Local SEO + GEO",
          "description": "Optimización local para mejorar la visibilidad digital de negocios en Valencia y su presencia en buscadores y sistemas de IA.",
          "provider": { "@id": `${SITE_URL}/#business` },
          "areaServed": [{ "@type": "City", "name": "Valencia" }, { "@type": "Country", "name": "España" }],
          "serviceType": "Posicionamiento Local SEO + GEO"
        }
      },
      {
        "@type": "Offer",
        "@id": `${SITE_URL}/#offer-autoridad-digital-ias`,
        "itemOffered": {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-autoridad-digital-ias`,
          "name": "Autoridad Digital para IAs",
          "description": "Servicio orientado a reforzar la claridad semántica, la estructura de entidades y la capacidad de una web para ser entendida y utilizada por motores generativos.",
          "provider": { "@id": `${SITE_URL}/#business` },
          "areaServed": [{ "@type": "City", "name": "Valencia" }, { "@type": "Country", "name": "España" }],
          "serviceType": "Autoridad Digital para IAs"
        }
      },
      {
        "@type": "Offer",
        "@id": `${SITE_URL}/#offer-mantenimiento-web-proactivo`,
        "itemOffered": {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-mantenimiento-web-proactivo`,
          "name": "Mantenimiento Web Proactivo",
          "description": "Mantenimiento técnico orientado a estabilidad, seguridad, rendimiento y continuidad operativa de la web.",
          "provider": { "@id": `${SITE_URL}/#business` },
          "areaServed": [{ "@type": "City", "name": "Valencia" }, { "@type": "Country", "name": "España" }],
          "serviceType": "Mantenimiento web"
        }
      },
      {
        "@type": "Offer",
        "@id": `${SITE_URL}/#offer-migraciones-web-seguras`,
        "itemOffered": {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-migraciones-web-seguras`,
          "name": "Migraciones Web Seguras",
          "description": "Migración de sitios web con foco en continuidad, preservación SEO, estructura técnica y reducción de riesgos.",
          "provider": { "@id": `${SITE_URL}/#business` },
          "areaServed": [{ "@type": "City", "name": "Valencia" }, { "@type": "Country", "name": "España" }],
          "serviceType": "Migraciones web"
        }
      },
      {
        "@type": "Offer",
        "@id": `${SITE_URL}/#offer-soporte-tecnico`,
        "itemOffered": {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-soporte-tecnico`,
          "name": "Soporte Técnico",
          "description": "Soporte técnico para resolver incidencias, ajustes, mejoras y necesidades puntuales relacionadas con la web.",
          "provider": { "@id": `${SITE_URL}/#business` },
          "areaServed": [{ "@type": "City", "name": "Valencia" }, { "@type": "Country", "name": "España" }],
          "serviceType": "Soporte técnico web"
        }
      }
    ]
  }
};

export function generateBreadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumbs`,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? (item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`) : undefined
    }))
  };
}

export function generateBlogSchema(post: {
  slug: string;
  title: string;
  description: string;
  isoDate: string;
  keywords?: string[];
  categories?: string[];
  faqs?: { question: string; answer: string }[];
}) {
  const graph: any[] = [
    PERSON_SCHEMA,
    BUSINESS_SCHEMA,
    {
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${post.slug}#blogposting`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/${post.slug}`
      },
      "headline": typeof post.title === 'string' ? post.title : (post.title as any)?.name || '',
      "description": post.description,
      "datePublished": post.isoDate,
      "dateModified": post.isoDate,
      "author": { "@id": `${SITE_URL}/#person` },
      "publisher": { "@id": `${SITE_URL}/#business` },
      "keywords": post.keywords || [],
      "articleSection": post.categories || []
    }
  ];

  if (post.faqs && post.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/blog/${post.slug}#faq`,
      "mainEntity": post.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}
