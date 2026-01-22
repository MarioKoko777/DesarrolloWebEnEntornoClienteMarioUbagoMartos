// Crear el array "clase"
const clase = [];
// Cada elemento es una tupla con los datos del alumno
clase[0] = "Angel Garcia, 20, 6, 7, 10";
clase[1] = "Maria Lopez, 19, 8, 9, 7";
clase[2] = "Juan Perez, 21, 5, 6, 6";
clase[3] = "Lucia Fernandez, 20, 9, 8, 9";
clase[4] = "Carlos Ruiz, 22, 7, 6, 8";
// Mostrar la información en la página
const resultado = document.getElementById("resultado");
for (let i = 0; i < clase.length; i++) {
  resultado.innerHTML += `<p>Alumno ${i + 1}: ${clase[i]}</p>`;
}