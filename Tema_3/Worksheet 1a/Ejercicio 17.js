/**
 * @name removeWords
 * @description Dado un string y un array de palabras a remover, devuelve el string sin las palabras removidas
 *
 * @param {string} str - Texto a recortar 
 * @param {string[]} words - Palabras a remover
 * @returns {string} - Texto resultante con las palabras removidas
 * 
 * @example
 *   removeWords("This is a really bad test", ["really", "bad"]) // returns "This is a test"
 */
function removeWords(str, words) {
    // Convertimos las palabras a remover a un Set para búsqueda más rápida
    const toRemove = new Set(words);
    // Separamos el texto en palabras y filtramos las que no estén en toRemove
    const filteredWords = str
        .split(" ")
        .filter(word => !toRemove.has(word));
    // Volvemos a unir las palabras filtradas en un string
    return filteredWords.join(" ");
}
// Ejemplos de uso
console.log(removeWords("This is a really bad test", ["really", "bad"])); // "This is a test"
console.log(removeWords("Hello world", ["world"])); // "Hello"
console.log(removeWords("Keep calm and code on", ["and", "on"])); // "Keep calm code"