import Swal from "sweetalert2";

const handlerNotification = (objetoMensajes, callback) => {

    Swal.fire({
      title: objetoMensajes.textoPrincipal,
      text: objetoMensajes.descripcion,
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
          title: objetoMensajes.textoSecundario, 
          text: objetoMensajes.descripcionSecundaria, 
          icon: "success"
        });
      }
    });

}

export default handlerNotification // <--- modulo de js <--- ESModules