// //Iniciando las variables total y total de personas
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

function inicializar() {
    ingresarTotal();
    ingresarCantidadDePersonas();
}

inicializar()

//Calculando el monto justo por persona
let montoJusto = total / totalPersonas;
alert('El monto justo por persona es de ' + montoJusto)
console.log(montoJusto)

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

let aporteTotal = 0

for (let i= 0; i < totalPersonas; i++) {
    let persona = {
        nombre: ingresarNombre([i + 1]),
        aporte: ingresarAporte(),
    }
    personas.push(persona)
    aporteTotal = aporteTotal + persona.aporte
}

console.log(personas)
console.log(aporteTotal)

let vuelto = aporteTotal-total

if (aporteTotal < total) {
    alert('El monto aportado no es suficiente!')
    window.location.reload();
} else {
    alert('El vuelto es de ' + vuelto)
}

//Reparticion del vuelto:
//El vuelto sera dado en mayor parte a quien haya aportado más, hasta que este llegue al monto justo.
//En caso de que este llegue al monto justo, se continuará con el siguiente aportante

personas.sort((a,b) => b.aporte - a.aporte)
console.log(personas)

let i = 0

function actualizarAportante(i) {
    if (i < personas.length && personas[i].aporte == montoJusto && vuelto != 0 ) {
        darVuelto(i + 1)
    }
}

function chequearVuelto(){
    if (vuelto == 0){
        alert('Todo el vuelto fue repartido')
        console.log(personas[i])
        console.log(personas)
}}

function darVuelto(i) {
    let aportanteMayor = personas[i]
    let exceso = parseInt(personas[i].aporte)
    exceso = exceso - montoJusto;
    if (vuelto > exceso) {
        vuelto = vuelto - exceso
        alert('Se le debe dar ' + vuelto + 'de vuelto a ' + aportanteMayor.nombre)
        aportanteMayor.aporte = aportanteMayor.aporte - exceso
        actualizarAportante(i)
    } else if (exceso > vuelto > 0) {
        aportanteMayor.aporte = aportanteMayor.aporte - vuelto
        alert('Se le debe dar ' + vuelto + 'de vuelto a ' + aportanteMayor.nombre)

    }
    if (i> personas.lenght) {
        chequearVuelto()
    }
}



darVuelto(0)