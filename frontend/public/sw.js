/* DhanRaksha Service Worker */
/* eslint-disable no-restricted-globals */

const VERSION = 'v1.0.0';
const CACHE_NAME = `dhanraksha-cache-${VERSION}`;
const CORE_ASSETS = [
  '/',
  '/dashboard',
  '/manifest.json',
  '/favicon.ico',
  '/offline.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_NAME ? undefined : caches.delete(k))))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // Navigation requests: network-first with offline fallback
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const networkResp = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, networkResp.clone());
        return networkResp;
      } catch (err) {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(req);
        return cached || cache.match('/offline.html');
      }
    })());
    return;
  }

  // Static assets: stale-while-revalidate
  const dest = req.destination;
  if (['style', 'script', 'image', 'font'].includes(dest)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);
      const fetchPromise = fetch(req)
        .then((networkResp) => {
          cache.put(req, networkResp.clone());
          return networkResp;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })());
    return;
  }

  // Default: try network then cache
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});
