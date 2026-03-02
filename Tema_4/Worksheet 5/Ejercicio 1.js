function validarMayuscula(texto){
    let mayuscula = /[A-Z]/;
    return mayuscula.test(texto);
}
function validarCaracteresEspeciales(texto){
    let caracteresEspeciales = /[!@#$%^&]/;
    return caracteresEspeciales.test(texto);
}
function validarCorreo(correo){
    let correoValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return correoValido.test(correo);
}
function validarTarjetaDeCredito(tarjeta){
    let tarjetaValida = /^(\d{4}[- ]?){3}\d{4}$/;
    return tarjetaValida.test(tarjeta);
}
function validarLongitud(texto){
    let longitudValida = /^.{8,}$/;
    return longitudValida.test(texto);
}
function validarNumero(texto){
    let numero = /^\d+$/;
    return numero.test(texto);
}
//Ejemplos
console.log(validarMayuscula("Hola")); //true
console.log(validarCaracteresEspeciales("Hola123!")); //true
console.log(validarCorreo("ejemplo@dominio.com")); //true
console.log(validarTarjetaDeCredito("1234-5678-9012-3456")); //true
console.log(validarLongitud("Hola1234")); //true
console.log(validarNumero("123456")); //true
//Ejemplos falsos
console.log(validarMayuscula("hola")); //false
console.log(validarCaracteresEspeciales("Hola123")); //false
console.log(validarCorreo("ejemplo@dominio")); //false
console.log(validarTarjetaDeCredito("1234-5678-9012-345")); //false
console.log(validarLongitud("Hola123")); //false
console.log(validarNumero("12345a")); //false