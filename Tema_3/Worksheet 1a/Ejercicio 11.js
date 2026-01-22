/**
 * @name toHackerSpeak
 * @description Convierte un string a "Hacker Speak". Para hacerlo, tiene que transformar las "a" en 4, las "e" en 3, las "i"
 * en 1, las "o" en 0 y las "s" en 5
 *
 * @param {string} text 
 * @returns {string} - El texto convertido a "Hacker Speak"
 * 
 * @example
 *  toHackerSpeak("I'm a hacker now") // returns "1'm 4 h4ack3r n0w"
 */
function toHackerSpeak(text) {
    if (typeof text !== 'string') {
        throw new Error("El parámetro debe ser un string");
    }
    // Reemplazos usando expresiones regulares
    const hackerText = text
        .replace(/a/gi, '4') // reemplaza "a" o "A"
        .replace(/e/gi, '3') // reemplaza "e" o "E"
        .replace(/i/gi, '1') // reemplaza "i" o "I"
        .replace(/o/gi, '0') // reemplaza "o" o "O"
        .replace(/s/gi, '5'); // reemplaza "s" o "S"
    return hackerText;
}
// Ejemplo de uso
console.log(toHackerSpeak("I'm a hacker now")); // "1'm 4 h4ack3r n0w"
console.log(toHackerSpeak("Salsa is delicious")); // "54l54 15 d3l1c10u5"