/**
 * @name getRange
 * @description Dado dos números, devuelve un array con los números enteros sucesivos entre ellos, puede incluir los números 
 * iniciales o no
 *
 * @param {number} a 
 * @param {number} b
 * @param {boolean} [inclusive=true] inclusive // Parámetro opcional, valor por defecto true
 * @returns {number[]} - Array de números entre a y b, incluyendo a y b
 * 
 * @example
 *   getRange(5, 10) // returns [5, 6, 7, 8, 9 ,10]
 *   getRange(3, -2) // returns [3, 2, 1, 0, -1, -2]
 *   getRange(-5, -10, false) // returns [-6, -7, -8, -9]
 */
function getRange(a, b, inclusive = true) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("Los parámetros a y b deben ser números");
    }
    const range = [];
    const step = a <= b ? 1 : -1; // Determina si vamos hacia adelante o hacia atrás
    let start = inclusive ? a : a + step;
    let end = inclusive ? b : b - step;
    for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
        range.push(i);
    }
    return range;
}
// Ejemplos de uso
console.log(getRange(5, 10));           // [5, 6, 7, 8, 9, 10]
console.log(getRange(3, -2));           // [3, 2, 1, 0, -1, -2]
console.log(getRange(-5, -10, false));  // [-6, -7, -8, -9]
console.log(getRange(2, 5, false));     // [3, 4]