const totalImagenes = 3;
let imagenActual = 1;
const tagImg = document.getElementById("tag-img");
const btnIzq = document.getElementById("btn-izq");
const btnDer = document.getElementById("btn-der");
function actualizarBotones(){
    btnIzq.disabled = imagenActual === 1;
    btnDer.disabled = imagenActual === totalImagenes;
}
actualizarBotones();
function cambiarImagen(indice){
    imagenActual += indice;
    tagImg.src = `${imagenActual}.jpg`;
    actualizarBotones();
}
btnIzq.addEventListener("click", () => cambiarImagen(-1));
btnDer.addEventListener("click", () => cambiarImagen(1));

const hammer = new Hammer(tagImg);
hammer.get("rotate").set({enable: true});
hammer.get("pan").set({direction: Hammer.DIRECTION_HORIZONTAL});
let rotacion_actual = 0;
let escala_actual = 1;
hammer.on("panleft panright", function(e){
    if(e.isFinal){
        if(e.type === "panleft"){
            if(imagenActual < totalImagenes){
                cambiarImagen(imagenActual + 1);
            }else{
                bounce("left");
            }
        }else if(e.type === "panright"){
            if(imagenActual > 1){
                cambiarImagen(imagenActual - 1);
            }else{
                bounce("right");
            }
        }
    }
});
hammer.on("rotatestart rotatemove", function(e){
    const rotation =e.rotation;
    const escale = e.scale;
    tagImg.style.transform = `rotate(${rotation}deg) scale(${escale})`;
});
function bounce(direction){
    const x = direction === "left" ? -20 : 20;
    tagImg.style.transition = "transform 0.1s";
    tagImg.style.transform = `translateX(${x}px)`;
    setTimeout(() =>{
        tagImg.style.transform = 'translateX(0)';
        setTimeout(() =>{
            tagImg.style.transform = "";
        }, 100);
    }, 100);
}