import type { NextConfig } from "next";

/**
 * Content Security Policy en modo Report-Only.
 *
 * Motivo: la app tiene scripts inline (Google Consent Mode, GA4, theme anti-FOUC)
 * y styled-jsx usa estilos inline. Pasar a `Content-Security-Policy` estricto
 * rompería esos scripts. Se despliega primero como Report-Only para detectar
 * violaciones reales en producción (DevTools → Console) antes de endurecerlo.
 *
 * Fuentes permitidas (seguras para esta web):
 *   - GA/GTM: googletagmanager.com, google-analytics.com
 *   - Supabase REST (lead submit vía /api/contact runtime Edge): gzrgxkjvxaflteilmjuq.supabase.co
 *   - Keystatic en el cliente habla con /api/keystatic (self)
 */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://gzrgxkjvxaflteilmjuq.supabase.co",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ');

const SECURITY_HEADERS = [
  // HSTS: solo efectivo sobre HTTPS. 2 años + subdominios + preload.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Bloquea MIME-sniffing (navegador respeta Content-Type del servidor).
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Evita clickjacking. SAMEORIGIN porque Keystatic/Next pueden usar iframes propios.
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Protege el Referer entre orígenes distintos.
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Deshabilita APIs del navegador que esta web no necesita.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  // CSP en modo report-only: no bloquea pero avisa. Endurecer tras monitorizar.
  {
    key: 'Content-Security-Policy-Report-Only',
    value: CSP_REPORT_ONLY,
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ledescaparate.es',
      },
    ],
  },
  async headers() {
    return [
      {
        // Aplicar a todas las rutas. El middleware puede sobrescribir headers
        // específicos (noindex/X-Frame-Options) para /keystatic sin conflicto.
        source: '/:path*',
        headers: SECURITY_HEADERS,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/diseno-web/diseno-web-valencia',
        destination: '/diseno-web/valencia',
        permanent: true,
      },
      {
        source: '/diseno-web/diseno-web-valencia.html',
        destination: '/diseno-web/valencia',
        permanent: true,
      },
      {
        source: '/blog/por-que-muchas-webs-no-aparecen-en-respuestas-de-ia',
        destination: '/blog/por-que-webs-no-aparecen-respuestas-ia',
        permanent: true,
      },
      {
        source: '/blog/la-estructura-ideal-de-una-pagina-web-para-empresas',
        destination: '/blog/estructura-ideal-pagina-web-empresas',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

// Forzando redespliegue para activar nodejs_compat.
