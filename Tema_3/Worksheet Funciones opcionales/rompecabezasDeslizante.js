const size=4;
let board=[],active=true,moves=0;

function makeSolvableShuffle(){
  const arr=[...Array(16).keys()];
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}
  if(isSolved(arr)) return makeSolvableShuffle();
  if(isSolvable(arr)) return arr;
  return makeSolvableShuffle();
}
function isSolved(arr){for(let i=0;i<15;i++)if(arr[i]!==i+1)return false;return arr[15]===0}
function inversionCount(arr){const a=arr.filter(x=>x!==0);let inv=0;for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)if(a[i]>a[j])inv++;return inv}
function isSolvable(arr){
  const inv=inversionCount(arr);
  const emptyIdx=arr.indexOf(0);
  const rowFromTop=Math.floor(emptyIdx/size);
  const rowFromBottom=size-rowFromTop;
  if(size%2===0){return (rowFromBottom%2===0 && inv%2===1) || (rowFromBottom%2===1 && inv%2===0)}
  return inv%2===0
}
function startGame(){
  board=makeSolvableShuffle();
  active=true;moves=0;
  render();updateStatus("Juego iniciado. Usa botones o escribe un comando.")
}
function updateStatus(t){document.getElementById("status").textContent=`${t} | Movimientos: ${moves}`}
function render(){
  const grid=document.getElementById("grid");grid.innerHTML="";
  for(let i=0;i<board.length;i++){
    const v=board[i];
    const d=document.createElement("div");
    d.className="cell"+(v===0?" empty":"");
    d.textContent=v===0?"*":String(v);
    grid.appendChild(d);
  }
  renderTextBoard()
}
function renderTextBoard(){
  let out="";
  for(let r=0;r<size;r++){
    let line=[];
    for(let c=0;c<size;c++){
      const v=board[r*size+c];
      line.push(v===0?"*":String(v).padStart(2," "));
    }
    out+=line.join("  ")+"\n";
  }
  document.getElementById("textBoard").textContent=out.trimEnd()
}
function move(dir){
  if(!active)return;
  const idx=board.indexOf(0);
  const r=Math.floor(idx/size),c=idx%size;
  let tr=r,tc=c;
  if(dir==="ARRIBA")tr=r-1;
  if(dir==="ABAJO")tr=r+1;
  if(dir==="IZQUIERDA")tc=c-1;
  if(dir==="DERECHA")tc=c+1;
  if(tr<0||tr>=size||tc<0||tc>=size){updateStatus("Movimiento inválido contra borde");return}
  const tgt=tr*size+tc;
  [board[idx],board[tgt]]=[board[tgt],board[idx]];
  moves++;
  render();
  if(isSolved(board)){
    active=false;
    updateStatus("¡Has ganado! Movimientos: "+moves);
    setTimeout(()=>{
      if(confirm("Has ganado. ¿Quieres reiniciar el juego y seguir jugando?")) startGame();
    },100)
  }
}
function handleCommand(raw){
  const cmd=raw.trim().toUpperCase();
  if(!cmd)return;
  if(cmd==="SALIR"){active=false;updateStatus("Juego finalizado. Presiona Reiniciar para volver a jugar.");return}
  if(["ARRIBA","ABAJO","IZQUIERDA","DERECHA"].includes(cmd)) move(cmd);
  else updateStatus("Comando no reconocido. Usa ARRIBA/ABAJO/IZQUIERDA/DERECHA/SALIR");
}
document.getElementById("up").onclick=()=>move("ARRIBA");
document.getElementById("down").onclick=()=>move("ABAJO");
document.getElementById("left").onclick=()=>move("IZQUIERDA");
document.getElementById("right").onclick=()=>move("DERECHA");
document.getElementById("send").onclick=()=>{handleCommand(document.getElementById("cmd").value);document.getElementById("cmd").value=""}
document.getElementById("restart").onclick=()=>startGame();
document.getElementById("quit").onclick=()=>handleCommand("SALIR");
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowUp")move("ARRIBA");
  if(e.key==="ArrowDown")move("ABAJO");
  if(e.key==="ArrowLeft")move("IZQUIERDA");
  if(e.key==="ArrowRight")move("DERECHA");
});
startGame();