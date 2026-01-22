const usuarios = [
  { nombre: "Ana", edad: 25 },
  { nombre: "Luis", edad: 30 },
  { nombre: "Marta", edad: 20 }
];
// Ordenar por edad de menor a mayor
usuarios.sort((a, b) => a.edad - b.edad);
console.log(usuarios);