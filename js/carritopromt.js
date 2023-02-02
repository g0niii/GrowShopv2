function Producto(id, productName, imagen, categoria, precio) {
    this.id = id;
    this.productName = productName;
    this.imagen = imagen;
    this.categoria = categoria;
    this.precio = precio;

}
const productos = [
    new Producto("sema-01", "Purple Punch", "./img/01.jpg", { nombre: "semillas", id: "semillas" }, 1500),
    new Producto("sema-02", "Bubble Gum", "./img/02.jpg", { nombre: "semillas", id: "semillas" }, 1500),
    new Producto("sema-03", "Critical Fast", "./img/03.jpg", { nombre: "semillas", id: "semillas" }, 1500),
    new Producto("sema-04", "Wifi Tangie", "./img/04.jpg", { nombre: "semillas", id: "semillas" }, 1500),
    new Producto("sema-05", "Power Skunk", "./img/05.jpg", { nombre: "semillas", id: "semillas" }, 1500),
    new Producto("sema-06", "Super Skunk", "./img/06.jpg", { nombre: "semillas", id: "semillas" }, 1500),
    new Producto("sema-07", "CBD CONNECTAR", "./img/07.jpg", { nombre: "semillas", id: "semillas" }, 1500),
    new Producto("sema-08", "Girl Scout Cookies", "./img/08.jpg", { nombre: "semillas", id: "semillas" }, 1500),
    new Producto("pipa-09", "Pipa de vidrio", "./img/09.jpg", { nombre: "pipa", id: "pipa" }, 1500),
    new Producto("sema-10", "Pipa de vidrio 2", "./img/10.jpg", { nombre: "pipa", id: "pipa" }, 1500),
    new Producto("pipa-11", "Pipa de vidrio 3", "./img/11.jpg", { nombre: "pipa", id: "pipa" }, 1500),
    new Producto("pipa-12", "Pipa de Hueso", "./img/12.jpg", { nombre: "pipa", id: "pipa" }, 1500)
];

let carrito
let carritoProductos = []

function menuPrincipal() {
    let menu
    do {
        menu = prompt("1-Realizar compra \n2-Cerrar cuenta \n3-Salir")
        menu = parseInt(menu)
        switch (menu) {
            case 1: comprarProducto()
                break
            case 2: alert("El total de su compra es $" + totalCarrito(carrito))
                break
            case 3: alert("saliendo")
                break
            default: alert("opcion invalida")
        }
    } while (menu != 3)
}

function totalCarrito(carrito) {
    let total = 0
    carrito.forEach(resTotal => {
        total = total + resTotal.precio
    }
    )
    return total
}

function comprarProducto() {
    let productosFiltrados

    let categoria = prompt("Ingrese la categoria del producto que desea comprar (1-semillas, 2-pipa)")
    categoria = parseInt(categoria)
    switch (categoria) {
        case 1: productosFiltrados = productos.filter(producto => producto.categoria.nombre === "semillas");
            carrito = agregarCarrito(productosFiltrados)
            break
        case 2: productosFiltrados = productos.filter(producto => producto.categoria.nombre === "pipa");
            carrito = agregarCarrito(productosFiltrados)
            break
        default: alert("opcion invalida")
    }
    return
}


function agregarCarrito(productosFiltrados) {

    let productSelect = prompt(mostrarProducto(productosFiltrados))
    productSelect = parseInt(productSelect)
    while (productSelect > 0 && productSelect <= 8) {
        carritoProductos.push(productosFiltrados[productSelect - 1])
        let comprarMas
        comprarMas = prompt("ingrese SI para agregar otro producto y NO si quiere terminar su compra.-")
        if (comprarMas == "SI") {
            productSelect = prompt(mostrarProducto(productosFiltrados))
            productSelect = parseInt(productSelect)
        }
        else {
            // alert("Se han agregado los productos al carrito exitosamente.-")
            productSelect = ""
        }
    }
    return carritoProductos
}

function mostrarProducto(productosFiltrados) {
    let mensajeSemillas
    let contador = 1
    let mensaje = ""
    productosFiltrados.forEach(todasSemillas => {
        mensajeSemillas = contador + "- Nombre " + todasSemillas.productName + " Precio " + todasSemillas.precio + " \n"
        mensaje = mensaje + mensajeSemillas
        contador++
    }
    );
    return mensaje
}

menuPrincipal()

// let productosFiltrados = productos.filter(producto => producto.categoria.nombre === categoria);

// if (tipo==1) {acumulador = acumulador + 5000}
// else (tipo==2) {acumulador = acumulador + 9000}

// const presupuesto = function (a, b, c) { return a + b + c }
// console.log(presupuesto(tipo, tipoDiente, calidadMaterial))