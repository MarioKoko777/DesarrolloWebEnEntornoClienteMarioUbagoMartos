// WORKSHEET 4.1 - EJERCICIO 3
let content, geocoder, map, miPosicion;
let distancia = 0;
let direccion = "";
let puntoAnterior = null;
let puntoActual = null;
function muestraError(objPositionError) {
    switch (objPositionError.code) {
        case objPositionError.PERMISSION_DENIED:
            content.innerHTML = "No se ha permitido el acceso a la posición del usuario.";
            break;
        case objPositionError.POSITION_UNAVAILABLE:
            content.innerHTML = "No se ha podido acceder a la información de su posición.";
            break;
        case objPositionError.TIMEOUT:
            content.innerHTML = "El servicio ha tardado demasiado tiempo en responder.";
            break;
        default:
            content.innerHTML = "Error desconocido.";
    }
}
function ejercicio3() {
    content = document.getElementById("content"); // coincide con HTML
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('mapa'), {
        center: { lat: 0, lng: 0 }, // "center" correcto
        zoom: 18
    });
    miPosicion = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map: map,
        animation: google.maps.Animation.DROP, // BOUNCE_DROP no existe
        title: '¡Que chulo es esto!'
    });
    let opciones = {
        enableHighAccuracy: true,
        timeout: 5000,      // en milisegundos
        maximumAge: 0
    };
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(muestraPosicionContinua, muestraError, opciones);
    } else {
        content.innerHTML = "La geolocalización no es soportada por este navegador.";
    }
}
function muestraPosicionContinua(posicion) {
    let long = posicion.coords.longitude;
    let lati = posicion.coords.latitude;
    puntoActual = { lat: lati, lng: long };
    if (puntoAnterior)
        distancia += calculaDistancia(puntoAnterior, puntoActual);
    else
        puntoAnterior = puntoActual;
    // Pintar recorrido -> línea entre puntos
    let line = new google.maps.Polyline({
        map: map,
        path: [puntoAnterior, puntoActual],
        strokeWeight: 7,   // corregido
        strokeOpacity: 0.8,
        strokeColor: "#FFAA00"
    });
    puntoAnterior = puntoActual;
    // Mostrar la dirección
    geocoder.geocode({ location: puntoActual }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0])
                direccion = results[0].formatted_address;
            else
                direccion = 'No results found';
        } else
            direccion = 'Geocoder failed due to: ' + status;
        document.getElementById("direccion").innerHTML = "<p><strong>Dirección:</strong> " + direccion + "</p>";
    });
    content.innerHTML = `<p><strong>Latitud:</strong> ${lati}</p>
                         <p><strong>Longitud:</strong> ${long}</p>
                         <p><strong>Distancia:</strong> ${distancia.toFixed(3)} km</p>`;

    map.panTo(puntoActual);
    miPosicion.setPosition(puntoActual);
}
function calculaDistancia(location1, location2) {
    let R = 6371; // km
    let dLat = toRadianes(location2.lat - location1.lat);
    let dLon = toRadianes(location2.lng - location1.lng);
    let lat1 = toRadianes(location1.lat);
    let lat2 = toRadianes(location2.lat);
    let a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
function toRadianes(valor) {
    return valor * Math.PI / 180;
}