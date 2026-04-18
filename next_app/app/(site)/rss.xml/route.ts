import { NextResponse } from 'next/server';
import { reader } from '@/lib/keystatic';
import { SITE_URL } from '@/lib/seo/schemas';
import { isPostVisible, parseIsoDate } from '@/lib/contentVisibility';

export const runtime = 'nodejs';
export const revalidate = 3600;

function getPostTitle(title: unknown, slug: string): string {
  if (typeof title === 'string') return title;
  if (title && typeof title === 'object' && 'name' in title) {
    const maybeName = (title as { name?: unknown }).name;
    if (typeof maybeName === 'string') return maybeName;
  }
  return slug;
}

/**
 * Escapa contenido para ser insertado dentro de una sección CDATA de XML.
 * La única secuencia que cierra un CDATA es `]]>`. La rompemos dividiendo
 * la CDATA: `]]` + `]]><![CDATA[` + `>` → resulta en `]]` y `>` como texto.
 */
function escapeCdata(input: string): string {
  return input.replace(/]]>/g, ']]]]><![CDATA[>');
}

export async function GET() {
  const posts = await reader.collections.posts.all();

  const publishedPosts = posts
    .filter((post) => isPostVisible({ status: post.entry.status, isoDate: post.entry.isoDate }))
    .sort((a, b) => {
      const aTime = parseIsoDate(a.entry.isoDate)?.getTime() ?? 0;
      const bTime = parseIsoDate(b.entry.isoDate)?.getTime() ?? 0;
      return bTime - aTime;
    })
    .slice(0, 50);

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Carles del Olmo - Blog</title>
  <link>${SITE_URL}/blog</link>
  <description>Artículos sobre Diseño Web, SEO Técnico y GEO (Generative Engine Optimization)</description>
  <language>es-es</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  ${publishedPosts
    .map((post) => `
    <item>
      <title><![CDATA[${escapeCdata(getPostTitle(post.entry.title, post.slug))}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${(parseIsoDate(post.entry.isoDate) ?? new Date()).toUTCString()}</pubDate>
      <description><![CDATA[${escapeCdata(post.entry.metaDescription || post.entry.subtitle || '')}]]></description>
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
