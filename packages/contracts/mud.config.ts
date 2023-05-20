import { mudConfig, resolveTableId } from "@latticexyz/world/register";

export default mudConfig({
  worldContractName : "catch-mons",
  excludeSystems : ["System3", "System2"],
  enums : {
    MonsterTypes : [
      "None",
      "Normal",
      "Grass",
      "Fire",
      "Water",
    ],
  },
  tables: {
    Position: {
      schema: {
        x : "int32",
        y : "int32",
      }
    },
    Monster : {
      schema: {
        x : "int32",
        y : "int32",
        monster_type : "MonsterTypes",
        level : "uint16",
      }
    }
  },
});
