/**
 * Función que decodifica un mensaje codificado con el método de "código cuadrado"
 * @param {string} coded - Mensaje codificado (columnas separadas por espacios)
 * @returns {string} - Mensaje original
 */
function decodeSquareCode(coded) {
    // 1. Dividir las columnas
    const columns = coded.split(' ');
    // 2. Determinar el número de filas
    const rows = Math.max(...columns.map(col => col.length));
    // 3. Reconstruir el mensaje leyendo fila por fila
    let original = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns.length; c++) {
            if (columns[c][r]) { // verificar que exista el carácter
                original += columns[c][r];
            }
        }
    }
    return original;
}
// Función para usar desde HTML
function decodificarMensaje() {
    const input = document.getElementById('mensaje').value;
    if (!input) {
        alert('Introduce un mensaje codificado');
        return;
    }
    const resultado = decodeSquareCode(input);
    document.getElementById('resultado').textContent = resultado;
}