const CACHE_NAME = 'boss-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json'
    // Add your CSS and JS file paths here when you externalize them later
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache for BOSS assets');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
