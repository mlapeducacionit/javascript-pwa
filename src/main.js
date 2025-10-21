import Swal from 'sweetalert2';
import './style.css'
import handlerNotification from './utils/handler-notification';

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
    { nombre: 'Carne', cantidad: 2, precio: 42.34 },
    { nombre: 'Leche', cantidad: 4, precio: 22.34 },
    { nombre: 'Pan', cantidad: 5, precio: 12.34 },
    { nombre: 'Fideos', cantidad: 3, precio: 2.34 },
  ]
  
let crearLista = true // Creo esta bandera para evitar que se vuelva a renderizar todo el array
let ul

function renderLista() {
  
    if (crearLista) {
        console.log('Se crea el ul')
        ul = document.createElement('ul')
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
                   <input type="text" value="${prod.cantidad}" class="mt-1 w-full border border-gray-300 rounded-md text-sm p-1 text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                 </span>
                <!-- Precio -->
                <span class="w-24">
                   <label for="" class="block text-xs text-gray-500">Precio</label>
                   <input type="text" value="${prod.precio}" class="mt-1 w-full border border-gray-300 rounded-md text-sm p-1 text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                 </span>
                <!-- Borrar producto -->
                 <span class="w-12 flex justify-center">
                  <button
                    class="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 shadow transition cursor-pointer ms-2"
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
    
    handlerNotification(() => {
      listadoProductos = []
      renderLista()
    })

  })

}



function start() {
    renderLista()
    configurarBotonIngresoProducto()
    configurarBotonBorradoProductos()
}

// ! Me aseguro que todo el HTML este disponible para trabajar con JS
document.addEventListener('DOMContentLoaded', start)

