  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

  if (workbox) {
    console.log(`Workbox berhasil dimuat`);

    workbox.precaching.precacheAndRoute([{
        url: '/',
        revision: '2'
      },
      {
        url: '/manifest.json',
        revision: '2'
      },
      {
        url: '/nav.html',
        revision: '2'
      },
      {
        url: '/index.html',
        revision: '2'
      },
      {
        url: '/match.html',
        revision: '2'
      },
      {
        url: '/pages/standings.html',
        revision: '2'
      },
      {
        url: '/pages/matches.html',
        revision: '2'
      },
      {
        url: '/pages/saved.html',
        revision: '2'
      },
      {
        url: '/pages/about.html',
        revision: '2'
      },
      {
        url: '/css/materialize.min.css',
        revision: '2'
      },
      {
        url: '/js/materialize.min.js',
        revision: '2'
      },
      {
        url: '/js/materialize.js',
        revision: '2'
      },
      {
        url: '/assets/images/reza.jpg',
        revision: '2'
      },
      {
        url: '/assets/images/icons/icon-72x72.png',
        revision: '2'
      },
      {
        url: '/assets/images/icons/icon-96x96.png',
        revision: '2'
      },
      {
        url: '/assets/images/icons/icon-128x128.png',
        revision: '2'
      },
      {
        url: '/assets/images/icons/icon-144x144.png',
        revision: '2'
      },
      {
        url: '/assets/images/icons/icon-152x152.png',
        revision: '2'
      },
      {
        url: '/assets/images/icons/icon-192x192.png',
        revision: '2'
      },
      {
        url: '/assets/images/icons/icon-384x384.png',
        revision: '2'
      },
      {
        url: '/assets/images/icons/icon-512x512.png',
        revision: '2'
      },
      {
        url: '/push.js',
        revision: '2'
      },
      {
        url: '/js/nav.js',
        revision: '2'
      },
      {
        url: '/js/api.js',
        revision: '3'
      },
      {
        url: '/js/idb.js',
        revision: '2'
      },
      {
        url: '/js/db.js',
        revision: '2'
      },
    ]);

    workbox.routing.registerRoute(
      new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
      })
    );

    workbox.routing.registerRoute(
      new RegExp('https://api.football-data.org/'),
      workbox.strategies.staleWhileRevalidate()
    );

    workbox.routing.registerRoute(
      new RegExp(".(png|svg|jpg|jpeg)$"),
      workbox.strategies.cacheFirst({
        cacheName: "cache-image",
        plugins: [
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 7,
            maxEntries: 50,
            purgeOnQuotaError: true
          })
        ]
      })
    );

  } else {
    console.log(`Workbox gagal dimuat`);
  }

  self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    let options = {
      body: body,
      icon: 'img/notification.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });