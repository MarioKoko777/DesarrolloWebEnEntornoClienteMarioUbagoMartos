/**
 * Función que codifica un mensaje usando el método de "código cuadrado"
 * @param {string} text - Mensaje a codificar (máx 81 caracteres)
 * @returns {string} - Mensaje codificado
 */
function squareCode(text) {
    // 1. Eliminar espacios
    const cleanText = text.replace(/\s+/g, '');
    // 2. Determinar tamaño del rectángulo
    const length = cleanText.length;
    const columns = Math.ceil(Math.sqrt(length)); // número de columnas
    const rows = Math.ceil(length / columns);     // número de filas
    // 3. Construir el rectángulo
    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push(cleanText.slice(i * columns, (i + 1) * columns));
    }
    // 4. Leer columna por columna
    const encoded = [];
    for (let c = 0; c < columns; c++) {
        let col = '';
        for (let r = 0; r < rows; r++) {
            if (grid[r][c]) col += grid[r][c];
        }
        encoded.push(col);
    }
    // 5. Unir con espacios
    return encoded.join(' ');
}
// Función para usar desde el HTML
function codificarMensaje() {
    const input = document.getElementById('mensaje').value;
    if (!input) {
        alert('Introduce un mensaje');
        return;
    }
    const resultado = squareCode(input);
    document.getElementById('resultado').textContent = resultado;
}