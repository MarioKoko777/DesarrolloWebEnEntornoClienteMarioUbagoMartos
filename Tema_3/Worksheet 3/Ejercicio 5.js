// Array de ejemplo 5x5
const array = [
    [34, 21, 32, 41, 25],
    [14, 42, 43, 14, 31],
    [54, 45, 52, 42, 23],
    [33, 15, 51, 31, 35],
    [21, 52, 33, 13, 23]
];
/**
 * Función que busca puntos de silla en un array 5x5
 */
function buscarPuntosDeSilla() {
    const puntos = [];
    for (let i = 0; i < 5; i++) {       // recorrer filas
        for (let j = 0; j < 5; j++) {   // recorrer columnas
            const valor = array[i][j];
            // Verificar si es >= que todos los valores en su fila
            const filaMax = Math.max(...array[i]);
            // Verificar si es <= que todos los valores en su columna
            let colMin = Infinity;
            for (let k = 0; k < 5; k++) {
                if (array[k][j] < colMin) colMin = array[k][j];
            }
            // Si cumple la condición de punto de silla
            if (valor >= filaMax && valor <= colMin) {
                puntos.push({ fila: i + 1, columna: j + 1, valor: valor });
            }
        }
    }
    // Mostrar resultados
    const output = document.getElementById("output");
    if (puntos.length === 0) {
        output.textContent = "No hay puntos de silla";
    } else {
        let texto = "Puntos de silla encontrados:\n";
        puntos.forEach(p => {
            texto += `Fila: ${p.fila}, Columna: ${p.columna}, Valor: ${p.valor}\n`;
        });
        output.textContent = texto;
    }
}