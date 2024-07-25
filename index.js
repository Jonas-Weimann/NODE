// //Iniciando las variables total y total de personas
// let total
// let totalPersonas

// function ingresarTotal() {
//     total = parseInt(prompt('¿Cuánto es el importe total a pagar? Ingrese solo números'))
//     if (isNaN(total)) {
//         alert('La expresión ingresada no es un número!')
//         ingresarTotal()
//     } else console.log(total);
// }

function ingresarCantidadDePersonas() {
    totalPersonas = parseInt(prompt('¿Entre cuántas personas se dividirá la cuenta? Ingrese solo números'))
    if (isNaN(totalPersonas)) {
        alert('La expresión ingresada no es un número!')
        ingresarCantidadDePersonas()
    } else console.log(totalPersonas);
}

// ingresarTotal();
ingresarCantidadDePersonas();


//Calculando el monto justo por persona
// let montoJusto = total / totalPersonas;
// alert('El monto justo por persona es de ' + montoJusto)
// console.log(montoJusto)

//Inicializando array de personas
let personas = []
let nombre
let aporte

function ingresarNombre(i) {
    nombre = prompt('Ingrese el nombre y apellido de la persona ' + (i))
    return nombre
}

function ingresarAporte() {
    aporte = parseInt(prompt('¿Cuánto aportó ' + nombre + '? Ingrese solo numeros'))
    if(isNaN(aporte)) {
        alert('La expresión ingresada no es un número!')
        return ingresarAporte()
    } return aporte
}


for (let i= 0; i < totalPersonas; i++) {
    let persona = {
        nombre: ingresarNombre([i + 1]),
        aporte: ingresarAporte(),
    }
    console.log(persona);
}
