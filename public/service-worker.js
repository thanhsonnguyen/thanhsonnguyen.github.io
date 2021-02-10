const cacheStore = "eBenchmark-v1";

var assets = [
  "/",
  "./index.html",
  // "/public/css/style.css",
  "./js/app.js",
  "./images/",
  "./config/"
];

assets = [...performance.getEntriesByType('resource').map((r) => r.name)]

/* self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(cacheStore).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
}); */


self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_URLS') {
      event.waitUntil(
          caches.open(cacheStore)
              .then( (cache) => {
                  return cache.addAll(event.data.payload);
              })
      );
  }
});

// importScripts('https://unpkg.com/workbox-sw@0.0.2/build/importScripts/workbox-sw.dev.v0.0.2.js');
// importScripts('https://unpkg.com/workbox-runtime-caching@1.3.0/build/importScripts/workbox-runtime-caching.prod.v1.3.0.js');
// importScripts('https://unpkg.com/workbox-routing@1.3.0/build/importScripts/workbox-routing.prod.v1.3.0.js');
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
// const assetRoute = new workbox.routing.RegExpRoute({
//     regExp: new RegExp('/.*'),
//     handler: new workbox.runtimeCaching.CacheFirst()
// });

// const router = new workbox.routing.Router();
// //router.addFetchListener();
// router.registerRoutes({routes: [assetRoute]});
// router.setDefaultHandler({
//     handler: new workbox.runtimeCaching.CacheFirst()
// });