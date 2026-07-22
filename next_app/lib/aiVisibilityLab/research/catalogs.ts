/**
 * Catálogos normalizados de la capa de investigación.
 *
 * La configuración local es la fuente de verdad de la interfaz (decisión D7 del
 * plan, docs/lab-investigacion-phase0-plan.md): estos listados deben mantenerse
 * ESPEJO de los seeds de Supabase
 * (next_app/supabase/migrations/20260722100000_ai_visibility_lab_schema.sql).
 * Añadir o retirar una opción requiere tocar ambos sitios; la RPC valida cada
 * slug contra el catálogo de la base de datos (is_active).
 *
 * Solo el slug viaja a Supabase. Las etiquetas son únicamente para la UI.
 */

export interface CatalogOption {
  slug: string;
  label: string;
}

/** Sectores empresariales (taxonomía para España, spec §4 tabla 5). */
export const RESEARCH_SECTORS: readonly CatalogOption[] = [
  { slug: 'servicios-profesionales', label: 'Servicios profesionales' },
  { slug: 'salud-bienestar', label: 'Salud y bienestar' },
  { slug: 'construccion-reformas', label: 'Construcción y reformas' },
  { slug: 'inmobiliario', label: 'Inmobiliario' },
  { slug: 'industria-fabricacion', label: 'Industria y fabricación' },
  { slug: 'comercio', label: 'Comercio' },
  { slug: 'hosteleria-restauracion', label: 'Hostelería y restauración' },
  { slug: 'turismo-ocio', label: 'Turismo y ocio' },
  { slug: 'educacion-formacion', label: 'Educación y formación' },
  { slug: 'tecnologia', label: 'Tecnología' },
  { slug: 'marketing-comunicacion', label: 'Marketing y comunicación' },
  { slug: 'finanzas-seguros', label: 'Finanzas y seguros' },
  { slug: 'legal', label: 'Legal' },
  { slug: 'automocion', label: 'Automoción' },
  { slug: 'hogar-decoracion', label: 'Hogar y decoración' },
  { slug: 'otros', label: 'Otros' },
];

/**
 * Categorías funcionales de servicio (decisión D6: catálogo global de tipo de
 * actividad; combinado con el sector da una clasificación en dos ejes). La
 * descripción libre del servicio nunca sale del navegador.
 */
export const RESEARCH_SERVICE_CATEGORIES: readonly CatalogOption[] = [
  { slug: 'venta-de-productos', label: 'Venta de productos' },
  { slug: 'fabricacion-o-produccion', label: 'Fabricación o producción' },
  { slug: 'instalacion-o-montaje', label: 'Instalación o montaje' },
  { slug: 'reparacion-o-mantenimiento', label: 'Reparación o mantenimiento' },
  { slug: 'obra-o-reforma', label: 'Obra o reforma' },
  { slug: 'consultoria-o-asesoria', label: 'Consultoría o asesoría' },
  { slug: 'diseno-o-creatividad', label: 'Diseño o creatividad' },
  { slug: 'desarrollo-o-software', label: 'Desarrollo o software' },
  { slug: 'marketing-o-publicidad', label: 'Marketing o publicidad' },
  { slug: 'formacion-o-ensenanza', label: 'Formación o enseñanza' },
  { slug: 'salud-o-tratamientos', label: 'Salud o tratamientos' },
  { slug: 'estetica-o-cuidado-personal', label: 'Estética o cuidado personal' },
  { slug: 'alojamiento-o-restauracion', label: 'Alojamiento o restauración' },
  { slug: 'transporte-o-logistica', label: 'Transporte o logística' },
  { slug: 'alquiler-de-bienes-o-espacios', label: 'Alquiler de bienes o espacios' },
  { slug: 'gestion-o-tramitacion', label: 'Gestión o tramitación' },
  { slug: 'otros', label: 'Otros' },
];

/** Ámbitos geográficos no provinciales (se muestran agrupados en la UI). */
export const RESEARCH_PROVINCE_SCOPES: readonly CatalogOption[] = [
  { slug: 'toda-espana', label: 'Toda España' },
  { slug: 'varias-provincias', label: 'Varias provincias' },
  { slug: 'internacional', label: 'Internacional' },
  { slug: 'no-aplicable', label: 'No aplicable' },
];

/** Provincias y ciudades autónomas (orden alfabético). */
export const RESEARCH_PROVINCES: readonly CatalogOption[] = [
  { slug: 'a-coruna', label: 'A Coruña' },
  { slug: 'alava', label: 'Álava' },
  { slug: 'albacete', label: 'Albacete' },
  { slug: 'alicante', label: 'Alicante' },
  { slug: 'almeria', label: 'Almería' },
  { slug: 'asturias', label: 'Asturias' },
  { slug: 'avila', label: 'Ávila' },
  { slug: 'badajoz', label: 'Badajoz' },
  { slug: 'barcelona', label: 'Barcelona' },
  { slug: 'bizkaia', label: 'Bizkaia' },
  { slug: 'burgos', label: 'Burgos' },
  { slug: 'caceres', label: 'Cáceres' },
  { slug: 'cadiz', label: 'Cádiz' },
  { slug: 'cantabria', label: 'Cantabria' },
  { slug: 'castellon', label: 'Castellón' },
  { slug: 'ceuta', label: 'Ceuta' },
  { slug: 'ciudad-real', label: 'Ciudad Real' },
  { slug: 'cordoba', label: 'Córdoba' },
  { slug: 'cuenca', label: 'Cuenca' },
  { slug: 'gipuzkoa', label: 'Gipuzkoa' },
  { slug: 'girona', label: 'Girona' },
  { slug: 'granada', label: 'Granada' },
  { slug: 'guadalajara', label: 'Guadalajara' },
  { slug: 'huelva', label: 'Huelva' },
  { slug: 'huesca', label: 'Huesca' },
  { slug: 'illes-balears', label: 'Illes Balears' },
  { slug: 'jaen', label: 'Jaén' },
  { slug: 'la-rioja', label: 'La Rioja' },
  { slug: 'las-palmas', label: 'Las Palmas' },
  { slug: 'leon', label: 'León' },
  { slug: 'lleida', label: 'Lleida' },
  { slug: 'lugo', label: 'Lugo' },
  { slug: 'madrid', label: 'Madrid' },
  { slug: 'malaga', label: 'Málaga' },
  { slug: 'melilla', label: 'Melilla' },
  { slug: 'murcia', label: 'Murcia' },
  { slug: 'navarra', label: 'Navarra' },
  { slug: 'ourense', label: 'Ourense' },
  { slug: 'palencia', label: 'Palencia' },
  { slug: 'pontevedra', label: 'Pontevedra' },
  { slug: 'salamanca', label: 'Salamanca' },
  { slug: 'santa-cruz-de-tenerife', label: 'Santa Cruz de Tenerife' },
  { slug: 'segovia', label: 'Segovia' },
  { slug: 'sevilla', label: 'Sevilla' },
  { slug: 'soria', label: 'Soria' },
  { slug: 'tarragona', label: 'Tarragona' },
  { slug: 'teruel', label: 'Teruel' },
  { slug: 'toledo', label: 'Toledo' },
  { slug: 'valencia', label: 'Valencia' },
  { slug: 'valladolid', label: 'Valladolid' },
  { slug: 'zamora', label: 'Zamora' },
  { slug: 'zaragoza', label: 'Zaragoza' },
];

/** Todas las opciones de provincia/ámbito válidas. */
export const ALL_RESEARCH_PROVINCE_OPTIONS: readonly CatalogOption[] = [
  ...RESEARCH_PROVINCE_SCOPES,
  ...RESEARCH_PROVINCES,
];

function hasSlug(options: readonly CatalogOption[], slug: string): boolean {
  return options.some((option) => option.slug === slug);
}

export function isValidSectorSlug(slug: string): boolean {
  return hasSlug(RESEARCH_SECTORS, slug);
}

export function isValidServiceCategorySlug(slug: string): boolean {
  return hasSlug(RESEARCH_SERVICE_CATEGORIES, slug);
}

export function isValidProvinceSlug(slug: string): boolean {
  return hasSlug(ALL_RESEARCH_PROVINCE_OPTIONS, slug);
}
