import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Migas de pan">
      <div className="container">
        <ol className="breadcrumbs__list">
          {items.map((item, index) => (
            <li key={index} className="breadcrumbs__item">
              {item.href ? (
                <>
                  <Link href={item.href} className="breadcrumbs__link">
                    {item.label}
                  </Link>
                  <span className="breadcrumbs__separator">/</span>
                </>
              ) : (
                <span className="breadcrumbs__current">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}