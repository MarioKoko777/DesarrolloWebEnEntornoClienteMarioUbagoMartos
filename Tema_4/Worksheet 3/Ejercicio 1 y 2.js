function esMovil() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (error) {
        return false;
    }
}
const cuadro = document.getElementById("cuadro");
const cuadro2 = document.getElementById("cuadro2");
window.addEventListener("deviceorientation", function (event) {
    let alpha = event.alpha;
    let beta = event.beta;
    let gamma = event.gamma;
    if (esMovil()) {
        cuadro.style.transform = `rotate(${gamma}deg)`;//Ejercicio 1 rotar en un angulo he escogido el Y.
        cuadro2.style.transform = `rotateX(${beta}deg) rotateY(${gamma}deg) rotateZ(${alpha}deg)`;//Ejercicio 2 rotar en todos los ejes.
    }
});