
function Producto(id, productName, imagen, categoria, precio) {
    this.id = id;
    this.productName = productName;
    this.imagen = imagen;
    this.categoria = categoria;
    this.precio = precio;
    
}

const productos = [
    new Producto("sema-01", "Purple Punch", "./img/01.jpg", {nombre:"Semillas Feminizadas", id:"semillasFem"}, 1500),
    new Producto("sema-02", "Bubble Gum", "./img/02.jpg", {nombre:"Semillas Feminizadas", id:"semillasFem"}, 1500),
    new Producto("sema-03", "Critical Fast", "./img/03.jpg", {nombre:"Semillas Feminizadas", id:"semillasFem"}, 1500),
    new Producto("sema-04", "Wifi Tangie", "./img/04.jpg", {nombre:"Semillas Feminizadas", id:"semillasFem"}, 1500),
    new Producto("sema-05", "Power Skunk", "./img/05.jpg", {nombre:"Semillas Automaticas", id:"semillasAuto"}, 1500),
    new Producto("sema-06", "Super Skunk", "./img/06.jpg", {nombre:"Semillas Automaticas", id:"semillasAuto"}, 1500),
    new Producto("sema-07", "CBD CONNECTAR", "./img/07.jpg", {nombre:"Semillas Automaticas", id:"semillasAuto"}, 1500),
    new Producto("sema-08", "Girl Scout Cookies", "./img/08.jpg", {nombre:"Semillas Automaticas", id:"semillasAuto"}, 1500),
    new Producto("pipa-09", "Pipa de vidrio", "./img/09.jpg", {nombre:"Pipas", id:"pipas"}, 1500),
    new Producto("sema-10", "Pipa de vidrio 2", "./img/10.jpg", {nombre:"Pipas", id:"pipas"}, 1500),
    new Producto("pipa-11", "Pipa de vidrio 3", "./img/11.jpg", {nombre:"Pipas", id:"pipas"}, 1500),
    new Producto("pipa-12", "Pipa de Hueso", "./img/12.jpg", {nombre:"Pipas", id:"pipas"}, 1500)

];


const contenedorProductos = document.querySelector("#contenedor-productos")
const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloPrincipal =document.querySelector("#titulo-principal")
let botonesAgregar =document.querySelectorAll(".producto-agregar")
const numerito = document.querySelector("#numerito")

function cargarProductos(productosElegidos) {
    
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.productName}" >
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.productName}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
        `
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar()
}


cargarProductos(productos)

botonesCategorias.forEach(boton => {
	boton.addEventListener("click", (e) => {

    botonesCategorias.forEach (boton =>  boton.classList.remove("active"))
	e.currentTarget.classList.add("active")

    if (e.currentTarget.id != "todos") {
    const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
    tituloPrincipal.innerText = productoCategoria.categoria.nombre
    const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
    cargarProductos(productosBoton)
    } 
    else {
        tituloPrincipal.innerText = "Todos los productos" ;
        (cargarProductos(productos))
    }
})
})

function actualizarBotonesAgregar() {
    botonesAgregar =document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarloAlCarrito)
    })
}

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

let productosEnCarrito;
if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNum()
}else{
    productosEnCarrito= []
}


function agregarloAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton)
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex( producto => producto.id === idBoton)
    productosEnCarrito[index].cantidad++;
    }else{
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado)
}
    actualizarNum()  
    localStorage.setItem("productos-en-carrito" , JSON.stringify(productosEnCarrito))
}

function actualizarNum(){
    let numeritoNew = productosEnCarrito.reduce((acum, producto) => acum + producto.cantidad,0)
    numerito.innerText = numeritoNew

}




