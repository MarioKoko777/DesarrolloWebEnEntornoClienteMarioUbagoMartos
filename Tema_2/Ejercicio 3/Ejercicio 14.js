/**
 * Calcula la edad exacta en años, meses y días
 * @param {Date} fechaNacimiento - Fecha de nacimiento
 * @returns {string} Edad en formato "X años, Y meses, Z días"
 */
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  let años = hoy.getFullYear() - fechaNacimiento.getFullYear();
  let meses = hoy.getMonth() - fechaNacimiento.getMonth();
  let dias = hoy.getDate() - fechaNacimiento.getDate();
  // Ajustar si el día actual es menor que el de nacimiento
  if (dias < 0) {
    // Tomar el último día del mes anterior
    const ultimoDiaMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
    dias += ultimoDiaMesAnterior;
    meses -= 1;
  }
  // Ajustar si el mes actual es menor que el de nacimiento
  if (meses < 0) {
    meses += 12;
    años -= 1;
  }
  return `${años} años, ${meses} meses, ${dias} días`;
}
// Ejemplo de uso
const miNacimiento = new Date(1990, 0, 19); // 19 de enero de 1990
console.log("Edad exacta:", calcularEdad(miNacimiento));