/* eslint-disable no-invalid-this */
// noinspection ThisExpressionReferencesGlobalObjectJS

const CACHE_NAME = 'pinterbest-main-cache';
const cacheURLs = [
  '../assets/',
  'index_bundle.js',
  'index.html',
  'favicon.png',
];

this.addEventListener('install', (event) => {
  event.waitUntil(
      caches
          .open(CACHE_NAME)
          .then((cache) => cache.addAll(cacheURLs)),
  );
});

this.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return fetch(event.request);
  }

  event.respondWith(
      caches
          .match(event.request)
          .then((cachedResponse) => {
            if (!navigator.onLine) {
              return cachedResponse || fetch(event.request);
            }

            return fetch(event.request).then((res) => {
              return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, res.clone()).then(() => {});

                return res;
              });
            });
          }),
  );
});
