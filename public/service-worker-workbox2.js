importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

const {
    registerRoute
} = workbox.routing;
const {
    NetworkFirst,
    StaleWhileRevalidate,
    CacheFirst,
} = workbox.strategies;

// Used for filtering matches based on status code, header, or both
const {
    CacheableResponsePlugin
} = workbox.cacheableResponse;
// Used to limit entries in cache, remove entries after a certain period of time
const {
    ExpirationPlugin
} = workbox.expiration;

const {
    precacheAndRoute,
    matchPrecache
} = workbox.precaching;
const {
    Router,
    setCatchHandler
} = workbox.routing;

// Use with precache injection
// precacheAndRoute(self.__WB_MANIFEST);

// Cache page navigations (html) with a Network First strategy
// registerRoute(
//     // Check to see if the request is a navigation to a new page
//     ({
//         request
//     }) => request.mode === 'navigate',
//     // Use a Network First caching strategy
//     new NetworkFirst({
//         // Put all cached files in a cache named 'pages'
//         cacheName: 'pages',
//         plugins: [
//             // Ensure that only requests that result in a 200 status are cached
//             new CacheableResponsePlugin({
//                 statuses: [200],
//             }),
//         ],
//     }),
// );

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
    // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
    ({
        request
    }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
    // Use a Stale While Revalidate caching strategy
    new StaleWhileRevalidate({
        // Put all cached files in a cache named 'assets'
        cacheName: 'assets',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

// const assetRoute = new workbox.routing.RegExpRoute({
//     regExp: new RegExp('^public/*'),
//     handler: new workbox.strategies.CacheFirst()
// })

// Cache images with a Cache First strategy
registerRoute(
    // Check to see if the request's destination is style for an image
    //   ({ request }) => request.destination === 'image',
    //[new RegExp('/public/'), new RegExp('/public/config/'), new RegExp('/public/generated_html_files/'), new RegExp('/public/images/'), new RegExp('/public/js/'), new RegExp('/public/css/')],
    new RegExp('/public/'),
    // Use a Cache First caching strategy
    new CacheFirst({
        // Put all cached files in a cache named 'images'
        // cacheName: 'images',
        cacheName: 'eBenchmark',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new CacheableResponsePlugin({
                statuses: [200],
            }),
            // Don't cache more than 50 items, and expire them after 30 days
            new ExpirationPlugin({
                //maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
            }),
        ],
    }),
);



// const router = new Router();
// self.addEventListener('fetch', (event) => {
//     const responsePromise = router.handleRequest(event);
//     if (responsePromise) {
//         // Router found a route to handle the request
//         event.respondWith(responsePromise);
//     } else {
//         // No route found to handle the request
//     }
// });
