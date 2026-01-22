/**
 * Formatea una fecha a DD/MM/YYYY HH:mm:ss
 * @param {Date} fecha - Objeto Date a formatear
 * @returns {string} Fecha formateada
 */
function formatearFecha(fecha) {
  // Extraer componentes de la fecha
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
  const año = fecha.getFullYear();
  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  const segundos = String(fecha.getSeconds()).padStart(2, "0");
  // Construir string con el formato deseado
  return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
}
// Ejemplo de uso
const ahora = new Date();
console.log("Fecha formateada:", formatearFecha(ahora));