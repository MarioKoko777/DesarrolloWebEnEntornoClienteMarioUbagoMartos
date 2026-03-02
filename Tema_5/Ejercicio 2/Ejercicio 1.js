// script.js - Código optimizado
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Elementos del DOM
    const contadorElement = document.getElementById('contador');
    const botonElement = document.getElementById('btnIncrementar');
    
    // Estado inicial
    let valorActual = 0;
    
    /**
     * Función para incrementar el contador
     * Actualiza el DOM y aplica efectos visuales
     */
    function incrementarContador() {
        // Incrementar valor
        valorActual++;
        
        // Actualizar DOM
        contadorElement.textContent = valorActual;
        
        // Efecto visual
        contadorElement.classList.add('click');
        setTimeout(() => {
            contadorElement.classList.remove('click');
        }, 200);
    }
    
    /**
     * Función para reiniciar el contador
     * (Opcional - descomentar si se quiere usar)
     */
    /*
    function reiniciarContador() {
        valorActual = 0;
        contadorElement.textContent = valorActual;
    }
    */
    
    // Event listener para el botón
    botonElement.addEventListener('click', incrementarContador);
    
    // Event listener para tecla espacio (opcional)
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.key === ' ') {
            event.preventDefault();
            incrementarContador();
        }
    });
    
    console.log('Contador inicializado correctamente');
});