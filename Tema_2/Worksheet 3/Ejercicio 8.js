/**
 * Cuenta el número de palabras en una cadena
 * @param {string} texto - Cadena de entrada
 * @returns {number} Número de palabras
 */
function contarPalabras(texto) {
    // Eliminar espacios al inicio y final
    texto = texto.trim();
    // Si la cadena queda vacía, no hay palabras
    if (texto === "") return 0;
    // Dividir la cadena usando uno o más espacios como separador
    const palabras = texto.split(/\s+/);
    return palabras.length;
}
// Ejemplos de uso
console.log(contarPalabras("Hola mundo")); // 2
console.log(contarPalabras("   Este   es   un   ejemplo   ")); // 5
console.log(contarPalabras("")); // 0
console.log(contarPalabras("   ")); // 0
console.log(contarPalabras("Una palabra")); // 2