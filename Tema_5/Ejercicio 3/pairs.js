let symbols=["🍎","🍌","🍇","🍊","🍒","🍉","🍋","🍍","🥝","🍓"];
let pairCount=8;
let timeLimit=60;
let moveLimit=40;
let started=false;
let startTime=0;
let timer=null;
let grid=document.getElementById("grid");
let timeEl=document.getElementById("time");
let movesEl=document.getElementById("moves");
let resEl=document.getElementById("result");
let restartBtn=document.getElementById("restart");
let harderBtn=document.getElementById("harder");
let first=null;
let lock=false;
let matches=0;
let moves=moveLimit;
function pad(n){return n<10?"0"+n:String(n)}
function mmss(ms){let t=Math.floor(ms/1000);return pad(Math.floor(t/60))+":"+pad(t%60)}
function shuffle(a){for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));let tmp=a[i];a[i]=a[j];a[j]=tmp}return a}
function makeCard(val){
  let b=document.createElement("button");
  b.className="card";
  b.setAttribute("aria-label","card");
  b.dataset.value=val;
  let front=document.createElement("div");front.className="face front";front.textContent=val;
  let back=document.createElement("div");back.className="face back";
  b.appendChild(front);b.appendChild(back);
  b.addEventListener("click",function(){
    if(lock||b.classList.contains("flipped")||b.getAttribute("aria-disabled")==="true")return;
    if(!started){started=true;startTime=Date.now();timer=setInterval(tick,200)}
    flip(b);
    if(!first){first=b;return}
    moves-=1;movesEl.textContent=moves;
    if(first.dataset.value===b.dataset.value){
      b.setAttribute("aria-disabled","true");first.setAttribute("aria-disabled","true");
      matches+=1;first=null;
      if(matches===pairCount)end(true);
    }else{
      lock=true;
      setTimeout(function(){unflip(first);unflip(b);first=null;lock=false},700);
    }
    if(moves<=0)end(false);
  });
  return b;
}
function flip(c){c.classList.add("flipped")}
function unflip(c){c.classList.remove("flipped")}
function build(){
  let deck=shuffle(shuffle(symbols).slice(0,pairCount).concat(shuffle(symbols).slice(0,pairCount)));
  deck=shuffle(deck);
  grid.innerHTML="";
  deck.forEach(function(v){grid.appendChild(makeCard(v))});
}
function tick(){
  let elapsed=Date.now()-startTime;
  timeEl.textContent=mmss(elapsed);
  if(timeLimit && Math.floor(elapsed/1000)>=timeLimit)end(false);
}
function end(win){
  clearInterval(timer);timer=null;started=false;
  Array.prototype.forEach.call(grid.querySelectorAll(".card"),function(c){c.setAttribute("aria-disabled","true")});
  resEl.textContent=win?"You win!":"Game over";
}
function reset(hard){
  clearInterval(timer);timer=null;started=false;startTime=0;first=null;lock=false;matches=0;
  if(hard){pairCount=Math.min(10,pairCount+1);timeLimit=Math.max(20,timeLimit-10);moveLimit=Math.max(20,moveLimit-5)}
  moves=moveLimit;movesEl.textContent=moves;timeEl.textContent="00:00";resEl.textContent="";
  build();
}
restartBtn.addEventListener("click",function(){reset(false)});
harderBtn.addEventListener("click",function(){reset(true)});
reset(false);