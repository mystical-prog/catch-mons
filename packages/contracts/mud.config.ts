import { mudConfig, resolveTableId } from "@latticexyz/world/register";

export default mudConfig({
  excludeSystems : ["System3", "System2"],
  enums : {
    MonsterTypes : [
      "Unknown",
      "Normal",
      "Grass",
      "Fire",
      "Water",
    ],
    Direction : [
      "Unknown",
      "Up",
      "Down",
      "Right",
      "Left",
    ]
  },
  tables: {
    Position: {
      schema: {
        x : "int32",
        y : "int32",
      }
    },
    Monsters : {
      schema: {
        x : "int32",
        y : "int32",
        spawned_at : "uint256",
        level : "uint32",
        monster_type : "MonsterTypes",
      }
    },
    CaughtMonsters : {
      schema: {
        owned_by : "address",
        minted : "bool",
        monster_type : "MonsterTypes",
        level : "uint32",
      },
      keySchema: {
        id : "uint256",
      }
    }
  },
  modules: [
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Position")],
    },
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Monsters")],      
    },
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("CaughtMonsters")],          
    }
  ]
});
