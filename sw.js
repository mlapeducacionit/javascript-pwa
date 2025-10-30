// Service Worker (Trabaja orientado a eventos)

self.addEventListener('install', e => {
    console.log('sw install...')
})

self.addEventListener('activate', e => {
    console.log('sw activate')
})

self.addEventListener('fetch', e => {
    console.log('sw fetch!')

    console.log(e.request) // Un objeto que representa una petición http
    /* console.log(e.request.url); */
    const { url, method } = e.request // desestructuring Object
    console.warn('url:', url);
    console.warn('method:', method);
    //let respuesta = fetch(e.request.url) // Hace el request a url
    let respuesta = fetch(e.request)


    console.warn('Es un css?', url.includes('.css') ? 'Si' : 'No')

    if (url.includes('style.css') ) {
        // let respuesta = null
        /* let respuesta = new Response(`
            @import "tailwindcss";

            .w-20 { width: 20%;}
            .w-30 { width: 30%;}
            .w-40 { width: 40%;}
            .w-50 { width: 50%;}
            .w-60 { width: 60%;}
            .w-70 { width: 70%;}
            .w-80 { width: 80%;}
            .w-90 { width: 90%;}
            .w-100 { width: 100%;}
        `, { headers: { 'content-type': 'text/css' }})
        e.respondWith(respuesta) */
    } else if (url.includes('super.jpg')) {

        console.warn('Me di cuenta que estás pidiendo el hero')
        //let respuesta = fetch('https://images.unsplash.com/photo-1515706886582-54c73c5eaf41?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')
        let respuesta = fetch('https://i.pinimg.com/1200x/e1/56/f0/e156f095fc65d1796696e136c7dc3bdc.jpg',  { mode: 'no-cors' } )
                            .catch(error => console.warn('ERROR EN FETCH IMAGEN', error))
        e.respondWith(respuesta)
    } else if (url.includes('main.js')) { 
        console.warn('Se encontré el archivo js')

       /*  let respuesta = fetch('https://stupendous-youtiao-8cd87f.netlify.app/src/main.js') */

       /*  e.respondWith(respuesta) */

    } else {
        e.respondWith(respuesta) // El SW se encarga de responder
    }


})