// Fecha de nacimiento: 19 de enero de 1990
const fechaNacimiento = new Date(1990, 0, 19); // Año, Mes (0 = enero), Día
console.log("Fecha de nacimiento:", fechaNacimiento);
console.log("Año:", fechaNacimiento.getFullYear());
console.log("Mes:", fechaNacimiento.getMonth() + 1); // +1 porque los meses empiezan en 0
console.log("Día:", fechaNacimiento.getDate());