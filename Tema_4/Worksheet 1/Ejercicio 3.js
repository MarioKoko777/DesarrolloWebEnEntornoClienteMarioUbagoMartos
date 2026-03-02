const comienzo = performance.now();
const tiempo = document.getElementById('tiempo');

window.onload = () => {
    const tiempoCarga = performance.now() - comienzo
    tiempo.textContent = `Tiempo de carga: ${tiempoCarga.toFixed(2)} ms`
}