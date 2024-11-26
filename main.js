// Variables y constantes
const presupuestoLimite = 500;
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Productos disponibles con id, nombre, precio y categoría
const productos = [
    { id: 1, nombre: "Cuaderno", precio: 200, categoria: "Estudio" },
    { id: 2, nombre: "Birome", precio: 100, categoria: "Escritura" },
    { id: 3, nombre: "Lápiz", precio: 50, categoria: "Escritura" },
    { id: 4, nombre: "Carpeta", precio: 300, categoria: "Estudio" },
    { id: 5, nombre: "Marcador", precio: 250, categoria: "Escritura" },
    { id: 6, nombre: "Pizarra", precio: 400, categoria: "Lectura" },
];

// Elementos del DOM
const listaCarrito = document.getElementById("listaCarrito");
const totalCarritoElem = document.getElementById("totalCarrito");
const alertaPresupuesto = document.getElementById("alertaPresupuesto");
const limpiarCarritoBtn = document.getElementById("limpiarCarrito");
const seccionProductos = document.getElementById("productos");

// Funciones
function renderizarProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
            <p><strong>${producto.nombre}</strong></p>
            <p>Categoría: ${producto.categoria}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="btn-agregar" data-id="${producto.id}">Agregar</button>
        `;
        seccionProductos.appendChild(div);
    });

    // Asignar eventos a los botones después de renderizar
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    botonesAgregar.forEach(boton => boton.addEventListener("click", agregarProducto));
}

function actualizarDOM() {
    // Limpiar lista del carrito
    listaCarrito.innerHTML = "";
    let total = 0;

    // Agregar cada producto al DOM
    carrito.forEach((item, index) => {
        total += item.precio;

        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;

        // Botón para eliminar producto
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", () => eliminarProducto(index));
        li.appendChild(eliminarBtn);

        listaCarrito.appendChild(li);
    });

    // Actualizar total y presupuesto
    totalCarritoElem.textContent = total;
    if (total > presupuestoLimite) {
        alertaPresupuesto.classList.remove("hidden");
    } else {
        alertaPresupuesto.classList.add("hidden");
    }

    // Guardar en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarProducto(e) {
    const idProducto = parseInt(e.target.getAttribute("data-id"));
    const producto = productos.find(p => p.id === idProducto);

    carrito.push(producto);
    actualizarDOM();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarDOM();
}

function limpiarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarDOM();
}

// Eventos
limpiarCarritoBtn.addEventListener("click", limpiarCarrito);

// Inicialización
renderizarProductos();
actualizarDOM();
