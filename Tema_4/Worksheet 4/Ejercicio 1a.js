const enlaceEstilado = document.getElementById("enlaceEstilado");
const enlaceMinimaslista = document.getElementById("enlaceMinimaslista");
const titulo = document.getElementById("titulo");
const parrafo = document.getElementsByClassName("parrafo");
const parrafoMarco = document.getElementById("parrafoMarco");
const enlaces = document.getElementById("enlaces");

enlaceEstilado.addEventListener("click", () =>{
    enlaceEstilado.style.textDecoration = "bold";
    enlaceMinimaslista.style.textDecoration = "bold";
    enlaces.style.backgroundColor = "#A8CBE5";
    enlaces.style.padding = "10px";
})
enlaceMinimaslista.addEventListener("click", () =>{
    location.reload();
})
