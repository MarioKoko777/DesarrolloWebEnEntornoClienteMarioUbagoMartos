let año = 2025;
let mes = 8; // Septiembre → 0 = enero, 8 = septiembre
let fechas = [];
let fecha = new Date(año, mes, 1); // Primer día del mes
while (fecha.getMonth() === mes) {
    fechas.push(new Date(fecha)); // Guardar una copia de la fecha
    fecha.setDate(fecha.getDate() + 1); // Pasar al siguiente día
}
console.log(fechas);