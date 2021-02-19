// importScripts('https://unpkg.com/workbox-sw@0.0.2/build/importScripts/workbox-sw.dev.v0.0.2.js');
// importScripts('https://unpkg.com/workbox-runtime-caching@1.3.0/build/importScripts/workbox-runtime-caching.prod.v1.3.0.js');
// importScripts('https://unpkg.com/workbox-routing@1.3.0/build/importScripts/workbox-routing.prod.v1.3.0.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js')



const assetRoute = new workbox.routing.RegExpRoute({
    regExp: new RegExp('^public/'),
    handler: new workbox.strategies.CacheFirst()
})

const router = new workbox.routing.Router();

//router.addFetchListener();
router.registerRoute({
    routes: [assetRoute],
    handler: new workbox.strategies.CacheFirst({
        cacheName: 'eBenchmark',
        plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200]
          }),
          new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            //maxEntries: 30,
            purgeOnQuotaError: true // Automatically cleanup if quota is exceeded.
          })
        ]
      })

})

// router.setDefaultHandler({
//     handler: new workbox.strategies.CacheFirst()
// })