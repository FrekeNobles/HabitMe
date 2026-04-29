// Habit Tracker Service Worker
// Minimal offline support - caches app shell safely

const CACHE_NAME = 'habit-tracker-v2';

// Install - cache only the app shell entry ("/")
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache the root so navigation fallback works
      return cache.add('/');
    })
  );

  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );

  return self.clients.claim();
});

// Fetch - network first, safe caching, offline fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  const request = event.request;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache static assets (app shell)
        if (
          response &&
          response.status === 200 &&
          (
            request.destination === 'script' ||
            request.destination === 'style' ||
            request.destination === 'image'
          )
        ) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }

        return response;
      })
      .catch(() => {
        // Network failed → try cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Fallback for page navigation (VERY IMPORTANT)
          if (request.mode === 'navigate') {
            return caches.match('/');
          }

          // Final fallback
          return new Response('Offline', { status: 503 });
        });
      })
  );
});