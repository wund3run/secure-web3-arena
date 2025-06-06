
const CACHE_NAME = 'hawkly-v2';
const STATIC_CACHE = 'hawkly-static-v2';
const API_CACHE = 'hawkly-api-v2';

// Static assets to cache
const staticAssets = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
  '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png'
];

// API endpoints to cache
const apiEndpoints = [
  '/api/auditors',
  '/api/marketplace',
  '/api/services'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(staticAssets)),
      caches.open(API_CACHE)
    ])
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!['hawkly-v2', 'hawkly-static-v2', 'hawkly-api-v2'].includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE).then(cache => {
        return cache.match(request).then(response => {
          const fetchPromise = fetch(request).then(networkResponse => {
            // Cache successful responses
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });

          // Return cached version if available, otherwise fetch
          return response || fetchPromise;
        });
      })
    );
    return;
  }

  // Handle static assets
  event.respondWith(
    caches.match(request).then(response => {
      return response || fetch(request);
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Sync any pending data when back online
  return Promise.resolve();
}
