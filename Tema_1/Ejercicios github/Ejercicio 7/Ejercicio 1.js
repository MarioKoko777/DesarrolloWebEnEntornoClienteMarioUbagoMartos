let num1 = Number(prompt("Ingrese el primer número"));
let num2 = Number(prompt("Ingrese el segundo número"));
// Suma
console.log("Suma:", num1 + num2);
// Resta
console.log("Resta:", num1 - num2);
// Multiplicación
console.log("Multiplicación:", num1 * num2);
// División
if (num2 !== 0) {
    console.log("División:", num1 / num2);
} else {
    console.log("No se puede dividir entre 0");
}