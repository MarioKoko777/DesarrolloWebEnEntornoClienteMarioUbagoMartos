// Treasure Hunt - Búsqueda del Tesoro
// Mapa del tesoro: 5x5
const mapa = [
    [34, 21, 32, 41, 25],
    [14, 42, 43, 14, 31],
    [54, 45, 52, 42, 23],
    [33, 15, 51, 31, 35],
    [21, 52, 33, 13, 23]
];
// Función para buscar el tesoro
function buscarTesoro() {
    let output = "";
    let fila = 1; // coordenadas comienzan en 1
    let col = 1;
    let encontrado = false;
    while (!encontrado) {
        // Ajustar a índices del array (0-4)
        let valor = mapa[fila - 1][col - 1];
        output += `Visitando celda (${fila},${col}) -> valor: ${valor}\n`;
        // Verificar si el valor es igual a sus coordenadas
        if (valor === fila * 10 + col) {
            encontrado = true;
            output += `\n¡Tesoro encontrado en la celda (${fila},${col})!`;
            break;
        }
        // El valor indica la siguiente celda: decena = fila, unidad = columna
        fila = Math.floor(valor / 10);
        col = valor % 10;
    }
    document.getElementById("output").textContent = output;
}