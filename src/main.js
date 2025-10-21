import './style.css'

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

const listadoProductos = [
    { nombre: 'Carne', cantidad: 2, precio: 42.34 },
    { nombre: 'Leche', cantidad: 4, precio: 22.34 },
    { nombre: 'Pan', cantidad: 5, precio: 12.34 },
    { nombre: 'Fideos', cantidad: 3, precio: 2.34 },
]

function renderLista() {

    let ul = document.createElement('ul')

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

}

function start() {
    renderLista()
}

// ! Me aseguro que todo el HTML este disponible para trabajar con JS
document.addEventListener('DOMContentLoaded', start)

