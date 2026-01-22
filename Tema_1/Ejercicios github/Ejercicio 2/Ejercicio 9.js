// Guardar una fruta en una variable
let fruta = "plátano"; // Puedes cambiarla para probar otras frutas
// Usar switch para clasificar la fruta
switch (fruta.toLowerCase()) { // .toLowerCase() hace que no importe mayúsculas/minúsculas
    case "manzana":
        console.log("Es una manzana roja");
        break;
    case "plátano":
        console.log("Es un plátano amarillo");
        break;
    case "uva":
        console.log("Es una uva morada");
        break;
    default:
        console.log("Fruta no reconocida");
}