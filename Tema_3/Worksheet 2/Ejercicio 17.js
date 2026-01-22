// Arrays de ejemplo
const nombres = ["Ana", "Luis", "Carlos"];
const edades = [25, 30, 22];
// Combinamos usando map
const personas = nombres.map((nombre, index) => {
  return { nombre: nombre, edad: edades[index] };
});
console.log(personas);