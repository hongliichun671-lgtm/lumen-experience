/* LUMEN Service Worker — Offline-first PWA */
const CACHE_NAME = 'lumen-v1.0.0';
const RUNTIME_CACHE = 'lumen-runtime-v1';
const PRECACHE_URLS = [
  './',
  './index.html',
  './about.html',
  './articles.html',
  './contact.html',
  './tools.html',
  './privacy.html',
  './css/styles.css',
  './css/articles.css',
  './css/tools.css',
  './js/main.js',
  './js/articles.js',
  './js/tools.js',
  './manifest.json',
  './robots.txt',
  './sitemap.xml'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Skip cross-origin (except fonts)
  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isFont = request.destination === 'font' || url.hostname.includes('gstatic') || url.hostname.includes('googleapis');

  if (!isSameOrigin && !isFont) return;

  // Network-first for HTML, cache-first for assets
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(RUNTIME_CACHE).then((c) => c.put(request, copy));
        return res;
      }).catch(() => caches.match(request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(request, copy));
        }
        return res;
      }).catch(() => null);
    })
  );
});
