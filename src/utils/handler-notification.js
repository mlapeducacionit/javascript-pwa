import Swal from "sweetalert2";

const handlerNotification = (callback) => {

    Swal.fire({
      title: "¿Estás seguro que queres borrar toda la super lista?",
      text: "No vas a poder volver a atrás",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrala!"
    }).then((result) => {
      if (result.isConfirmed) {
        
        // ! No saben que son estás 2 variables.
        // listadoProductos = []
        // renderLista()
        callback() // () => { listadoProductos = []; renderLista() }

        Swal.fire({
          title: "Lista borrada!",
          text: "La lista quedo sin ningún producto",
          icon: "success"
        });
      }
    });

}

export default handlerNotification // <--- modulo de js <--- ESModules