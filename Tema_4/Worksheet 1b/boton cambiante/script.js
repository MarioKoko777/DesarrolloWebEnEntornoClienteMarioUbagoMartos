document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('miBoton');
    const colorOriginal = '#007bff'; // Mismo azul que en CSS
    const colorHover = '#28a745';    // Verde al pasar el ratón

    // Evento mouseover: cambia de color
    boton.addEventListener('mouseover', () => {
        boton.style.backgroundColor = colorHover;
    });

    // Evento mouseout: vuelve a su color original
    boton.addEventListener('mouseout', () => {
        boton.style.backgroundColor = colorOriginal;
    });

    // Evento click: cambia su texto
    boton.addEventListener('click', () => {
        boton.textContent = '¡Me hiciste clic!';
    });
});