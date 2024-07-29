// //Iniciando las variables total y total de personas
let total
let totalPersonas

function ingresarTotal() {
    total = parseInt(prompt('¿Cuánto es el importe total a pagar? Ingrese solo números'))
    if (isNaN(total)) {
        alert('La expresión ingresada no es un número!')
        ingresarTotal()
    }
}

function ingresarCantidadDePersonas() {
    totalPersonas = parseInt(prompt('¿Entre cuántas personas se dividirá la cuenta? Ingrese solo números'))
    if (isNaN(totalPersonas)) {
        alert('La expresión ingresada no es un número!')
        ingresarCantidadDePersonas()
    }
}

function inicializar() {
    ingresarTotal();
    ingresarCantidadDePersonas();
}

inicializar()

//Calculando el monto justo por persona
let montoJusto = Math.round(total / totalPersonas);
alert('El monto justo por persona es de ' + montoJusto)

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


let vuelto = aporteTotal-total

if (aporteTotal < total) {
    alert('El monto aportado no es suficiente!')
    window.location.reload();
} else if (vuelto > 0){
    alert('El vuelto es de ' + vuelto)
} else {
    alert('Aportaron lo justo, no hay vuelto!')
}

//Reparticion del vuelto:
//El vuelto sera dado en mayor parte a quien haya aportado más, hasta que este llegue al monto justo.
//En caso de que este llegue al monto justo, se continuará con el siguiente aportante

personas.sort((a,b) => b.aporte - a.aporte)

let i = 0

function darVuelto(i) {
    if (i < personas.length){
        let aportanteMayor = personas[i]
        let exceso = parseInt(personas[i].aporte)
        exceso = exceso - montoJusto;
        if (vuelto > exceso && vuelto > 0) {
            vuelto = vuelto - exceso
            alert('Se le debe dar ' + exceso + ' de vuelto a ' + aportanteMayor.nombre)
            aportanteMayor.aporte = aportanteMayor.aporte - exceso
            darVuelto(i + 1)
        } else if (exceso >= vuelto && vuelto > 0 && vuelto != 0) {
            aportanteMayor.aporte = aportanteMayor.aporte - vuelto
            alert('Se le debe dar ' + vuelto + ' de vuelto a ' + aportanteMayor.nombre)
            vuelto = vuelto - vuelto
            darVuelto(i + 1)
        } else if (vuelto == 0) {
            alert('Todo el vuelto fue devuelto')
        }
    } else if (vuelto == 0) {
        alert('Todo el vuelto fue devuelto')
    }
}

darVuelto(0)
console.log(personas)

let acreedores = []
let deudores = []

function calificarPersonas(i) {
    if (personas[i].aporte > montoJusto) {
        acreedores.push(personas[i]);
    } else if (personas[i].aporte < montoJusto){
        deudores.push(personas[i])
    }
}

for (let i = 0; i < personas.length; i++){
    calificarPersonas(i)
}
console.log(acreedores, deudores)


function calcularBonos(i) {
    acreedores[i].aporte = acreedores[i].aporte - montoJusto; 
}

function calcularDeudas(i) {
    deudores[i].aporte = montoJusto - deudores[i].aporte;
}

for( let i = 0; i < acreedores.length; i++) {
    calcularBonos(i)
}
for( let i = 0; i < deudores.length; i++) {
    calcularDeudas(i)
}

for (let i = 0; i< deudores.length; i++) {
    for (let j = 0; j< acreedores.length; j++) {
        if (deudores[i].aporte <= acreedores[j].aporte && deudores[i].aporte != 0) {
            alert( deudores[i].nombre + ' le debe ' + deudores[i].aporte + ' a ' + acreedores[j].nombre)
            acreedores[j].aporte = acreedores[j].aporte - deudores[i].aporte;
            deudores[i].aporte = 0
        } else if (deudores[i].aporte > acreedores[j].aporte && deudores[i].aporte != 0) {
            alert( deudores[i].nombre + ' le debe ' + acreedores[j].aporte + ' a ' + acreedores[j].nombre)
            deudores[i].aporte = deudores[i].aporte - acreedores[j].aporte
            acreedores[j].aporte = 0;
        } else {
            console.log('Deudas saldadas con ' + deudores[i].nombre)
        }
    }
}