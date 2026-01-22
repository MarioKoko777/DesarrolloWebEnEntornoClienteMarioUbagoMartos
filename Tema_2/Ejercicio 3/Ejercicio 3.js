// Crear un objeto Date (fecha actual)
let fecha = new Date();
console.log("Año:", fecha.getFullYear());       // Año completo, ej: 2026
console.log("Mes:", fecha.getMonth() + 1);      // Mes (0-11, por eso +1)
console.log("Día del mes:", fecha.getDate());   // Día del mes (1-31)
console.log("Día de la semana:", fecha.getDay()); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
console.log("Hora:", fecha.getHours());         // 0-23
console.log("Minutos:", fecha.getMinutes());    // 0-59
console.log("Segundos:", fecha.getSeconds());   // 0-59