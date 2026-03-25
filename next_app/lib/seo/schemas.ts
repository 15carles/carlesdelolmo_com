export const SITE_URL = 'https://carlesdelolmo.com';

function toAbsoluteUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url, SITE_URL).toString();
  } catch {
    return undefined;
  }
}

export const PERSON_SCHEMA = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  "name": "Carles del Olmo",
  "jobTitle": "Diseñador Web en Valencia y Especialista en SEO Técnico y Generative Engine Optimization (GEO)",
  "url": SITE_URL,
  "telephone": "+34 668 676 302",
  "email": "hola@carlesdelolmo.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Benetússer",
    "addressRegion": "Valencia",
    "postalCode": "46910",
    "addressCountry": "ES"
  },
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
        "@id": `${SITE_URL}/#offer-mantenimiento-web-valencia`,
        "itemOffered": {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-mantenimiento-web-valencia`,
          "name": "Mantenimiento Web Valencia",
          "description": "Mantenimiento web en Valencia y remoto orientado a estabilidad, soporte, pequeñas mejoras y continuidad operativa de la web.",
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

type HomeSectionDefinition = {
  id: string;
  name: string;
  description: string;
};

const HOME_SECTION_DEFINITIONS: HomeSectionDefinition[] = [
  {
    id: 'hero',
    name: 'Hero principal',
    description: 'Presentación del servicio de diseño web optimizado para buscadores e inteligencia artificial.',
  },
  {
    id: 'credibilidad',
    name: 'Diseño web con enfoque estratégico',
    description: 'Bloque de credibilidad sobre enfoque de trabajo, desarrollo a medida y base SEO/GEO.',
  },
  {
    id: 'que-resuelvo',
    name: 'Problemas que resuelve una web bien planteada',
    description: 'Errores habituales en webs corporativas y cómo corregir claridad, estructura y utilidad comercial.',
  },
  {
    id: 'servicios',
    name: 'Servicios',
    description: 'Oferta de diseño y desarrollo web, SEO estructural, preparación IA/GEO y automatización.',
  },
  {
    id: 'caso-destacado',
    name: 'Caso de estudio destacado',
    description: 'Prueba real de trabajo aplicado con enfoque estratégico y resultados de claridad y estructura.',
  },
  {
    id: 'metodo-orbita',
    name: 'Método ORBITA',
    description: 'Marco de trabajo para optimización técnica, relevancia semántica, autoridad e iteración continua.',
  },
  {
    id: 'diferenciadores',
    name: 'Diferenciadores',
    description: 'Factores que hacen que una web esté mejor construida y más preparada para crecer.',
  },
  {
    id: 'insights',
    name: 'Insights',
    description: 'Selección de contenidos expertos sobre desarrollo web, SEO, GEO y preparación para IA.',
  },
  {
    id: 'para-quien',
    name: 'Encaje de proyecto',
    description: 'Tipo de proyectos y empresas con los que este enfoque aporta más valor.',
  },
  {
    id: 'cta-final',
    name: 'Llamada a la acción final',
    description: 'Bloque final para iniciar contacto o revisar servicios y precios.',
  },
  {
    id: 'contacto',
    name: 'Formulario de contacto',
    description: 'Sección para solicitar propuesta y abrir conversación sobre el proyecto web.',
  },
];

const HOME_RELATED_LINKS = [
  `${SITE_URL}/contacto`,
  `${SITE_URL}/pricing`,
  `${SITE_URL}/proyectos/ledescaparate`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/diseno-web/valencia`,
];

export function generateHomeSchema() {
  const webpageId = `${SITE_URL}/#webpage`;
  const websiteId = `${SITE_URL}/#website`;
  const breadcrumbsId = `${SITE_URL}/#breadcrumbs`;
  const sectionsListId = `${SITE_URL}/#home-sections`;

  const sectionEntities = HOME_SECTION_DEFINITIONS.map((section) => ({
    "@type": "WebPageElement",
    "@id": `${SITE_URL}/#${section.id}`,
    "url": `${SITE_URL}/#${section.id}`,
    "name": section.name,
    "description": section.description,
    "isPartOf": { "@id": webpageId },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      BUSINESS_SCHEMA,
      {
        "@type": "WebSite",
        "@id": websiteId,
        "url": SITE_URL,
        "name": "Carles del Olmo",
        "inLanguage": "es-ES",
        "publisher": { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        "url": SITE_URL,
        "name": "Diseño web en Valencia | Carles del Olmo - SEO y GEO",
        "description": "Web profesional orientada a claridad, posicionamiento SEO/GEO y crecimiento digital sostenible.",
        "inLanguage": "es-ES",
        "isPartOf": { "@id": websiteId },
        "about": [
          { "@id": `${SITE_URL}/#person` },
          { "@id": `${SITE_URL}/#business` },
        ],
        "breadcrumb": { "@id": breadcrumbsId },
        "mainEntity": { "@id": sectionsListId },
        "hasPart": sectionEntities.map((section) => ({ "@id": section["@id"] })),
        "relatedLink": HOME_RELATED_LINKS,
      },
      generateBreadcrumbSchema([{ label: 'Inicio', href: '/' }], breadcrumbsId),
      {
        "@type": "ItemList",
        "@id": sectionsListId,
        "name": "Secciones principales de la Home",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": HOME_SECTION_DEFINITIONS.length,
        "itemListElement": HOME_SECTION_DEFINITIONS.map((section, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": section.name,
          "item": { "@id": `${SITE_URL}/#${section.id}` },
        })),
      },
      ...sectionEntities,
    ],
  };
}

export function generateBreadcrumbSchema(
  items: { label: string; href?: string }[],
  breadcrumbId: string = `${SITE_URL}/#breadcrumbs`
) {
  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
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
  author?: {
    name: string;
    email?: string | null;
    schemaId?: string | null;
    specialties?: readonly string[] | null;
    socialLinks?: readonly { platform: string; url: string }[] | null;
  } | null;
}) {
  const graph: Record<string, unknown>[] = [
    PERSON_SCHEMA,
    BUSINESS_SCHEMA,
  ];

  let authorObject: Record<string, unknown>;

  if (post.author) {
    if (post.author.schemaId) {
      // Caso 1: El autor tiene schemaId, referenciamos por @id
      authorObject = { "@id": post.author.schemaId };
    } else {
      // Caso 2: El autor NO tiene schemaId, creamos un objeto Person independiente
      authorObject = {
        "@type": "Person",
        "name": post.author.name,
        ...(post.author.email ? { "email": post.author.email.startsWith('mailto:') ? post.author.email : `mailto:${post.author.email}` } : {}),
        ...(post.author.specialties?.length ? { "knowsAbout": [...post.author.specialties] } : {}),
        ...(post.author.socialLinks?.length ? { "sameAs": post.author.socialLinks.map(link => link.url) } : {}),
      };
      // Si es un autor independiente, lo añadimos al grafo para que tenga su propia entidad si es necesario, 
      // aunque aquí lo ideal es que vaya embebido en el BlogPosting como pide el usuario para autores invitados.
    }
  } else {
    // Fallback: si no hay autor definido (no debería ocurrir por validación de Keystatic)
    authorObject = { "@id": `${SITE_URL}/#person` };
  }

  graph.push({
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}#blogposting`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.description,
    "datePublished": post.isoDate,
    "dateModified": post.isoDate,
    "author": authorObject,
    "publisher": { "@id": `${SITE_URL}/#business` },
    "keywords": post.keywords || [],
    "articleSection": post.categories || []
  });

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

export function generateProjectSchema(project: {
  slug: string;
  title: string;
  description: string;
  isoDate: string;
  sector: string;
  foco: string;
  client?: {
    name: string;
    url?: string;
    logo?: string;
  };
  testimonial?: {
    text: string;
    author: string;
    role?: string;
  };
}) {
  const projectUrl = `${SITE_URL}/proyectos/${project.slug}`;
  const breadcrumbId = `${projectUrl}#breadcrumb`;
  const clientLogoUrl = toAbsoluteUrl(project.client?.logo);
  const projectImage = clientLogoUrl;
  const publishedDate = project.isoDate || undefined;
  
  const graph: Record<string, unknown>[] = [
    PERSON_SCHEMA,
    BUSINESS_SCHEMA,
    {
      "@type": "WebPage",
      "@id": `${projectUrl}#webpage`,
      "url": projectUrl,
      "name": project.title,
      "description": project.description,
      "inLanguage": "es-ES",
      "isPartOf": { "@id": `${SITE_URL}/#website` },
      "about": { "@id": `${SITE_URL}/#person` },
      "publisher": { "@id": `${SITE_URL}/#business` },
      "mainEntity": { "@id": `${projectUrl}#case-study` },
      "breadcrumb": { "@id": breadcrumbId }
    },
    generateBreadcrumbSchema([
      { label: 'Inicio', href: '/' },
      { label: 'Proyectos', href: '/#proyectos' },
      { label: project.title, href: `/proyectos/${project.slug}` }
    ], breadcrumbId),
    {
      "@type": "CreativeWork",
      "@id": `${projectUrl}#case-study`,
      "additionalType": "https://schema.org/CaseStudy",
      "name": project.title,
      "description": project.description,
      "inLanguage": "es-ES",
      "author": { "@id": `${SITE_URL}/#person` },
      "publisher": { "@id": `${SITE_URL}/#business` },
      ...(projectImage ? { "image": projectImage } : {}),
      ...(publishedDate ? { "datePublished": publishedDate, "dateModified": publishedDate } : {}),
      "about": [
        "Arquitectura de entidades",
        "SEO técnico",
        "Generative Engine Optimization",
        project.sector,
        project.foco
      ].filter(Boolean)
    }
  ];

  if (project.client) {
    const clientOrgId = `${project.client.url || projectUrl}#org`;
    graph.push({
      "@type": "Organization",
      "@id": clientOrgId,
      "name": project.client.name,
      "url": project.client.url,
      ...(clientLogoUrl ? { "logo": clientLogoUrl } : {})
    });

    if (project.client.url) {
      graph.push({
        "@type": "WebSite",
        "@id": `${project.client.url}#website`,
        "url": project.client.url,
        "name": project.client.name,
        "publisher": { "@id": clientOrgId }
      });
    }

    // Si hay testimonio, añadimos la Review
    if (project.testimonial) {
      graph.push({
        "@type": "Review",
        "@id": `${projectUrl}#review`,
        "itemReviewed": { "@id": `${projectUrl}#case-study` },
        "reviewBody": project.testimonial.text,
        "author": {
          "@type": "Person",
          "name": project.testimonial.author,
          "affiliation": { "@id": clientOrgId }
        }
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}
