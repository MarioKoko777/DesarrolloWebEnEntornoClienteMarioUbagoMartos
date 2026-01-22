// Generar un número aleatorio entre 1 y 100
const numeroSecreto = Math.floor(Math.random() * 100) + 1;
let adivinado = false;
while (!adivinado) {
  // Pedir al usuario un número
  const input = prompt("Adivina el número entre 1 y 100:");
  const intento = parseInt(input);

  if (isNaN(intento)) {
    alert("Por favor, ingresa un número válido.");
    continue;
  }
  // Comparar con el número secreto
  if (intento === numeroSecreto) {
    alert(`¡Felicidades! Adivinaste el número ${numeroSecreto}.`);
    adivinado = true;
  } else if (intento < numeroSecreto) {
    alert("El número es mayor. Intenta de nuevo.");
  } else {
    alert("El número es menor. Intenta de nuevo.");
  }
}