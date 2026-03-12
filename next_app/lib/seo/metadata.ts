import { Metadata } from 'next';
import { SITE_URL } from './schemas';

interface ConstructMetadataProps {
  title: string;
  description: string;
  exactUrl?: string;
  openGraphImage?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  // Article specific
  publishedTime?: string;
  authors?: string[];
}

/**
 * Función centralizada para generar metadatos (SEO y OpenGraph)
 * en todas las páginas de la aplicación Next.js.
 */
export function constructMetadata({
  title,
  description,
  exactUrl,
  openGraphImage = `${SITE_URL}/assets/images/og-cover.jpg`, /* Asegúrate de que esta imagen exista */
  noIndex = false,
  type = 'website',
  publishedTime,
  authors = ['Carles del Olmo'],
}: ConstructMetadataProps): Metadata {
  return {
    title,
    description,
    authors: authors.map((author) => ({ name: author })),
    alternates: {
      canonical: exactUrl || SITE_URL,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: exactUrl || SITE_URL,
      siteName: "Carles del Olmo",
      images: [
        {
          url: openGraphImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "es_ES",
      type,
      ...(type === 'article' && publishedTime && {
        publishedTime,
        authors,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [openGraphImage],
    },
  };
}
