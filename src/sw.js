/* eslint-disable no-invalid-this */
// noinspection ThisExpressionReferencesGlobalObjectJS

const backendURL = 'https://pinter-best.com/api';

const CACHE_NAME = 'pinterbest-main-cache';
const cacheURLs = [
  '/',
  '../assets/',
  'index_bundle.js',
  'index.html',
  'favicon.png',
];

this.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(cacheURLs)));
});

this.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (!event.request.url.startsWith(backendURL) && cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((res) => caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, res.clone()).then(() => {});

          return res;
        }))
        .catch(() => cachedResponse || caches.match(event.request));
    }),
  );
});
