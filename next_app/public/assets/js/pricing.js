(function () {
    'use strict';

    /* --- Tabs: resaltar la pestaña activa al hacer clic --- */
    var tabs = document.querySelectorAll('[data-tab]');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            // Eliminar clase activa de todas las tabs
            tabs.forEach(function (t) { t.classList.remove('pricing-tab--active'); });
            // Añadir clase activa a la tab pulsada
            tab.classList.add('pricing-tab--active');

            // Refinamiento v2.7.6: Asegurar que la tab activa sea visible en móvil
            tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

    /* --- Acordeón FAQ: toggle de ítems --- */
    document.querySelectorAll('.faq-item__question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.faq-item');
            var isOpen = item.classList.contains('faq-item--open');

            // Cerrar todos los ítems del mismo bloque FAQ
            var faqList = item.closest('.faq__list');
            if (faqList) {
                faqList.querySelectorAll('.faq-item--open').forEach(function (openItem) {
                    openItem.classList.remove('faq-item--open');
                    openItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
                });
            }

            // Abrir el actual si estaba cerrado
            if (!isOpen) {
                item.classList.add('faq-item--open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* --- Scroll spy: marcar tab activa según la sección visible --- */
    var sections = document.querySelectorAll('.pricing-section');
    if (sections.length && tabs.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    tabs.forEach(function (t) {
                        t.classList.toggle('pricing-tab--active', t.getAttribute('href') === '#' + id);

                        // Refinamiento v2.7.6: Auto-scroll al detectar sección activa
                        if (t.classList.contains('pricing-tab--active')) {
                            t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }
                    });
                }
            });
        }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

        sections.forEach(function (sec) { observer.observe(sec); });
    }
})();