/* Autogenerated file. Do not edit manually. */

import { TableId } from "@latticexyz/utils";
import { defineComponent, Type as RecsType, World } from "@latticexyz/recs";

export function defineContractComponents(world: World) {
  return {
    Position: (() => {
      const tableId = new TableId("", "Position");
      return defineComponent(
        world,
        {
          x: RecsType.Number,
          y: RecsType.Number,
        },
        {
          metadata: {
            contractId: tableId.toHexString(),
            tableId: tableId.toString(),
          },
        }
      );
    })(),
    Monsters: (() => {
      const tableId = new TableId("", "Monsters");
      return defineComponent(
        world,
        {
          x: RecsType.Number,
          y: RecsType.Number,
          spawned_at: RecsType.BigInt,
          level: RecsType.Number,
          monster_type: RecsType.Number,
        },
        {
          metadata: {
            contractId: tableId.toHexString(),
            tableId: tableId.toString(),
          },
        }
      );
    })(),
    CaughtMonsters: (() => {
      const tableId = new TableId("", "CaughtMonsters");
      return defineComponent(
        world,
        {
          owned_by: RecsType.String,
          minted: RecsType.Boolean,
          monster_type: RecsType.Number,
          level: RecsType.Number,
        },
        {
          metadata: {
            contractId: tableId.toHexString(),
            tableId: tableId.toString(),
          },
        }
      );
    })(),
  };
}
