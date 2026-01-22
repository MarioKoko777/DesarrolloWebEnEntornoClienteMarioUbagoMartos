const sumArray = arr => arr.reduce((a, b) => a + b, 0);
// Ejemplos de uso
console.log(sumArray([1, 2, 3, 4])); // 10
console.log(sumArray([10, -2, 5]));  // 13
console.log(sumArray([]));           // 0