// Pedir un número al usuario
let numero = Number(prompt("Ingrese un número"));
// Verificar si es positivo y menor que 100
if (numero > 0 && numero < 100) {
    console.log("El número es positivo y menor que 100");
} else {
    console.log("El número no cumple ambas condiciones");
}