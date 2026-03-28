import { access } from 'node:fs/promises';
import path from 'node:path';
import { SITE_URL } from './schemas';

const OG_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'svg'] as const;

export async function resolvePostOpenGraphImage(slug: string): Promise<string | undefined> {
  const blogRootDir = path.join(process.cwd(), 'public', 'assets', 'blog');
  const searchDirectories = [
    {
      absoluteDir: path.join(blogRootDir, slug),
      publicDir: `/assets/blog/${slug}`,
    },
    {
      absoluteDir: blogRootDir,
      publicDir: '/assets/blog',
    },
  ];

  for (const directory of searchDirectories) {
    for (const extension of OG_EXTENSIONS) {
      const filename = `og-blog-${slug}.${extension}`;
      const absoluteFilePath = path.join(directory.absoluteDir, filename);

      try {
        await access(absoluteFilePath);
        return `${SITE_URL}${directory.publicDir}/${filename}`;
      } catch {
        // Intentionally continue to the next extension until a matching OG image exists.
      }
    }
  }

  return undefined;
}
