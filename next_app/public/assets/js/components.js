/**
 * Component Loader
 * Loads modular HTML components dynamically
 */

(function () {
    'use strict';

    /**
     * Load a component from the components directory
     * @param {string} componentName - Name of the component file (without .html)
     * @param {string} targetSelector - CSS selector where to inject the component
     */
    async function loadComponent(componentName, targetSelector) {
        try {
            // Determine base path by looking at the script tag that loaded this file
            const scriptTag = document.querySelector('script[src*="components.js"]');
            let basePath = 'components/'; // Default

            if (scriptTag) {
                const src = scriptTag.getAttribute('src');
                if (src.includes('../')) {
                    basePath = '../components/';
                }
            }

            // Fallback: Check if we are in a known subdirectory structure
            let isSubdirectory = window.location.pathname.split('/').length > 2 && !window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/');

            if (basePath.includes('../')) {
                isSubdirectory = true;
            }

            const response = await fetch(`${basePath}${componentName}.html?v=${new Date().getTime()}`);

            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentName}`);
            }

            const html = await response.text();

            // Process links if necessary
            let finalHtml = html;

            // Fix relative links for subdirectories in Navbar and Formulario (if needed)
            if (isSubdirectory) {
                if (componentName === 'navbar') {
                    finalHtml = finalHtml.replace(/href="index\.html/g, 'href="../index.html');
                    finalHtml = finalHtml.replace(/href="blog\//g, 'href="../blog/');
                    finalHtml = finalHtml.replace(/href="proyectos\//g, 'href="../proyectos/');
                }
                // Si la política de privacidad no es una ruta absoluta (/politica-privacidad), 
                // podrías necesitar un replace similar aquí para el formulario.
            }

            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                // Inyectamos el componente
                targetElement.outerHTML = finalHtml;

                // --- ACCIONES POST-CARGA ---

                // 1. Lógica para Navbar
                if (componentName === 'navbar') {
                    const currentPath = window.location.pathname;
                    const links = document.querySelectorAll('.navbar__link');

                    links.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href && currentPath.includes(href.replace('../', '').split('#')[0]) && href !== '../index.html' && href !== 'index.html') {
                            link.classList.add('active');
                        }
                    });

                    if (window.DevGEO && window.DevGEO.reInitNavbar) {
                        window.DevGEO.reInitNavbar();
                    }
                }

                // 2. Lógica para Formulario (Presupuesto)
                if (componentName === 'formulario') {
                    if (typeof BudgetForm !== 'undefined') {
                        BudgetForm.init();
                    } else {
                        console.warn('BudgetForm logic not found. Make sure budget-form.js is loaded.');
                    }

                    // Forzar que el observador de animaciones detecte el nuevo formulario
                    if (window.DevGEO && window.DevGEO.AnimateOnScroll) {
                        window.DevGEO.AnimateOnScroll.init();
                    }
                }

                // 3. Lógica para Footer
                if (componentName === 'footer') {
                    if (window.CookieManager) {
                        window.CookieManager.setupFooterListener();
                    }
                }

                // 4. Lógica para Cookie Banner
                if (componentName === 'cookie-banner') {
                    if (window.CookieManager) {
                        window.CookieManager.init();
                    } else {
                        console.warn('CookieManager logic not found.');
                    }
                }

            } else {
                console.warn(`Target element not found: ${targetSelector}`);
            }
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
        }
    }

    /**
     * Load all components when DOM is ready
     */
    document.addEventListener('DOMContentLoaded', function () {
        // Load navbar
        if (document.querySelector('[data-component="navbar"]')) {
            loadComponent('navbar', '[data-component="navbar"]');
        }

        // Load footer
        if (document.querySelector('[data-component="footer"]')) {
            loadComponent('footer', '[data-component="footer"]');
        }

        // Load formulario (Nuevo)
        if (document.querySelector('[data-component="formulario"]')) {
            loadComponent('formulario', '[data-component="formulario"]');
        }

        // Load cookie-banner
        if (document.querySelector('[data-component="cookie-banner"]')) {
            loadComponent('cookie-banner', '[data-component="cookie-banner"]');
        }
    });
})();