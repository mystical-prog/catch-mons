export enum Scenes {
  Main = "Main",
}

export enum Maps {
  Main = "Main",
}

export enum Directions {
  Unknown,
  Up,
  Down,
  Right,
  Left,
}

export function generateRandomX(min = -20, max = 20) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor( rand * difference);
  rand = rand + min;
  return rand;
}
export function generateRandomY(min = -10, max = 10) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor( rand * difference);
  rand = rand + min;
  return rand;
}

export enum Animations {
  SwordsmanIdle = "SwordsmanIdle",
}
export enum Sprites {
  Soldier,
}

export enum Assets {
  MainAtlas = "MainAtlas",
  Tileset = "Tileset",
}

export const TILE_HEIGHT = 32;
export const TILE_WIDTH = 32;
