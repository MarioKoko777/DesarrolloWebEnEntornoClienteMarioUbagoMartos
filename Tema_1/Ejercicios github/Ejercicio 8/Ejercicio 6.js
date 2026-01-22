let usuario = prompt("Ingrese su usuario");
let contraseña = prompt("Ingrese su contraseña");
if ((usuario === "admin" && contraseña === "1234") || usuario === "invitado") {
    console.log("Acceso permitido");
} else {
    console.log("Acceso denegado");
}