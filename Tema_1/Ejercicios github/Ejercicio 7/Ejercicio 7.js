let num = Number(prompt("Ingrese un número"));
// Un número menor que 2 no es primo
if (num < 2) {
    console.log(num + " no es primo");
} else {
    let esPrimo = true; // Suponemos que es primo hasta demostrar lo contrario
    // Revisamos divisores desde 2 hasta la mitad del número
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            esPrimo = false;
            break; // No hace falta seguir comprobando
        }
    }
    if (esPrimo) {
        console.log(num + " es primo");
    } else {
        console.log(num + " no es primo");
    }
}