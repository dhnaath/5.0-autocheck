const CACHE_NAME = "fuel-tracker-v1";
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon.svg"
];

// Install Event: Cache core files immediately
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Pre-caching offline skeleton...");
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event: Clear out older versions of caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[Service Worker] Cleared stale cache:", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event: Proxy network requests and serve cached content
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  // 1. Core navigation: '/' or '/index.html' -> Network-First (with offline cache fallback)
  if (isSameOrigin && (url.pathname === "/" || url.pathname === "/index.html" || url.pathname === "")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Fall back to pre-cached index.html if network is unreachable
          return caches.match("/");
        })
    );
    return;
  }

  // 2. CSS/JS Assets, Fonts and Icons -> Cache-First
  const isHashedAsset = url.pathname.includes("/assets/");
  const isWebManifest = url.pathname.includes("manifest.json") || url.pathname.endsWith(".webmanifest");
  const isGoogleFont = url.origin.includes("googleapis.com") || url.origin.includes("gstatic.com");
  const isStaticResource = isHashedAsset || isWebManifest || isGoogleFont || url.pathname.includes(".svg");

  if (isStaticResource) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200) {
              return response;
            }
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
            return response;
          })
          .catch(() => {
            // Handle fallback for offline images/icons
            if (event.request.headers.get("accept")?.includes("image")) {
              return caches.match("/icon.svg");
            }
            return new Response("Offline resource unavailable", { status: 503, statusText: "Offline" });
          });
      })
    );
    return;
  }

  // 3. General static routes or fallback requests -> Network-First (with cache fallback)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache same-origin successful requests dynamically
        if (isSameOrigin && response && response.status === 200 && response.type === "basic") {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          
          if (event.request.headers.get("accept")?.includes("image")) {
            return caches.match("/icon.svg");
          }
          return new Response("Offline connection lost", { status: 503, statusText: "Offline" });
        });
      })
  );
});
