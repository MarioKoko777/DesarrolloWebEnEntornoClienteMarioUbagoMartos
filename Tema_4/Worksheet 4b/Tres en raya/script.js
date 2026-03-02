document.addEventListener('DOMContentLoaded', () => {
    const celdas = document.querySelectorAll('.celda');
    const statusText = document.getElementById('status');
    const turnoJugadorSpan = document.getElementById('turno-jugador');
    const btnReiniciar = document.getElementById('btn-reiniciar');
    const mensajeFinal = document.getElementById('mensaje-final');
    const textoMensaje = document.getElementById('texto-mensaje');

    let jugadorActual = 'X';
    let juegoActivo = true;
    let estadoJuego = ["", "", "", "", "", "", "", "", ""];

    const condicionesVictoria = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function manejarClickCelda(evento) {
        const celdaClickeada = evento.target;
        const indiceCelda = parseInt(celdaClickeada.getAttribute('data-index'));

        if (estadoJuego[indiceCelda] !== "" || !juegoActivo) {
            return;
        }

        manejarJugada(celdaClickeada, indiceCelda);
        validarResultado();
    }

    function manejarJugada(celda, indice) {
        estadoJuego[indice] = jugadorActual;
        celda.textContent = jugadorActual;
        celda.classList.add(jugadorActual.toLowerCase()); // Añade clase 'x' o 'o' para estilos
    }

    function validarResultado() {
        let rondaGanada = false;
        let celdasGanadoras = [];

        for (let i = 0; i < condicionesVictoria.length; i++) {
            const condicion = condicionesVictoria[i];
            const a = estadoJuego[condicion[0]];
            const b = estadoJuego[condicion[1]];
            const c = estadoJuego[condicion[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                rondaGanada = true;
                celdasGanadoras = condicion;
                break;
            }
        }

        if (rondaGanada) {
            finalizarJuego(true, celdasGanadoras);
            return;
        }

        const rondaEmpate = !estadoJuego.includes("");
        if (rondaEmpate) {
            finalizarJuego(false);
            return;
        }

        cambiarJugador();
    }

    function cambiarJugador() {
        jugadorActual = jugadorActual === "X" ? "O" : "X";
        turnoJugadorSpan.textContent = jugadorActual;
        turnoJugadorSpan.style.color = jugadorActual === 'X' ? '#e74c3c' : '#3498db';
    }

    function finalizarJuego(ganador, celdasGanadoras = []) {
        juegoActivo = false;
        if (ganador) {
            textoMensaje.textContent = `¡El jugador ${jugadorActual} ha ganado!`;
            celdasGanadoras.forEach(indice => {
                celdas[indice].classList.add('ganadora');
            });
        } else {
            textoMensaje.textContent = "¡Es un empate!";
        }
        mensajeFinal.classList.remove('oculto');
    }

    function reiniciarJuego() {
        jugadorActual = "X";
        juegoActivo = true;
        estadoJuego = ["", "", "", "", "", "", "", "", ""];
        turnoJugadorSpan.textContent = jugadorActual;
        turnoJugadorSpan.style.color = '#e74c3c';
        mensajeFinal.classList.add('oculto');

        celdas.forEach(celda => {
            celda.textContent = "";
            celda.classList.remove('x', 'o', 'ganadora');
        });
    }

    celdas.forEach(celda => celda.addEventListener('click', manejarClickCelda));
    btnReiniciar.addEventListener('click', reiniciarJuego);
});