// 1. Definir el geofence (círculo)
const geofence = {
  lat: 40.4168, // latitud del centro (ejemplo: Madrid)
  lon: -3.7038, // longitud del centro
  radius: 500,   // radio en metros
};
// 2. Función para calcular distancia entre dos coordenadas en metros
function distanciaHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371000; // radio de la Tierra en metros
  const toRad = angle => angle * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distancia en metros
}
// 3. Función para verificar si estamos dentro del geofence
function estaDentroGeofence(lat, lon, geofence) {
  const distancia = distanciaHaversine(lat, lon, geofence.lat, geofence.lon);
  return distancia <= geofence.radius;
}
// 4. Ejemplo de uso con posición simulada
const posicionActual = { lat: 40.4170, lon: -3.7040 };
if (estaDentroGeofence(posicionActual.lat, posicionActual.lon, geofence)) {
  console.log("¡Estás dentro del área!");
} else {
  console.log("Estás fuera del área.");
}