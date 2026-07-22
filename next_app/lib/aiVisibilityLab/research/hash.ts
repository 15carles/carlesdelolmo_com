/**
 * Seudonimización del dominio para la base de investigación.
 *
 * El dominio en claro NUNCA sale del navegador: aquí se normaliza al hostname
 * y se calcula su SHA-256 en el cliente (Web Crypto). A Supabase solo viaja el
 * hash. Es un identificador seudonimizado (no anónimo): un tercero con acceso
 * a la base podría verificar por diccionario si un dominio concreto está
 * presente. El copy y la política de privacidad lo describen así.
 *
 * Usos permitidos del hash: detectar análisis repetidos, calcular recurrencia,
 * comparar evolución temporal y evitar duplicados. Nunca se usa para contactar
 * al usuario ni se cruza con los formularios comerciales.
 */

/**
 * Normaliza una dirección web al hostname para el hash (spec §3):
 * minúsculas, sin protocolo, sin `www.` inicial, sin rutas, parámetros ni
 * barra final. `https://www.Ejemplo.com/contacto/?utm_source=test` →
 * `ejemplo.com`. Devuelve cadena vacía si no es interpretable.
 *
 * Nota: es distinta de `normalizeDomain` (utils.ts), que conserva ruta y
 * `www.` porque su función es mostrar una URL canónica en la interfaz.
 * Los dominios con caracteres no ASCII se normalizan a su forma punycode
 * (comportamiento estándar de la API URL), de forma determinista.
 */
export function normalizeDomainForHash(raw: string): string {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) return '';

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    const host = url.hostname
      .toLowerCase()
      .replace(/\.$/, '')
      .replace(/^www\./, '');
    if (!host.includes('.')) return '';
    return host;
  } catch {
    return '';
  }
}

/** SHA-256 en hexadecimal (64 caracteres). Vacío si Web Crypto no está disponible. */
export async function sha256Hex(value: string): Promise<string> {
  const subtle =
    typeof globalThis !== 'undefined' ? globalThis.crypto?.subtle : undefined;
  if (!subtle) return '';
  try {
    const data = new TextEncoder().encode(value);
    const digest = await subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    return '';
  }
}

/**
 * Hash irreversible del dominio normalizado. Cadena vacía si el dominio no es
 * interpretable o el navegador no soporta Web Crypto: en ese caso la sesión
 * simplemente no sincroniza (la herramienta sigue funcionando en local).
 */
export async function hashDomainForResearch(rawDomain: string): Promise<string> {
  const host = normalizeDomainForHash(rawDomain);
  if (!host) return '';
  return sha256Hex(host);
}
