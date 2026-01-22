// Guardamos el color del semáforo en una variable
let color = "amarillo"; // Puede ser "rojo", "amarillo" o "verde"
// Usamos switch para determinar la acción
switch(color.toLowerCase()) {  // .toLowerCase() asegura que funcione aunque escriban mayúsculas
    case "rojo":
        console.log("Alto");
        break;
    case "amarillo":
        console.log("Precaución");
        break;
    case "verde":
        console.log("Avanza");
        break;
    default:
        console.log("Color inválido. Debe ser 'rojo', 'amarillo' o 'verde'.");
}