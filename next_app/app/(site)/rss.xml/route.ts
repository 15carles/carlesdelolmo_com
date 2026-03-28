export const runtime = 'edge';
import { NextResponse } from 'next/server';

const posts = [
  {
    title: 'Cómo la semántica avanzada está cambiando el tráfico desde Perplexity y motores de IA',
    slug: 'semantica-avanzada-motores-ia',
    description: 'La semántica avanzada, las entidades y la arquitectura web están cambiando cómo los motores generativos como Perplexity interpretan y citan contenido.',
    date: '2026-03-08T10:00:00Z',
  },
  {
    title: 'El fin del SEO tal como lo conocemos: La era del GEO',
    slug: 'el-fin-del-seo-la-era-del-geo',
    description: 'El SEO ha evolucionado. Descubre qué es el GEO (Generative Engine Optimization) y cómo adaptar tu web para aparecer en las respuestas de IA.',
    date: '2026-02-24T10:00:00Z',
  },
  {
    title: 'Por qué muchas webs no aparecen en respuestas de IA',
    slug: 'por-que-muchas-webs-no-aparecen-en-respuestas-de-ia',
    description: 'Descubre por qué muchas webs no aparecen en respuestas generadas por IA y cómo el modelo DELTA ayuda a mejorar la visibilidad.',
    date: '2026-01-08T10:00:00Z',
  },
];

export async function GET() {
  const siteUrl = 'https://carlesdelolmo.com';

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Carles del Olmo - Blog</title>
  <link>${siteUrl}/blog</link>
  <description>Artículos sobre Diseño Web, SEO Técnico y GEO (Generative Engine Optimization)</description>
  <language>es-es</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${posts
    .map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`)
    .join('')}
</channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
