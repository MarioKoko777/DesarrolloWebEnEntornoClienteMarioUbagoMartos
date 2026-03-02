//^(?=.*[a-z])(?=.*[A-Z]).{6,}$
const nombre = document.getElementById("nombre");
const resultado = document.getElementById("resultado");
function validarNombre(){
    const nombreValor = nombre.value;
    const nombreValido = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if(nombreValido.test(nombreValor)){
        resultado.textContent = "Nombre válido";
    } else {
        resultado.textContent = "Nombre inválido";
    }
}