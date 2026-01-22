/**
 * Devuelve el día de la semana del primer día de un mes
 * @param {number} año - Año (ej. 2026)
 * @param {number} mes - Mes (1 = enero, 12 = diciembre)
 * @returns {string} Nombre del día de la semana
 */
function primerDiaDelMes(año, mes) {
  // Crear fecha del primer día del mes (mes - 1 porque enero = 0)
  const fecha = new Date(año, mes - 1, 1);
  // Array con nombres de los días de la semana
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return diasSemana[fecha.getDay()]; // getDay() devuelve 0 (domingo) a 6 (sábado)
}
// Ejemplo de uso
const año = 2026;
const mes = 1; // Enero
console.log(`El primer día de ${mes}/${año} fue:`, primerDiaDelMes(año, mes));