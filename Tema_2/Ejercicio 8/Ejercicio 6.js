if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords = position.coords;
      console.log("Latitud:", coords.latitude);
      console.log("Longitud:", coords.longitude);
      console.log("Precisión (metros):", coords.accuracy);
      // Crear elementos de forma segura
      const div = document.createElement("div");
      div.textContent = `Latitud: ${coords.latitude}\nLongitud: ${coords.longitude}\nPrecisión: ${coords.accuracy} metros`;
      document.body.appendChild(div);
    },
    (error) => {
      console.error("Error obteniendo ubicación:", error.message);
    }
  );
} else {
  console.log("Geolocalización no soportada por este navegador.");
}