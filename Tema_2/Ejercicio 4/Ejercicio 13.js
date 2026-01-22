function contarVocales(cadena) {
    // Convertir todo a minúsculas para simplificar
    cadena = cadena.toLowerCase();
    // Definir las vocales
    const vocales = "aeiou";
    let contador = 0;
    // Recorrer cada carácter de la cadena
    for (let char of cadena) {
        if (vocales.includes(char)) {
            contador++;
        }
    }
    return contador;
}
// Ejemplo
let texto = "Programar es divertido";
console.log(contarVocales(texto)); // 8