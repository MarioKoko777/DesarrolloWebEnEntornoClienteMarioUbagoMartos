// Pedir al usuario un número
let numero = Number(prompt("Ingrese un número"));
// Inicializar la variable factorial
let factorial = 1;
// Bucle for para calcular el factorial
for (let i = 1; i <= numero; i++) {
    factorial *= i; // equivalente a factorial = factorial * i
}
// Mostrar el resultado
console.log("El factorial de", numero, "es:", factorial);