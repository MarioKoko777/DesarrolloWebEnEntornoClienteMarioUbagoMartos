// Clase Player
class Player {
    constructor(nombre) {
        this.nombre = nombre;
        this.victorias = 0;
        this.derrotas = 0;
        this.movimiento = null; // piedra, papel o tijera
    }
    // Elegir movimiento (interactivo)
    elegirMovimiento() {
        const opciones = ['piedra', 'papel', 'tijera'];
        let eleccion;
        do {
            eleccion = prompt(`${this.nombre}, elige tu movimiento: piedra, papel o tijera`).toLowerCase();
        } while (!opciones.includes(eleccion));
        this.movimiento = eleccion;
    }
}
// Clase Game
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.estado = "en curso";
        this.ganador = null;
    }
    // Ejecutar turno y decidir ganador
    ejecutarTurno() {
        const p1 = this.player1.movimiento;
        const p2 = this.player2.movimiento;
        if (p1 === p2) {
            console.log(`Empate! Ambos eligieron ${p1}.`);
            this.ganador = null;
        } else if (
            (p1 === 'piedra' && p2 === 'tijera') ||
            (p1 === 'tijera' && p2 === 'papel') ||
            (p1 === 'papel' && p2 === 'piedra')
        ) {
            console.log(`${this.player1.nombre} gana! ${p1} vence a ${p2}.`);
            this.player1.victorias++;
            this.player2.derrotas++;
            this.ganador = this.player1;
        } else {
            console.log(`${this.player2.nombre} gana! ${p2} vence a ${p1}.`);
            this.player2.victorias++;
            this.player1.derrotas++;
            this.ganador = this.player2;
        }
        this.estado = "terminado";
    }
    // Mostrar estado del juego
    mostrarEstado() {
        console.log("--- Estado del Juego ---");
        console.log(`${this.player1.nombre}: ${this.player1.victorias} victorias, ${this.player1.derrotas} derrotas`);
        console.log(`${this.player2.nombre}: ${this.player2.victorias} victorias, ${this.player2.derrotas} derrotas`);
        if (this.ganador) console.log(`Ganador de la ronda: ${this.ganador.nombre}`);
        else console.log("Ronda empatada.");
        console.log("------------------------");
    }
}
// ------------------------
// Iniciar juego interactivo
const nombre1 = prompt("Ingrese el nombre del Jugador 1:");
const nombre2 = prompt("Ingrese el nombre del Jugador 2:");
const jugador1 = new Player(nombre1);
const jugador2 = new Player(nombre2);
const juego = new Game(jugador1, jugador2);
// Ronda de juego
jugador1.elegirMovimiento();
jugador2.elegirMovimiento();
juego.ejecutarTurno();
juego.mostrarEstado();