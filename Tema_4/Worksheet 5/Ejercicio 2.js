document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    // Definición de reglas de validación y mensajes de error
    const validators = {
        nombre: {
            regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            error: "El nombre solo debe contener letras y espacios."
        },
        apellidos: {
            regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            error: "Los apellidos solo deben contener letras y espacios."
        },
        dni: {
            // 8 dígitos seguidos de una letra (mayúscula o minúscula)
            regex: /^\d{8}[A-Za-z]$/,
            error: "El DNI debe tener 8 números y una letra."
        },
        telefono: {
            // Exactamente 9 dígitos
            regex: /^\d{9}$/,
            error: "El teléfono debe tener 9 dígitos."
        },
        email: {
            // Formato estándar de email
            regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            error: "El email no es válido."
        },
        username: {
            // Validación compleja:
            // (?=.*\d) -> Busca al menos un dígito
            // (?=.*[.,;:\-_!¡?¿@#$%&]) -> Busca al menos un signo de puntuación
            // .{8,} -> Longitud mínima de 8 caracteres
            regex: /^(?=.*\d)(?=.*[.,;:\-_!¡?¿@#$%&]).{8,}$/,
            error: "Mínimo 8 caracteres, un número y un signo de puntuación (.,;:-_!¡?¿@#$%&)."
        }
    };
    // Función para validar un campo individual
    function validateField(input) {
        const fieldName = input.name;
        const validator = validators[fieldName];
        // Buscamos el span de error correspondiente
        const errorSpan = document.getElementById(`error-${fieldName}`);
        if (!validator) return true; // Si no hay regla, es válido
        // .test() comprueba si el valor cumple la expresión regular
        if (!validator.regex.test(input.value)) {
            if (errorSpan) {
                errorSpan.textContent = validator.error;
                errorSpan.style.display = 'block';
            }
            input.style.borderColor = 'red';
            return false;
        } else {
            if (errorSpan) {
                errorSpan.style.display = 'none';
            }
            input.style.borderColor = '#4CAF50'; // Verde si es válido
            return true;
        }
    }
    // Event listeners para validación en tiempo real
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        // Validar cuando el usuario sale del campo (blur)
        input.addEventListener('blur', () => {
            // Solo validamos si hay algo escrito para no molestar con campos vacíos iniciales
            // (la validación de "requerido" se hace al enviar o por el navegador)
            if(input.value.length > 0) {
                validateField(input);
            }
        });   
        // Limpiar estilos de error mientras el usuario escribe
        input.addEventListener('input', () => {
            const errorSpan = document.getElementById(`error-${input.name}`);
            if (errorSpan) errorSpan.style.display = 'none';
            input.style.borderColor = '#ddd';
        });
    });
    // Validar todo al intentar enviar el formulario
    form.addEventListener('submit', (e) => {
        let isValid = true;
        inputs.forEach(input => {
            // Validamos cada campo. Si validateField devuelve false, el formulario no es válido
            if (!validateField(input)) {
                isValid = false;
            }
        });
        if (!isValid) {
            e.preventDefault(); // Detenemos el envío si hay errores
        } else {
            // Aquí se enviaría el formulario. 
            // Mostramos una alerta solo para propósitos de demostración.
            alert('¡Formulario validado correctamente!');
        }
    });
});