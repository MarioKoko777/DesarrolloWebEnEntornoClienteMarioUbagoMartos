/**
 * @name flatArray
 * @description Dado un array 2D, devuelve un array 1D que contiene todos los ítems 
 *
 * @param {[][]} arr - Array 2D a "aplanar" 
 * @returns {[]} - El array "aplanado"
 * 
 * @example
 *  flatArray([[1, 5, 4], [3, 10], [2, 5]]) // returns [1, 5, 4, 3, 10, 2, 5]
 */
function flatArray(arr) {
    // Usando reduce para concatenar todos los sub-arrays
    return arr.reduce((acumulador, subArray) => acumulador.concat(subArray), []);
}
// Ejemplo de uso
console.log(flatArray([[1, 5, 4], [3, 10], [2, 5]])); 
// Output: [1, 5, 4, 3, 10, 2, 5]