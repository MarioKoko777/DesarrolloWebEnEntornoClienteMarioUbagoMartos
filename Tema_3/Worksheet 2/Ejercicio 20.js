const numeros = [1, 2, 3, 4, 5, 6];
const sumaCuadradosPares = numeros
  .filter(num => num % 2 === 0)    // Filtra solo los pares
  .map(num => num ** 2)            // Eleva al cuadrado
  .reduce((acum, num) => acum + num, 0); // Suma todos los cuadrados
console.log(sumaCuadradosPares); // Resultado: 56