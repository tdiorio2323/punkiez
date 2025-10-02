import { TILE } from './utils.js';

// Player sprite (your logo). Keep file present.
export const playerImg = new Image();
playerImg.src = './assets/logo.png';

// Tiny safe placeholders so drawImage never breaks if files are missing.
const TRANSPARENT_1PX = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
export const ghostImg = new Image();
ghostImg.src = TRANSPARENT_1PX;
export const dotImg = new Image();
dotImg.src = TRANSPARENT_1PX;

export function drawCentered(ctx, img, x, y, size=TILE){
  if (!(img && img.complete && img.naturalWidth)) return; // guard broken images
  ctx.drawImage(img, x - size/2, y - size/2, size, size);
}