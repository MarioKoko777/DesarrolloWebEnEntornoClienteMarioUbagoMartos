function capitalizarFrase(frase) {
  return frase
    .split(" ")                     // Divide la frase en palabras
    .map(palabra => 
      palabra.charAt(0).toUpperCase() + palabra.slice(1) // Capitaliza primera letra
    )
    .join(" ");                     // Une las palabras nuevamente
}
let frase = "hola mundo desde javascript";
let resultado = capitalizarFrase(frase);
console.log(resultado); // "Hola Mundo Desde Javascript"