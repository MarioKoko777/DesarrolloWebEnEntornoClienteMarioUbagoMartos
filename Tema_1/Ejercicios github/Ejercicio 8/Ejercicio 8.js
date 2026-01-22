let dia = prompt("Ingrese un día de la semana").toLowerCase();
if (dia === "lunes" || dia === "martes" || dia === "miércoles" || dia === "jueves" || dia === "viernes") {
    console.log("Es un día laborable.");
} else if (dia === "sábado" || dia === "domingo") {
    console.log("No es un día laborable.");
} else {
    console.log("Día ingresado no válido.");
}