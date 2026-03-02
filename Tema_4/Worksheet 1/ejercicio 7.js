const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const comentarios = document.getElementById("comentarios");
const infoNombre = document.getElementById("info-nombre");
const infoCorreo = document.getElementById("info-correo");
const infoComentarios = document.getElementById("info-comentarios");

nombre.onfocus = () => {
    infoNombre.style.display = "inline";
}
nombre.onblur = () => {
    infoNombre.style.display = "none";
}
correo.onfocus = () => {
    infoCorreo.style.display = "inline";
}
correo.onblur = () => {
    infoCorreo.style.display = "none";
}
comentarios.onfocus = () => {
    infoComentarios.style.display = "inline";
}
comentarios.onblur = () => {
    infoComentarios.style.display = "none";
}