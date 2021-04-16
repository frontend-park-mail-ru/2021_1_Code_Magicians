/* eslint-disable no-invalid-this */
// noinspection ThisExpressionReferencesGlobalObjectJS

// const backendURL = 'http://127.0.0.1:8080';
const backendURL = 'http://www.pinter-best.com';

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

  if (event.request.url.startsWith(backendURL)) {
    console.log(event.request.url);
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
