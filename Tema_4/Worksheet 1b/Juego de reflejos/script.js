document.addEventListener('DOMContentLoaded', () => {
    const circulo = document.getElementById('circulo');
    const mensaje = document.getElementById('mensaje');
    const btnReiniciar = document.getElementById('btn-reiniciar');
    
    let temporizadorId;
    let juegoActivo = false;
    let esVerde = false;
    
    function iniciarJuego() {
        // Reiniciar estado
        esVerde = false;
        juegoActivo = true;
        circulo.classList.remove('verde');
        mensaje.textContent = 'Esperando...';
        mensaje.style.color = 'black';
        btnReiniciar.style.display = 'none';
        
        // Tiempo aleatorio entre 2 y 5 segundos (2000 - 5000 ms)
        const tiempoEspera = Math.floor(Math.random() * 3000) + 2000;
        
        temporizadorId = setTimeout(() => {
            esVerde = true;
            circulo.classList.add('verde');
            mensaje.textContent = '¡AHORA!';
        }, tiempoEspera);
    }
    
    circulo.addEventListener('click', () => {
        if (!juegoActivo) return; // Si el juego ya terminó, ignorar clics
        
        if (esVerde) {
            // Éxito: clic cuando está verde
            mensaje.textContent = '¡Reflejos rápidos!';
            mensaje.style.color = 'green';
            juegoActivo = false;
            btnReiniciar.style.display = 'block';
        } else {
            // Fallo: clic antes de tiempo
            clearTimeout(temporizadorId); // Cancelar el cambio a verde
            mensaje.textContent = 'Demasiado pronto...';
            mensaje.style.color = 'red';
            juegoActivo = false;
            btnReiniciar.style.display = 'block';
        }
    });
    
    btnReiniciar.addEventListener('click', iniciarJuego);
    
    // Iniciar el juego automáticamente al cargar
    iniciarJuego();
});