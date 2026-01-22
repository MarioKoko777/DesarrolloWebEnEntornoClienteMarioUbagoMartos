// Dataset en formato string
const dataString = "10 20 30 40 50 60";
// 1. Convertir string a array de números
const dataArray = dataString.split(" ").map(Number);
console.log("Array de números:", dataArray);
// 2. Calcular Promedio
function calcularPromedio(arr) {
  const suma = arr.reduce((acc, val) => acc + val, 0);
  return suma / arr.length;
}
const promedio = calcularPromedio(dataArray);
console.log("Promedio:", promedio);
// 3. Calcular Mediana
function calcularMediana(arr) {
  const sorted = [...arr].sort((a, b) => a - b); // ordenar de menor a mayor
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    // si es par, promedio de los dos del medio
    return (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    // si es impar, el del medio
    return sorted[mid];
  }
}
const mediana = calcularMediana(dataArray);
console.log("Mediana:", mediana);
// 4. Calcular Desviación Estándar
function calcularDesviacionEstandar(arr) {
  const mean = calcularPromedio(arr);
  const sumCuadrados = arr.reduce((acc, val) => acc + (val - mean) ** 2, 0);
  const variance = sumCuadrados / arr.length; // para población completa
  return Math.sqrt(variance);
}
const desviacionEstandar = calcularDesviacionEstandar(dataArray);
console.log("Desviación Estándar:", desviacionEstandar.toFixed(2));