import Swal from 'sweetalert2';
import './style.css'
import handlerNotification from './utils/handler-notification';
import handlerHttp from './utils/handler-http';

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

function borrarProducto(indice) {
  console.log(indice);

  listadoProductos.splice(indice, 1)
  renderLista()

}

// ! --------------------------------------
// ! Render Lista
// ! --------------------------------------

function renderLista() {
  
    if (crearLista) {
        console.log('Se crea el ul')
        ul = document.createElement('ul')
        ul.id = 'lista-productos'
    }

    ul.innerHTML = ''

    listadoProductos.forEach( ( prod, indice ) => {

        ul.innerHTML += `
            <li class="flex items-center justify-between bg-white rouded-lg shadow p-3 mb-2 hover:bg-gray-50 transition">
                <!-- Icono de producto -->
                 <span class="flex items-center justify-center w-10 text-indigo-600">
                  <i class="material-icons text-2xl">shopping_cart</i>
                 </span>
                <!-- Nombre de producto -->
                 <span class="flex-1 text-gray-800 font-medium truncate w-32">
                  ${prod.nombre}
                 </span>
                <!-- Cantidad -->
                 <span class="w-24">
                   <label for="" class="block text-xs text-gray-500">Cantidad</label>
                   <input type="number" value="${prod.cantidad}" class="i-cantidad mt-1 w-full border border-gray-300 rounded-md text-sm p-1 text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                 </span>
                <!-- Precio -->
                <span class="w-24 ms-2">
                   <label for="" class="block text-xs text-gray-500">Precio</label>
                   <input type="number" value="${prod.precio}" class="i-precio mt-1 w-full border border-gray-300 rounded-md text-sm p-1 text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                 </span>
                <!-- Borrar producto -->
                 <span class="w-12 flex justify-center">
                  <button
                    data-indice="${indice}"
                    class="btn-borrar flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 shadow transition cursor-pointer ms-2"
                  >
                    <i class="material-icons">remove_shopping_cart</i>
                  </button>
                 </span>
              </li>
        `
    })
    
    document.getElementById('lista').appendChild(ul)

    crearLista = false

}

// ! --------------------------------------
// ! Configurar Listerner
// ! --------------------------------------

function configurarBotonIngresoProducto() {

  // Ingreso del producto nuevo
  document.getElementById('btn-entrada-producto').addEventListener('click', () => {
    //debugger // <---- punto de quiebre | breakpoint
    console.log('btn-entrada-producto')

    const input = document.getElementById('ingreso-producto')
    const producto = input.value
    //debugger
    console.log(producto);

    // Falsy | Truthy
    if (producto) {
      listadoProductos.push( { nombre: producto, cantidad: 1, precio: 0 } )
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

    /* if (confirm('¿Estás segudo que querés borrar toda tu super lista?')) {
      listadoProductos = []
      renderLista()
    } */

    /* Swal.fire({
      title: "¿Estás seguro que queres borrar toda la super lista?",
      text: "No vas a poder volver a atrás",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrala!"
    }).then((result) => {
      if (result.isConfirmed) {
        
        listadoProductos = []
        renderLista()

        Swal.fire({
          title: "Lista borrada!",
          text: "La lista quedo sin ningún producto",
          icon: "success"
        });
      }
    }); */
    
    const objetoMensajes = {
      textoPrincipal: "¿Estás seguro que queres borrar toda la super lista?",
      descripcion:  "No vas a poder volver a atrás",
      textoSecundario: "Lista borrada!",
      descripcionSecundaria: "La lista quedo sin ningún producto",
    }

    handlerNotification(objetoMensajes, () => {
      listadoProductos = []
      renderLista()
    })

  })

}

function configurarEventoLista() {
  console.log('configurarEventoLista')

  document.getElementById('lista-productos').addEventListener('click', (e) => {
    //console.dir(e.target.parentElement) // El botón.
    //console.log( e.target.parentElement.classList.contains('btn-borrar') )

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
      /* console.log(e.target.parentElement.parentElement) */
      //console.dir(e.target.parentElement.parentElement.children[4].children[0]) // button
      //const indice = e.target.parentElement.parentElement.children[4].children[0].dataset.indice // indice
      // const listItem = e.target.parentElement.parentElement // li
      const button = e.target.parentElement.parentElement.querySelector('button')
      const indice = button.dataset.indice
      const precio = e.target.value
      // console.log(indice);
      listadoProductos[indice].precio = Number(precio) /* casteo */
      console.log(listadoProductos)
  
    }

    if ( e.target.classList.contains('i-cantidad') ) {
      console.log('Modificar el input cantidad')
      const button = e.target.parentElement.parentElement.querySelector('button')
      const indice = button.dataset.indice
      const cantidad = e.target.value
      // console.log(indice);
     listadoProductos[indice].cantidad = Number(cantidad)
     console.log(listadoProductos)

    }

  })


}

async function peticionProductoBackend() {

  try {
    // Variables de entorno.
    //console.log(import.meta.env.VITE_BACKEND_LOCAL)
    //console.log(import.meta.env.VITE_BACKEND_REMOTO)
    const urlLocal = import.meta.env.VITE_BACKEND_LOCAL
    const urlRemota = import.meta.env.VITE_BACKEND_REMOTO

    const productos = await handlerHttp(urlRemota)
    
    console.log(productos)
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
    renderLista()
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

