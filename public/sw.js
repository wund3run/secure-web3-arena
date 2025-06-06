
const CACHE_NAME = 'hawkly-v3';
const STATIC_CACHE = 'hawkly-static-v3';
const API_CACHE = 'hawkly-api-v3';
const IMAGE_CACHE = 'hawkly-images-v3';

// Static assets to cache
const staticAssets = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml'
];

// Image assets to cache
const imageAssets = [
  '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
  '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png'
];

// API endpoints to cache
const apiEndpoints = [
  '/api/auditors',
  '/api/marketplace',
  '/api/services',
  '/api/profile'
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(staticAssets)),
      caches.open(IMAGE_CACHE).then(cache => cache.addAll(imageAssets)),
      caches.open(API_CACHE)
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!['hawkly-v3', 'hawkly-static-v3', 'hawkly-api-v3', 'hawkly-images-v3'].includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve cached content with fallback strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE).then(cache => {
        return fetch(request).then(networkResponse => {
          // Cache successful responses
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Return cached version if network fails
          return cache.match(request).then(response => {
            if (response) {
              return response;
            }
            // Return offline fallback for critical API calls
            return new Response(JSON.stringify({
              error: 'Offline',
              message: 'You are currently offline. Some features may be limited.'
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          });
        });
      })
    );
    return;
  }

  // Handle image requests with cache-first strategy
  if (request.destination === 'image' || url.pathname.includes('/lovable-uploads/')) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache => {
        return cache.match(request).then(response => {
          if (response) {
            return response;
          }
          
          return fetch(request).then(networkResponse => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Return placeholder image for failed image loads
            return new Response(null, { status: 404 });
          });
        });
      })
    );
    return;
  }

  // Handle navigation requests with network-first, cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          return response;
        }
        throw new Error('Network response was not ok');
      }).catch(() => {
        return caches.match('/') || caches.match(request);
      })
    );
    return;
  }

  // Handle other static assets with cache-first strategy
  event.respondWith(
    caches.match(request).then(response => {
      if (response) {
        return response;
      }
      
      return fetch(request).then(networkResponse => {
        // Cache successful responses for static assets
        if (networkResponse.ok && request.method === 'GET') {
          const responseToCache = networkResponse.clone();
          caches.open(STATIC_CACHE).then(cache => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      });
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

// Push notification handling
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
      badge: '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey || 1
      },
      actions: [
        {
          action: 'explore',
          title: 'View Details',
          icon: '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png'
        },
        {
          action: 'close',
          title: 'Dismiss'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Hawkly Notification', options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});
