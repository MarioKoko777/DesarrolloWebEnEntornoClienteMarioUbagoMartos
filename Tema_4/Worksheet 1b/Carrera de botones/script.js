document.addEventListener('DOMContentLoaded', () => {
    const btnCorrer = document.getElementById('btn-correr');
    const btnReiniciar = document.getElementById('btn-reiniciar');
    const progressBar = document.getElementById('progress-bar');
    const porcentajeDisplay = document.getElementById('porcentaje');
    const mensajeDisplay = document.getElementById('mensaje');
    
    let progreso = 0;
    const incremento = 5; // Porcentaje que avanza por clic
    
    btnCorrer.addEventListener('click', () => {
        if (progreso < 100) {
            progreso += incremento;
            if (progreso > 100) progreso = 100;
            
            actualizarBarra();
            
            if (progreso === 100) {
                juegoTerminado();
            }
        }
    });
    
    btnReiniciar.addEventListener('click', reiniciarJuego);
    
    function actualizarBarra() {
        progressBar.style.width = `${progreso}%`;
        porcentajeDisplay.textContent = `${progreso}%`;
    }
    
    function juegoTerminado() {
        mensajeDisplay.textContent = '¡Llegaste a la meta!';
        mensajeDisplay.style.color = '#c2185b';
        btnCorrer.style.display = 'none';
        btnReiniciar.style.display = 'inline-block';
        
        // Efecto visual final
        progressBar.style.backgroundColor = '#4caf50'; // Cambiar a verde
    }
    
    function reiniciarJuego() {
        progreso = 0;
        actualizarBarra();
        mensajeDisplay.textContent = '';
        btnCorrer.style.display = 'inline-block';
        btnReiniciar.style.display = 'none';
        progressBar.style.backgroundColor = '#e91e63'; // Volver a rosa
    }
});