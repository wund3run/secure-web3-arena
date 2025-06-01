
// Simple service worker for caching static assets
const CACHE_NAME = 'hawkly-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
  '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});
