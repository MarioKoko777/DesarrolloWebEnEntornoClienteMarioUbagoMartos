let matematicas = prompt("¿Aprobó matemáticas? (sí/no)").toLowerCase();
let fisica = prompt("¿Aprobó física? (sí/no)").toLowerCase();
let quimica = prompt("¿Aprobó química? (sí/no)").toLowerCase();
if (matematicas === "sí" || fisica === "sí" || quimica === "sí") {
    console.log("El alumno puede pasar al siguiente nivel.");
} else {
    console.log("El alumno no puede pasar al siguiente nivel.");
}