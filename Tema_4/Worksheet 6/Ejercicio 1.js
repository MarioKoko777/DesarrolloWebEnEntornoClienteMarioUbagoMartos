
function crearCookie(nombre, identificador, fechaEx){
     let expirar = "";
     if(fechaEx){
        let fecha;
        if(typeof fechaEx === "number"){
            fecha = new Date();
            fecha.setTime(fecha.getTime()+(fechaEx * 60 * 1000));
        }else if(fechaEx instanceof Date){
            fecha = fechaEx;
        }
        if(fecha){
            expirar = `; expires=${fecha.toUTCString()}`;
        }
    }
    document.cookie = `${identificador}=${nombre}${expirar}; path=/`;
}
function getCookie(nombre) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === nombre) {
            return decodeURIComponent(value);
        }
    }
    return null;
}function crearCookie(nombre, identificador, fechaEx) {
    let expirar = "";
    if (fechaEx) {
        let fecha;
        if (typeof fechaEx === "number") {
            fecha = new Date();
            fecha.setTime(fecha.getTime() + (fechaEx * 60 * 1000));
        } else if (fechaEx instanceof Date) {
            fecha = fechaEx;
        }
        if (fecha) {
            expirar = "; expires=" + fecha.toUTCString();
        }
    }
    document.cookie = identificador + "=" + encodeURIComponent(nombre) + expirar + "; path=/";
}

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

document.addEventListener("DOMContentLoaded", function () {
    const nombreCookie = "usuario";
    const saludoContainer = document.getElementById("saludo");
    let nombreUsuario = getCookie(nombreCookie);

    if (!nombreUsuario) {
        nombreUsuario = prompt("Introduce tu nombre:");
        if (nombreUsuario) {
            // Cookie que caduca en 5 minutos
            crearCookie(nombreUsuario, nombreCookie, 5);
        }
    }

    saludoContainer.innerHTML = "";

    if (nombreUsuario) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Hola, " + nombreUsuario;
        saludoContainer.appendChild(mensaje);

        const enlaceCerrar = document.createElement("a");
        enlaceCerrar.href = "#";
        enlaceCerrar.textContent = "Cerrar sesión";
        enlaceCerrar.style.marginLeft = "10px";

        enlaceCerrar.addEventListener("click", function (e) {
            e.preventDefault();
            // Borrar la cookie poniendo fecha de expiración en el pasado
            document.cookie = nombreCookie + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            location.reload();
        });

        saludoContainer.appendChild(enlaceCerrar);
    } else {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No se ha introducido ningún nombre.";
        saludoContainer.appendChild(mensaje);
    }
});