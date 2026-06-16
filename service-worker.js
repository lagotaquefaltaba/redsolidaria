// Configuración para carga instantánea
const CACHE_NAME = 'radio-cache-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Estrategia: "Network first" con fallback rápido a caché
    // Esto hace que no se quede esperando 10 segundos
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});