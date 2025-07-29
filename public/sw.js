
// Simplified service worker with better error handling
const CACHE_NAME = 'hawkly-v2.1';

// Minimal resources to cache
const STATIC_ASSETS = [
  '/',
  '/offline.html'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(error => {
        console.error('Service worker install failed:', error);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
      .catch(error => {
        console.error('Service worker activation failed:', error);
      })
  );
});

// Fetch event - simple network-first strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests and problematic URLs
  if (url.origin !== self.location.origin || 
      url.hostname.includes('analytics') ||
      url.hostname.includes('beacon') ||
      url.hostname.includes('ingesteer')) {
    return;
  }
  
  event.respondWith(
    fetch(request)
      .catch(() => {
        // If network request fails, try cache
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // For HTML requests, show offline page
            if (request.headers.get('Accept')?.includes('text/html')) {
              return caches.match('/offline.html');
            }
            return new Response('Network unavailable', { status: 503 });
          });
      })
  );
});
