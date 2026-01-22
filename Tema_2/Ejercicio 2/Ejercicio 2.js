// Pedir un número decimal al usuario
const input = prompt("Introduce un número decimal:");
const numero = parseFloat(input); // Convertir el texto a número
// Redondeos
const redondeoSimple = Math.round(numero); // Redondeo al entero más cercano
const redondeoExceso = Math.ceil(numero);  // Redondeo por exceso
const redondeoDefecto = Math.floor(numero); // Redondeo por defecto
// Mostrar resultados
console.log("Número introducido:", numero);
console.log("Redondeo simple (Math.round):", redondeoSimple);
console.log("Redondeo por exceso (Math.ceil):", redondeoExceso);
console.log("Redondeo por defecto (Math.floor):", redondeoDefecto);