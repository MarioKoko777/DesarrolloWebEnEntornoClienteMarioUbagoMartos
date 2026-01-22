/**
 * @name getFactorial
 * @description Devuelve el factorial de un número
 *
 * @param {number} x - Número del cuál obtener factorial
 * @returns {Number} - Factorial de {x}
 *
 * @example
 *  getFactorial(4) // returns 24
 */
function getFactorial(x) {
  if (x < 0) {
    throw new Error("El factorial no está definido para números negativos");
  }
  let resultado = 1;
  for (let i = 2; i <= x; i++) {
    resultado *= i;
  }
  return resultado;
}
// Ejemplos de uso
console.log(getFactorial(4));  // 24
console.log(getFactorial(0));  // 1
console.log(getFactorial(5));  // 120