const productos = [
    { id: 1, nombre: "Cuaderno", precio: 200, categoria: "Estudio" },
    { id: 2, nombre: "Birome", precio: 100, categoria: "Escritura" },
    { id: 3, nombre: "Lápiz", precio: 50, categoria: "Escritura" },
    { id: 4, nombre: "Carpeta", precio: 300, categoria: "Estudio" },
    { id: 5, nombre: "Marcador", precio: 250, categoria: "Escritura" },
    { id: 6, nombre: "Pizarra", precio: 400, categoria: "Lectura" },
];

let carrito = [];
const presupuestoInicial = 1000; // Presupuesto inicial
let presupuestoRestante = presupuestoInicial;

// Renderizar productos
function renderizarProductos() {
    const contenedorProductos = document.getElementById("productos");
    contenedorProductos.innerHTML = "";

    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Categoría: ${producto.categoria}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(div);
    });

    // Agregar eventos a los botones
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const idProducto = parseInt(e.target.dataset.id);
            agregarAlCarrito(idProducto);
        });
    });
}

// Agregar al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find((prod) => prod.id === idProducto);
    const productoEnCarrito = carrito.find((item) => item.id === idProducto);

    const nuevoTotal = calcularTotal() + producto.precio;
    if (nuevoTotal > presupuestoRestante) {
        mostrarError("No puedes agregar más productos: supera tu presupuesto.");
        return;
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    ocultarError();
}

// Actualizar carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const presupuestoRestanteElem = document.getElementById("presupuestoRestante");

    listaCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} x ${item.cantidad} - $${item.precio * item.cantidad}`;
        listaCarrito.appendChild(li);

        total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = total;
    presupuestoRestanteElem.textContent = presupuestoInicial - total;
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarError("El carrito está vacío. Agrega productos antes de finalizar.");
        return;
    }

    alert(`¡Gracias por tu compra! Has adquirido:\n${carrito.map(
        (item) => `${item.nombre} x ${item.cantidad} - $${item.precio * item.cantidad}`
    ).join("\n")}\nTotal: $${calcularTotal()}`);

    carrito = [];
    actualizarCarrito();
    ocultarError();
}

// Calcular total del carrito
function calcularTotal() {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

// Mostrar y ocultar mensajes de error
function mostrarError(mensaje) {
    const mensajeError = document.getElementById("mensajeError");
    mensajeError.textContent = mensaje;
    mensajeError.style.display = "block";
}

function ocultarError() {
    const mensajeError = document.getElementById("mensajeError");
    mensajeError.style.display = "none";
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
    actualizarCarrito();

    const botonFinalizar = document.getElementById("finalizarCompra");
    botonFinalizar.addEventListener("click", finalizarCompra);
});
