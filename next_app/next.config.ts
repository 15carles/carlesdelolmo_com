import type { NextConfig } from "next";

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
