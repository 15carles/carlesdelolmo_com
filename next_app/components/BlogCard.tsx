import React from 'react';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  isoDate?: string;
  category: string;
  categoryColor: 'purple' | 'blue' | 'cyan' | 'teal';
}

export default function BlogCard({ title, excerpt, slug, date, isoDate, category, categoryColor }: BlogCardProps) {
  const badgeClass = `badge badge--tag badge--${categoryColor}`;
  
  return (
    <article className="post-item">
      <div className="post-item__meta">
        <span className={badgeClass}>{category}</span>
        <time dateTime={isoDate}>{date}</time>
      </div>
      <h2 className="post-item__title">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h2>
      <p className="post-item__excerpt">
        {excerpt}
      </p>
      <Link href={`/blog/${slug}`} className="project-card__link">
        Leer más
      </Link>
    </article>
  );
}
