/**
 * Script de Alternancia de Tema (Sistema por defecto + override del usuario)
 * - Por defecto: sigue prefers-color-scheme (y cambia en vivo si el sistema cambia)
 * - Si el usuario alterna: se guarda override en localStorage y ya no sigue el sistema
 */

(function () {
    'use strict';

    const THEME_KEY = 'theme'; // 'light' | 'dark' | null (auto)

    // Tema del sistema
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Tema guardado por el usuario (override)
    function getUserThemeOverride() {
        const t = localStorage.getItem(THEME_KEY);
        return (t === 'dark' || t === 'light') ? t : null;
    }

    // Tema efectivo (override si existe, si no sistema)
    function getEffectiveTheme() {
        return getUserThemeOverride() ?? getSystemTheme();
    }

    // Aplicar tema al documento (NO guarda)
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    // Guardar override del usuario + aplicar
    function setUserTheme(theme) {
        if (theme !== 'dark' && theme !== 'light') return;
        localStorage.setItem(THEME_KEY, theme);
        applyTheme(theme);
    }

    // Volver a automático (seguir sistema)
    function clearUserThemeOverride() {
        localStorage.removeItem(THEME_KEY);
        applyTheme(getSystemTheme());
        // Actualiza iconos por si existe UI
        updateAllToggleIcons();
    }

    // --- Evitar parpadeos: aplicar el tema lo antes posible ---
    applyTheme(getEffectiveTheme());

    // Escuchar cambios del sistema SOLO si no hay override del usuario
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', () => {
        if (!getUserThemeOverride()) {
            applyTheme(getSystemTheme());
            updateAllToggleIcons();
        }
    });

    // Ayudante: Actualizar iconos de un botón
    function updateToggleIcon(button) {
        if (!button) return;

        const theme = getEffectiveTheme();
        const sunIcon = button.querySelector('.theme-toggle__icon--sun');
        const moonIcon = button.querySelector('.theme-toggle__icon--moon');
        if (!sunIcon || !moonIcon) return;

        // Si estás en dark, muestro el sol (para pasar a light). Si estás en light, muestro la luna.
        if (theme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }

    function updateAllToggleIcons() {
        updateToggleIcon(document.getElementById('theme-toggle'));
        updateToggleIcon(document.getElementById('theme-toggle-mobile'));
    }

    // Función de inicialización principal (expuesta globalmente)
    window.initThemeToggle = function () {
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');

        // Acción de alternancia (esto crea override del usuario)
        function toggleTheme() {
            const current = getEffectiveTheme();
            const next = current === 'light' ? 'dark' : 'light';
            setUserTheme(next);
            updateAllToggleIcons();
        }

        // Inicializar iconos
        if (themeToggle) updateToggleIcon(themeToggle);
        if (themeToggleMobile) updateToggleIcon(themeToggleMobile);

        // Adjuntar listeners
        if (themeToggle) themeToggle.onclick = toggleTheme;
        if (themeToggleMobile) themeToggleMobile.onclick = toggleTheme;

        // Opcional: si tienes un botón/link "Auto" para seguir sistema:
        // const themeAuto = document.getElementById('theme-auto');
        // if (themeAuto) themeAuto.onclick = clearUserThemeOverride;
    };

    document.addEventListener('DOMContentLoaded', window.initThemeToggle);

    // Exponer opcionalmente la función de “volver a automático” por si la necesitas desde fuera
    window.clearUserThemeOverride = clearUserThemeOverride;
})();