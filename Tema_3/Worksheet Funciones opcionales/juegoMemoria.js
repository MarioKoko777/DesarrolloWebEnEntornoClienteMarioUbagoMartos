const EMOJIS = ["🔥","🔮","⭐","🍀","🍎","🍇","🍋","🍉","🥝","🥥","⚽","🏀","🎲","🧩","🎯","🎵","🎸","🎻","🪄","🧸","🚗","✈️","⛵","🚀","🛸","🌙","☀️","🌈","❄️","🌸","🌵","🍓","🍒","🥑","🌽","🍔","🍕","🍪","🍰","🧁","🍿","🥨","🥟","🍣","🍙","🍜","🍤","🍱","🍛"];
const BOX = "📦";

let rows = 3, cols = 4, maxAttempts = 5;
let attemptsLeft = 5, foundCount = 0, totalCells = rows * cols;
let board = [], matched = [], inPlay = false, lockInput = false;

const sizeSelect = document.getElementById("sizeSelect");
const attemptsInput = document.getElementById("attemptsInput");
const startBtn = document.getElementById("startBtn");
const playBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");
const moveInput = document.getElementById("moveInput");
const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const attemptsHud = document.getElementById("attemptsHud");
const foundHud = document.getElementById("foundHud");
const historyBody = document.getElementById("historyBody");

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function buildDeck(n){const pairs=n/2;const pool=EMOJIS.slice(0,pairs);const deck=shuffle([...pool,...pool]);return deck}
function toIndex(x,y){const r=rows - y;const c=x - 1;return {r,c}}
function render(tempReveals=[]){let out="";for(let r=0;r<rows;r++){for(let c=0;c<cols;c++){const idx=r*cols+c;const isMatch=matched[r][c];const isTemp=tempReveals.some(t=>t.r===r && t.c===c);out+= isMatch||isTemp ? board[r][c] : BOX}out+="\n"}boardEl.textContent=out.trimEnd();attemptsHud.textContent="Intentos restantes: "+attemptsLeft;foundHud.textContent="Descubiertos: "+foundCount}
function reset(){attemptsLeft=maxAttempts;foundCount=0;totalCells=rows*cols;board=[];matched=[];const flat=buildDeck(totalCells);for(let r=0;r<rows;r++){const row=[];const mrow=[];for(let c=0;c<cols;c++){row.push(flat[r*cols+c]);mrow.push(false)}board.push(row);matched.push(mrow)}inPlay=true;lockInput=false;statusEl.textContent="";render()}
function parseMove(str){const parts=str.split("|");if(parts.length!==2) return null;const p1=parts[0].trim().split(",");const p2=parts[1].trim().split(",");if(p1.length!==2||p2.length!==2) return null;const x1=parseInt(p1[0],10), y1=parseInt(p1[1],10);const x2=parseInt(p2[0],10), y2=parseInt(p2[1],10);if(Number.isNaN(x1)||Number.isNaN(y1)||Number.isNaN(x2)||Number.isNaN(y2)) return null;return [{x:x1,y:y1},{x:x2,y:y2}]}
function validCoord(x,y){if(x<1||x>cols||y<1||y>rows) return false;const {r,c}=toIndex(x,y);return !matched[r][c]}
function end(result){inPlay=false;lockInput=true;saveHistory(result);statusEl.textContent= result==="win" ? "Has ganado" : "Sin intentos: has perdido"}
function saveHistory(result){const h=JSON.parse(localStorage.getItem("hist_memoria")||"[]");const used=maxAttempts - attemptsLeft;h.unshift({fecha:new Date().toLocaleString(),tablero:cols+"x"+rows,intentos:maxAttempts,usados:used,resultado: result==="win"?"Ganó":"Perdió"});localStorage.setItem("hist_memoria",JSON.stringify(h));renderHistory()}
function renderHistory(){const h=JSON.parse(localStorage.getItem("hist_memoria")||"[]");historyBody.innerHTML=h.map(i=>"<tr><td>"+i.fecha+"</td><td>"+i.tablero+"</td><td>"+i.intentos+"</td><td>"+i.usados+"</td><td>"+i.resultado+"</td></tr>").join("")}
function playTurn(){if(!inPlay||lockInput) return;const mv=parseMove(moveInput.value);if(!mv){statusEl.textContent="Entrada inválida";return}const [{x:x1,y:y1},{x:x2,y:y2}]=mv;if(x1===x2 && y1===y2){statusEl.textContent="Debe elegir dos casillas distintas";return}const ok1=validCoord(x1,y1), ok2=validCoord(x2,y2);if(!ok1||!ok2){statusEl.textContent="Casilla inválida";return}const a=toIndex(x1,y1), b=toIndex(x2,y2);const v1=board[a.r][a.c], v2=board[b.r][b.c];render([a,b]);if(v1===v2){matched[a.r][a.c]=true;matched[b.r][b.c]=true;foundCount+=2;statusEl.textContent="Ha acertado";render();if(foundCount===totalCells){end("win")}}else{statusEl.textContent="Ha errado";lockInput=true;setTimeout(()=>{attemptsLeft-=1;lockInput=false;render();if(attemptsLeft<=0){end("lose")}},700)}}
function applySize(value){const [c,r]=value.split("x").map(Number);cols=c;rows=r}
startBtn.onclick=function(){applySize(sizeSelect.value);const v=parseInt(attemptsInput.value,10);maxAttempts=Number.isNaN(v)||v<1?5:v;reset()}
restartBtn.onclick=function(){reset()}
playBtn.onclick=function(){playTurn()}
sizeSelect.onchange=function(){applySize(sizeSelect.value)}
attemptsInput.onchange=function(){const v=parseInt(attemptsInput.value,10);maxAttempts=Number.isNaN(v)||v<1?5:v}
function boot(){renderHistory();applySize(sizeSelect.value);maxAttempts=parseInt(attemptsInput.value,10)||5;reset()}
boot()