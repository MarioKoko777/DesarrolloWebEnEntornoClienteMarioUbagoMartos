// Funciones genéricas
function CrearCookie(id, valor, dias) {
    let fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    document.cookie = id + "=" + valor + ";expires=" + fecha.toUTCString() + ";path=/";
}
function LeerCookie(id) {
    let cookies = document.cookie.split(';');
    for(let cookie of cookies) {
        cookie = cookie.trim();
        if(cookie.indexOf(id + "=") == 0) {
            return cookie.substring(id.length + 1);
        }
    }
    return null;
}
function BorrarCookie(id) {
    document.cookie = id + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}
// Funciones de interfaz
function crear() {
    let id = document.getElementById('idCrear').value;
    let valor = document.getElementById('valorCrear').value;
    let dias = parseInt(document.getElementById('diasCrear').value);
    CrearCookie(id, valor, dias);
    document.getElementById('resultado').innerHTML = '✅ Cookie creada';
}
function leer() {
    let id = document.getElementById('idLeer').value;
    let valor = LeerCookie(id);
    document.getElementById('resultado').innerHTML = valor ? '📖 Valor: ' + valor : '❌ No existe';
}
function borrar() {
    let id = document.getElementById('idBorrar').value;
    BorrarCookie(id);
    document.getElementById('resultado').innerHTML = '🗑️ Cookie borrada';
}