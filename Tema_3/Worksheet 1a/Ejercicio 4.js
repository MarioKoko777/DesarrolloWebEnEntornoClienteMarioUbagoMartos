/**
 * @name getPercentage
 * @description Devuelve el porcentaje correspondiente de un número
 * 
 * @param {number} number - Número a obtener el porcentaje
 * @param {number} percentage - Porcentaje a obtener
 * @returns {number}
 *
 * @example
 *  getPercentage(200, 10) // returns 20
 */
function getPercentage(number, percentage) {
    if (typeof number !== 'number' || typeof percentage !== 'number') {
        throw new Error("Ambos parámetros deben ser números");
    }
    return (number * percentage) / 100;
}
// Ejemplo de uso
console.log(getPercentage(200, 10)); // 20
console.log(getPercentage(50, 25));  // 12.5
console.log(getPercentage(120, 50)); // 60