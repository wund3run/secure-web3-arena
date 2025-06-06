// Enhanced service worker with dynamic caching and offline support
const CACHE_NAME = 'hawkly-v1.1';

// Resources to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
  '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png',
  '/lovable-uploads/d96077a4-3ebd-4779-9a3e-a504ff6822f1.png',
  '/offline.html',
  '/manifest.json'
];

// List of routes to cache on visit with a network-first strategy
const DYNAMIC_ROUTES = [
  '/marketplace',
  '/dashboard',
  '/audits',
  '/resources',
  '/community',
  '/auth',
  '/about',
  '/contact'
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
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
    .then(() => self.clients.claim())
  );
});

// Helper function to determine if request should use cache-first strategy
function shouldUseCacheFirst(url) {
  const parsedUrl = new URL(url);
  return STATIC_ASSETS.some(asset => 
    parsedUrl.pathname === asset || 
    parsedUrl.pathname.endsWith('.png') ||
    parsedUrl.pathname.endsWith('.jpg') ||
    parsedUrl.pathname.endsWith('.svg') ||
    parsedUrl.pathname.endsWith('.ico')
  );
}

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Choose caching strategy based on request type
  if (shouldUseCacheFirst(request.url)) {
    // Cache-first strategy for static assets
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request)
            .then((response) => {
              // Don't cache non-OK responses
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Cache the response
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
                
              return response;
            })
            .catch(() => {
              // If fetch fails (offline), return fallback image for image requests
              if (request.destination === 'image') {
                return caches.match('/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png');
              }
            });
        })
    );
  } else if (DYNAMIC_ROUTES.some(route => url.pathname === route)) {
    // Network-first strategy for dynamic routes
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache a copy of the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseToCache);
            });
            
          return response;
        })
        .catch(() => {
          // If network request fails, try to get from cache
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If no cache exists, show offline page for HTML requests
              if (request.headers.get('Accept').includes('text/html')) {
                return caches.match('/offline.html');
              }
              // Otherwise just show the error
              throw new Error('Network unavailable and no cache available');
            });
        })
    );
  } else {
    // Network-only strategy for API calls and dynamic data
    event.respondWith(fetch(request));
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Hawkly Update';
  const options = {
    body: data.body || 'Something new happened in your Hawkly account.',
    icon: '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
    badge: '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Check if a window is already open
      for (const client of clientList) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});
