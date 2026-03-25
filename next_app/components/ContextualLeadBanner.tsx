"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import {
  CONTEXTUAL_LEAD_BANNER_STORAGE_KEYS,
  CONTEXTUAL_LEAD_BANNER_TRIGGER_RULES,
  getContextualLeadBannerConfig,
} from '@/lib/contextualLeadBanner';

const COOKIE_BANNER_SELECTOR = '#cookie-banner';
const DEFAULT_BANNER_EYEBROW = 'Ayuda contextual';

function readSessionFlag(key: string): boolean {
  try {
    return sessionStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function writeSessionFlag(key: string): void {
  try {
    sessionStorage.setItem(key, '1');
  } catch {
    // Ignore storage write failures (private mode or blocked storage).
  }
}

function isCookieBannerVisible(): boolean {
  const cookieBanner = document.querySelector(COOKIE_BANNER_SELECTOR);
  if (!cookieBanner) {
    return false;
  }

  return cookieBanner.classList.contains('is-visible') && cookieBanner.getAttribute('aria-hidden') !== 'true';
}

export default function ContextualLeadBanner() {
  const pathname = usePathname() ?? '';
  const config = useMemo(() => getContextualLeadBannerConfig(pathname), [pathname]);
  const isEnabled = Boolean(config?.enabled);

  const [visiblePathname, setVisiblePathname] = useState<string | null>(null);
  const [isCookieVisible, setIsCookieVisible] = useState(false);

  const shouldBlockBannerDisplay = useCallback((): boolean => {
    return (
      readSessionFlag(CONTEXTUAL_LEAD_BANNER_STORAGE_KEYS.shown) ||
      readSessionFlag(CONTEXTUAL_LEAD_BANNER_STORAGE_KEYS.dismissed) ||
      readSessionFlag(CONTEXTUAL_LEAD_BANNER_STORAGE_KEYS.ctaInteracted) ||
      readSessionFlag(CONTEXTUAL_LEAD_BANNER_STORAGE_KEYS.formInteracted)
    );
  }, []);

  const hideBanner = useCallback(() => {
    setVisiblePathname(null);
  }, []);

  const handleDismiss = useCallback(() => {
    writeSessionFlag(CONTEXTUAL_LEAD_BANNER_STORAGE_KEYS.dismissed);
    hideBanner();
  }, [hideBanner]);

  const handleBannerCtaClick = useCallback(() => {
    writeSessionFlag(CONTEXTUAL_LEAD_BANNER_STORAGE_KEYS.ctaInteracted);
    hideBanner();
  }, [hideBanner]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const markCtaInteraction = (): void => {
      writeSessionFlag(CONTEXTUAL_LEAD_BANNER_STORAGE_KEYS.ctaInteracted);
      hideBanner();
    };

    const markFormInteraction = (): void => {
      writeSessionFlag(CONTEXTUAL_LEAD_BANNER_STORAGE_KEYS.formInteracted);
      hideBanner();
    };

    const handleClickCapture = (event: MouseEvent): void => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) {
        return;
      }

      const ctaElement = target.closest('[data-primary-cta="true"]');
      if (ctaElement) {
        markCtaInteraction();
      }
    };

    const handleFormEventCapture = (event: Event): void => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) {
        return;
      }

      if (target.closest('form')) {
        markFormInteraction();
      }
    };

    document.addEventListener('click', handleClickCapture, true);
    document.addEventListener('focusin', handleFormEventCapture, true);
    document.addEventListener('input', handleFormEventCapture, true);
    document.addEventListener('change', handleFormEventCapture, true);
    document.addEventListener('submit', handleFormEventCapture, true);

    return () => {
      document.removeEventListener('click', handleClickCapture, true);
      document.removeEventListener('focusin', handleFormEventCapture, true);
      document.removeEventListener('input', handleFormEventCapture, true);
      document.removeEventListener('change', handleFormEventCapture, true);
      document.removeEventListener('submit', handleFormEventCapture, true);
    };
  }, [hideBanner, isEnabled]);

  useEffect(() => {
    if (!isEnabled || !config) {
      return;
    }

    if (shouldBlockBannerDisplay()) {
      return;
    }

    let hasOpened = false;

    const maybeOpenBanner = (): void => {
      if (hasOpened || shouldBlockBannerDisplay()) {
        return;
      }

      hasOpened = true;
      writeSessionFlag(CONTEXTUAL_LEAD_BANNER_STORAGE_KEYS.shown);
      setVisiblePathname(pathname);
    };

    const timerId = window.setTimeout(maybeOpenBanner, CONTEXTUAL_LEAD_BANNER_TRIGGER_RULES.timeMs);

    const handleScrollTrigger = (): void => {
      const maxScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScrollable <= 0) {
        return;
      }

      const scrollPercent = (window.scrollY / maxScrollable) * 100;
      if (scrollPercent >= CONTEXTUAL_LEAD_BANNER_TRIGGER_RULES.scrollPercent) {
        maybeOpenBanner();
      }
    };

    window.addEventListener('scroll', handleScrollTrigger, { passive: true });
    handleScrollTrigger();

    let handleExitIntent: ((event: MouseEvent) => void) | null = null;
    if (config.enableExitIntent) {
      handleExitIntent = (event: MouseEvent): void => {
        if (event.relatedTarget) {
          return;
        }

        if (event.clientY <= 0) {
          maybeOpenBanner();
        }
      };

      document.addEventListener('mouseout', handleExitIntent);
    }

    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener('scroll', handleScrollTrigger);
      if (handleExitIntent) {
        document.removeEventListener('mouseout', handleExitIntent);
      }
    };
  }, [config, isEnabled, pathname, shouldBlockBannerDisplay]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const refreshCookieBannerVisibility = (): void => {
      setIsCookieVisible(isCookieBannerVisible());
    };

    refreshCookieBannerVisibility();

    const observer = new MutationObserver(refreshCookieBannerVisibility);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class', 'aria-hidden'],
    });

    return () => {
      observer.disconnect();
    };
  }, [isEnabled]);

  if (!isEnabled || !config) {
    return null;
  }

  const isVisible = visiblePathname === pathname;
  const titleId = `contextual-lead-banner-title-${config.contextKey}`;
  const bannerClasses = [
    'contextual-lead-banner',
    isVisible ? 'is-visible' : '',
    isCookieVisible ? 'contextual-lead-banner--with-cookie' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={bannerClasses} aria-hidden={!isVisible} aria-labelledby={titleId}>
      <div className="contextual-lead-banner__panel">
        <button
          type="button"
          className="contextual-lead-banner__close"
          onClick={handleDismiss}
          aria-label="Cerrar banner de ayuda contextual"
        >
          <X size={18} />
        </button>

        <p className="contextual-lead-banner__eyebrow">{config.eyebrow ?? DEFAULT_BANNER_EYEBROW}</p>
        <h2 id={titleId} className="contextual-lead-banner__title">
          {config.title}
        </h2>
        <p className="contextual-lead-banner__description">{config.description}</p>

        <div className="contextual-lead-banner__actions">
          <Link
            href={config.ctaHref}
            className="btn btn--primary contextual-lead-banner__cta"
            data-primary-cta="true"
            onClick={handleBannerCtaClick}
          >
            {config.ctaLabel}
          </Link>
        </div>
      </div>
    </aside>
  );
}
