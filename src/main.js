import Swal from 'sweetalert2';
import './style.css'
import handlerNotification from './utils/handler-notification';
import handlerHttp from './utils/handler-http';
import { guardarListaProductos } from './utils/handler-local-storage';

//console.log(import.meta.env)
// ! ----------------------------------------
// ! Constantes
// ! ----------------------------------------
let apiUrl =  controlarAmbiente()
//console.log(apiUrl)

function controlarAmbiente() {
  let apiUrl = ''
  if ( import.meta.env.DEV ) {
    //console.log('Estoy en desarrollo')
    //console.log(import.meta.env.VITE_BACKEND_LOCAL)
    apiUrl = import.meta.env.VITE_BACKEND_LOCAL
  } else {
    //console.log('Estoy en producción')
    //console.log(import.meta.env.VITE_BACKEND_REMOTO)
    apiUrl = import.meta.env.VITE_BACKEND_REMOTO
  }
  return apiUrl
}



// ! ----------------------------------------
// ! Menú
// ! ----------------------------------------

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const toggleButton = document.getElementById('toggle-sidebar');
const closeButton = document.getElementById('close-sidebar');

function openSidebar() {
  sidebar.classList.remove('-translate-x-full');
  overlay.classList.remove('hidden');
}

function closeSidebar() {
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('hidden');
}

toggleButton.addEventListener('click', openSidebar);
closeButton.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);


// ! ----------------------------------------
// ! VARIABLES GLOBALES
// ! ----------------------------------------

let listadoProductos = [
   /*  { nombre: 'Carne', cantidad: 2, precio: 42.34 },
    { nombre: 'Leche', cantidad: 4, precio: 22.34 },
    { nombre: 'Pan', cantidad: 5, precio: 12.34 },
    { nombre: 'Fideos', cantidad: 3, precio: 2.34 }, */
]
  
let crearLista = true // Creo esta bandera para evitar que se vuelva a renderizar todo el array
let ul

// ! ----------------------------------------------------
// ! Borrar Producto, Cambiar Cantidad y Cambiar Precio
// ! ----------------------------------------------------

async function borrarProducto(id) {
  console.log(id);

  try {
    // ! 1. Borrado en el backend
    const options = {
      method: 'DELETE'
    }
    const urlEliminacion = apiUrl + id
    await handlerHttp(urlEliminacion, options)

    // ! 2. Borrado en el frontend
    const indice = listadoProductos.findIndex(prod => prod.id === id)
    listadoProductos.splice(indice, 1)
    renderLista()
  } catch (error) {
    console.error(error)
  }

}

// ! --------------------------------------
// ! Render Lista
// ! --------------------------------------

async function renderLista() {

    /* Obtener la plantilla -> (petición fetch) */
    const urlPlantilla = 'templates/plantilla-lista.hbs'
    const res = await fetch(urlPlantilla)
    if ( !res.ok ) {
      throw new Error('No se pudo acceder a la plantilla')
    }
    const plantilla = await res.text()
    // Ya tengo la plantilla
    //console.log(plantilla)
    const templateHandlebars = Handlebars.compile(plantilla)
    // console.log(templateHandlebars)

    const html = templateHandlebars({listadoProductos}) // Le tengo que pasar objetos
    //console.log(html)

     document.getElementById('lista').innerHTML = html

}

// ! --------------------------------------
// ! Configurar Listerner
// ! --------------------------------------

function configurarBotonIngresoProducto() {

  // Ingreso del producto nuevo
  document.getElementById('btn-entrada-producto').addEventListener('click', async () => {
    //debugger // <---- punto de quiebre | breakpoint
    console.log('btn-entrada-producto')

    const input = document.getElementById('ingreso-producto')
    const producto = input.value
    //debugger
    console.log(producto);

    // Falsy | Truthy
    if (producto) {
      const productoNuevo =  { nombre: producto, cantidad: 1, precio: 0 }
      // ! 1. Ingreso en el backend
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoNuevo)
      }
      const productoCreado = await handlerHttp(apiUrl, options)

      // ! 2. Ingreso en el frontend
      listadoProductos.push( productoCreado )
      renderLista()
      input.value = ''
    } else {
      Swal.fire('Debe ingresar un producto válido!')
    }
  })

}

function configurarBotonBorradoProductos() {

  document.getElementById('btn-borrar-productos').addEventListener('click', () => {
    console.log('btn-borrar-productos')
    
    const objetoMensajes = {
      textoPrincipal: "¿Estás seguro que queres borrar toda la super lista?",
      descripcion:  "No vas a poder volver a atrás",
      textoSecundario: "Lista borrada!",
      descripcionSecundaria: "La lista quedo sin ningún producto",
    }

    handlerNotification(objetoMensajes, () => {

      try {
        // ! 1. Borrado en el backend
        listadoProductos.forEach( async (producto) => {
          const options = {
            method: 'DELETE'
          }
          const urlEliminacion = apiUrl + producto.id
          await handlerHttp(urlEliminacion, options)

        })

        // ! 2. Borrado en el frontend
        listadoProductos = []
        renderLista()
      } catch (error) {
        console.error(error)
      }

    })

  })

}

function configurarEventoLista() {
  console.log('configurarEventoLista')

  document.getElementById('lista-productos').addEventListener('click', (e) => {


    const objetoMensajes = {
      textoPrincipal: "¿Estás seguro que queres borrar el producto?",
      descripcion:  "No vas a poder volver a atrás",
      textoSecundario: "Producto borrado!",
      descripcionSecundaria: "El producto se borró correctamente",
    }
    
    if ( e.target.parentElement.classList.contains('btn-borrar') ) {
      handlerNotification(objetoMensajes, () => {
        console.log('Tengo el botón')

        const indice = e.target.parentElement.dataset.indice
        console.log(indice)

        borrarProducto(indice)

      })
    }     

  })

}

function configurarEventoListaParaCantidad() {

  document.getElementById('lista-productos').addEventListener('change', e => {
    console.log(e)

    if ( e.target.classList.contains('i-precio') ) {
      console.log('Modificar el input precio')
      const button = e.target.parentElement.parentElement.querySelector('button')
      const id = button.dataset.indice
      const indice = listadoProductos.findIndex( prod => prod.id === id )
      const precio = e.target.value
      // ! 1. Actualizo en el backend
      const urlEdicion = apiUrl + id
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ precio: Number(precio) })
      }
      // Actualizo en el backend
      handlerHttp(urlEdicion, options)
      // ! 1. Actualizo en el frontend
      // console.log(indice);
      listadoProductos[indice].precio = Number(precio) /* casteo */
      console.log(listadoProductos)
  
    }

    if ( e.target.classList.contains('i-cantidad') ) {
      console.log('Modificar el input cantidad')
      const button = e.target.parentElement.parentElement.querySelector('button')
      const id = button.dataset.indice
      const indice = listadoProductos.findIndex( prod => prod.id === id )
      const cantidad = e.target.value
      // ! 1. Actualizo en el backend
      const urlEdicion = apiUrl + id
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cantidad: Number(cantidad) })
      }
      // Actualizo en el backend
      handlerHttp(urlEdicion, options)
      // ! 1. Actualizo en el frontend

      // console.log(indice);
     listadoProductos[indice].cantidad = Number(cantidad)
     console.log(listadoProductos)

    }

  })


}

async function peticionProductoBackend() {

  try {


    const productos = await handlerHttp(apiUrl)
    console.log(productos)
    // Se supone que los productos están
    // Guardar la lista de productos actual en el localStorage (persisto en el navegador)
    guardarListaProductos(productos)
    //console.log(productos)
    listadoProductos = productos

  } catch (error) {
    throw error
  }

}

// ! -------------------------------------
// ! Registro de Service Worker
// ! -------------------------------------

async function registrarServiceWorker() {
  if ('serviceWorker' in navigator) {

    try {
      const registro = await window.navigator.serviceWorker.register('/sw.js')
      console.log('El Service Worker se registro correctamnte', registro)

      //initialiseUI(registro)

      // Pedimos permiso para que el sistema operativo nos envie notificaciones
      Notification.requestPermission(async result => {
        if ( result === 'granted' ) {
          const registration = await navigator.serviceWorker.ready
          //registration.showNotification('Gracias por permitir las notificaciones!')
          console.log(registration)
        } else {
          console.error('El usuario no acepto recibir notificaciones')
        }
      })
      
    } catch (error) {
      console.error('Erorr al registrar el Service Worker', error)
    }

  } else {
    console.error('Service Worker no está disponible en navigator');
  }
}

async function start() {
    
  try {
    await registrarServiceWorker()
    await peticionProductoBackend()
    await renderLista()
    configurarBotonIngresoProducto()
    configurarBotonBorradoProductos()
    configurarEventoLista()
    configurarEventoListaParaCantidad()
  } catch (error) {
    console.error(error)
  }
}

// ! Me aseguro que todo el HTML este disponible para trabajar con JS
document.addEventListener('DOMContentLoaded', start)

