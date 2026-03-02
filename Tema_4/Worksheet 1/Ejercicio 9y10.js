let currentDraggedElement = null;
let offsetX = 0;
let offsetY = 0;
let maxZIndex = 100;
const arrastrables = document.getElementsByClassName("arrastrable");

function pararArrastre(){
    if(currentDraggedElement){
        currentDraggedElement.classList.remove("arrastando");
        currentDraggedElement = null;
    }
}
function arrastrarInicio(e , elemento){
    currentDraggedElement = elemento;
    //Traemos la imagen al frente
    maxZIndex++;
    elemento.style.zIndex = maxZIndex;
    //Calculamos la distancia entre el mouse y la esquina superior izquierda de la imagen
    const rect = elemento.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    if(e.shiftKey){
        elemento.classList.add("arrastando");
    }
    e.preventDefault();
}

for (const img of arrastrables) {
    img.addEventListener('mousedown', (e) => arrastrarInicio(e, img));
}

document.addEventListener('mousemove', (e) => {
    if(currentDraggedElement){
       if(e.shiftKey){
            //Actualizamos la posicion de la imagen
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            currentDraggedElement.style.left = `${x}px`;
            currentDraggedElement.style.top = `${y}px`;
            if(!currentDraggedElement.classList.contains("arrastando")){
                currentDraggedElement.classList.add("arrastando");
            }
       } else {
            pararArrastre();
       }
    }
});

document.addEventListener('keyup', (e) => {
    if(e.key == "Shift"){
        pararArrastre();
    }
});