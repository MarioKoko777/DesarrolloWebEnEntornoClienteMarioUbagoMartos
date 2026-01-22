// Pedir al usuario un número N
let N = Number(prompt("Ingrese un número"));
// Variable acumuladora para la suma
let suma = 0;
// Bucle for para sumar del 1 hasta N
for (let i = 1; i <= N; i++) {
    suma += i; // equivalente a suma = suma + i
}
// Mostrar el resultado
console.log("La suma de los números del 1 al", N, "es:", suma);