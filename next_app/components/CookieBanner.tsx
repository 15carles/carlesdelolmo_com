"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const STORAGE_KEY = 'cookie_consent_settings';
const COOKIE_MODAL_ID = 'cookie-modal';
const COOKIE_MODAL_TITLE_ID = 'cookie-modal-title';
const COOKIE_MODAL_DESCRIPTION_ID = 'cookie-modal-description';

type ConsentStatus = 'granted' | 'denied';

interface CookieSettings {
  analytics_storage: ConsentStatus;
  ad_storage: ConsentStatus;
  ad_user_data: ConsentStatus;
  ad_personalization: ConsentStatus;
  timestamp: string;
}

interface GtagConsentPayload {
  analytics_storage: ConsentStatus;
  ad_storage: ConsentStatus;
  ad_user_data: ConsentStatus;
  ad_personalization: ConsentStatus;
}

declare global {
  interface Window {
    gtag?: (command: 'consent', action: 'update', payload: GtagConsentPayload) => void;
  }
}

const REQUIRED_CONSENT: Omit<CookieSettings, 'timestamp'> = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

function createConsent(overrides: Partial<Omit<CookieSettings, 'timestamp'>> = {}): CookieSettings {
  return {
    ...REQUIRED_CONSENT,
    ...overrides,
    timestamp: new Date().toISOString(),
  };
}

function isValidConsent(value: unknown): value is CookieSettings {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const consent = value as Partial<CookieSettings>;
  const validValues: ConsentStatus[] = ['granted', 'denied'];

  return (
    typeof consent.timestamp === 'string' &&
    validValues.includes(consent.analytics_storage as ConsentStatus) &&
    validValues.includes(consent.ad_storage as ConsentStatus) &&
    validValues.includes(consent.ad_user_data as ConsentStatus) &&
    validValues.includes(consent.ad_personalization as ConsentStatus)
  );
}

function readStoredConsent(): CookieSettings | null {
  const savedConsent = localStorage.getItem(STORAGE_KEY);
  if (!savedConsent) {
    return null;
  }

  try {
    const parsedConsent = JSON.parse(savedConsent);
    if (isValidConsent(parsedConsent)) {
      return parsedConsent;
    }
  } catch {
    // Invalid payloads are cleared to prevent repeated parse attempts.
  }

  localStorage.removeItem(STORAGE_KEY);
  return null;
}

function updateGCM(consent: CookieSettings): void {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics_storage,
      ad_storage: consent.ad_storage,
      ad_user_data: consent.ad_user_data,
      ad_personalization: consent.ad_personalization,
    });
  }
}

export default function CookieBanner() {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const focusRestoreRef = useRef<HTMLElement | null>(null);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const openModal = useCallback((triggerElement?: HTMLElement | null) => {
    focusRestoreRef.current =
      triggerElement ??
      (document.activeElement instanceof HTMLElement ? document.activeElement : null);

    const savedConsent = readStoredConsent();
    setAnalyticsChecked(savedConsent?.analytics_storage === 'granted');
    setIsModalOpen(true);
  }, []);

  const saveAndApply = useCallback((consent: CookieSettings) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    updateGCM(consent);
    setIsBannerVisible(false);
    setIsModalOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    saveAndApply(
      createConsent({
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      }),
    );
  }, [saveAndApply]);

  const rejectAll = useCallback(() => {
    saveAndApply(createConsent());
  }, [saveAndApply]);

  const saveCustomSettings = useCallback(() => {
    saveAndApply(
      createConsent({
        analytics_storage: analyticsChecked ? 'granted' : 'denied',
      }),
    );
  }, [analyticsChecked, saveAndApply]);

  useEffect(() => {
    let showBannerFrameId: number | null = null;
    const storedConsent = readStoredConsent();
    if (storedConsent) {
      updateGCM(storedConsent);
    } else {
      showBannerFrameId = window.requestAnimationFrame(() => {
        setIsBannerVisible(true);
      });
    }

    const handleOpenSettings = () => {
      const triggerElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      openModal(triggerElement);
    };

    window.addEventListener('openCookieSettings', handleOpenSettings);
    return () => {
      if (showBannerFrameId !== null) {
        window.cancelAnimationFrame(showBannerFrameId);
      }
      window.removeEventListener('openCookieSettings', handleOpenSettings);
    };
  }, [openModal]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const modalElement = modalRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusCloseButton = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== 'Tab' || !modalElement) {
        return;
      }

      const focusableElements = Array.from(modalElement.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusCloseButton);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      focusRestoreRef.current?.focus();
    };
  }, [closeModal, isModalOpen]);

  if (!isBannerVisible && !isModalOpen) {
    return null;
  }

  return (
    <>
      {isBannerVisible && !isModalOpen && (
        <section id="cookie-banner" className="cookie-banner is-visible" aria-hidden="false" aria-label="Preferencias de cookies">
          <div className="cookie-banner__container">
            <div className="cookie-banner__content">
              <h2 className="cookie-banner__title">Tu privacidad importa</h2>
              <p className="cookie-banner__text">
                Utilizo cookies propias y de terceros para analizar la navegación y mejorar el sitio web.
                Puedes aceptar todas las cookies, rechazarlas o configurarlas según tus preferencias.
                {' '}
                <Link href="/politica-cookies" target="_blank" rel="noopener" className="cookie-banner__link">
                  Política de Cookies
                </Link>
                .
              </p>
            </div>
            <div className="cookie-banner__actions">
              <button type="button" onClick={acceptAll} className="btn btn--primary">Aceptar</button>
              <button type="button" onClick={rejectAll} className="btn btn--secondary">Rechazar</button>
              <button
                type="button"
                onClick={(event) => openModal(event.currentTarget)}
                className="cookie-banner__settings-btn"
                aria-controls={COOKIE_MODAL_ID}
              >
                Configurar
              </button>
            </div>
          </div>
        </section>
      )}

      {isModalOpen && (
        <div id={COOKIE_MODAL_ID} className="cookie-modal is-visible" aria-hidden="false">
          <div className="cookie-modal__overlay" onClick={closeModal}></div>
          <div
            className="cookie-modal__container"
            role="dialog"
            aria-modal="true"
            aria-labelledby={COOKIE_MODAL_TITLE_ID}
            aria-describedby={COOKIE_MODAL_DESCRIPTION_ID}
            ref={modalRef}
          >
            <div className="card card--no-hover">
              <header className="cookie-modal__header">
                <h2 id={COOKIE_MODAL_TITLE_ID} className="card__title cookie-modal__title">Configuración de Cookies</h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="cookie-modal__close"
                  aria-label="Cerrar configuración de cookies"
                  ref={closeButtonRef}
                >
                  <X size={24} />
                </button>
              </header>

              <div className="cookie-modal__content">
                <p id={COOKIE_MODAL_DESCRIPTION_ID} className="text-secondary mb-lg">
                  Puedes decidir qué cookies permites en este sitio web.
                  <br />
                  Las <strong>cookies técnicas</strong> son necesarias para el funcionamiento básico del sitio y no se pueden desactivar.
                  <br />
                  Las <strong>cookies analíticas</strong> nos ayudan a entender cómo se utiliza el sitio web para mejorar su contenido y funcionamiento.
                  <br />
                  Puedes modificar tu elección en cualquier momento.
                </p>

                <div className="cookie-modal__list">
                  {/* Cookies Técnicas (Obligatorias) */}
                  <div className="cookie-modal__item">
                    <div className="cookie-modal__info">
                      <h4 className="cookie-modal__item-title">Cookies técnicas y de seguridad</h4>
                      <p className="text-muted cookie-modal__item-desc">
                        Estas cookies son necesarias para el funcionamiento del sitio web y no pueden desactivarse.
                        <br />
                        Permiten funciones básicas como la navegación, la seguridad del sitio y la gestión de preferencias de cookies.
                      </p>
                    </div>
                    <div className="cookie-modal__toggle">
                      <label className="toggle" htmlFor="cookie-tech">
                        <input type="checkbox" id="cookie-tech" checked disabled readOnly />
                        <span className="toggle__slider toggle__slider--disabled" aria-hidden="true"></span>
                        <span className="sr-only">Cookies técnicas activadas permanentemente</span>
                      </label>
                    </div>
                  </div>

                  {/* Cookies Analíticas (GA4) */}
                  <div className="cookie-modal__item">
                    <div className="cookie-modal__info">
                      <h4 className="cookie-modal__item-title">Cookies analíticas (Google Analytics)</h4>
                      <p className="text-muted cookie-modal__item-desc">
                        Estas cookies permiten analizar cómo los usuarios interactúan con el sitio web para mejorar su funcionamiento y la experiencia de navegación.
                        <br />
                        La información recopilada es agregada y se utiliza únicamente con fines estadísticos.
                        <br />
                        Estas cookies solo se activarán si aceptas su uso.
                      </p>
                    </div>
                    <div className="cookie-modal__toggle">
                      <label className="toggle" htmlFor="cookie-analytics">
                        <input
                          type="checkbox"
                          id="cookie-analytics"
                          checked={analyticsChecked}
                          aria-describedby="cookie-analytics-description"
                          onChange={(e) => setAnalyticsChecked(e.target.checked)}
                        />
                        <span className="toggle__slider" aria-hidden="true"></span>
                        <span className="sr-only">Activar cookies analíticas</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="cookie-modal__footer mt-xl">
                <p id="cookie-analytics-description" className="sr-only">
                  Al activar esta opción autorizas la medición anónima mediante Google Analytics.
                </p>
                <button type="button" onClick={saveCustomSettings} className="btn btn--primary btn--block">Guardar preferencias</button>
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
