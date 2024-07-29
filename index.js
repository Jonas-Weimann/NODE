//Obteniendo información de los inputs
let total
let totalPersonas
let montoJusto
let divMontoJusto = document.querySelector('.mostrar-monto-justo')
let divVuelto = document.querySelector('.mostrar-vuelto')
let inputWrapper = document.querySelector('.input-wrapper')
let personasWrapper = document.querySelector('.personas-wrapper')
let personasSubmit
let divPersonasSubmit = document.querySelector('.personas-submit')

const botonEnviar = document.querySelector('.enviar')
const pics = [
    'url("images/anaconda.png")',
    'url("images/deer.png")',
    'url("images/dinosaur.png")',
    'url("images/ganesha.png")',
    'url("images/koi.png")',
    'url("images/macaw.png")',
    'url("images/panda-bear.png")',
    'url("images/parrot.png")',
    'url("images/tiger.png")',
    'url("images/turtle.png")',
];

function asignarImagenRandom(pic) {
    let a = Math.floor(Math.random() * pics.length);
    let bgImg = pics[a];
    pic.style.backgroundImage = bgImg;
}

botonEnviar.addEventListener('click', ()=>{
    total = document.getElementById('total-a-pagar').value
    totalPersonas = document.getElementById('cantidad-personas').value
    numero = totalPersonas
    montoJusto = Math.round(total / totalPersonas);
    escribirMontoJusto()
    crearPersonas(numero)
})



// Al ingresar el total de personas, se tienen que crear tantos divs como personas haya. Cada div con las mismas caracteristicas.
// Para hacer esto, al hacer click en ENVIAR se obtendrá el value del input totalPersonas lo cual usaremos en la funcion como parametro.
// Cada persona tendrá como input, un nombre y un aporte, también hay que crear un nuevo botón de submit.

function crearPersonas(numero) {
    for (let i = 1; i <= numero; i++) {
    personasWrapper.innerHTML += `<div class="persona"><div class="imagen-persona" id="imagen-persona-${i}"></div><input type="text" class="persona-${i} nombre-persona"><label>Ingresa el nombre de la persona ${i}</label>
<input type="number" class="aporte-${numero} aporte-persona"><label>Ingresa el aporte de la persona ${i}</label></div>`
    let pic = document.getElementById(`imagen-persona-${i}`);
    asignarImagenRandom(pic)
}
if (divMontoJusto.classList.contains('activado')){personasWrapper.innerHTML += '<input type="submit" class="personas-submit">'
personasSubmit = document.querySelector('.personas-submit')
personasSubmit.classList.add('activado')
enviarPersonas()
}}

function escribirMontoJusto() {
    if (isNaN(montoJusto)) {
        divMontoJusto.innerHTML = 'No escribiste nada pajin!!!';
        divMontoJusto.classList.add('error')
    } else if(montoJusto == 'Infinity'){
        divMontoJusto.innerHTML = 'Como van a ser 0 personas boludin';
        divMontoJusto.classList.add('error')
    } else {
        inputWrapper.classList.add('desactivado')
        divMontoJusto.classList.add('activado')
        divMontoJusto.classList.remove('error')
        divMontoJusto.innerHTML = `El monto justo por persona es de ${montoJusto}`;
}}


//Submiteando los datos de las personas
function enviarPersonas() {
        personasSubmit.addEventListener('click', ()=>{
            validarDatos();
            if (validarDatos == true) {
                alert('Los datos estan bien amigo muy bien!!!')
            } else {
                divPersonasSubmit.classList.add('error')
            }
        })
    }

function validarDatos() {
    
}



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

function revisarAporteTotal() {
    if (aporteTotal < total) {
        alert('El monto aportado no es suficiente!')
        window.location.reload();
    } else if (vuelto > 0){
        alert('El vuelto es de ' + vuelto)
    } else {
        alert('Aportaron lo justo, no hay vuelto!')
    }
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
            console.log('Deudas saldadas con ' + deudores[i].nombre)
        } else if (deudores[i].aporte > acreedores[j].aporte && deudores[i].aporte != 0) {
            alert( deudores[i].nombre + ' le debe ' + acreedores[j].aporte + ' a ' + acreedores[j].nombre)
            deudores[i].aporte = deudores[i].aporte - acreedores[j].aporte
            acreedores[j].aporte = 0;
        } else {
            console.log('Deudas saldadas con ' + deudores[i].nombre)
        }
    }
}