# Javascript AWP

## Hosting + Dominio

<https://www.netlify.com/>

## Trabajando con JSON-Server

<https://www.npmjs.com/package/json-server>

1. Instalo JSON-SERVER como dependencia de desarrollo

```sh
npm i json-server -D
```

2. Creamos carpeta *data* y dentro el archivo *db.json*

```json
{
  "productos": [
    { "nombre": "Carne", "cantidad": 2, "precio": 42.34 },
    { "nombre": "Leche", "cantidad": 4, "precio": 22.34 },
    { "nombre": "Pan", "cantidad": 5, "precio": 12.34 },
    { "nombre": "Fideos", "cantidad": 3, "precio": 2.34 }
  ]
}
```

3. Configuramos el script

```json
"scripts": {
    "server": "json-server --watch data/db.json --port 8080",
}
```

4. Arrancar el servidor json-server

```sh
npm run server
```

## Service Worker
Archivo de js. Donde tiene que estar ubicado el archivo *sw.js* la raíz del proyecto. A la par del *index.html*. O sea en la raíz del sitio.

```js
window.navigator.serviceWorker.register('/sw.js')
```


> Podría colocarlo fuera de la carpeta raíz del proyecto (No es tan recomendable)

```js
window.navigator.serviceWorker.register('/src/sw.js',  { scope: '/' })
```

## Trabajando con el Manifest

<https://developer.mozilla.org/es/docs/Web/Progressive_web_apps/Manifest>
<https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest>
<https://web.dev/articles/add-manifest?hl=es>
<https://www.w3.org/TR/appmanifest/>

## Generador Online de archivo Manifest (manifest.json)
<https://progressier.com/pwa-manifest-generator>

## Iconos enmascarables

<https://web.dev/articles/maskable-icon?utm_source=devtools&utm_campaign=stable&hl=es>

## Workbox

<https://web.dev/learn/pwa/workbox?hl=es-419>

## Extensión y herramienta para revisar PWA

<https://marketplace.visualstudio.com/items?itemName=PWABuilder.pwa-studio>
<https://pwabuilder.com/>

## Para previsualizar el build localmente (Antes de subir a Netlify)

```sh
npm run build # crea la carpeta dist
```

## Ver el resultado en ejecución antes de verlo funcionando en Netlify

```sh
npm run preview # tiene que existir dist
```

## Librería (plugin) para copias estaticas con vite

<https://www.npmjs.com/package/vite-plugin-static-copy>

```sh
npm i vite-plugin-static-copy -D
```

## Un servidor backend con un REST API en la nube para hacer pruebas
Pueden tener de manera gratuita un servicio con 2 endpoint

<https://mockapi.io/>

## Auditar nuestra web

<https://webhint.io/>

```sh
npx hint <url-web>
npx hint https://maxi-javascript-pwa.netlify.app/
```

<https://webhint.io/docs/user-guide/>