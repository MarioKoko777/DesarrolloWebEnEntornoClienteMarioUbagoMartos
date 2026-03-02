document.addEventListener('DOMContentLoaded', () => {
    const numeroObjetivoDisplay = document.getElementById('numero-objetivo');
    const gridNumeros = document.getElementById('grid-numeros');
    const mensajeDisplay = document.getElementById('mensaje');
    const btnReiniciar = document.getElementById('btn-reiniciar');
    
    let numeroObjetivo;
    let juegoActivo = true;
    
    function iniciarJuego() {
        juegoActivo = true;
        mensajeDisplay.textContent = '';
        btnReiniciar.style.display = 'none';
        gridNumeros.innerHTML = ''; // Limpiar botones anteriores
        
        // Elegir número objetivo aleatorio entre 1 y 9
        numeroObjetivo = Math.floor(Math.random() * 9) + 1;
        numeroObjetivoDisplay.textContent = numeroObjetivo;
        
        // Crear botones del 1 al 9
        for (let i = 1; i <= 9; i++) {
            const boton = document.createElement('button');
            boton.textContent = i;
            boton.classList.add('btn-numero');
            boton.dataset.numero = i;
            
            boton.addEventListener('click', manejarClick);
            
            gridNumeros.appendChild(boton);
        }
    }
    
    function manejarClick(event) {
        if (!juegoActivo) return;
        
        const numeroSeleccionado = parseInt(event.target.dataset.numero);
        
        if (numeroSeleccionado === numeroObjetivo) {
            mensajeDisplay.textContent = '¡Correcto! ¡Muy bien!';
            mensajeDisplay.style.color = 'green';
            juegoActivo = false; // Terminar juego
            btnReiniciar.style.display = 'inline-block';
            
            // Efecto visual en el botón correcto
            event.target.style.backgroundColor = '#4caf50';
        } else {
            mensajeDisplay.textContent = `Incorrecto. Ese es el ${numeroSeleccionado}. Intenta de nuevo.`;
            mensajeDisplay.style.color = 'red';
            
            // Efecto visual en el botón incorrecto (opcional)
            event.target.style.backgroundColor = '#f44336';
            setTimeout(() => {
                event.target.style.backgroundColor = ''; // Volver al color original
            }, 500);
        }
    }
    
    btnReiniciar.addEventListener('click', iniciarJuego);
    
    // Iniciar la primera vez
    iniciarJuego();
});