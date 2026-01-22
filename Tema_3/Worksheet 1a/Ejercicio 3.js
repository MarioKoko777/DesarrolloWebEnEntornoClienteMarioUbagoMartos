/**
 * @name getBiggestNumber
 * @description Devuelve el número más grande de un array
 * 
 * @param {number[]} numbers - Un array de números
 * @returns {Number} El número más grande del array {numbers}
 *
 * @example
 *  getBiggestNumber([3, 8, 2, 1, 10]) // returns 10
 */
function getBiggestNumber(numbers) {
    if (numbers.length === 0) return null; // opcional: manejar array vacío
    return Math.max(...numbers);
}
// Ejemplo de uso
console.log(getBiggestNumber([3, 8, 2, 1, 10])); // 10
console.log(getBiggestNumber([5, 5, 5, 5])); // 5
console.log(getBiggestNumber([])); // null