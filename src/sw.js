/* eslint-disable no-invalid-this */
// noinspection ThisExpressionReferencesGlobalObjectJS

const CACHE_NAME = 'pinterbest-main-cache';
const cacheURLs = ['/assets/']

this.addEventListener('install', (event) => {
  caches.open(CACHE_NAME).then((cache) => cache.addAll(cacheURLs)).catch((err) => {});
});
