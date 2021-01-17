importScripts("precache-manifest.a33464cca502c658a3b006506b80031d.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

const cache = {
  images() {
    workbox.routing.registerRoute(
      new RegExp('/images/'),
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 20,
          }),
        ],
      }),
    );
  },

  routing() {
    workbox.routing.registerRoute(
      /^https:\/\/restaurant-api\.dicoding\.dev/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'restaurantApi-data',
      }),
    );
  },

  googleFontStylesheets() {
    workbox.routing.registerRoute(
      /^https:\/\/fonts\.googleapis\.com/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
      }),
    );
  },

  googleFontWebfonts() {
    workbox.routing.registerRoute(
      /^https:\/\/fonts\.gstatic\.com/,
      workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
          }),
        ],
      }),
    );
  },

  precaching() {
    workbox.precaching.precacheAndRoute(
      self.__precacheManifest, {
        ignoreUrlParametersMatching: [/.*/],
      },
    );
  },
};

if (workbox) {
  cache.images();
  cache.routing();
  cache.googleFontStylesheets();
  cache.googleFontWebfonts();
  cache.precaching();
} else {
  console.log('Cache Failed');
}

// https://profile.line-scdn.net/0ho0dVL1DyMB9ZLxmbNP1PSGVqPnIuATZXIUEtfHkqZiohSH8eMh57e3t7OX0jGCJMYhoteil4Oy0g

