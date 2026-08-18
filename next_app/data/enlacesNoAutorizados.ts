export type TipoEnlaceNoAutorizado =
  | 'testimonio-falso'
  | 'enlace-spam'
  | 'directorio-scraper';

export interface EnlaceNoAutorizado {
  /**
   * Dominio infractor. Se renderiza SIEMPRE como texto plano: nunca dentro de
   * un <a>. `rel="nofollow"` es una pista desde 2019, no una directiva, y aun
   * así declararía la asociación y les enviaría tráfico de referencia.
   */
  dominio: string;
  /** Domain Rating del dominio infractor según Ahrefs en la fecha de detección. */
  dr?: number;
  /** Fecha de detección en formato ISO (AAAA-MM-DD). */
  detectado: string;
  tipo: TipoEnlaceNoAutorizado;
  /**
   * Captura en web.archive.org. Es la única URL enlazable de la ficha, porque
   * apunta al archivo y no al dominio infractor.
   */
  captura?: string;
  nota?: string;
}

/** Operadora de la red. Se nombra en prosa; nunca se enlaza. */
export const RED_SEOEXPRESS = 'seoexpress.org';

export const TIPO_LABEL: Record<TipoEnlaceNoAutorizado, string> = {
  'testimonio-falso': 'Testimonio falso',
  'enlace-spam': 'Enlace de spam',
  'directorio-scraper': 'Directorio o scraper',
};

/**
 * Registro de dominios que enlazan o mencionan a carlesdelolmo.com sin
 * autorización. Crece conforme se confirman en el listado de dominios de
 * referencia; solo entra aquí lo verificado, no lo sospechado.
 *
 * Orden descendente por DR. Todos salvo el `.store` son `enlace-spam`: son
 * enlaces sin texto atribuido, y el registro no debe afirmar de más.
 */
export const ENLACES_NO_AUTORIZADOS: readonly EnlaceNoAutorizado[] = [
  { dominio: 'buybacklinks.agency', dr: 70, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'fiverr-seo-for-small-businesses.site', dr: 68, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'seogrow.agency', dr: 67, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'rankgrowth.agency', dr: 66, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'seonix.agency', dr: 65, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'rank-top.click', dr: 59, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'rankio.agency', dr: 59, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'linkrankpro.shop', dr: 54, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'rankxlinks.shop', dr: 54, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'ranklinkerpro.shop', dr: 54, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'buyseobacklinks.shop', dr: 54, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'rankboostly.shop', dr: 54, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'authoritybacklinks.shop', dr: 54, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'pbnseolinks.shop', dr: 53, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'ranklinkx.shop', dr: 53, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'linkrankboost.shop', dr: 53, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'seolinkpro.shop', dr: 53, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'linkseopro.shop', dr: 53, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'ranklinkpro.shop', dr: 53, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'premiumseolinks.shop', dr: 53, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'toplinkranker.shop', dr: 53, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'rank-now.website', dr: 51, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'linkspro.agency', dr: 49, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'backlinkshop.site', dr: 48, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'trafficspike.shop', dr: 47, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'seodaro.com', dr: 42, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'byteshort.xyz', dr: 41, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'seo-high-ranking.shop', dr: 41, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'atomizelink.icu', dr: 40, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'kawaiishop.shop', dr: 33, detectado: '2026-08-17', tipo: 'enlace-spam' },
  { dominio: 'thebacklink.shop', dr: 33, detectado: '2026-08-17', tipo: 'enlace-spam' },
  {
    dominio: 'master-digital-studio-seoexpress.store',
    dr: 32,
    detectado: '2026-08-17',
    tipo: 'testimonio-falso',
    nota:
      'Publica un texto en primera persona atribuido a carlesdelolmo.com que afirma haber triplicado su alcance orgánico tras contratar servicios de «niche edits». Esa contratación nunca existió.',
  },
];

/**
 * Dominios que aparecen en el perfil de enlaces y NO forman parte de la red.
 * Existe para que una limpieza futura hecha a bulto no se los lleve por delante.
 */
export const DOMINIOS_LEGITIMOS: readonly { dominio: string; nota: string }[] = [
  {
    dominio: 'techbehemoths.com',
    nota:
      'Directorio real de empresas de tecnología. Ahrefs no lo marca como spam y el enlace procede de una ficha legítima. No debe desautorizarse.',
  },
];

/**
 * Instantánea del perfil de enlaces en la fecha de detección. La cita tanto la
 * página de no afiliación como el artículo del blog, así que vive en un solo
 * sitio.
 *
 * Ojo con las fuentes: las cifras de perfil vienen del comprobador gratuito de
 * Ahrefs; la identificación dominio a dominio y las etiquetas de spam, de
 * Ahrefs Webmaster Tools. No conviene mezclarlas.
 */
export const PERFIL_BACKLINKS = {
  fecha: '2026-08-17',
  dominiosDeReferencia: 430,
  backlinks: 443,
  porcentajeDofollow: 2,
  domainRating: '0.1',
  herramienta: 'Ahrefs (comprobador gratuito de backlinks)',
  dominiosSpamIdentificados: ENLACES_NO_AUTORIZADOS.length,
  fuenteRegistro: 'Ahrefs Webmaster Tools',
} as const;
