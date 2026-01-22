// Palabra secreta
const palabra = "javascript";
let palabraOculta = "_".repeat(palabra.length).split("");
let intentos = 6;
let letrasUsadas = [];
console.log("Juego del Ahorcado");
console.log(palabraOculta.join(" "));
while (intentos > 0 && palabraOculta.includes("_")) {
  let letra = prompt("Introduce una letra:").toLowerCase();
  // Validación
  if (!letra || letra.length !== 1) {
    alert("Introduce solo una letra");
    continue;
  }
  if (letrasUsadas.includes(letra)) {
    alert("Ya usaste esa letra");
    continue;
  }
  letrasUsadas.push(letra);
  if (palabra.includes(letra)) {
    // Reemplazar guiones por la letra correcta
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] === letra) {
        palabraOculta[i] = letra;
      }
    }
    alert("¡Correcto!");
  } else {
    intentos--;
    alert(`Incorrecto. Te quedan ${intentos} intentos`);
  }
  console.log(palabraOculta.join(" "));
}
// Resultado final
if (!palabraOculta.includes("_")) {
  alert("¡Ganaste! La palabra era: " + palabra);
} else {
  alert("Perdiste. La palabra era: " + palabra);
}