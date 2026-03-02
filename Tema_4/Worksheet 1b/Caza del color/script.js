document.addEventListener('DOMContentLoaded', () => {
    const mensajeElement = document.getElementById('mensaje');
    const resultadoElement = document.getElementById('resultado');
    const squares = document.querySelectorAll('.color-square');
    
    // Objetivo del juego
    const colorObjetivo = 'rojo';
    
    // JS: Mostrar el texto “Haz clic en el color rojo”.
    mensajeElement.textContent = `Haz clic en el color ${colorObjetivo}`;
    
    squares.forEach(square => {
        square.addEventListener('click', () => {
            const colorSeleccionado = square.getAttribute('data-color');
            
            if (colorSeleccionado === colorObjetivo) {
                // Si se hace clic en el color correcto → mensaje de acierto.
                resultadoElement.textContent = '¡Correcto! Has encontrado el color rojo.';
                resultadoElement.style.color = 'green';
            } else {
                // Si se falla → mensaje de error.
                resultadoElement.textContent = 'Incorrecto. Inténtalo de nuevo.';
                resultadoElement.style.color = 'red';
            }
        });
    });
});