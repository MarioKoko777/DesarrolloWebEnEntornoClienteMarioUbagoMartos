const fecha1 = new Date("2026-01-19");
const fecha2 = new Date("2025-12-31");
if (fecha1 < fecha2) {
  console.log("fecha1 es anterior a fecha2");
} else if (fecha1 > fecha2) {
  console.log("fecha1 es posterior a fecha2");
} else {
  console.log("Las fechas son iguales");
}