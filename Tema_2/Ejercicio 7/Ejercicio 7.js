// Juego: Adivina el número con intentos limitados
const numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 7;
let ganado = false;
while (intentos > 0 && !ganado) {
    let entrada = prompt(
        `Adivina el número (1 - 100)\nIntentos restantes: ${intentos}`
    );
    // Cancelar juego
    if (entrada === null) {
        alert("Juego cancelado.");
        break;
    }
    let numeroUsuario = Number(entrada);
    // Validación
    if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 100) {
        alert("Introduce un número válido entre 1 y 100.");
        continue;
    }
    intentos--;
    if (numeroUsuario === numeroSecreto) {
        alert("¡Correcto! Has ganado.");
        ganado = true;
    } else if (numeroUsuario < numeroSecreto) {
        alert("⬆Demasiado bajo. Sube el número.");
    } else {
        alert("⬇Demasiado alto. Baja el número.");
    }
}
if (!ganado && intentos === 0) {
    alert(`Has perdido. El número era ${numeroSecreto}.`);
}