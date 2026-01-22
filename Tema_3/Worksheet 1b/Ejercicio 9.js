const fibonacci = n => n < 3 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
// Ejemplos de uso
console.log(fibonacci(1)); // 1
console.log(fibonacci(5)); // 5
console.log(fibonacci(10)); // 55