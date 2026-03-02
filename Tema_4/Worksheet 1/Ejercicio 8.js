function guardarPalabras(cadena){
    const palabras = cadena.split(" ");
    return palabras;
}
function identificarAmpersand(palabras){
    let final = [];
    for (const palabra of palabras){
        //& oho&pepe
        if(palabra == "&"){
            final.push("and");
        }else {
            let palabraFinal = "";
            for (const letra of palabra) {
                if(letra == "&"){
                    palabraFinal += "and";
                }else {
                    palabraFinal += letra;
                }
            }
            final.push(palabraFinal);
        }
    }
    return final.join(" ");
}
const frase = document.getElementById("frase");
frase.onblur = () => {
    frase.value = identificarAmpersand(guardarPalabras(frase.value));
}