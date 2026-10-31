// This service worker provides offline functionality and caching
const CACHE_NAME = 'msm-painting-studio-v1';
const STATIC_CACHE = 'msm-static-v1';
const IMAGE_CACHE = 'msm-images-v1';
const API_CACHE = 'msm-api-v1';

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll([
        '/',
        '/offline',
        '/sitemap.xml',
        '/robots.txt',
      ]))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name.startsWith('msm-') && 
                     !['msm-painting-studio-v1', 'msm-static-v1', 'msm-images-v1', 'msm-api-v1'].includes(name);
            })
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve cached responses when offline
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Cache API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE)
        .then((cache) => {
          return cache.match(request)
            .then((response) => {
              if (response) {
                return response;
              }
              return fetch(request)
                .then((response) => {
                  // Only cache successful responses
                  if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                  }
                  // Clone the response
                  const responseToCache = response.clone();
                  cache.put(request, responseToCache);
                  return response;
                });
            })
        })
    );
    return;
  }

  // Cache images
  if (url.pathname.match(/\.(jpg|jpeg|png|webp|avif|gif|svg|ico)$/)) {
    event.respondWith(
      caches.open(IMAGE_CACHE)
        .then((cache) => {
          return cache.match(request)
            .then((response) => {
              if (response) {
                return response;
              }
              return fetch(request)
                .then((response) => {
                  if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                  }
                  const responseToCache = response.clone();
                  cache.put(request, responseToCache);
                  return response;
                });
            })
        })
    );
    return;
  }

  // Cache static assets
  event.respondWith(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.match(request)
          .then((response) => {
            if (response) {
              return response;
            }
            return fetch(request)
              .then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }
                const responseToCache = response.clone();
                cache.put(request, responseToCache);
                return response;
              });
          })
      })
  );
});

// Background sync for failed network requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  return new Promise<void>((resolve) => {
    // Try to sync any failed booking requests
    caches.open(API_CACHE)
      .then((cache) => {
        cache.keys()
          .then((requests) => {
            const failedRequests = requests.filter(req => 
              req.url.includes('/api/bookings') && 
              req.url.includes('?failed=true')
            );
            
            if (failedRequests.length > 0) {
              return Promise.all(
                failedRequests.map(request => {
                  return fetch(request.url, {
                    method: request.method,
                    headers: request.headers,
                    body: request.body,
                  }).then((response) => {
                    if (response.ok) {
                      return cache.delete(request);
                    }
                    return Promise.reject(response);
                  }).catch(() => {
                    // Request failed again, keep in cache
                    return Promise.resolve();
                  });
                })
              );
            }
            resolve();
          });
      });
  });
}