/**
 * Genera un mapa de búsqueda del tesoro aleatorio
 * @param {number} filas - número de filas (al menos 5)
 * @param {number} columnas - número de columnas (al menos 5)
 * @returns {number[][]} - array bidimensional válido para treasure hunt
 */
function crearMapaTesoro(filas, columnas) {
    // Validar tamaño mínimo
    if (filas < 5 || columnas < 5) {
        throw new Error("Las dimensiones deben ser al menos 5x5");
    }
    // Crear array vacío
    const mapa = Array.from({ length: filas }, () => Array(columnas).fill(0));
    // Llenar celdas aleatoriamente
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            // Generar fila y columna aleatoria válidas (1-index)
            const filaDestino = Math.floor(Math.random() * filas) + 1;
            const colDestino = Math.floor(Math.random() * columnas) + 1;
            mapa[i][j] = filaDestino * 10 + colDestino;
        }
    }
    // Colocar tesoro en una celda aleatoria: su valor = coordenadas
    const tesoroFila = Math.floor(Math.random() * filas);
    const tesoroCol = Math.floor(Math.random() * columnas);
    mapa[tesoroFila][tesoroCol] = (tesoroFila + 1) * 10 + (tesoroCol + 1);
    return mapa;
}
// Función para generar y mostrar el mapa
function generarMapa() {
    const filas = parseInt(document.getElementById("filas").value);
    const columnas = parseInt(document.getElementById("columnas").value);
    const mapa = crearMapaTesoro(filas, columnas);
    let output = "Mapa de Tesoro Generado:\n\n";
    mapa.forEach(row => {
        output += row.join("  ") + "\n";
    });
    document.getElementById("output").textContent = output;
}