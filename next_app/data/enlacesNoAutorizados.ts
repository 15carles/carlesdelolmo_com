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
 * autorización. Crece conforme se confirman en la exportación de dominios de
 * referencia; solo entra aquí lo verificado, no lo sospechado.
 */
export const ENLACES_NO_AUTORIZADOS: readonly EnlaceNoAutorizado[] = [
  {
    dominio: 'master-digital-studio-seoexpress.store',
    detectado: '2026-08-17',
    tipo: 'testimonio-falso',
    nota:
      'Publica un texto en primera persona atribuido a carlesdelolmo.com que afirma haber triplicado su alcance orgánico tras contratar servicios de «niche edits». Esa contratación nunca existió.',
  },
];

/**
 * Instantánea del perfil de enlaces en la fecha de detección. La cita tanto la
 * página de no afiliación como el artículo del blog, así que vive en un solo
 * sitio.
 */
export const PERFIL_BACKLINKS = {
  fecha: '2026-08-17',
  dominiosDeReferencia: 430,
  backlinks: 443,
  porcentajeDofollow: 2,
  domainRating: '0.1',
  herramienta: 'Ahrefs (comprobador gratuito de backlinks)',
} as const;
