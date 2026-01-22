/**
 * @name getRandomColorSequence
 * @description Devuelve una secuencia aleatoria de ciertos colores con cierta longitud
 * 
 * @param {string[]} colors - Array de colores a ser utilizados en la secuencia
 * @param {number} length - Longitud de la secuencia
 * @returns {string[]} - Secuencia aleatoria de colores disponibles en {colors}, con longitud {length}
 *
 * @example
 *  getRandomColorSequence(["red", "blue", "green"], 4) // returns ['blue', 'red', 'red', 'green']
 */
function getRandomColorSequence(colors, length) {
    const sequence = [];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        sequence.push(colors[randomIndex]);
    }
    return sequence;
}
// Ejemplo de uso
const colores = ["red", "blue", "green"];
const secuencia = getRandomColorSequence(colores, 5);
console.log(secuencia);