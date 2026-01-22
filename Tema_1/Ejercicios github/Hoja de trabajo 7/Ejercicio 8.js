function squareAndSum(...args) {
    let suma = 0;
    for (let num of args) {
        suma += num ** 2; // Elevar al cuadrado y sumar
    }
    return suma;
}
// Ejemplos de uso
console.log(squareAndSum(2, 4, 3)); // 2² + 4² + 3² = 4 + 16 + 9 = 29
console.log(squareAndSum(1, 2));    // 1² + 2² = 1 + 4 = 5