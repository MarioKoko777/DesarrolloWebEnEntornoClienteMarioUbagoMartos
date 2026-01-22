function sumarTodos(...numeros) {
    let suma = 0;
    for (let num of numeros) {
        suma += num;
    }
    return suma;
}
// Ejemplo de uso
console.log(sumarTodos(1, 2, 3, 4)); // 10
console.log(sumarTodos(5, 10, 15));  // 30
console.log(sumarTodos());           // 0