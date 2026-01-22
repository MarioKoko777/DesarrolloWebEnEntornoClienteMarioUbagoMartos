// ===== INFORMACIÓN DEL EJERCICIO ANTERIOR =====
// Array que contiene los alumnos de la clase
const clase = [];
clase[0] = "Angel Garcia, 20, 6, 7, 10";
clase[1] = "Maria Lopez, 19, 8, 9, 7";
clase[2] = "Juan Perez, 21, 5, 6, 6";
clase[3] = "Lucia Fernandez, 20, 9, 8, 9";
clase[4] = "Carlos Ruiz, 22, 7, 6, 8";
// ===== FUNCIÓN DEL NUEVO EJERCICIO =====
/*
  Devuelve la nota de un estudiante y un trimestre.
  Si NO se indica trimestre, devuelve la nota media.
*/
function obtenerNota(numEstudiante, trimestre) {
  // Separar los datos del alumno
  const datos = clase[numEstudiante].split(", ");
  // Convertir las notas a número
  const nota1 = Number(datos[2]);
  const nota2 = Number(datos[3]);
  const nota3 = Number(datos[4]);
  // Si se indica trimestre
  if (trimestre !== undefined) {
    return Number(datos[1 + trimestre]);
  }
  // Si no se indica trimestre → media
  return (nota1 + nota2 + nota3) / 3;
}
// ===== PRUEBAS =====
console.log("Alumno 0 - Trimestre 1:", obtenerNota(0, 1));
console.log("Alumno 0 - Trimestre 2:", obtenerNota(0, 2));
console.log("Alumno 0 - Trimestre 3:", obtenerNota(0, 3));
console.log("Alumno 0 - Nota media:", obtenerNota(0));