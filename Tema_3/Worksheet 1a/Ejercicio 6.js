/**
 * @name getRockPaperScissor
 * @description Devuelve una jugada aleatoria de piedra, papel o tijera
 * 
 * @returns {String} - Devuelve "rock", "paper" o "scissor"
 *
 * @example
 *  getRockPaperScissor() // returns "paper"
 */
function getRockPaperScissor() {
    const opciones = ["rock", "paper", "scissor"];
    const indiceAleatorio = Math.floor(Math.random() * opciones.length);
    return opciones[indiceAleatorio];
}
// Ejemplo de uso
console.log(getRockPaperScissor()); // Puede devolver "rock", "paper" o "scissor"