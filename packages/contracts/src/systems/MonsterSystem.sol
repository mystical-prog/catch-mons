// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System } from "@latticexyz/world/src/System.sol";
import { getKeysWithValue } from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";

import { Monsters, MonstersData, MonstersTableId, Position, PositionData, PositionTableId } from "../codegen/Tables.sol";
import { MonsterTypes } from "../codegen/Types.sol";
import { genRanNumber, max, addressToEntity, abs } from "../Utils.sol";

contract MonsterSystem is System {

    bytes32 internal constant MONSTER = "0x0000";

    function spawnMonster(int32 x, int32 y) public {
        require(x != 0 || y != 0, "Cannot spawn at zero coord");

        MonstersData memory instance = Monsters.get(MONSTER);
        
        require(block.number > (instance.spawned_at + 5), "Invalid Tick");

        uint256 rand = genRanNumber(x, y, _msgSender());
        uint32 level = uint32(rand % 25);
        uint32 mons = uint32(rand % 4);

        MonsterTypes typ = MonsterTypes.Unknown;

        if(mons == 0) {
            typ = MonsterTypes.Normal;
        } else if(mons == 1) {
            typ = MonsterTypes.Grass;
        } else if(mons == 2) {
            typ = MonsterTypes.Fire;
        } else if(mons == 3) {
            typ = MonsterTypes.Water;
        }

        Monsters.set(MONSTER, x, y, block.number, level, typ);
    }

    function catchMonster() public {
        bytes32 player = addressToEntity(_msgSender());
        PositionData memory existingPosition = Position.get(player);
        require(existingPosition.x != 0 || existingPosition.y != 0, "player not spawned!");

        MonstersData memory instance = Monsters.get(MONSTER);
        require(block.number < (instance.spawned_at + 5), "Monster Fled!");
        require(instance.monster_type != MonsterTypes.Unknown, "Unknown Monster");

        int32 distance = max(abs(existingPosition.x - instance.x), abs(existingPosition.y - instance.y));
        require(distance == 0 || distance == 1 || distance == 2 || distance == 3 || distance == 4, "Monster not in range!");

        // Do MonsterCatch Entry Here!!

        despawn();
    }

    function despawn() internal {
        Monsters.set(MONSTER, 0, 0, block.number, 0, MonsterTypes.Unknown);
    }
}