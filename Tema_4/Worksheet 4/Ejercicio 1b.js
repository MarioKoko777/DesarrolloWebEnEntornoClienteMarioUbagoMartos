const enlaceEstilado = document.getElementById("enlaceEstilado");
const enlaceMinimaslista = document.getElementById("enlaceMinimaslista");
const estiloNormal = document.getElementById("estiloNormal");

enlaceEstilado.addEventListener("click", () =>{
    estiloNormal.href = "Ejercicio 11b.css";
})
enlaceMinimaslista.addEventListener("click", () =>{
    estiloNormal.href = "Ejercicio 12b.css";
})
