// Guardamos la nota escolar en una variable
let nota = "B"; // Puede ser "A", "B", "C", "D" o "F"
// Usamos switch para mostrar el mensaje correspondiente
switch(nota.toUpperCase()) {  // .toUpperCase() asegura que funcione aunque se escriba en minúscula
    case "A":
        console.log("Excelente");
        break;
    case "B":
        console.log("Muy bien");
        break;
    case "C":
        console.log("Bien");
        break;
    case "D":
        console.log("Suficiente");
        break;
    case "F":
        console.log("Reprobado");
        break;
    default:
        console.log("Nota inválida. Debe ser A, B, C, D o F.");
}