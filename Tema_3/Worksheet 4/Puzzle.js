class Puzzle {
  constructor(dimension) {
    this.dimension = dimension;          // Tamaño del tablero (dimension x dimension)
    this.tablero = [];                   // Matriz que representa el tablero
    this.hueco = { fila: dimension - 1, col: dimension - 1 }; // Hueco inicial
    this.movimientos = 0;                // Contador de movimientos
    this.tiempoInicio = null;            // Tiempo de inicio
    this.tiempoFin = null;               // Tiempo de fin
    this.generarTablero();
  }
  // Generar tablero aleatorio
  generarTablero() {
    // Crear array con números del 1 al n*n-1 + hueco como 0
    let numeros = Array.from({ length: this.dimension ** 2 - 1 }, (_, i) => i + 1);
    numeros.push(0); // 0 representa el hueco
    // Mezclar aleatoriamente
    numeros = this.barajar(numeros);
    // Pasar a matriz bidimensional
    this.tablero = [];
    for (let i = 0; i < this.dimension; i++) {
      this.tablero.push(numeros.slice(i * this.dimension, (i + 1) * this.dimension));
    }
    // Actualizar posición del hueco
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        if (this.tablero[i][j] === 0) {
          this.hueco = { fila: i, col: j };
          break;
        }
      }
    }
    this.movimientos = 0;
    this.tiempoInicio = new Date();
    this.tiempoFin = null;
  }
  // Método para barajar un array (Fisher-Yates)
  barajar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  // Dibujar el tablero en consola
  dibujar() {
    console.log("Tablero:");
    this.tablero.forEach(fila => {
      console.log(fila.map(n => (n === 0 ? " " : n)).join("\t"));
    });
    console.log(`Movimientos: ${this.movimientos}`);
  }
  // Mover el hueco si es válido
  mover(direccion) {
    const { fila, col } = this.hueco;
    let nuevaFila = fila;
    let nuevaCol = col;
    switch (direccion) {
      case "arriba": nuevaFila = fila - 1; break;
      case "abajo": nuevaFila = fila + 1; break;
      case "izquierda": nuevaCol = col - 1; break;
      case "derecha": nuevaCol = col + 1; break;
      default: 
        console.log("Dirección inválida. Usa 'arriba', 'abajo', 'izquierda', 'derecha'.");
        return false;
    }
    // Validar movimiento
    if (nuevaFila < 0 || nuevaFila >= this.dimension || nuevaCol < 0 || nuevaCol >= this.dimension) {
      console.log("Movimiento fuera de límites.");
      return false;
    }
    // Intercambiar hueco con la pieza
    [this.tablero[fila][col], this.tablero[nuevaFila][nuevaCol]] =
      [this.tablero[nuevaFila][nuevaCol], this.tablero[fila][col]];
    // Actualizar posición del hueco y contador de movimientos
    this.hueco = { fila: nuevaFila, col: nuevaCol };
    this.movimientos++;
    // Comprobar si se resolvió
    if (this.resuelto()) {
      this.tiempoFin = new Date();
      console.log(`¡Puzzle resuelto en ${this.movimientos} movimientos! Tiempo: ${this.tiempoFinal()} segundos.`);
    }
    return true;
  }
  // Comprobar si el puzzle está resuelto
  resuelto() {
    let contador = 1;
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        if (i === this.dimension - 1 && j === this.dimension - 1) {
          if (this.tablero[i][j] !== 0) return false;
        } else {
          if (this.tablero[i][j] !== contador) return false;
          contador++;
        }
      }
    }
    return true;
  }
  // Tiempo final en segundos
  tiempoFinal() {
    if (!this.tiempoFin) return null;
    return ((this.tiempoFin - this.tiempoInicio) / 1000).toFixed(2);
  }
}
// ===== Ejemplo de uso =====
const puzzle = new Puzzle(3); // tablero 3x3
puzzle.dibujar();
// Mover piezas
puzzle.mover("arriba");
puzzle.dibujar();
puzzle.mover("izquierda");
puzzle.dibujar();