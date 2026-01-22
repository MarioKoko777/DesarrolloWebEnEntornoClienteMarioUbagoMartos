let numeroSecreto = Math.floor(Math.random() * 10) + 1;
let intento;
while (intento !== numeroSecreto) {
    intento = Number(prompt("Adivina el número entre 1 y 10"));

    if (intento > numeroSecreto) {
        console.log("Demasiado alto, intenta de nuevo.");
    } else if (intento < numeroSecreto) {
        console.log("Demasiado bajo, intenta de nuevo.");
    } else if (intento === numeroSecreto) {
        console.log("¡Felicidades! Adivinaste el número.");
    } else {
        console.log("Entrada no válida, ingresa un número del 1 al 10.");
    }
}