document.addEventListener('DOMContentLoaded', () => {
    const btnStart = document.getElementById('btn-start');
    const mensaje = document.getElementById('mensaje');
    const nivelDisplay = document.getElementById('nivel');
    const botones = document.querySelectorAll('.btn-simon');
    
    const colores = ['verde', 'rojo', 'amarillo', 'azul'];
    let secuencia = [];
    let secuenciaUsuario = [];
    let nivel = 0;
    let juegoActivo = false;
    let turnoUsuario = false;

    // Sonidos (frecuencias simuladas visualmente, aquí solo lógica)
    
    btnStart.addEventListener('click', iniciarJuego);

    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            if (!juegoActivo || !turnoUsuario) return;
            
            const colorSeleccionado = e.target.id;
            iluminarColor(colorSeleccionado);
            secuenciaUsuario.push(colorSeleccionado);
            
            checkRespuesta(secuenciaUsuario.length - 1);
        });
    });

    function iniciarJuego() {
        secuencia = [];
        secuenciaUsuario = [];
        nivel = 0;
        juegoActivo = true;
        btnStart.style.display = 'none'; // Ocultar botón start
        mensaje.textContent = '¡Atento!';
        siguienteNivel();
    }

    function siguienteNivel() {
        nivel++;
        nivelDisplay.textContent = nivel;
        secuenciaUsuario = [];
        turnoUsuario = false;
        mensaje.textContent = 'Observa la secuencia...';
        
        // Elegir color aleatorio
        const colorAleatorio = colores[Math.floor(Math.random() * 4)];
        secuencia.push(colorAleatorio);
        
        // Reproducir secuencia
        let i = 0;
        const intervalo = setInterval(() => {
            iluminarColor(secuencia[i]);
            i++;
            if (i >= secuencia.length) {
                clearInterval(intervalo);
                setTimeout(() => {
                    turnoUsuario = true;
                    mensaje.textContent = '¡Tu turno!';
                }, 800);
            }
        }, 1000);
    }

    function iluminarColor(color) {
        const boton = document.getElementById(color);
        boton.classList.add('active');
        setTimeout(() => {
            boton.classList.remove('active');
        }, 500);
    }

    function checkRespuesta(indiceActual) {
        if (secuenciaUsuario[indiceActual] === secuencia[indiceActual]) {
            // Correcto hasta ahora
            if (secuenciaUsuario.length === secuencia.length) {
                // Secuencia completada
                mensaje.textContent = '¡Correcto!';
                turnoUsuario = false;
                setTimeout(siguienteNivel, 1000);
            }
        } else {
            // Fallo
            gameOver();
        }
    }

    function gameOver() {
        juegoActivo = false;
        mensaje.textContent = '¡Fallaste! Juego terminado.';
        mensaje.style.color = 'red';
        
        // Efecto visual de error
        document.body.style.backgroundColor = '#500';
        setTimeout(() => {
            document.body.style.backgroundColor = '#222';
            mensaje.style.color = 'white';
            btnStart.textContent = 'Reintentar';
            btnStart.style.display = 'inline-block';
        }, 1500);
    }
});