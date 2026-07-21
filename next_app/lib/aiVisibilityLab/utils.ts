/**
 * Utilidades puras del laboratorio: normalización de URL, detección de nombres
 * de marca en las consultas y generación de identificadores locales.
 */

/**
 * Normaliza una dirección web: acepta dominios con o sin protocolo y devuelve
 * una URL con https:// (§6). Devuelve cadena vacía si no es interpretable.
 */
export function normalizeDomain(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    if (!url.hostname.includes('.')) return '';
    // Elimina barra final para mostrar una forma canónica y estable.
    const path = url.pathname === '/' ? '' : url.pathname;
    return `https://${url.hostname}${path}`;
  } catch {
    return '';
  }
}

/** Comprueba si una dirección web es válida tras normalizarla. */
export function isValidDomain(raw: string): boolean {
  return normalizeDomain(raw) !== '';
}

/** Devuelve solo el hostname (sin protocolo) de un dominio normalizado. */
export function domainHost(normalized: string): string {
  try {
    return new URL(normalized).hostname;
  } catch {
    return normalized;
  }
}

/**
 * Comprueba, sin distinguir mayúsculas ni acentos, si un texto contiene un
 * nombre concreto como palabra reconocible. Se usa para advertir de que una
 * consulta incluye la propia marca o la de un competidor (§7).
 */
export function textContainsName(text: string, name: string): boolean {
  const normalizedName = simplify(name);
  if (normalizedName.length < 2) return false;
  return simplify(text).includes(normalizedName);
}

function simplify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Genera un identificador local razonablemente único para la sesión. */
export function createLocalId(): string {
  const globalCrypto =
    typeof globalThis !== 'undefined'
      ? (globalThis.crypto as Crypto | undefined)
      : undefined;
  if (globalCrypto && typeof globalCrypto.randomUUID === 'function') {
    return globalCrypto.randomUUID();
  }
  return `lab-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
