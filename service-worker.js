
const CACHE_NAME = 'cracktest-v2'; // Updated cache version
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Ignore non-GET requests and browser-sync requests, letting the browser handle them.
  if (event.request.method !== 'GET' || event.request.url.includes('browser-sync')) {
    return;
  }

  const url = new URL(event.request.url);

  // Do not cache Gemini API calls, always go to network.
  if (url.hostname.includes('generativelanguage.googleapis.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Stale-while-revalidate strategy for all other GET requests.
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // If we get a valid response, update the cache.
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(err => {
          // Network failed, and we don't have a cached response.
          console.error('Fetch failed; returning offline page instead.', err);
          // Optionally, return a fallback offline page: return caches.match('/offline.html');
        });

        // Return cached response if available, otherwise wait for network.
        return response || fetchPromise;
      });
    })
  );
});


self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});