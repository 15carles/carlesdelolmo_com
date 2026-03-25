import type { MetadataRoute } from 'next';
import { reader } from '@/lib/keystatic';
import { SITE_URL } from '@/lib/seo/schemas';

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/diseno-web', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/diseno-web/valencia', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/diseno-web/castellon', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/diseno-web/alicante', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/servicio-seo/auditoria-seo-geo', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/servicio-seo/posicionamiento-seo-geo', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/servicio-seo/autoridad-digital-ias', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/mantenimiento-web-valencia', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/contacto', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/politica-privacidad', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/politica-cookies', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terminos-y-condiciones', changeFrequency: 'yearly', priority: 0.3 },
];

function toDateOrNow(value: string | null | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: buildDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [posts, projects] = await Promise.all([
    reader.collections.posts.all(),
    reader.collections.projects.all(),
  ]);

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: toDateOrNow(post.entry.isoDate, buildDate),
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/proyectos/${project.slug}`,
    lastModified: toDateOrNow(project.entry.isoDate, buildDate),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const dedupedByUrl = new Map<string, MetadataRoute.Sitemap[number]>();

  [...staticEntries, ...blogEntries, ...projectEntries].forEach((entry) => {
    const existing = dedupedByUrl.get(entry.url);
    if (!existing) {
      dedupedByUrl.set(entry.url, entry);
      return;
    }

    const existingDate = existing.lastModified ? new Date(existing.lastModified) : buildDate;
    const currentDate = entry.lastModified ? new Date(entry.lastModified) : buildDate;

    if (currentDate > existingDate) {
      dedupedByUrl.set(entry.url, entry);
    }
  });

  return Array.from(dedupedByUrl.values());
}
