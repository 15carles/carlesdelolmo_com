// Fuente de verdad de la taxonomía de clusters de contenido.
// Sin dependencias del servidor: lo importan tanto keystatic.config.tsx como
// componentes de React y rutas. Solo constantes y funciones puras.

export type ClusterValue =
  | 'geo-ia'
  | 'diseno-desarrollo'
  | 'diseno-web-local'
  | 'mantenimiento-mejora';

export interface ClusterDef {
  value: ClusterValue;
  label: string;
  /** slug del hub bajo /blog/categoria/ */
  slug: string;
  /** ruta de la página pillar del cluster */
  pillar: string;
  /** descripción para los metadatos del hub */
  description: string;
}

export const CLUSTERS: readonly ClusterDef[] = [
  {
    value: 'geo-ia',
    label: 'GEO y visibilidad en IA',
    slug: 'geo-y-visibilidad-en-ia',
    pillar: '/servicio-seo/autoridad-digital-ias',
    description:
      'Guías sobre cómo aparecer y ser citado en respuestas de IA (ChatGPT, Gemini, Perplexity) y motores generativos (GEO).',
  },
  {
    value: 'diseno-desarrollo',
    label: 'Diseño y desarrollo web',
    slug: 'diseno-y-desarrollo-web',
    pillar: '/diseno-web',
    description:
      'Diseño y desarrollo de webs para empresas: estructura, conversión, decisión de compra y buenas prácticas.',
  },
  {
    value: 'diseno-web-local',
    label: 'Diseño web local',
    slug: 'diseno-web-local',
    pillar: '/diseno-web/valencia',
    description:
      'Diseño web y SEO local para empresas de Valencia, Castellón y Alicante.',
  },
  {
    value: 'mantenimiento-mejora',
    label: 'Mantenimiento y mejora web',
    slug: 'mantenimiento-y-mejora-web',
    pillar: '/mantenimiento-web-valencia',
    description:
      'Mantenimiento, rendimiento, rediseño y mejora continua de webs profesionales.',
  },
];

export const CLUSTER_OPTIONS: { label: string; value: ClusterValue }[] =
  CLUSTERS.map((c) => ({ label: c.label, value: c.value }));

export const TOPIC_OPTIONS: { label: string; value: string }[] = [
  { value: 'conversion', label: 'Conversión' },
  { value: 'estrategia-negocio', label: 'Estrategia y negocio' },
  { value: 'seo-tecnico', label: 'SEO técnico' },
  { value: 'autoridad-eeat', label: 'Autoridad y E-E-A-T' },
  { value: 'arquitectura-contenidos', label: 'Arquitectura de contenidos' },
  { value: 'rendimiento', label: 'Rendimiento web' },
  { value: 'automatizacion', label: 'Automatización' },
  { value: 'decision-compra', label: 'Decisión de compra' },
  { value: 'precio-presupuesto', label: 'Precio y presupuesto' },
  { value: 'industria-b2b', label: 'Industria y B2B' },
  { value: 'turismo', label: 'Turismo' },
  { value: 'ia-generativa', label: 'IA generativa (GEO)' },
  { value: 'local-valencia', label: 'Valencia' },
  { value: 'local-alicante', label: 'Alicante' },
  { value: 'local-castellon', label: 'Castellón' },
];

/**
 * Mapa slug de post -> cluster. Referencia autoritativa de la migración y base
 * para verificación y para construir params/listados de los hubs.
 */
export const POST_CLUSTER: Record<string, ClusterValue> = {
  // geo-ia (12)
  'el-fin-del-seo-la-era-del-geo': 'geo-ia',
  'como-preparar-web-para-aparecer-en-respuestas-de-ia': 'geo-ia',
  'por-que-webs-no-aparecen-respuestas-ia': 'geo-ia',
  'semantica-avanzada-motores-ia': 'geo-ia',
  'modelo-delta-visibilidad-generativa': 'geo-ia',
  'quiero-que-mi-negocio-sea-mencionado-por-la-ia': 'geo-ia',
  'como-medir-visibilidad-empresa-ia': 'geo-ia',
  'chatgpt-informacion-incorrecta-empresa': 'geo-ia',
  'la-paradoja-de-visibilidad-de-la-ia': 'geo-ia',
  'mi-vision-ia-cambiara-optimizacion-web-seo': 'geo-ia',
  'auditoria-seo-geo-antes-de-invertir-en-contenido': 'geo-ia',
  'metodo-orbita': 'geo-ia',
  // diseno-desarrollo (15)
  'estructura-ideal-pagina-web-empresas': 'diseno-desarrollo',
  'que-debe-tener-una-pagina-web-para-generar-clientes': 'diseno-desarrollo',
  'errores-comunes-web-no-convierte': 'diseno-desarrollo',
  'errores-diseno-web-que-hacen-perder-clientes': 'diseno-desarrollo',
  'diseno-web-a-medida-vs-plantillas-empresa': 'diseno-desarrollo',
  'como-elegir-disenador-web-para-tu-empresa': 'diseno-desarrollo',
  'tipos-proveedores-crear-web-profesional': 'diseno-desarrollo',
  'web-corporativa-vs-web-a-medida-empresa-valencia': 'diseno-desarrollo',
  'tendencias-diseno-web-empresas': 'diseno-desarrollo',
  'herramientas-procesos-diseno-web-generar-clientes': 'diseno-desarrollo',
  'mi-enfoque-para-crear-paginas-web-que-realmente-funcionan': 'diseno-desarrollo',
  'cuanto-cuesta-pagina-web-profesional-empresa-2026': 'diseno-desarrollo',
  'por-que-paginas-web-empresa-no-generan-clientes': 'diseno-desarrollo',
  'automatizacion-web-empresas': 'diseno-desarrollo',
  'necesitas-ayuda-con-tu-pagina-web-y-no-sabes-por-donde-empezar': 'diseno-desarrollo',
  // diseno-web-local (7)
  'como-estructurar-web-empresa-servicios-valencia': 'diseno-web-local',
  'landing-page-valencia-para-convertir-clientes': 'diseno-web-local',
  'checklist-web-turismo-costa-blanca': 'diseno-web-local',
  'web-empresas-industriales-alicante-catalogo-digital': 'diseno-web-local',
  'catalogo-pdf-o-catalogo-web-empresa-industrial': 'diseno-web-local',
  'web-bien-disenada-multiplicar-clientes-valencia': 'diseno-web-local',
  'como-elegir-disenador-web-valencia-2026': 'diseno-web-local',
  // mantenimiento-mejora (7)
  'por-que-una-web-profesional-necesita-mantenimiento': 'mantenimiento-mejora',
  'mantenimiento-proactivo-web-generando-clientes': 'mantenimiento-mejora',
  'por-que-una-web-lenta-te-hace-perder-clientes': 'mantenimiento-mejora',
  'como-mejorar-web-empresa-sin-rehacerla': 'mantenimiento-mejora',
  'cuando-una-empresa-deberia-redisenar-su-pagina-web': 'mantenimiento-mejora',
  'como-analizo-una-web-antes-de-empezar-un-proyecto': 'mantenimiento-mejora',
  'que-miro-primero-reviso-pagina-web-empresa': 'mantenimiento-mejora',
};

const CLUSTER_BY_VALUE = new Map<string, ClusterDef>(
  CLUSTERS.map((c) => [c.value, c] as const)
);
const CLUSTER_BY_SLUG = new Map<string, ClusterDef>(
  CLUSTERS.map((c) => [c.slug, c] as const)
);
const TOPIC_LABEL = new Map<string, string>(
  TOPIC_OPTIONS.map((t) => [t.value, t.label] as const)
);

export function clusterByValue(value: string | undefined | null): ClusterDef | undefined {
  return value ? CLUSTER_BY_VALUE.get(value) : undefined;
}

export function clusterBySlug(slug: string): ClusterDef | undefined {
  return CLUSTER_BY_SLUG.get(slug);
}

export function clusterLabel(value: string | undefined | null): string {
  if (!value) return '';
  return CLUSTER_BY_VALUE.get(value)?.label ?? value;
}

export function topicLabel(value: string): string {
  return TOPIC_LABEL.get(value) ?? value;
}

export function postSlugsByCluster(cluster: ClusterValue): string[] {
  return Object.keys(POST_CLUSTER).filter((slug) => POST_CLUSTER[slug] === cluster);
}
