function generarTarjetaCreditoFalsa() {
  // Generamos los primeros 15 dígitos al azar
  const digitos = [];
  for (let i = 0; i < 15; i++) {
    digitos.push(Math.floor(Math.random() * 10));
  }
  // Algoritmo de Luhn para calcular el último dígito
  let suma = 0;
  let duplicar = true;
  for (let i = digitos.length - 1; i >= 0; i--) {
    let num = digitos[i];
    if (duplicar) {
      num *= 2;
      if (num > 9) num -= 9;
    }
    suma += num;
    duplicar = !duplicar;
  }
  const digitoControl = (10 - (suma % 10)) % 10;
  digitos.push(digitoControl);
  // Formato ####-####-####-####
  return digitos
    .join("")
    .match(/.{1,4}/g)
    .join("-");
}
// Ejemplo de uso
console.log(generarTarjetaCreditoFalsa());