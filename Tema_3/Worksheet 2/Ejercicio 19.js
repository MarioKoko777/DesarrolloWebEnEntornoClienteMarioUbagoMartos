// Arreglo original con elementos repetidos
const numeros = [5, 3, 8, 3, 1, 5, 7, 2];
// 1. Extraer elementos únicos usando Set
const unicos = [...new Set(numeros)]; // Spread operator para convertir el Set a array
// 2. Ordenar de menor a mayor usando sort
const ordenados = unicos.sort((a, b) => a - b);
console.log(ordenados); // [1, 2, 3, 5, 7, 8]