// Array de ejemplo
const colores = ["rojo", "verde", "azul", "amarillo", "morado"];
console.log("Usando for clásico:");
for (let i = 0; i < colores.length; i++) {
    console.log(colores[i]);
}
console.log("\nUsando for...of:");
for (const color of colores) {
    console.log(color);
}
console.log("\nUsando forEach():");
colores.forEach((color) => {
    console.log(color);
});