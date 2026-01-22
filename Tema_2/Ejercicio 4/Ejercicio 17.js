let tarjeta = "1234567812345678";
// Obtenemos los últimos 4 dígitos
let ultimosCuatro = tarjeta.slice(-4);
// Reemplazamos el resto con asteriscos
let tarjetaOculta = "*".repeat(tarjeta.length - 4) + ultimosCuatro;
console.log(tarjetaOculta); // ************5678