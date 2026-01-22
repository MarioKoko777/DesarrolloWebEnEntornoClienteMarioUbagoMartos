const personas = [
  { nombre: "Ana", edad: 23 },
  { nombre: "Luis", edad: 30 }
];
// Usando map() para obtener solo los nombres
const nombres = personas.map(persona => persona.nombre);
console.log(nombres); // ["Ana", "Luis"]