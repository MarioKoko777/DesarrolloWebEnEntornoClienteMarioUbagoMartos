// Función que obtiene la posición del usuario
function obtenerUbicacion() {
  if (!navigator.geolocation) {
    console.log("Geolocalización no está soportada por este navegador.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // Éxito
      console.log("Latitud:", position.coords.latitude);
      console.log("Longitud:", position.coords.longitude);
    },
    (error) => {
      // Manejo de errores
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("Permiso denegado. El usuario no permitió acceder a su ubicación.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Posición no disponible.");
          break;
        case error.TIMEOUT:
          console.log("La solicitud de ubicación ha expirado.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("Ocurrió un error desconocido.");
          break;
      }
    }
  );
}
// Llamada a la función
obtenerUbicacion();