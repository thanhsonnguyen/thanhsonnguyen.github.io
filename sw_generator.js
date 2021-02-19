const workbox = require('workbox-build')

workbox.generateSW({
    cacheId:"eBenchmark",
    globDirectory: "./public",
    globPatterns:[
        "**/*.{css,js}"
    ],
    swDest: "./public/sw.js",
    runtimeCaching:[{
        urlPattern:/\.(?:html|json)$/,
        handler:"StaleWhileRevalidate",
        options:{
            cacheName:"markup",
            expiration:{
                maxAgeSeconds: 3600
            }
        }
    }]
})