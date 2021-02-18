importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName', {
    maxRetentionTime: 5 // Retry for max of 24 Hours
});

workbox.routing.registerRoute(
    new RegExp('^public/*'),
    workbox.strategies.networkOnly({
        plugins: [bgSyncPlugin]
    }),
    'GET'
)
