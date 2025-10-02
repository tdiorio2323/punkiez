import { TILE, COLS, ROWS, W, H, clamp, randInt } from './utils.js';
import { map, isWall, isGate, eat, dotsLeft, forEachTile } from './level.js';
import { input } from './input.js';
import { playerImg, ghostImg, dotImg, drawCentered } from './sprites.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = W; canvas.height = H;

const hud = { score:0, lives:3, status:'READY', hi: Number(localStorage.getItem('pm_hi')||0) };
const hiEl = document.getElementById('hi');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const statusEl = document.getElementById('status');
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const restartBtn = document.getElementById('restartBtn');
hiEl.textContent = String(hud.hi).padStart(5,'0');
scoreEl.textContent = 'SCORE: 00000';
statusEl.textContent = 'READY';

function tileAt(x,y){ return [Math.floor(x/TILE), Math.floor(y/TILE)]; }
function passable(nx, ny){ const [c,r] = tileAt(nx, ny); return !isWall(c,r) && !isGate(c,r); }

const player = { x:14*TILE+TILE/2, y:23*TILE+TILE/2, speed:2, vx:1, vy:0, size:22 };

const ghosts = [
  { x:14*TILE+TILE/2, y:11*TILE+TILE/2, speed:1.6, vx:0, vy:1, scatter:false },
  { x:13*TILE+TILE/2, y:11*TILE+TILE/2, speed:1.6, vx:0, vy:1, scatter:false },
];

const STATE = { ATTRACT:0, PLAY:1, PAUSE:2, GAMEOVER:3 };
let state = STATE.ATTRACT;
overlay.style.display = 'flex';

function wrap(p){
  if(p.x < 0) p.x = W-1; if(p.x >= W) p.x = 0;
}

function tryTurn(entity, dx, dy){
  const cx = Math.round(entity.x / TILE) * TILE + TILE/2;
  const cy = Math.round(entity.y / TILE) * TILE + TILE/2;
  const near = Math.hypot(entity.x - cx, entity.y - cy) < 4;
  if(!near) return false;
  const nx = cx + dx * (TILE/2 - 2);
  const ny = cy + dy * (TILE/2 - 2);
  if(passable(nx, ny)) { entity.vx = dx; entity.vy = dy; return true; }
  return false;
}

function move(entity){
  if(entity===player) tryTurn(player, input.x, input.y);
  const nx = entity.x + entity.vx * entity.speed;
  const ny = entity.y + entity.vy * entity.speed;
  if(passable(nx, ny)) { entity.x = nx; entity.y = ny; wrap(entity); }
  else { tryTurn(entity, entity.vx, entity.vy); }
}

function eatDots(){
  const [c,r] = tileAt(player.x, player.y);
  const gained = eat(c,r);
  if(gained){
    hud.score += gained;
    scoreEl.textContent = 'SCORE: ' + String(hud.score).padStart(5,'0');
  }
}

function ai(ghost){
  if(Math.random() < 0.02){
    const opts = [[1,0],[-1,0],[0,1],[0,-1]];
    const [dx,dy] = opts[randInt(0,3)];
    tryTurn(ghost, dx, dy);
  }
  const dx = Math.sign(player.x - ghost.x);
  const dy = Math.sign(player.y - ghost.y);
  const ax = Math.abs(player.x - ghost.x) > Math.abs(player.y - ghost.y);
  if(ax){ if(!tryTurn(ghost, dx, 0)) tryTurn(ghost, 0, dy); }
  else  { if(!tryTurn(ghost, 0, dy)) tryTurn(ghost, dx, 0); }
}

function collide(){
  for(const g of ghosts){
    if(Math.hypot(g.x - player.x, g.y - player.y) < 10){
      hud.lives--; livesEl.textContent = `Lives: ${hud.lives}`;
      hud.status = 'HIT'; statusEl.textContent = 'HIT';
      player.x=14*TILE+TILE/2; player.y=23*TILE+TILE/2; player.vx=1; player.vy=0;
      if(hud.lives<=0){ gameOver(); }
      break;
    }
  }
}

function drawLevel(){
  forEachTile((c,r,t)=>{
    const x=c*TILE, y=r*TILE;
    if(t===1){
      ctx.fillStyle = '#0A2A7A';
      ctx.fillRect(x, y, TILE, TILE);
      ctx.strokeStyle = '#1b5cff';
      ctx.strokeRect(x+1,y+1,TILE-2,TILE-2);
    } else if(t===2){
      // draw pellet as a circle to avoid image dependency
      ctx.beginPath(); ctx.fillStyle = '#e7e7e7';
      ctx.arc(x+TILE/2, y+TILE/2, 2.5, 0, Math.PI*2); ctx.fill();
    } else if(t===3){
      ctx.beginPath(); ctx.fillStyle = '#ffd400';
      ctx.arc(x+TILE/2, y+TILE/2, 5, 0, Math.PI*2); ctx.fill();
    }
  });
}

function drawLives(){
  // bottom-left lives icons like Pac-Man using the logo
  for(let i=0;i<hud.lives;i++){
    drawCentered(ctx, playerImg, 16 + i*18, H-10, 14);
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawLevel();
  drawCentered(ctx, playerImg, player.x, player.y, player.size);
  for(const g of ghosts){ drawCentered(ctx, ghostImg, g.x, g.y, 14); }
  drawLives();
}

let running = true;
function loop(){
  if(!running) return;
  if(state!==STATE.PLAY){ requestAnimationFrame(loop); return; }
  move(player); eatDots();
  for(const g of ghosts){ ai(g); move(g); }
  collide();
  if(dotsLeft()===0){ hud.status='YOU WIN'; statusEl.textContent='YOU WIN'; pause(); }
  draw();
  requestAnimationFrame(loop);
}

function start(){
  state = STATE.PLAY;
  overlay.style.display='none';
  hud.score=0; hud.lives=3; statusEl.textContent='READY';
  scoreEl.textContent='SCORE: 00000';
  player.x=14*TILE+TILE/2; player.y=23*TILE+TILE/2; player.vx=1; player.vy=0;
}
function pause(){ state = STATE.PAUSE; }
function resume(){ state = STATE.PLAY; }
function gameOver(){
  state = STATE.GAMEOVER;
  statusEl.textContent='GAME OVER';
  if(hud.score>hud.hi){ hud.hi=hud.score; localStorage.setItem('pm_hi',hud.hi); hiEl.textContent=String(hud.hi).padStart(5,'0'); }
  overlay.style.display='flex';
}
function restart(){ state=STATE.ATTRACT; start(); }

startBtn?.addEventListener('click', start);
pauseBtn?.addEventListener('click', pause);
resumeBtn?.addEventListener('click', resume);
restartBtn?.addEventListener('click', restart);
addEventListener('keydown', (e)=>{ if(e.code==='Space') start(); if(e.key==='p'||e.key==='P') (state===STATE.PLAY?pause():resume()); if(e.key==='r'||e.key==='R') restart(); });

requestAnimationFrame(loop);