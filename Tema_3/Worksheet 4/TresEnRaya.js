// Clase principal del juego Tres en Raya
class TresEnRaya {
  constructor() {
    // Tablero de 3x3 inicializado con null
    this.tablero = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    // Jugador actual: 'X' o 'O'
    this.jugadorActual = 'X';
    this.juegoTerminado = false;
    this.ganador = null;
  }
  // Mostrar tablero en consola
  mostrarTablero() {
    console.log("Tablero:");
    this.tablero.forEach(fila => {
      console.log(fila.map(casilla => casilla ?? "_").join(" | "));
    });
    console.log("\n");
  }
  // Método para realizar un movimiento
  // fila y columna van de 0 a 2
  marcarCasilla(fila, columna) {
    if (this.juegoTerminado) {
      console.log("El juego ya ha terminado.");
      return false;
    }
    if (this.tablero[fila][columna] !== null) {
      console.log("Casilla ocupada, elige otra.");
      return false;
    }
    // Marcar casilla con el jugador actual
    this.tablero[fila][columna] = this.jugadorActual;
    // Comprobar si hay ganador
    if (this.comprobarGanador(fila, columna)) {
      this.juegoTerminado = true;
      this.ganador = this.jugadorActual;
      console.log(`¡Jugador ${this.jugadorActual} ha ganado!`);
    } else if (this.tableroLleno()) {
      this.juegoTerminado = true;
      console.log("¡Empate!");
    } else {
      // Cambiar turno
      this.jugadorActual = this.jugadorActual === 'X' ? 'O' : 'X';
    }
    this.mostrarTablero();
    return true;
  }
  // Comprobar si el tablero está lleno
  tableroLleno() {
    return this.tablero.every(fila => fila.every(casilla => casilla !== null));
  }
  // Comprobar si el jugador actual ha ganado
  comprobarGanador(fila, columna) {
    const simbolo = this.jugadorActual;
    // 1️ Comprobar fila
    if (this.tablero[fila].every(casilla => casilla === simbolo)) return true;
    // 2️ Comprobar columna
    if (this.tablero.every(f => f[columna] === simbolo)) return true;
    // 3️ Comprobar diagonales
    if (fila === columna && this.tablero.every((f, i) => f[i] === simbolo)) return true;
    if (fila + columna === 2 && this.tablero.every((f, i) => f[2 - i] === simbolo)) return true;
    return false;
  }
}
// Ejemplo de uso en consola
const juego = new TresEnRaya();
juego.mostrarTablero();
// Simulación de movimientos
// jugador X
juego.marcarCasilla(0, 0);
// jugador O
juego.marcarCasilla(0, 1);
// jugador X
juego.marcarCasilla(1, 1);
// jugador O
juego.marcarCasilla(0, 2);
// jugador X
juego.marcarCasilla(2, 2); // ¡X gana en diagonal!