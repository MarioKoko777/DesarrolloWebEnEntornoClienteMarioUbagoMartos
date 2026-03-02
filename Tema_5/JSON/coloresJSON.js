function colorTexto(hex){return(hex==="#FFF"||hex==="#FF0")?"#000":"#fff"}
let cont=document.getElementById("contenedor");
function fila(t,v){
  let l=document.createElement("div");l.className="linea";
  let a=document.createElement("div");a.className="etiqueta";a.textContent=t;
  let b=document.createElement("div");b.className="valor";b.textContent=v;
  l.appendChild(a);l.appendChild(b);return l;
}
function dibujar(lista){
  lista.forEach(function(it){
    let caja=document.createElement("div");caja.className="color";caja.style.background=it.hex;caja.style.color=colorTexto(it.hex);
    let nombre=document.createElement("div");nombre.className="nombre";nombre.textContent=it.name;
    caja.appendChild(nombre);
    if(it.category){caja.appendChild(fila("Categoría",it.category))}
    if(it.type){caja.appendChild(fila("Tipo",it.type))}
    caja.appendChild(fila("RGBA",it.rgba));
    caja.appendChild(fila("HEX",it.hex));
    cont.appendChild(caja);
  })
}
let respaldo={"colors":[{"color":"black","category":"hue","type":"primary","code":{"rgba":[255,255,255,1],"hex":"#000"}},{"color":"white","category":"value","code":{"rgba":[0,0,0,1],"hex":"#FFF"}},{"color":"red","category":"hue","type":"primary","code":{"rgba":[255,0,0,1],"hex":"#FF0"}},{"color":"blue","category":"hue","type":"primary","code":{"rgba":[0,0,255,1],"hex":"#00F"}},{"color":"yellow","category":"hue","type":"primary","code":{"rgba":[255,255,0,1],"hex":"#FF0"}},{"color":"green","category":"hue","type":"secondary","code":{"rgba":[0,255,0,1],"hex":"#0F0"}}]};
function normalizar(d){
  if(d && d.colors){return d.colors.map(function(c){return{ name:c.color.charAt(0).toUpperCase()+c.color.slice(1), category:c.category||null, type:c.type||null, rgba:"rgba("+c.code.rgba.join(",")+")", hex:c.code.hex }})}
  if(d && d.paleta){return d.paleta.map(function(p){return{ name:p.nombre, category:null, type:null, rgba:p.rgba, hex:p.hex }})}
  return [];
}
fetch("colores.json").then(function(r){return r.json()}).then(function(d){let items=normalizar(d);if(items.length){dibujar(items)}else{dibujar(normalizar(respaldo))}}).catch(function(){dibujar(normalizar(respaldo))});
