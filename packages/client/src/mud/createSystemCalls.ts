import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { Directions } from "../layers/phaser/constants";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { Position, Monsters }: ClientComponents
) {
  
  const spawnPlayer = (x : number, y : number) => {
    worldSend("spawn", [x,y]);
  } 

  const spawnMonster = (x : number, y : number) => {
    worldSend("spawnMonster", [x, y]);
  }

  const movePlayer = (direction : Directions) => {
    worldSend("move", [direction]);
  }

  const catchMonster = () => {
    worldSend("catchMonster", []);
  }
 
  return {
    spawnPlayer,
    spawnMonster,
    movePlayer,
    catchMonster,
  };
}
