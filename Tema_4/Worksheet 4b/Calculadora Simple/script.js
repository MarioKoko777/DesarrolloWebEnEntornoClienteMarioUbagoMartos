let pantalla = document.getElementById('display');
let operacionPendiente = '';
let numeroAnterior = '';
let nuevoNumero = true;

function agregarNumero(num) {
    if (nuevoNumero) {
        pantalla.value = num;
        nuevoNumero = false;
    } else {
        if (num === '.' && pantalla.value.includes('.')) return;
        pantalla.value += num;
    }
}

function agregarOperador(op) {
    if (!nuevoNumero) {
        calcular(); // Si ya había una operación pendiente, calcúlala primero
        numeroAnterior = pantalla.value;
        operacionPendiente = op;
        nuevoNumero = true;
    } else {
        // Si el usuario cambia de operador antes de escribir el segundo número
        operacionPendiente = op;
    }
}

function calcular() {
    if (operacionPendiente && !nuevoNumero) {
        const actual = parseFloat(pantalla.value);
        const anterior = parseFloat(numeroAnterior);
        let resultado = 0;

        switch (operacionPendiente) {
            case '+':
                resultado = anterior + actual;
                break;
            case '-':
                resultado = anterior - actual;
                break;
            case '*':
                resultado = anterior * actual;
                break;
            case '/':
                if (actual === 0) {
                    alert("No se puede dividir por cero");
                    limpiarPantalla();
                    return;
                }
                resultado = anterior / actual;
                break;
        }

        // Redondear para evitar errores de precisión de punto flotante largos
        pantalla.value = Math.round(resultado * 100000000) / 100000000;
        operacionPendiente = '';
        numeroAnterior = '';
        nuevoNumero = true;
    }
}

function limpiarPantalla() {
    pantalla.value = '0';
    operacionPendiente = '';
    numeroAnterior = '';
    nuevoNumero = true;
}

function borrarUltimo() {
    if (!nuevoNumero) {
        let valor = pantalla.value;
        if (valor.length > 1) {
            pantalla.value = valor.slice(0, -1);
        } else {
            pantalla.value = '0';
            nuevoNumero = true;
        }
    }
}

// Soporte para teclado
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9.]/.test(key)) {
        agregarNumero(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        agregarOperador(key);
    } else if (key === 'Enter') {
        calcular();
    } else if (key === 'Escape') {
        limpiarPantalla();
    } else if (key === 'Backspace') {
        borrarUltimo();
    }
});