// Función para crear una cookie
function crearCookie(nombre, valor, minutosExpiracion) {
    let expirar = "";
    if (minutosExpiracion) {
        let fecha = new Date();
        fecha.setTime(fecha.getTime() + (minutosExpiracion * 60 * 1000));
        expirar = "; expires=" + fecha.toUTCString();
    }
    // Si no se especifica minutosExpiracion, es una cookie de sesión
    document.cookie = nombre + "=" + encodeURIComponent(valor) + expirar + "; path=/";
}

// Función para obtener una cookie
function getCookie(nombre) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === nombre) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

// Función para borrar una cookie
function borrarCookie(nombre) {
    document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}

// Función para guardar todas las preferencias en cookies
function guardarPreferencias(prefs) {
    if (prefs.nombreUsuario) {
        crearCookie('usuario', prefs.nombreUsuario, 5); // Cookie de usuario (5 minutos)
    }
    // Cookies de sesión (sin fecha de expiración) - se borran al cerrar el navegador
    crearCookie('colorFondo', prefs.colorFondo); // Sin parámetro de expiración = cookie de sesión
    crearCookie('colorParrafo', prefs.colorParrafo); // Sin parámetro de expiración = cookie de sesión
    crearCookie('tamanioLetra', prefs.tamanioLetra); // Sin parámetro de expiración = cookie de sesión
}

// Función para cargar todas las preferencias de las cookies
function cargarPreferencias() {
    return {
        nombreUsuario: getCookie('usuario'),
        colorFondo: getCookie('colorFondo') || '#ffffff',
        colorParrafo: getCookie('colorParrafo') || '#000000',
        tamanioLetra: getCookie('tamanioLetra') || '16'
    };
}

// Función para aplicar las preferencias visuales
function aplicarPreferenciasVisuales(prefs) {
    document.body.style.backgroundColor = prefs.colorFondo;
    
    // Aplicar al párrafo de saludo si existe
    const parrafoSaludo = document.querySelector('#saludo p');
    if (parrafoSaludo) {
        parrafoSaludo.style.color = prefs.colorParrafo;
        parrafoSaludo.style.fontSize = prefs.tamanioLetra + 'px';
    }
    
    // Actualizar los valores del panel de configuración si existe
    const colorFondoInput = document.getElementById('colorFondo');
    const colorParrafoInput = document.getElementById('colorParrafo');
    const tamanioLetraSelect = document.getElementById('tamanioLetra');
    
    if (colorFondoInput) colorFondoInput.value = prefs.colorFondo;
    if (colorParrafoInput) colorParrafoInput.value = prefs.colorParrafo;
    if (tamanioLetraSelect) tamanioLetraSelect.value = prefs.tamanioLetra;
}

// Función para crear el panel de configuración
function crearPanelConfiguracion(prefs) {
    const panel = document.createElement('div');
    panel.className = 'config-panel';
    panel.innerHTML = `
        <h2>Panel de configuración (preferencias de sesión)</h2>
        <p class="mensaje-info">Las preferencias se borrarán al cerrar el navegador</p>
        <div class="config-group">
            <label for="colorFondo">Color de fondo:</label>
            <input type="color" id="colorFondo" value="${prefs.colorFondo}">
        </div>
        <div class="config-group">
            <label for="colorParrafo">Color del texto:</label>
            <input type="color" id="colorParrafo" value="${prefs.colorParrafo}">
        </div>
        <div class="config-group">
            <label for="tamanioLetra">Tamaño de letra:</label>
            <select id="tamanioLetra">
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16" selected>16px</option>
                <option value="18">18px</option>
                <option value="20">20px</option>
                <option value="24">24px</option>
            </select>
        </div>
        <button id="aplicarConfig">Aplicar cambios</button>
        <button id="restablecerConfig" class="restablecer">Restablecer valores por defecto</button>
    `;
    
    return panel;
}

// Función para mostrar el estado de las cookies (para depuración)
function mostrarEstadoCookies() {
    console.log('Cookies actuales:', document.cookie);
    console.log('Cookie usuario (5 min):', getCookie('usuario'));
    console.log('Cookie colorFondo (sesión):', getCookie('colorFondo'));
    console.log('Cookie colorParrafo (sesión):', getCookie('colorParrafo'));
    console.log('Cookie tamanioLetra (sesión):', getCookie('tamanioLetra'));
}

// Inicialización cuando el DOM está cargado
document.addEventListener("DOMContentLoaded", function () {
    const saludoContainer = document.getElementById("saludo");
    let preferencias = cargarPreferencias();
    
    // Mostrar estado inicial de cookies (para comprobación)
    mostrarEstadoCookies();
    
    // Si no hay nombre de usuario, solicitarlo
    if (!preferencias.nombreUsuario) {
        preferencias.nombreUsuario = prompt("Introduce tu nombre:");
        if (preferencias.nombreUsuario) {
            guardarPreferencias(preferencias);
        }
    }
    
    // Limpiar el contenedor
    saludoContainer.innerHTML = "";
    
    if (preferencias.nombreUsuario) {
        // Crear mensaje de saludo
        const mensaje = document.createElement("p");
        mensaje.textContent = "Hola, " + preferencias.nombreUsuario;
        saludoContainer.appendChild(mensaje);
        
        // Crear botón de cerrar sesión
        const enlaceCerrar = document.createElement("button");
        enlaceCerrar.textContent = "Cerrar sesión";
        enlaceCerrar.className = "cerrar-sesion";
        
        enlaceCerrar.addEventListener("click", function (e) {
            e.preventDefault();
            borrarCookie('usuario');
            location.reload();
        });
        
        saludoContainer.appendChild(enlaceCerrar);
        
        // Crear panel de configuración
        const panelConfig = crearPanelConfiguracion(preferencias);
        saludoContainer.appendChild(panelConfig);
        
        // Aplicar preferencias visuales actuales
        aplicarPreferenciasVisuales(preferencias);
        
        // Event listeners para el panel de configuración
        document.getElementById('aplicarConfig').addEventListener('click', function() {
            const nuevasPrefs = {
                nombreUsuario: preferencias.nombreUsuario,
                colorFondo: document.getElementById('colorFondo').value,
                colorParrafo: document.getElementById('colorParrafo').value,
                tamanioLetra: document.getElementById('tamanioLetra').value
            };
            
            guardarPreferencias(nuevasPrefs);
            aplicarPreferenciasVisuales(nuevasPrefs);
            preferencias = nuevasPrefs;
            
            // Mostrar estado después de aplicar cambios
            mostrarEstadoCookies();
            
            alert('Preferencias guardadas como cookies de sesión (se borrarán al cerrar el navegador)');
        });
        
        document.getElementById('restablecerConfig').addEventListener('click', function() {
            const prefsPorDefecto = {
                nombreUsuario: preferencias.nombreUsuario,
                colorFondo: '#ffffff',
                colorParrafo: '#000000',
                tamanioLetra: '16'
            };
            
            guardarPreferencias(prefsPorDefecto);
            aplicarPreferenciasVisuales(prefsPorDefecto);
            preferencias = prefsPorDefecto;
            
            // Mostrar estado después de restablecer
            mostrarEstadoCookies();
            
            alert('Valores restablecidos a los predeterminados');
        });
        
    } else {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No se ha introducido ningún nombre.";
        mensaje.className = "mensaje-info";
        saludoContainer.appendChild(mensaje);
    }
});