"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Flip to false on June 1st (or whenever the May campaign ends).
const PROMO_ACTIVE = true;

// Pages where the banner is suppressed (already on the offer itself).
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
      <span className="promo-banner__icon" aria-hidden="true">🎁</span>
      <span className="promo-banner__text promo-banner__text--desktop">
        Mayo: <strong>Auditoría SEO + GEO gratis</strong> (valor +750€) — Solicita la tuya
      </span>
      <span className="promo-banner__text promo-banner__text--mobile">
        <strong>Auditoría gratis</strong> · Mayo
      </span>
      <span className="promo-banner__arrow" aria-hidden="true">→</span>
    </Link>
  );
}
