/**
 * Cookie Manager - EU 2026 & GA4 Consent Mode v2
 * Gestiona el consentimiento granular y la comunicación con Google Analytics
 */

const CookieManager = {
    STORAGE_KEY: 'cookie_consent_settings',
    
    init() {
        this.banner = document.getElementById('cookie-banner');
        this.modal = document.getElementById('cookie-modal');
        
        if (!this.banner || !this.modal) return;

        this.setupEventListeners();
        this.checkExistingConsent();
    },

    setupEventListeners() {
        // Botones del Banner
        document.getElementById('btn-accept-all')?.addEventListener('click', () => this.acceptAll());
        document.getElementById('btn-reject-all')?.addEventListener('click', () => this.rejectAll());
        document.getElementById('btn-open-settings')?.addEventListener('click', () => this.toggleModal(true));

        // Botones del Modal
        document.getElementById('btn-close-modal')?.addEventListener('click', () => this.toggleModal(false));
        document.getElementById('btn-save-settings')?.addEventListener('click', () => this.saveCustomSettings());

        // Cerrar modal al hacer clic en el overlay
        document.querySelector('.cookie-modal__overlay')?.addEventListener('click', () => this.toggleModal(false));
        
        // Vincular footer si ya existe
        this.setupFooterListener();
    },

    setupFooterListener() {
        const footerLink = document.getElementById('open-cookie-settings');
        if (footerLink) {
            footerLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleModal(true);
            });
        }

        // Vincular enlace de la página de política de cookies
        const pageLink = document.getElementById('open-cookie-settings-page');
        if (pageLink) {
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleModal(true);
            });
        }
    },

    checkExistingConsent() {
        const savedConsent = localStorage.getItem(this.STORAGE_KEY);
        if (savedConsent) {
            try {
                const consent = JSON.parse(savedConsent);
                this.updateGCM(consent);
                this.hideBanner();
            } catch {
                // Si el valor está corrupto, limpiar y mostrar el banner
                localStorage.removeItem(this.STORAGE_KEY);
                this.showBanner();
            }
        } else {
            this.showBanner();
        }
    },

    showBanner() {
        if (this.banner) this.banner.classList.add('is-visible');
    },

    hideBanner() {
        if (this.banner) this.banner.classList.remove('is-visible');
    },

    toggleModal(show) {
        if (this.modal) {
            if (show) {
                // Sincronizar checkboxes con el consentimiento actual al abrir
                const savedConsent = localStorage.getItem(this.STORAGE_KEY);
                if (savedConsent) {
                    try {
                        const consent = JSON.parse(savedConsent);
                        const analyticsInput = document.getElementById('cookie-analytics');
                        if (analyticsInput) {
                            analyticsInput.checked = (consent.analytics_storage === 'granted');
                        }
                    } catch {
                        // Si está corrupto, resetear checkbox
                        const analyticsInput = document.getElementById('cookie-analytics');
                        if (analyticsInput) analyticsInput.checked = false;
                    }
                }
            }
            this.modal.classList.toggle('is-visible', show);
            this.modal.setAttribute('aria-hidden', !show);
        }
    },

    acceptAll() {
        const consent = {
            analytics_storage: 'granted',
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            timestamp: new Date().toISOString()
        };
        this.saveAndApply(consent);
    },

    rejectAll() {
        const consent = {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            timestamp: new Date().toISOString()
        };
        this.saveAndApply(consent);
    },

    saveCustomSettings() {
        const analyticsInput = document.getElementById('cookie-analytics');
        const analytics = analyticsInput ? analyticsInput.checked : false;
        
        const consent = {
            analytics_storage: analytics ? 'granted' : 'denied',
            ad_storage: 'denied', // Por defecto denegamos marketing ya que el sitio es de servicios
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            timestamp: new Date().toISOString()
        };
        this.saveAndApply(consent);
        this.toggleModal(false);
    },

    saveAndApply(consent) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(consent));
        this.updateGCM(consent);
        this.hideBanner();
    },

    updateGCM(consent) {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': consent.analytics_storage,
                'ad_storage': consent.ad_storage,
                'ad_user_data': consent.ad_user_data,
                'ad_personalization': consent.ad_personalization
            });
        }
    }
};

// Exportar para que components.js pueda inicializarlo tras cargar el HTML
window.CookieManager = CookieManager;
