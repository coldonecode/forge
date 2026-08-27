/* Forge service worker — offline-first app shell + exercise GIF caching */
const VERSION = "forge-v3";
const SHELL_CACHE = `${VERSION}-shell`;
const ASSET_CACHE = `${VERSION}-assets`;
const GIF_CACHE = `${VERSION}-gifs`;
const GIF_LIMIT = 600;

const SHELL_ASSETS = ["/", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((c) => c.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !k.startsWith(VERSION))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

async function cacheFirst(request, cacheName, limit) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request, { ignoreVary: true });
  if (hit) return hit;
  const res = await fetch(request);
  if (res && (res.ok || res.type === "opaque")) {
    cache.put(request, res.clone());
    if (limit) {
      const keys = await cache.keys();
      if (keys.length > limit) {
        for (let i = 0; i < keys.length - limit; i++) await cache.delete(keys[i]);
      }
    }
  }
  return res;
}

async function networkFirstNavigation(request) {
  try {
    const res = await fetch(request);
    const cache = await caches.open(SHELL_CACHE);
    cache.put("/", res.clone());
    return res;
  } catch {
    const cache = await caches.open(SHELL_CACHE);
    return (
      (await cache.match(request, { ignoreVary: true })) ??
      (await cache.match("/")) ??
      new Response("Offline", { status: 503 })
    );
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // ExerciseDB API — never cached here (catalog lives in IndexedDB)
  if (url.hostname === "oss.exercisedb.dev") return;

  // Exercise demo GIFs from the CDN — cache forever (bounded)
  if (url.hostname === "static.exercisedb.dev") {
    event.respondWith(
      cacheFirst(request, GIF_CACHE, GIF_LIMIT).catch(
        () => new Response("", { status: 504 })
      )
    );
    return;
  }

  // Google Fonts — cache-first
  if (url.hostname.includes("fonts.g") || url.hostname.includes("gstatic")) {
    event.respondWith(cacheFirst(request, ASSET_CACHE).catch(() => fetch(request)));
    return;
  }

  // App shell navigations (SPA)
  if (request.mode === "navigate" && url.origin === self.location.origin) {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  // Same-origin static assets (hashed vite bundles, icons…)
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request, ASSET_CACHE));
  }
});
