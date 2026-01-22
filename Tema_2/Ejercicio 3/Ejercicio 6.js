// Fecha actual
let hoy = new Date();
// Próximo 31 de diciembre del año actual
let finAnio = new Date(hoy.getFullYear(), 11, 31); // Mes 11 = diciembre
// Diferencia en milisegundos
let diferenciaMs = finAnio - hoy;
// Convertir a días (1 día = 1000 ms * 60 s * 60 min * 24 h)
let diferenciaDias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
console.log("Días hasta el 31 de diciembre:", diferenciaDias);