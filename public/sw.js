
// Enhanced service worker with better error handling and cache-busting
const CACHE_NAME = 'hawkly-v2.0';
const CACHE_BUST = Date.now();

// Resources to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json'
].map(url => `${url}?v=${CACHE_BUST}`);

// Install event with better error handling
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Add assets one by one to handle failures gracefully
        return Promise.allSettled(
          STATIC_ASSETS.map(asset => 
            cache.add(asset).catch(err => {
              console.warn(`Failed to cache ${asset}:`, err);
              return null;
            })
          )
        );
      })
      .then(() => self.skipWaiting())
      .catch(error => {
        console.error('Service worker install failed:', error);
        // Continue anyway - don't block the app
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.allSettled(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => 
              caches.delete(cacheName).catch(err => {
                console.warn(`Failed to delete cache ${cacheName}:`, err);
              })
            )
        );
      })
      .then(() => self.clients.claim())
      .catch(error => {
        console.error('Service worker activation failed:', error);
      })
  );
});

// Fetch event - network first with graceful fallbacks
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests and extension requests
  if (url.origin !== self.location.origin || url.protocol === 'chrome-extension:') {
    return;
  }

  // Skip requests that might be blocked by content blockers
  if (url.hostname.includes('cloudflare') || 
      url.hostname.includes('analytics') || 
      url.hostname.includes('beacon')) {
    return;
  }
  
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache successful responses
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseToCache).catch(err => {
                console.warn('Failed to cache response:', err);
              });
            })
            .catch(() => {
              // Ignore cache errors
            });
        }
        return response;
      })
      .catch(() => {
        // If network request fails, try to get from cache
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // For HTML requests, show offline page
            if (request.headers.get('Accept')?.includes('text/html')) {
              return caches.match('/offline.html');
            }
            // For other requests, return a basic response
            return new Response('Network unavailable', { status: 503 });
          })
          .catch(() => {
            return new Response('Service unavailable', { status: 503 });
          });
      })
  );
});
