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

## Notificaciones Push

<https://pusher.com/tutorials/push-notifications-node-service-workers/#set-up-the-client>

## Servidor de Web Push

<https://github.com/web-push-libs/web-push>

## Es instalar localmente el WEB PUSH (App)

```sh
npm i web-push -g
```

### Generar VAPID KEYS

```sh
web-push generate-vapid-keys --json
```

```json
{"publicKey":"BKAHBa3mYDN166DrS8nJaTs57nh5fHUwmSlC21JsL-lDztdS45UipP2ulV3j79sRGfprh2JGJbmT6mt0zQgXAPQ","privateKey":"gV7VJ16DD4dP1btsm8WT3vo1UwVn76tP_WA6QZrt9gk"}
```

### Setear clave pública vapid-keys:publicKey en PWA

### Suscribirme en la PWA

```json
{"endpoint":"https://fcm.googleapis.com/fcm/send/fyc3febDPOk:APA91bFOpDicCYIm8iegTFQfZTrSIMen5GMW-gvDPW9AEqHORK-GgELFYgmn_TiZALoE2LmapiAid_Bh4tH5Rxya5C58xpH8ifZpx6Yn4b5Id8kq-mMzfqngcoUfQ827-E0ETod_qfKM","expirationTime":null,"keys":{"p256dh":"BEBkLejoNXoMENdLSLtQBMXlXqkA2BJZ99R8SCcnolux4ttpQhzK4HgY2gFG3XBEMcai4LUjEaF2r32MSucWHgs","auth":"iwe2tNFkeZvKUgI_6_3BFg"}}
```

### Enviar la notificación push

```sh
web-push send-notification --endpoint="https://fcm.googleapis.com/fcm/send/fyc3febDPOk:APA91bFOpDicCYIm8iegTFQfZTrSIMen5GMW-gvDPW9AEqHORK-GgELFYgmn_TiZALoE2LmapiAid_Bh4tH5Rxya5C58xpH8ifZpx6Yn4b5Id8kq-mMzfqngcoUfQ827-E0ETod_qfKM" --key="BEBkLejoNXoMENdLSLtQBMXlXqkA2BJZ99R8SCcnolux4ttpQhzK4HgY2gFG3XBEMcai4LUjEaF2r32MSucWHgs" --auth="iwe2tNFkeZvKUgI_6_3BFg" --payload="Hola!!! mensaje desde webpush" --ttl=0 --vapid-subject="mailto: mlapeducacionit@gmail.com" --vapid-pubkey="BIHxACL1dVoecKSiK88CUzVprI5xj8asoTpwxtOcMPDtHWo2Tz9gHd-9EXiNWo6uOOAf7kpPWSdzQOubCrtAcKw" --vapid-pvtkey="aLJ_770w0IDXihZtOsBbytnht0liugeWWUGVEaHLCRE"
``` 
