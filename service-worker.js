'use strict';

// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v6'; // Static cache (app shell)
const DATA_CACHE_NAME = 'data-cache-v2'; // Dynamic cache (data)

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
    './',
    './index.html',
    './css/bootstrap.min.css',
    './css/style.css',
    './scripts/app1.js',
    './scripts/bootstrap.min.js',
    './scripts/jquery-3.5.1.min.js',
    './scripts/fontawesome.js',
    './img/android-chrome-192x192.png',
    './img/android-chrome-512x512.png',
    './img/apple-touch-icon.png',
    './img/favicon-16x16.png',
    './img/favicon-32x32.png',
    './img/favicon.ico',
    './fonts/Poppins-Light.ttf',
    './fonts/Poppins-Regular.ttf'
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // Precache static resources.
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
            }
        }));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    if(evt.request.url.includes('/werkbonnen')) {
        console.log('[ServiceWorker] Fetch (data)', evt.request.url);
        evt.respondWith(
            caches.open(DATA_CACHE_NAME).then((cache) => {
              return fetch(evt.request)
                  .then((response) => {
                    // If the response was good, clone it and store it in the cache.
                    if (response.status === 200) {
                      cache.put(evt.request.url, response.clone());
                    }
                    return response;
                  }).catch((err) => {
                    // Network request failed, try to get it from the cache.
                    return cache.match(evt.request);
                  });
            }));
        return;
    }
    evt.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(evt.request)
                .then((response) => {
                    return response || fetch(evt.request);
                });
        })
    );
});