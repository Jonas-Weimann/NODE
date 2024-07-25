let total
let totalPersonas

function ingresarTotal() {
    total = parseInt(prompt('¿Cuánto es el importe total a pagar? Ingrese solo números'))
    if (isNaN(total)) {
        alert('La expresión ingresada no es un número!')
        ingresarTotal()
    } else console.log(total);
}

function ingresarCantidadDePersonas() {
    totalPersonas = parseInt(prompt('¿Entre cuántas personas se dividirá la cuenta? Ingrese solo números'))
    if (isNaN(totalPersonas)) {
        alert('La expresión ingresada no es un número!')
        ingresarCantidadDePersonas()
    } else console.log(totalPersonas);
}

ingresarTotal();
ingresarCantidadDePersonas();

let montoJusto = total / totalPersonas;
alert('El monto justo por persona es de ' + montoJusto)
console.log(montoJusto)