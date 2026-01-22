/**
 * Suma días a una fecha
 * @param {Date} fecha - La fecha inicial
 * @param {number} dias - Número de días a sumar
 * @returns {Date} Nueva fecha resultante
 */
function sumarDias(fecha, dias) {
  const nuevaFecha = new Date(fecha); // Crear copia para no modificar la original
  nuevaFecha.setDate(nuevaFecha.getDate() + dias);
  return nuevaFecha;
}
// Ejemplo de uso
const fechaInicial = new Date(2026, 0, 19); // 19 de enero de 2026
const diasASumar = 10;
const fechaResultante = sumarDias(fechaInicial, diasASumar);
console.log("Fecha inicial:", fechaInicial.toDateString());
console.log(`Fecha después de sumar ${diasASumar} días:`, fechaResultante.toDateString());