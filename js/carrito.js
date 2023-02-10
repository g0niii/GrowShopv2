let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)
const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let botonesDeEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonDeVaciar = document.querySelector("#carrito-acciones-vaciar")
const sumaTotal = document.querySelector("#total")
const btnComprar = document.querySelector(".carrito-acciones-comprar")

function cargarProductosCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")
        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div")
            div.classList.add("carrito-producto")
            div.innerHTML = `
        <img class="carrito-producto-img" src="${producto.imagen}" alt="${producto.productName}">
    <div class="carrito-producto-titulo">
        <small>Nombre</small>
        <h3 class="center">${producto.productName}</h3>
    </div>
    <div class="carrito-producto-cantidad">
        <small>Cantidad</small>
        <p class="center">${producto.cantidad}</p>
    </div>
    <div class="carrito-producto-precio">
        <small>Precio</small>
        <p class="center">${producto.precio}</p>
    </div>
    <div class="carrito-producto-subtotal">
        <small>Subtotal</small>
        <p class="center">${producto.precio * producto.cantidad}</p>
    </div> 
        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>`
            contenedorCarritoProductos.append(div)
        })
    } else {
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    }
    actualizarBotonesEliminar()
    elTotal()
}
cargarProductosCarrito()


function actualizarBotonesEliminar() {
    botonesDeEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesDeEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
    productosEnCarrito.splice(index, 1)
    cargarProductosCarrito()
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

}

botonDeVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Estas seguro que desea vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Sus productos han sido eliminados del carrito!',
            '',
            'success'
          )
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
        cargarProductosCarrito();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '',
            'Cancelado',
            'error'
          )
        }
      })
}


function elTotal() {
    let sumaSubtotal = 0
    let consumoTotal = 0
    productosEnCarrito.forEach(producto => {
    sumaSubtotal = producto.precio * producto.cantidad
    consumoTotal = sumaSubtotal + consumoTotal
    })
    total.innerText = `$${consumoTotal}`
    // const contenedorTotal = productosEnCarrito.reduce((acumulador, productos) => (productos.precio * productos.cantidad), 0)
    // total.innerText = `$${contenedorTotal}`
}


btnComprar.addEventListener("click", comprarCarrito)

function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")
    
}













































