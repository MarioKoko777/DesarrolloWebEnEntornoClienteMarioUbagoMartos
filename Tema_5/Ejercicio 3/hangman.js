let words=[
  {cat:"Frutas",items:[["manzana","Fruta roja o verde, crujiente"],["platano","Amarillo y curvado"],["fresa","Pequeña y roja con semillas"]]},
  {cat:"Ciudades",items:[["madrid","Capital de España"],["bogota","Capital en los Andes"],["lima","Capital del Perú"]]},
  {cat:"Animales",items:[["jirafa","Cuello muy largo"],["conejo","Orejas largas y salta"],["tortuga","Lleva su casa encima"]]}
];
let maxLives=10;
let chosen=null;
let revealed=new Set();
let wrong=new Set();
let lives=maxLives;
let alphabet="abcdefghijklmnopqrstuvwxyz".split("");
let elWord=document.getElementById("word");
let elAlpha=document.getElementById("alphabet");
let elLives=document.getElementById("lives");
let elResult=document.getElementById("result");
let elUsed=document.getElementById("used");
let elCategory=document.getElementById("category");
let elHint=document.getElementById("hint");
let elReset=document.getElementById("reset");
let elClue=document.getElementById("clue");
function pick(){
  let c=words[Math.floor(Math.random()*words.length)];
  let p=c.items[Math.floor(Math.random()*c.items.length)];
  return {cat:c.cat,word:p[0],hint:p[1]};
}
function renderWord(){
  let w=chosen.word.split("").map(function(ch){
    if(ch===" "||ch==="-")return ch;
    return revealed.has(ch)?ch:"_";
  }).join(" ");
  elWord.textContent=w;
}
function renderLives(){
  elLives.textContent="Vidas: "+lives;
}
function renderUsed(){
  let u=[].concat(Array.from(revealed),Array.from(wrong)).filter(function(l){return alphabet.indexOf(l)>=0});
  elUsed.textContent=u.length?"Usadas: "+u.join(" "):"";
}
function disableAll(){
  Array.prototype.forEach.call(elAlpha.querySelectorAll("button"),function(b){b.disabled=true});
  elHint.disabled=true;
}
function enableAll(){
  Array.prototype.forEach.call(elAlpha.querySelectorAll("button"),function(b){b.disabled=false});
  elHint.disabled=false;
}
function drawState(){
  let stages=["","cabeza","cabeza y tronco","+ brazo","+ brazos","+ pierna","+ piernas","ojos","boca","manos","fin"];
  let idx=Math.min(maxLives-lives,stages.length-1);
  document.getElementById("drawing").textContent="Dibujo: "+stages[idx];
}
function checkEnd(){
  let win=chosen.word.split("").every(function(ch){return ch===" "||ch==="-"||revealed.has(ch)});
  if(win){elResult.textContent="¡Ganaste!";disableAll();return}
  if(lives<=0){elResult.textContent="Fin del juego. La palabra era "+chosen.word.toUpperCase();disableAll()}
}
function onGuess(l){
  if(revealed.has(l)||wrong.has(l)||lives<=0)return;
  let good=chosen.word.indexOf(l)>=0;
  if(good){
    revealed.add(l);
  }else{
    wrong.add(l);
    lives-=1;
  }
  renderWord();
  renderLives();
  renderUsed();
  drawState();
  checkEnd();
}
function buildAlphabet(){
  elAlpha.innerHTML="";
  alphabet.forEach(function(l){
    let b=document.createElement("button");
    b.className="btn";
    b.textContent=l;
    b.addEventListener("click",function(){b.disabled=true;onGuess(l)});
    elAlpha.appendChild(b);
  });
}
function newGame(){
  chosen=pick();
  revealed=new Set();
  wrong=new Set();
  lives=maxLives;
  elResult.textContent="";
  elClue.textContent="";
  elCategory.textContent="Categoría: "+chosen.cat;
  buildAlphabet();
  renderWord();
  renderLives();
  renderUsed();
  drawState();
  enableAll();
}
function hint(){
  if(lives<=1)return;
  let pool=chosen.word.split("").filter(function(ch){return ch!==" "&&ch!=="-"&&!revealed.has(ch)});
  if(pool.length===0)return;
  let ch=pool[Math.floor(Math.random()*pool.length)];
  revealed.add(ch);
  lives-=1;
  elClue.textContent="Pista: "+chosen.hint;
  renderWord();
  renderLives();
  drawState();
  checkEnd();
}
document.addEventListener("keydown",function(e){
  let k=e.key.toLowerCase();
  if(alphabet.indexOf(k)>=0){
    let btn=Array.prototype.find.call(elAlpha.querySelectorAll("button"),function(b){return b.textContent===k});
    if(btn&&!btn.disabled){btn.click()}
  }else if(k==="enter"){newGame()}
});
elHint.addEventListener("click",hint);
elReset.addEventListener("click",newGame);
newGame();