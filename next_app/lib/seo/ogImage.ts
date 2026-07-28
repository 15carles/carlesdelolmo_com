import { SITE_URL } from './entity';

/**
 * Ruta de la imagen Open Graph generada para una URL del sitio.
 *
 * Las imágenes las produce `scripts/generate-og.mjs` despues del build, leyendo
 * del HTML ya compilado las URLs que apuntan aqui. Es decir: esta funcion define
 * el contrato y el generador lo cumple, asi que no pueden desincronizarse.
 */
export function ogImagePath(url?: string): string {
  let pathname = '/';
  try {
    pathname = new URL(url || SITE_URL, SITE_URL).pathname;
  } catch {
    // URL malformada: cae en la tarjeta de portada.
  }

  const slug = pathname.replace(/^\/+|\/+$/g, '');
  return `/og/${slug === '' ? 'index' : slug}.png`;
}

export function ogImageUrl(url?: string): string {
  return `${SITE_URL}${ogImagePath(url)}`;
}
