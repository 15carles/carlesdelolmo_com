const STATIC_CACHE = "carles-static-v1";
const RUNTIME_CACHE = "carles-runtime-v1";
const OFFLINE_URL = "/offline.html";
const PRECACHE_URLS = [OFFLINE_URL, "/site.webmanifest"];
const EXCLUDED_PATH_PREFIXES = [
  "/api/",
  "/keystatic",
  "/api/keystatic",
  "/_next/webpack-hmr",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => ![STATIC_CACHE, RUNTIME_CACHE].includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (EXCLUDED_PATH_PREFIXES.some((prefix) => requestUrl.pathname.startsWith(prefix))) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(handleNavigationRequest(event.request));
    return;
  }

  if (isStaticAsset(requestUrl.pathname)) {
    event.respondWith(handleStaticAssetRequest(event.request));
  }
});

async function handleNavigationRequest(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return caches.match(OFFLINE_URL);
  }
}

async function handleStaticAssetRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    void refreshStaticAsset(cache, request);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    return Response.error();
  }
}

async function refreshStaticAsset(cache, request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
  } catch {
    // Ignore refresh failures. The cached response is still valid.
  }
}

function isStaticAsset(pathname) {
  return (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/assets/") ||
    pathname === "/favicon.ico" ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".woff") ||
    pathname.endsWith(".woff2") ||
    pathname.endsWith(".webmanifest")
  );
}
