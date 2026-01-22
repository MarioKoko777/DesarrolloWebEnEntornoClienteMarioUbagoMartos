let edad = Number(prompt("Ingrese su edad"));
let nacionalidad = prompt("Ingrese su nacionalidad");
if (edad >= 18 && nacionalidad.toLowerCase() === "chilena") {
    console.log("Puedes votar");
} else {
    console.log("No puedes votar");
}