import { PhaserLayer } from "../createPhaserLayer";
import { createCamera } from "./createCamera";
import { createMapSystem } from "./createMapSystem";
import { createMonsterSystem } from "./createMonsterSystem";
import { createPlayerSystem } from "./createPlayerSystem";

export const registerSystems = (layer: PhaserLayer) => {
  createPlayerSystem(layer);
  createMonsterSystem(layer);
//  createCamera(layer);
//  createMapSystem(layer);
};
