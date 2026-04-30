"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

const PROMO_ACTIVE = true;

const HIDDEN_PATHS = new Set(['/auditoria-gratuita', '/gracias']);

export default function PromoBanner() {
  const pathname = usePathname() ?? '';
  const visible = PROMO_ACTIVE && !HIDDEN_PATHS.has(pathname);

  useEffect(() => {
    if (!visible) return;
    document.body.classList.add('has-promo-banner');
    return () => {
      document.body.classList.remove('has-promo-banner');
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <Link href="/auditoria-gratuita" className="promo-banner" aria-label="Promoción de mayo: Auditoría SEO + GEO gratuita">
      <Sparkles size={16} className="promo-banner__icon" aria-hidden="true" />
      <span className="promo-banner__text promo-banner__text--desktop">
        AUDITORÍA SEO + GEO <span className="promo-banner__highlight">GRATUITA</span> DURANTE MAYO · DISPONIBILIDAD LIMITADA
      </span>
      <span className="promo-banner__text promo-banner__text--mobile">
        AUDITORÍA SEO + GEO <span className="promo-banner__highlight">GRATIS</span> EN MAYO
      </span>
    </Link>
  );
}