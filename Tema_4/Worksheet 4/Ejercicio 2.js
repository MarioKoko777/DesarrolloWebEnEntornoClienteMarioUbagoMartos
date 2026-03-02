const parrafos = document.querySelectorAll(".parrafo");
const incrementarFuente = document.getElementById("incrementarFuente");
const reducirFuente = document.getElementById("reducirFuente");
const tamañoPorDefecto = document.getElementById("tamañoPorDefecto");
const justificado = document.getElementById("justificado");
const alineadoIzquierda = document.getElementById("alineadoIzquierda");
const estiloParrafo = window.getComputedStyle(parrafos[0]);
const tamañoFuente = parseFloat(estiloParrafo.fontSize);

tamañoPorDefecto.addEventListener("click", () =>{
    parrafos.forEach((parrafo) =>{
        parrafo.style.fontSize = `${tamañoFuente}px`;
    })
})
incrementarFuente.addEventListener("click", () =>{
    let tamañoActual = parseFloat(estiloParrafo.fontSize);
    parrafos.forEach((parrafo) =>{
        parrafo.style.fontSize = `${tamañoActual + 1}px`;
    })
})
reducirFuente.addEventListener("click", () =>{
    let tamañoActual = parseFloat(estiloParrafo.fontSize);
    parrafos.forEach((parrafo) =>{
        parrafo.style.fontSize = `${tamañoActual - 1}px`;
    })
})
justificado.addEventListener("click", () =>{
    parrafos.forEach((parrafo) =>{
        parrafo.style.textAlign = "justify";
    })
})
alineadoIzquierda.addEventListener("click", () =>{
    parrafos.forEach((parrafo) =>{
        parrafo.style.textAlign = "left";
    })
})
