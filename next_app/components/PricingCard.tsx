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
        <div className="pricing-card__desc" dangerouslySetInnerHTML={{ __html: description }} />
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
