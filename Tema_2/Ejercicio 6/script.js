// Información del navegador
document.getElementById("nav").textContent =
    "Navegador: " + navigator.userAgent;
document.getElementById("lang").textContent =
    "Idioma: " + navigator.language;
document.getElementById("plat").textContent =
    "Plataforma: " + navigator.platform;
document.getElementById("res").textContent =
    "Resolución: " + screen.width + " x " + screen.height;
// URL actual
document.getElementById("url").textContent =
    "URL actual: " + window.location.href;
// Información de la pantalla
document.getElementById("total").textContent =
    "Resolución total: " + screen.width + " x " + screen.height;
document.getElementById("avail").textContent =
    "Área disponible: " + screen.availWidth + " x " + screen.availHeight;
document.getElementById("orientation").textContent =
    "Orientación: " + screen.orientation.type;
document.getElementById("colorDepth").textContent =
    "Profundidad de color: " + screen.colorDepth + " bits";
document.getElementById("pixelDepth").textContent =
    "Profundidad de pixel: " + screen.pixelDepth + " bits";
// Redirección
function irAMDN() {
    window.location.href = "https://developer.mozilla.org";
}