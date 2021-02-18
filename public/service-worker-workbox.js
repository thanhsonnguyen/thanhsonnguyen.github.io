// importScripts('https://unpkg.com/workbox-sw@0.0.2/build/importScripts/workbox-sw.dev.v0.0.2.js');
// importScripts('https://unpkg.com/workbox-runtime-caching@1.3.0/build/importScripts/workbox-runtime-caching.prod.v1.3.0.js');
// importScripts('https://unpkg.com/workbox-routing@1.3.0/build/importScripts/workbox-routing.prod.v1.3.0.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js')

const {registerRoute} = workbox.routing;
const {CacheFirst} = workbox.strategies;
const {CacheableResponse} = workbox.cacheableResponse;

const assetRoute = new workbox.routing.RegExpRoute({
    regExp: new RegExp('^public/*'),
    handler: new workbox.strategies.CacheFirst()
})

const router = new workbox.routing.Router();
const bgSyncPlugin = new workbox.backgroundSync('queue', {
    maxRetentionTime: 5 // Retry for max of 24 Hours
})
const cacheResPlugin = new workbox.cacheableResponse({
    statuses: [0, 200]
})
//router.addFetchListener();
router.registerRoutes({
    routes: [assetRoute]
})
// router.setDefaultHandler({
//     handler: new workbox.runtimeCaching.CacheFirst({
//         cacheName: 'eBenchmark',
//         plugins: [bgSyncPlugin]
//     })
// });
router.setDefaultHandler({
    handler: new workbox.strategies.CacheFirst({
        plugins: [cacheResPlugin, bgSyncPlugin]
    })
})