// Array de números
const numeros = [5, 10, 15, 20, 25];
// Número a buscar
const buscar = 15;
// Usando indexOf()
const indice = numeros.indexOf(buscar);
if (indice !== -1) {
    console.log(`indexOf: El número ${buscar} se encuentra en el índice ${indice}.`);
} else {
    console.log(`indexOf: El número ${buscar} no se encuentra en el array.`);
}
// Usando includes()
if (numeros.includes(buscar)) {
    console.log(`includes: El número ${buscar} está en el array.`);
} else {
    console.log(`includes: El número ${buscar} no está en el array.`);
}