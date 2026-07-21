/**
 * Analítica del laboratorio (spec §16).
 *
 * Reglas estrictas:
 *  - Solo se envían eventos si existe consentimiento para cookies analíticas
 *    (`analytics_storage: 'granted'` en la misma clave que usa el CookieBanner).
 *  - Nunca se envían datos identificativos del negocio: nombre, dominio,
 *    servicio, ubicación, consultas completas, competidores, notas ni respuestas
 *    de los motores. Solo información agregada y no identificativa.
 */

// Reutiliza la misma clave y contrato de consentimiento del CookieBanner.
const CONSENT_STORAGE_KEY = 'cookie_consent_settings';

type GtagFn = (
  command: 'event',
  action: string,
  params?: Record<string, string | number | boolean>,
) => void;

/**
 * Accede a gtag sin augmentar el tipo global de Window (el CookieBanner ya lo
 * declara con la firma de `consent`, así que aquí usamos un cast local para la
 * firma de `event` y evitar declaraciones globales en conflicto).
 */
function getGtag(): GtagFn | undefined {
  if (typeof window === 'undefined') return undefined;
  const candidate = (window as unknown as { gtag?: unknown }).gtag;
  return typeof candidate === 'function' ? (candidate as GtagFn) : undefined;
}

function analyticsConsentGranted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { analytics_storage?: string };
    return parsed?.analytics_storage === 'granted';
  } catch {
    return false;
  }
}

/**
 * Envía un evento a GA4 solo si hay consentimiento analítico. Los parámetros
 * deben ser siempre no identificativos (§16).
 */
export function trackLabEvent(
  event: string,
  params: Record<string, string | number | boolean> = {},
): void {
  if (typeof window === 'undefined') return;
  if (!analyticsConsentGranted()) return;
  const gtag = getGtag();
  if (!gtag) return;
  try {
    gtag('event', event, params);
  } catch {
    // La analítica nunca debe interrumpir la experiencia.
  }
}
