function guardarListaProductos(lista) {
    const prods = JSON.stringify(lista)
    window.localStorage.setItem('lista', prods)
}

function leerListaProductos() {
    let lista = []
    let prods = localStorage.getItem('lista')

    if (prods) {
        try {
            lista = JSON.parse(prods) // cadena y un array de js
        } catch (error) {
            lista = []
            guardarListaProductos(lista)
        }
    }
    return lista
}

export {
    guardarListaProductos, 
    leerListaProductos
}