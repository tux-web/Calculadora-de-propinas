// INPUTS
const inputTotal = document.querySelector("#input-total");
const inputPorcentaje = document.querySelector("#input-porcentaje");
const inputPersonas = document.querySelector("#input-personas");
const btnResetear = document.querySelector("#btn-resetear");

inputTotal.addEventListener("input", hacerCalculos);
inputPorcentaje.addEventListener("focus", inputSeleccionado);
inputPorcentaje.addEventListener("input", funcionInputPersonalizado);
inputPersonas.addEventListener("input", hacerCalculos);
btnResetear.addEventListener("click", resetear);


// RESULTADO
const spanPropinaPersona = document.querySelector("#span-resultado-propina-persona");
const spanTotalPersona = document.querySelector("#span-resultado-total");

datos = {
    total : "",
    porcentaje : 5,
    numeroPersonas : "",
    
    propinaPersona : "",
    totalPersona : "",
}

hacerCalculos();

function hacerCalculos() {
    datos.total = Number(inputTotal.value);
    datos.numeroPersonas = Number(inputPersonas.value);

    if(inputPersonas.value == 0) {
        inputPersonas.style = "border: 2px solid red;"
        console.log("no puede ser cero");
    } else {
        inputPersonas.style = "border: unset;"
        datos.propinaPersona = datos.total * (datos.porcentaje/100) / datos.numeroPersonas;
        datos.totalPersona = (datos.total / datos.numeroPersonas) + datos.propinaPersona;
        console.log(datos);
        mostrarValores();
    }
}

function mostrarValores() {
    spanPropinaPersona.textContent = `$${datos.propinaPersona.toFixed(2)}`;
    spanTotalPersona.textContent = `$${datos.totalPersona.toFixed(2)}`;
}

// SELECCIONAR BOTON PORCENTAJE
const botonesPorcentaje = Array.from(document.querySelectorAll("#botones-porcentaje button"));

botonesPorcentaje.forEach( btnPorcertaje => {
    btnPorcertaje.addEventListener("click", (e) => {
        e.preventDefault();
        botonesPorcentaje.forEach( boton => {
            boton.removeAttribute("id");
        })
        e.target.setAttribute("id", "porcentaje-seleccionado");
        datos.porcentaje = Number(e.target.getAttribute("data-porcentaje"));
        hacerCalculos();
        console.log(datos);
    })
});

function inputSeleccionado() {
    if(inputPorcentaje.value == 0) {
        datos.porcentaje = 0;
    }
    datos.porcentaje = inputPorcentaje.value;
    hacerCalculos();
    botonesPorcentaje.forEach(boton => {
        boton.removeAttribute("id");
    })
}

function funcionInputPersonalizado() {
    datos.porcentaje =  Number(inputPorcentaje.value);
    hacerCalculos();
}

function resetear() {
    inputTotal.value = 0;
    botonesPorcentaje.forEach(boton => {
        boton.removeAttribute("id");
    })
    const cinco = document.querySelector('button[data-porcentaje="5"]');
    cinco.setAttribute("id", "porcentaje-seleccionado");
    inputPorcentaje.value = null;
    inputPersonas.value = 5;

    datos.total = "";
    datos.porcentaje = "";
    datos.inputPersonas = "";
    
    datos.propinaPersona = "";
    datos.totalPersona = "";

    hacerCalculos();
}