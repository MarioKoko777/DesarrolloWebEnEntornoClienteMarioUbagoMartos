function sumEveryOther(...args) {
    let suma = 0;
    // Recorremos los argumentos de 2 en 2
    for (let i = 0; i < args.length; i += 2) {
        suma += args[i];
    }
    return suma;
}
// Ejemplos de uso
console.log(sumEveryOther(5, 6, 3, 4, 1)); // 5 + 3 + 1 = 9
console.log(sumEveryOther(10, 2, 11));     // 10 + 11 = 21