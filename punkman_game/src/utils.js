export const TILE = 16;
export const COLS = 28;
export const ROWS = 31;
export const W = COLS * TILE;
export const H = ROWS * TILE + TILE;

export function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
export function randInt(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }