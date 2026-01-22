const grados = 45;
// Convertir grados a radianes
const radianes = grados * (Math.PI / 180);
// Calcular seno y coseno
const seno = Math.sin(radianes);
const coseno = Math.cos(radianes);
console.log(`Seno de ${grados}°:`, seno);
console.log(`Coseno de ${grados}°:`, coseno);