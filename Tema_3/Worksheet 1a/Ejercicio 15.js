/**
 * @name countLetter
 * @description Devuelve la cantidad de veces que una letra aparece en un string 
 *
 * @param {string} letter - Letra a contar
 * @param {string} text - Texto sobre el que realizar la cuenta de {letter}
 * @returns {Number} - Número de veces que aparece {letter} en {text}
 * 
 * @example
 *  countLetter("a", "javascript") // returns 2
 */
function countLetter(letter, text) {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === letter) {
            count++;
        }
    }
    return count;
}
// Ejemplo de uso
console.log(countLetter("a", "javascript")); // 2
console.log(countLetter("s", "javascript")); // 1
console.log(countLetter("z", "javascript")); // 0