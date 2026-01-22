// ===== INFORMACIÓN DEL EJERCICIO ANTERIOR =====
const clase = [];
clase[0] = "Angel Garcia, 20, 6, 7, 10";
clase[1] = "Maria Lopez, 19, 8, 9, 7";
clase[2] = "Juan Perez, 21, 5, 6, 6";
clase[3] = "Lucia Fernandez, 20, 9, 8, 9";
clase[4] = "Carlos Ruiz, 22, 7, 6, 8";
// ===== FUNCIONES =====
/**
 * Devuelve la nota de un estudiante y un trimestre.
 * Si no se indica trimestre, devuelve la nota media de sus tres notas.
 */
function obtenerNota(numEstudiante, trimestre) {
  const datos = clase[numEstudiante].split(", ");
  const notas = datos.slice(2, 5).map(Number); // solo los 3 últimos campos
  if (trimestre !== undefined) {
    if (trimestre < 1 || trimestre > 3) return null;
    return notas[trimestre - 1];
  }
  // media de notas
  const suma = notas.reduce((a, b) => a + b, 0);
  return (suma / notas.length).toFixed(2);
}
/**
 * Devuelve la edad media de todos los alumnos
 */
function edadMedia() {
  const edades = clase.map(alumno => Number(alumno.split(", ")[1]));
  const suma = edades.reduce((a, b) => a + b, 0);
  return (suma / edades.length).toFixed(2);
}