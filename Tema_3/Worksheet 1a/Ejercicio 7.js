/**
 * @name getRockPaperScissorRandomSequence
 * @description Devuelve una secuencia aleatoria de jugadas de piedra, papel o tijera, con cierta longitud
 *
 * @param {number} length - Longitud de la secuencia
 * @returns {String[]}
 *
 * @example
 *  getRockPaperScissorRandomSequence(4) // returns ["rock", "paper", "rock", "scissor"]
 */
function getRockPaperScissorRandomSequence(length) {
    const options = ["rock", "paper", "scissor"];
    const sequence = [];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * options.length);
        sequence.push(options[randomIndex]);
    }
    return sequence;
}
// Ejemplo de uso:
console.log(getRockPaperScissorRandomSequence(5));
// Puede devolver algo como: ["rock", "scissor", "paper", "rock", "paper"]