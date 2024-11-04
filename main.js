// Declaración de variables y constantes
const presupuestoLimite = 500;  // Presupuesto máximo permitido
let gastos = [];  // Array para almacenar los gastos

// Función para ingresar gastos
function agregarGasto() {
    let nuevoGasto = parseFloat(prompt("Ingresa un gasto (en número):"));
    
    // Verificar que el gasto ingresado sea un número válido
    if (!isNaN(nuevoGasto) && nuevoGasto > 0) {
        gastos.push(nuevoGasto);
        console.log("Gasto añadido correctamente:", nuevoGasto);
        alert("Gasto añadido correctamente: $" + nuevoGasto);
    } else {
        alert("Por favor, ingresa un valor válido.");
    }
}

// Función para calcular el total de gastos
function calcularTotalGastos() {
    let total = 0;
    for (let gasto of gastos) {
        total += gasto;
    }
    console.log("El total de los gastos es: $" + total);
    alert("El total de los gastos es: $" + total);
    return total;
}

// Función para calcular el promedio de los gastos
function calcularPromedioGastos() {
    if (gastos.length === 0) {
        alert("No hay gastos para calcular el promedio.");
        return 0;
    }

    let total = calcularTotalGastos();
    let promedio = total / gastos.length;
    console.log("El promedio de los gastos es: $" + promedio.toFixed(2));
    alert("El promedio de los gastos es: $" + promedio.toFixed(2));
    return promedio;
}

// Función para verificar si el presupuesto ha sido excedido
function verificarPresupuesto() {
    let total = calcularTotalGastos();
    if (total > presupuestoLimite) {
        console.log("Has excedido el presupuesto de $" + presupuestoLimite + ". Total gastado: $" + total);
        alert("¡Cuidado! Has excedido el presupuesto de $" + presupuestoLimite + ". Total gastado: $" + total);
    } else {
        console.log("Estás dentro del presupuesto.");
        alert("Estás dentro del presupuesto.");
    }
}

// Interacción con el usuario
function iniciarSimulador() {
    let opcion;
    do {
        opcion = prompt("Tu presupuesto es de $ 500. Selecciona una opción:\n1. Agregar Gasto\n2. Calcular Total de Gastos\n3. Calcular Promedio de Gastos\n4. Verificar Presupuesto\n5. Salir");

        switch (opcion) {
            case "1":
                agregarGasto();
                break;
            case "2":
                calcularTotalGastos();
                break;
            case "3":
                calcularPromedioGastos();
                break;
            case "4":
                verificarPresupuesto();
                break;
            case "5":
                alert("Saliendo del simulador. ¡Gracias por usarlo!");
                break;
            default:
                alert("Opción no válida, por favor selecciona de nuevo.");
        }
    } while (opcion !== "5");
}

// Llamada para iniciar el simulador
iniciarSimulador();