// Función que se ejecuta cuando la página ha cargado completamente
window.onload = function() {
    // 1. Número total de enlaces en la página
    const todosLosEnlaces = document.getElementsByTagName('a');
    const totalEnlaces = todosLosEnlaces.length;
    // 2. Dirección del penúltimo enlace
    let direccionPenultimo = '';
    if (totalEnlaces >= 2) {
        direccionPenultimo = todosLosEnlaces[totalEnlaces - 2].href;
    } else {
        direccionPenultimo = 'No hay suficientes enlaces (menos de 2)';
    }
    // 3. Número de enlaces que enlazan a Google
    let contadorGoogle = 0;
    for (let i = 0; i < totalEnlaces; i++) {
        // Verificamos si el href contiene "google.com"
        if (todosLosEnlaces[i].href.includes('google.com')) {
            contadorGoogle++;
        }
    }
    // 4. Número de enlaces del tercer párrafo
    // Obtenemos todos los párrafos
    const parrafos = document.getElementsByTagName('p');
    let enlacesTercerParrafo = 0;
    if (parrafos.length >= 3) {
        // El tercer párrafo está en el índice 2 (los índices empiezan en 0)
        const tercerParrafo = parrafos[2];
        const enlacesEnTercerParrafo = tercerParrafo.getElementsByTagName('a');
        enlacesTercerParrafo = enlacesEnTercerParrafo.length;
    }
    // Mostramos los resultados en el DOM
    document.getElementById('totalEnlaces').innerHTML = 
        `<strong>Número total de enlaces:</strong> ${totalEnlaces}`;
    document.getElementById('penultimoEnlace').innerHTML = 
        `<strong>Dirección del penúltimo enlace:</strong> ${direccionPenultimo}`;
    document.getElementById('enlacesGoogle').innerHTML = 
        `<strong>Número de enlaces que enlazan a Google:</strong> ${contadorGoogle}`;
    document.getElementById('enlacesTercerParrafo').innerHTML = 
        `<strong>Número de enlaces del tercer párrafo:</strong> ${enlacesTercerParrafo}`;
    // Mostramos también los resultados en la consola para verificación
    console.log('=== RESULTADOS DEL ANÁLISIS ===');
    console.log('Total de enlaces:', totalEnlaces);
    console.log('Penúltimo enlace:', direccionPenultimo);
    console.log('Enlaces a Google:', contadorGoogle);
    console.log('Enlaces en tercer párrafo:', enlacesTercerParrafo);
};