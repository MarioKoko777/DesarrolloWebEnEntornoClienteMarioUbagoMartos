function esEntero(valor) {
  return Number.isInteger(valor);
}
// Ejemplos
console.log(esEntero(5));     // true
console.log(esEntero(3.14));  // false
console.log(esEntero("5"));   // false