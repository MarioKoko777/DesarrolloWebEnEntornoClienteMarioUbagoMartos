// Tangente de 60 grados
let grados = 60;
let radianes = grados * (Math.PI / 180); // convertir a radianes
let tangente = Math.tan(radianes);
console.log(tangente); // ≈ 1.732
// Arco tangente y conversión a grados
let valor = 1; // ejemplo
let arcoTangente = Math.atan(valor); // devuelve en radianes
let arcoGrados = arcoTangente * (180 / Math.PI); // convertir a grados
console.log(arcoGrados); // ≈ 45