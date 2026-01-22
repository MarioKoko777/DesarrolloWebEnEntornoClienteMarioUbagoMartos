// Usando Number()
console.log(Number("123"));   // 123
console.log(Number("3.14"));  // 3.14
console.log(Number("abc"));   // NaN
// Usando parseInt()
console.log(parseInt("123"));   // 123
console.log(parseInt("3.14"));  // 3
console.log(parseInt("abc"));   // NaN
// Usando parseFloat()
console.log(parseFloat("123"));   // 123
console.log(parseFloat("3.14"));  // 3.14
console.log(parseFloat("abc"));   // NaN
//Number() convierte toda la cadena o falla, parseInt() toma solo la parte entera y parseFloat() toma el número incluyendo decimales.