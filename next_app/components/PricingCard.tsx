import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  priceNote?: string;
  features: string[];
  illustration: React.ReactNode;
  ctaText: string;
  ctaHref: string;
}

/**
 * Safely render the limited HTML subset used by `description` (only `<strong>`
 * and `<br>`). React escapes all other content, so this avoids the XSS risk of
 * `dangerouslySetInnerHTML` while keeping the existing call-site format.
 */
function renderDescription(html: string): React.ReactNode {
  const lines = html.split(/<br\s*\/?\s*>/gi);
  return lines.map((line, lineIdx) => {
    // Splitting on the capture group keeps the inner text at odd indices and
    // the surrounding plain text at even indices.
    const parts = line.split(/<strong>([\s\S]*?)<\/strong>/gi);
    return (
      <React.Fragment key={lineIdx}>
        {parts.map((part, partIdx) =>
          partIdx % 2 === 1 ? (
            <strong key={partIdx}>{part}</strong>
          ) : (
            <React.Fragment key={partIdx}>{part}</React.Fragment>
          )
        )}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export default function PricingCard({
  title,
  description,
  price,
  priceNote = "* Precio sin IVA",
  features,
  illustration,
  ctaText,
  ctaHref
}: ProductCardProps) {
  const normalizedPriceNote = priceNote.replace(/<br\s*\/?>/gi, '\n');

  return (
    <article className="pricing-card">
      <div className="pricing-card__header">
        <h3 className="pricing-card__title">{title}</h3>
        <div className="pricing-card__desc">{renderDescription(description)}</div>
      </div>
      <div className="pricing-card__price-block">
        <p className="pricing-card__price">{price}</p>
        <span className="pricing-card__price-note">{normalizedPriceNote}</span>
      </div>
      <ul className="pricing-card__features">
        {features.map((feature, index) => (
          <li key={index} className="pricing-card__feature">
            <Check className="pricing-card__check" size={20} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {/* Ilustración SVG decorativa */}
      <div className="pricing-card__illustration" aria-hidden="true">
        {illustration}
      </div>
      <Link href={ctaHref} className="pricing-card__cta">
        {ctaText}
      </Link>
    </article>
  );
}
