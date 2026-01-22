class Casilla {
    constructor() {
        this.mina = false;
        this.descubierta = false;
        this.bandera = false; // para marcar la casilla con bandera si se quiere
        this.numero = 0; // número de minas vecinas
    }
}
class Buscaminas {
    constructor(filas = 8, columnas = 8, minas = 10, tiempoLimite = 120) {
        this.filas = filas;
        this.columnas = columnas;
        this.minas = minas;
        this.tiempoLimite = tiempoLimite; // en segundos
        this.tablero = [];
        this.inicio = null;
        this.fin = null;
        this.juegoTerminado = false;
        this.crearTablero();
        this.colocarMinas();
        this.calcularNumeros();
    }
    crearTablero() {
        for (let i = 0; i < this.filas; i++) {
            const fila = [];
            for (let j = 0; j < this.columnas; j++) {
                fila.push(new Casilla());
            }
            this.tablero.push(fila);
        }
    }
    colocarMinas() {
        let minasColocadas = 0;
        while (minasColocadas < this.minas) {
            const i = Math.floor(Math.random() * this.filas);
            const j = Math.floor(Math.random() * this.columnas);
            if (!this.tablero[i][j].mina) {
                this.tablero[i][j].mina = true;
                minasColocadas++;
            }
        }
    }
    calcularNumeros() {
        const dx = [-1,-1,-1,0,0,1,1,1];
        const dy = [-1,0,1,-1,1,-1,0,1];
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                if (this.tablero[i][j].mina) continue;
                let contador = 0;
                for (let k = 0; k < 8; k++) {
                    const ni = i + dx[k];
                    const nj = j + dy[k];
                    if (ni >= 0 && ni < this.filas && nj >= 0 && nj < this.columnas) {
                        if (this.tablero[ni][nj].mina) contador++;
                    }
                }
                this.tablero[i][j].numero = contador;
            }
        }
    }
    descubrirCasilla(i, j) {
        if (this.juegoTerminado) return;
        if (i < 0 || i >= this.filas || j < 0 || j >= this.columnas) return;
        const casilla = this.tablero[i][j];
        if (casilla.descubierta || casilla.bandera) return;
        casilla.descubierta = true;
        if (casilla.mina) {
            this.juegoTerminado = true;
            this.fin = new Date();
            console.log("¡Has perdido! Mina encontrada en (" + i + "," + j + ")");
            return;
        }
        if (casilla.numero === 0) {
            // descubrir casillas vecinas recursivamente
            const dx = [-1,-1,-1,0,0,1,1,1];
            const dy = [-1,0,1,-1,1,-1,0,1];
            for (let k = 0; k < 8; k++) {
                const ni = i + dx[k];
                const nj = j + dy[k];
                this.descubrirCasilla(ni, nj);
            }
        }
        if (this.verificarVictoria()) {
            this.juegoTerminado = true;
            this.fin = new Date();
            console.log("¡Felicidades! Has ganado el juego.");
        }
    }
    verificarVictoria() {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                const casilla = this.tablero[i][j];
                if (!casilla.mina && !casilla.descubierta) return false;
            }
        }
        return true;
    }
    imprimirTablero() {
        console.log("Tablero actual:");
        for (let i = 0; i < this.filas; i++) {
            let fila = "";
            for (let j = 0; j < this.columnas; j++) {
                const c = this.tablero[i][j];
                if (c.descubierta) {
                    fila += c.mina ? "*" : c.numero;
                } else {
                    fila += "#";
                }
                fila += " ";
            }
            console.log(fila);
        }
    }
    iniciarTemporizador() {
        this.inicio = new Date();
        const intervalo = setInterval(() => {
            if (this.juegoTerminado) {
                clearInterval(intervalo);
                return;
            }
            const ahora = new Date();
            const segundos = Math.floor((ahora - this.inicio)/1000);
            if (segundos >= this.tiempoLimite) {
                this.juegoTerminado = true;
                console.log("¡Tiempo límite alcanzado! Has perdido.");
                clearInterval(intervalo);
            }
        }, 1000);
    }
}
// --- EJEMPLO DE USO ---
const juego = new Buscaminas();
juego.iniciarTemporizador();
// Descubrir algunas casillas de prueba
juego.descubrirCasilla(0,0);
juego.imprimirTablero();
// Para probar más, llama a descubrirCasilla(i,j) en consola