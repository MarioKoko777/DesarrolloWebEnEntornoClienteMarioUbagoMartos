// Creamos un array inicial
let frutas = ["manzana", "banana", "cereza"];
console.log("Array inicial:", frutas);
// -----------------------
// AÑADIR ELEMENTOS
// -----------------------
// 1️ Añadir al final con push()
frutas.push("naranja");
console.log("Después de push('naranja'):", frutas);
// 2️ Añadir al inicio con unshift()
frutas.unshift("kiwi");
console.log("Después de unshift('kiwi'):", frutas);
// -----------------------
// ELIMINAR ELEMENTOS
// -----------------------
// 3️ Eliminar del final con pop()
let ultimaFruta = frutas.pop();
console.log("Después de pop():", frutas);
console.log("Elemento eliminado del final:", ultimaFruta);
// 4️ Eliminar del inicio con shift()
let primeraFruta = frutas.shift();
console.log("Después de shift():", frutas);
console.log("Elemento eliminado del inicio:", primeraFruta);
// -----------------------
// RESULTADO FINAL
// -----------------------
console.log("Array final:", frutas);