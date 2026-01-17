self.addEventListener('install', (e) => self.skipWaiting());

self.addEventListener('notificationclick', (e) => {
    e.notification.close();
    e.waitUntil(clients.matchAll({type: 'window'}).then(clients => {
        if (clients.length > 0) return clients[0].focus();
        return clients.openWindow('/');
    }));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
