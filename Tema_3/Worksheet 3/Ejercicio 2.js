// Array de ejemplo de nombres
const nombres = [
  "Juan", "Ana", "José", "María", "Jorge",
  "Laura", "Julieta", "Pedro", "Javier", "Marta"
];
// Referencia al div de salida
const output = document.getElementById("output");
// Arrow function para filtrar y ordenar iniciales
const filtrarNombresJ = () => {
  // 1️ Filtrar nombres que empiezan con 'J'
  const nombresConJ = nombres.filter(nombre => nombre.startsWith("J"));
  // 2️ Crear proyección con solo la inicial
  const iniciales = nombresConJ.map(nombre => nombre[0]);
  // 3️ Ordenar alfabéticamente
  const inicialesOrdenadas = iniciales.sort();
  // 4️ Mostrar resultado en la página
  output.textContent = `
Nombres que empiezan con 'J': ${nombresConJ.join(", ")}
Iniciales ordenadas alfabéticamente: ${inicialesOrdenadas.join(", ")}
  `;
};
// Asignar evento al botón
document.getElementById("filtrarBtn").onclick = filtrarNombresJ;