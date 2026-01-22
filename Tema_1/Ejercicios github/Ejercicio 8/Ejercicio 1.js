// Pedir la edad y el permiso
let edad = Number(prompt("Ingrese su edad"));
let permiso = prompt("¿Tiene permiso de sus padres? (sí/no)");
// Verificar si puede entrar
if (edad > 18 && permiso.toLowerCase() === "sí") {
    console.log("Puede entrar");
} else {
    console.log("No puede entrar");
}