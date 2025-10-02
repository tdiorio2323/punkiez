export const input = { x:0, y:0, lastX:1, lastY:0 };
const dirs = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0], w:[0,-1], s:[0,1], a:[-1,0], d:[1,0] };

addEventListener('keydown', e=>{
  const d = dirs[e.key];
  if(!d) return;
  input.x = d[0];
  input.y = d[1];
});