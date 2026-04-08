export function parseIsoDate(isoDate: string | null | undefined): Date | null {
  if (!isoDate) return null;
  const parsed = new Date(isoDate);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function isPublished(isoDate: string | null | undefined, now = new Date()): boolean {
  const publishDate = parseIsoDate(isoDate);
  if (!publishDate) return true;
  return publishDate.getTime() <= now.getTime();
}

export type PostStatus = 'draft' | 'scheduled' | 'published';

function normalizePostStatus(status: string | null | undefined): PostStatus | 'legacy' {
  if (status === 'draft' || status === 'scheduled' || status === 'published') return status;
  return 'legacy';
}

export function isPostVisible(
  post: { status?: string | null; isoDate?: string | null },
  now = new Date()
): boolean {
  const status = normalizePostStatus(post.status);

  if (status === 'draft') return false;
  if (status === 'published') return true;
  if (status === 'scheduled') {
    const publishDate = parseIsoDate(post.isoDate);
    if (!publishDate) return false;
    return publishDate.getTime() <= now.getTime();
  }

  return isPublished(post.isoDate, now);
}
