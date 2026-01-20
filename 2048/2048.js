const board=document.getElementById("board");
const scoreEl=document.getElementById("score");
const bestEl=document.getElementById("best");

let grid=[];
let score=0;
let best=localStorage.getItem("best2048")||0;

bestEl.textContent=best;

function init(){
  grid=Array(4).fill().map(()=>Array(4).fill(0));
  score=0;
  board.innerHTML="";
  createCells();
  addTile(); addTile();
  render();
}

function createCells(){
  for(let i=0;i<16;i++){
    const c=document.createElement("div");
    c.className="cell";
    board.appendChild(c);
  }
}

function addTile(){
  let empty=[];
  grid.forEach((r,i)=>r.forEach((v,j)=>{if(!v)empty.push({i,j})}));
  if(!empty.length)return;
  let {i,j}=empty[Math.floor(Math.random()*empty.length)];
  grid[i][j]=Math.random()<.9?2:4;
}

function render(){
  document.querySelectorAll(".tile").forEach(t=>t.remove());
  grid.forEach((r,i)=>r.forEach((v,j)=>{
    if(v){
      const t=document.createElement("div");
      t.className=`tile tile-${v}`;
      t.textContent=v;
      t.style.transform=`translate(${j*85}px,${i*85}px)`;
      board.appendChild(t);
    }
  }));
  scoreEl.textContent=score;
}

function slide(row){
  row=row.filter(v=>v);
  for(let i=0;i<row.length-1;i++){
    if(row[i]===row[i+1]){
      row[i]*=2;
      score+=row[i];
      row[i+1]=0;
    }
  }
  return row.filter(v=>v);
}

function move(dir){
  let moved=false;
  for(let i=0;i<4;i++){
    let r;
    if(dir==="left"||dir==="right"){
      r=grid[i].slice();
      if(dir==="right")r.reverse();
      r=slide(r);
      while(r.length<4)r.push(0);
      if(dir==="right")r.reverse();
      if(grid[i].toString()!=r.toString())moved=true;
      grid[i]=r;
    }else{
      r=grid.map(x=>x[i]);
      if(dir==="down")r.reverse();
      r=slide(r);
      while(r.length<4)r.push(0);
      if(dir==="down")r.reverse();
      for(let j=0;j<4;j++){
        if(grid[j][i]!=r[j])moved=true;
        grid[j][i]=r[j];
      }
    }
  }
  if(moved){
    addTile();
    if(score>best){
      best=score;
      localStorage.setItem("best2048",best);
      bestEl.textContent=best;
    }
    render();
  }
}

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowLeft")move("left");
  if(e.key==="ArrowRight")move("right");
  if(e.key==="ArrowUp")move("up");
  if(e.key==="ArrowDown")move("down");
});

function restart(){init();}
function goBack(){location.href="../menu.html";}

init();
