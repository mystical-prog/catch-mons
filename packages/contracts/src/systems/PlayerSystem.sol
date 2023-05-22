// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System } from "@latticexyz/world/src/System.sol";
import { addressToEntity } from "../Utils.sol";
import { getKeysWithValue } from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";

import { Position, PositionData, PositionTableId, CaughtMonsters, CaughtMonstersData, CaughtMonstersTableId } from "../codegen/Tables.sol";
import { Direction } from "../codegen/Types.sol";

contract PlayerSystem is System {
    function spawn(int32 x, int32 y) public {
        require(x != 0 || y != 0, "Cannot spawn at zero coord");
        bytes32 player = addressToEntity(_msgSender());
        PositionData memory existingPosition = Position.get(player);
        require(existingPosition.x == 0 && existingPosition.y == 0, "player already spawned!");
        bytes32[] memory playerAtPosition = getKeysWithValue(PositionTableId, Position.encode(x,y));
        require(playerAtPosition.length == 0, "spawn location occupied!");
        Position.set(player, x, y);
    }

    function move(Direction direction) public {
        require(direction != Direction.Unknown, "Direction cannot be unknown!");
        bytes32 player = addressToEntity(_msgSender());
        PositionData memory existingPosition = Position.get(player);
        require(existingPosition.x != 0 || existingPosition.y != 0, "player not spawned!");
        
        int32 x = existingPosition.x;
        int32 y = existingPosition.y;

        if(direction == Direction.Up) {
            y -= 1;
        } else if(direction == Direction.Down) {
            y += 1;
        } else if(direction == Direction.Left) {
            x -= 1;
        } else if(direction == Direction.Right) {
            x += 1;
        }

        bytes32[] memory playerAtPosition = getKeysWithValue(PositionTableId, Position.encode(x,y));
        require(playerAtPosition.length == 0, "blocking!");

        Position.set(player, x, y);
    }
}