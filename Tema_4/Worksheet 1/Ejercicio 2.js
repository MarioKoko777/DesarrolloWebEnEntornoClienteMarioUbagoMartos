const posicion = document.getElementById('posicion')
document.addEventListener('mousemove', (e) => {
    posicion.textContent = `posicion de raton ${e.clientX} ${e.clientY}`
})