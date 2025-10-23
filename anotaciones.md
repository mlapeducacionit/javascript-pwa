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


