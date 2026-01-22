let edad = Number(prompt("Ingrese su edad"));
let tutor = prompt("¿Tiene tutor presente? (sí/no)").toLowerCase();
if (edad >= 18 || tutor === "sí") {
    console.log("Puede entrar.");
} else {
    console.log("No puede entrar.");
}