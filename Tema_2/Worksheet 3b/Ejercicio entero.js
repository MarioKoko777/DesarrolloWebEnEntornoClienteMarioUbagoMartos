// Función para validar tarjeta con Luhn
function luhnCheck(number) {
  let sum = 0;
  for (let i = 0; i < number.length; i++) {
    let digit = parseInt(number[number.length - 1 - i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}
// Función principal de validación
function validateCreditCardDetailed(cardNumber) {
  // Eliminar guiones
  const number = cardNumber.replace(/-/g, "");
  // 1️ Revisar que tenga 16 dígitos
  if (!/^\d{16}$/.test(number)) {
    return { valid: false, number: cardNumber, error: "wrong_length_or_characters" };
  }
  // 2️ Al menos 2 dígitos diferentes
  const uniqueDigits = new Set(number);
  if (uniqueDigits.size < 2) {
    return { valid: false, number: cardNumber, error: "only_one_type_of_digit" };
  }
  // 3️ Último dígito par
  if (parseInt(number[number.length - 1]) % 2 !== 0) {
    return { valid: false, number: cardNumber, error: "last_digit_not_even" };
  }
  // 4️ Suma de dígitos > 16
  const sum = number.split("").reduce((acc, d) => acc + parseInt(d), 0);
  if (sum <= 16) {
    return { valid: false, number: cardNumber, error: "sum_less_than_16" };
  }
  // 5️ Verificación Luhn
  if (!luhnCheck(number)) {
    return { valid: false, number: cardNumber, error: "failed_luhn_check" };
  }
  //Si pasa todas las reglas
  return { valid: true, number: cardNumber };
}
// Ejemplos de prueba
console.log(validateCreditCardDetailed("9999-7777-8888-0000")); // válido
console.log(validateCreditCardDetailed("6666-6666-6666-1666")); // válido
console.log(validateCreditCardDetailed("4444444444444444"));     // inválido
console.log(validateCreditCardDetailed("1111111111111110"));     // inválido
console.log(validateCreditCardDetailed("6666666666666661"));     // inválido