/**
 * @name areArraysEqual
 * @description Devuelve si dos arrays son iguales (tienen los mismos ítems en el mismo orden)
 *
 * @param {[]} a 
 * @param {[]} b 
 * @returns {Boolean} - Devuelve true si ambos arrays son iguales, false sino
 *
 * @example
 *  areArraysEqual([1, 4], [1, 4]) // returns true
 *  areArraysEqual([1, 4], [4, 1]) // returns false
 */
function areArraysEqual(a, b) {
    if (a.length !== b.length) return false; // primero verificamos longitud
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false; // si algún elemento difiere
    }
    return true; // si pasamos todas las comprobaciones
}
// Ejemplos de uso
console.log(areArraysEqual([1, 4], [1, 4])); // true
console.log(areArraysEqual([1, 4], [4, 1])); // false
console.log(areArraysEqual([], []));         // true
console.log(areArraysEqual([1, 2, 3], [1, 2])); // false