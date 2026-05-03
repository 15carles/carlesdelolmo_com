"use client";

import { useEffect } from "react";

const SW_URL = "/sw.js";
const SW_SCOPE = "/";
const EXCLUDED_PATH_PREFIXES = ["/keystatic", "/api/keystatic"];

export function PWARegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    if (EXCLUDED_PATH_PREFIXES.some((prefix) => window.location.pathname.startsWith(prefix))) {
      return;
    }

    let isMounted = true;

    async function registerServiceWorker() {
      try {
        const registration = await navigator.serviceWorker.register(SW_URL, {
          scope: SW_SCOPE,
          updateViaCache: "none",
        });

        if (!isMounted) {
          return;
        }

        await registration.update();
      } catch (error) {
        console.warn("No se pudo registrar el service worker de la PWA.", error);
      }
    }

    void registerServiceWorker();

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
}
