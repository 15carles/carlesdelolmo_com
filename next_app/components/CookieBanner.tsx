"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const STORAGE_KEY = 'cookie_consent_settings';

interface CookieSettings {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  timestamp: string;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);

  useEffect(() => {
    // Initial check for consent
    const savedConsent = localStorage.getItem(STORAGE_KEY);
    if (!savedConsent) {
      setIsVisible(true);
    } else {
      try {
        const consent = JSON.parse(savedConsent) as CookieSettings;
        updateGCM(consent);
      } catch (e) {
        setIsVisible(true);
      }
    }

    // Listener for opening settings from footer or other links
    const handleOpenSettings = () => toggleModal(true);
    window.addEventListener('openCookieSettings', handleOpenSettings);
    return () => window.removeEventListener('openCookieSettings', handleOpenSettings);
  }, []);

  const updateGCM = (consent: CookieSettings) => {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': consent.analytics_storage,
        'ad_storage': consent.ad_storage,
        'ad_user_data': consent.ad_user_data,
        'ad_personalization': consent.ad_personalization
      });
    }
  };

  const saveAndApply = (consent: CookieSettings) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    updateGCM(consent);
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const acceptAll = () => {
    const consent: CookieSettings = {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      timestamp: new Date().toISOString()
    };
    saveAndApply(consent);
  };

  const rejectAll = () => {
    const consent: CookieSettings = {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      timestamp: new Date().toISOString()
    };
    saveAndApply(consent);
  };

  const saveCustomSettings = () => {
    const consent: CookieSettings = {
      analytics_storage: analyticsChecked ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      timestamp: new Date().toISOString()
    };
    saveAndApply(consent);
  };

  const toggleModal = (show: boolean) => {
    if (show) {
      const savedConsent = localStorage.getItem(STORAGE_KEY);
      if (savedConsent) {
        try {
          const consent = JSON.parse(savedConsent) as CookieSettings;
          setAnalyticsChecked(consent.analytics_storage === 'granted');
        } catch (e) {
          setAnalyticsChecked(false);
        }
      } else {
        setAnalyticsChecked(false);
      }
    }
    setIsModalOpen(show);
  };

  if (!isVisible && !isModalOpen) return null;

  return (
    <>
      {isVisible && !isModalOpen && (
        <div id="cookie-banner" className="cookie-banner is-visible" aria-hidden="false">
          <div className="cookie-banner__container">
            <div className="cookie-banner__content">
              <h3 className="cookie-banner__title">Tu privacidad nos importa</h3>
              <p className="cookie-banner__text">
                Utilizamos cookies propias y de terceros para analizar la navegación y mejorar el sitio web.
                Puedes aceptar todas las cookies, rechazarlas o configurarlas según tus preferencias.
                <Link href="/politica-cookies" target="_blank" rel="noopener" className="cookie-banner__link">
                  Política de Cookies
                </Link>
              </p>
            </div>
            <div className="cookie-banner__actions">
              <button onClick={acceptAll} className="btn btn--primary">Aceptar</button>
              <button onClick={rejectAll} className="btn btn--secondary">Rechazar</button>
              <button onClick={() => toggleModal(true)} className="cookie-banner__settings-btn">Configurar</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div id="cookie-modal" className="cookie-modal is-visible" aria-hidden="false">
          <div className="cookie-modal__overlay" onClick={() => toggleModal(false)}></div>
          <div className="cookie-modal__container">
            <div className="card card--no-hover">
              <header className="cookie-modal__header">
                <h2 className="card__title cookie-modal__title">Configuración de Cookies</h2>
                <button onClick={() => toggleModal(false)} className="cookie-modal__close" aria-label="Cerrar">
                  <X size={24} />
                </button>
              </header>

              <div className="cookie-modal__content">
                <p className="text-secondary mb-lg">
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
                      <div className="toggle">
                        <input type="checkbox" id="cookie-tech" checked disabled />
                        <span className="toggle__slider toggle__slider--disabled"></span>
                      </div>
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
                      <div className="toggle">
                        <input
                          type="checkbox"
                          id="cookie-analytics"
                          checked={analyticsChecked}
                          onChange={(e) => setAnalyticsChecked(e.target.checked)}
                        />
                        <span className="toggle__slider"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="cookie-modal__footer mt-xl">
                <button onClick={saveCustomSettings} className="btn btn--primary btn--block">Guardar preferencias</button>
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}