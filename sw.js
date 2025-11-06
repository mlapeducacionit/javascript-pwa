const CACHE_STATIC_NAME = 'static-v03'
const CACHE_INMUTABLE_NAME = 'inmutable-v03'
const CACHE_DYNAMIC_NAME = 'dynamic-v03'

const CON_CACHE = false

// Service Worker (Trabaja orientado a eventos)

self.addEventListener('install', e => {
    console.log('sw install...')

    const cacheStatic = caches.open(CACHE_STATIC_NAME).then(cache => {
        console.log(cache)

        // Guardo todos los recursos estáticos (sin número de versión) para que nuestra web
        // app pueda funcionar offline
        // --> esos recursos se llama de APP SHELL
        return cache.addAll([
            '/index.html',
            '/src/style.css',
            '/images/super.jpg',
            '/src/utils/handler-http.js',
            '/src/utils/handler-notification.js',
        ])

    })

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME).then( cache => {
        console.log(cache)

        // Guardo todos los archivos estaticos (tienen número de versión)
        // ---> Esos recursos también se llama de APP SHELL
        return cache.addAll([
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js'
        ])

    })

    // Con una función waitUntil espero a que todas las operaciones asincronicas culimen

    e.waitUntil( Promise.all([cacheStatic, cacheInmutable]))

})

self.addEventListener('activate', e => {
    console.log('sw activate')

    const cachesWhiteList = [
        CACHE_DYNAMIC_NAME,
        CACHE_INMUTABLE_NAME,
        CACHE_STATIC_NAME
    ]

    // Borrar todas las caches que no estén en la lista actual (versión actual)

    e.waitUntil(
        caches.keys().then(keys => {
            console.log(keys)
            return Promise.all(
                keys.map( key => {
                    if (!cachesWhiteList.includes(key)) {
                        return caches.delete(key)
                    }
                })
            )
        })
    )

})

self.addEventListener('fetch', e => {
    console.log('sw fetch!')

    let { url, method } =  e.request

    if ( method === 'GET' && !url.includes('/productos') ) {

        const respuesta = caches.match(e.request).then( res => {

        if ( res ) {
            console.log('EXISTE: el recurso existe en la cache', url)
            return res
        }
        console.warn('NO EXISTE: el recurso no existe en el cache', url)

        return fetch(e.request).then( nuevaRespuesta => {
            caches.open(CACHE_DYNAMIC_NAME).then( cache => {
                cache.put(e.request, nuevaRespuesta)
            })
                return nuevaRespuesta.clone()
            })    
        })
        
        e.respondWith(respuesta)

    } else {
        console.warn('BYPASS', method, url)
    }

    
})