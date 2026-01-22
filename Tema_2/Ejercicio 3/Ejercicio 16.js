function proximoViernes13() {
  let hoy = new Date();
  let año = hoy.getFullYear();
  let mes = hoy.getMonth();
  while (true) {
    const fecha = new Date(año, mes, 13); // día 13 del mes actual
    if (fecha > hoy && fecha.getDay() === 5) {
      return fecha;
    }
    mes++;
    if (mes > 11) { // si pasamos diciembre, aumentamos el año
      mes = 0;
      año++;
    }
  }
}
const siguienteViernes13 = proximoViernes13();
console.log("El próximo viernes 13 es:", siguienteViernes13.toDateString());