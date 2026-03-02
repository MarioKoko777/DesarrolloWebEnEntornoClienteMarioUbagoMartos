document.addEventListener('DOMContentLoaded', () => {
    const resultadoDisplay = document.getElementById('resultado');
    
    // Objetivo del juego
    const teclaObjetivo = 'a';
    
    document.addEventListener('keydown', (event) => {
        // Convertimos la tecla presionada a minúscula para comparar sin importar si CapsLock está activo
        const teclaPresionada = event.key.toLowerCase();
        
        if (teclaPresionada === teclaObjetivo) {
            resultadoDisplay.textContent = '¡Correcto! Has presionado la tecla A.';
            resultadoDisplay.style.color = 'green';
        } else {
            resultadoDisplay.textContent = `Incorrecto. Presionaste "${event.key}". Intenta presionar "A".`;
            resultadoDisplay.style.color = 'red';
        }
    });
});