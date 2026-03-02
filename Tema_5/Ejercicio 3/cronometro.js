let display=document.getElementById("display");
let startBtn=document.getElementById("startBtn");
let stopBtn=document.getElementById("stopBtn");
let resetBtn=document.getElementById("resetBtn");
let startTime=0;
let elapsed=0;
let timer=null;
function pad(n){return n<10?"0"+n:String(n)}
function render(ms){
  let total=Math.floor(ms/1000);
  let m=Math.floor(total/60);
  let s=total%60;
  display.textContent=pad(m)+":"+pad(s);
}
function tick(){
  elapsed=Date.now()-startTime;
  render(elapsed);
}
function start(){
  if(timer) return;
  startTime=Date.now()-elapsed;
  timer=setInterval(tick,200);
  startBtn.disabled=true;
  stopBtn.disabled=false;
  resetBtn.disabled=false;
}
function stop(){
  if(!timer) return;
  clearInterval(timer);
  timer=null;
  startBtn.disabled=false;
  stopBtn.disabled=true;
}
function reset(){
  clearInterval(timer);
  timer=null;
  elapsed=0;
  render(0);
  startBtn.disabled=false;
  stopBtn.disabled=true;
  resetBtn.disabled=true;
}
startBtn.addEventListener("click",start);
stopBtn.addEventListener("click",stop);
resetBtn.addEventListener("click",reset);