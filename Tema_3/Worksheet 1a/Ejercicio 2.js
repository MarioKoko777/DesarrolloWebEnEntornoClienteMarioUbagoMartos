/**
 * @name inRange
 * @description Devuelve si un número se encuentra dentro de un rango
 * 
 * @param {number} x - El número a evaluar si se encuentra dentro del rango
 * @param {number} min - El límite inferior del rango
 * @param {number} max - El límite superior del rango
 * @returns {Boolean} Devuelve true si el número {x} se encuentra dentro del rango definido por {min} y {max}, false sino
 *
 * @example
 *  inRange(2, -4, 10) // returns true
 */
function inRange(x, min, max) {
  return x >= min && x <= max;
}
// Ejemplos de uso
console.log(inRange(2, -4, 10));  // true
console.log(inRange(-5, -4, 10)); // false
console.log(inRange(10, -4, 10)); // true
console.log(inRange(11, -4, 10)); // false