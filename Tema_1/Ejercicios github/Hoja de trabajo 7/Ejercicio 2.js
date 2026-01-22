function addOnlyNums(...args) {
    let suma = 0;
    for (let arg of args) {
        if (typeof arg === "number") { // Solo sumamos si es un número
            suma += arg;
        }
    }
    return suma;
}
// Ejemplo de uso
console.log(addOnlyNums(1, 'gato', 3, 4)); // 8
console.log(addOnlyNums(10, "hola", 5, true, 2)); // 17