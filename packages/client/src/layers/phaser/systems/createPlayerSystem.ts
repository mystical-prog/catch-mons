import { Has, defineEnterSystem, defineExitSystem, defineSystem, getComponentValueStrict } from "@latticexyz/recs";
import { PhaserLayer } from "../createPhaserLayer";
import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { Directions, TILE_HEIGHT, TILE_WIDTH } from "../constants";

export function createPlayerSystem(layer : PhaserLayer) {
    const {
        world,
        networkLayer: {
            components: {
                Position,
            },
            systemCalls: {
                spawnPlayer,
                movePlayer,
                catchMonster,
            }
        },
        scenes: {
            Main: {
                objectPool,
                input,
            }
        }
    } = layer;

    input.pointerdown$.subscribe((event) => {
        const x = event.pointer.worldX;
        const y = event.pointer.worldY;

        const position = pixelCoordToTileCoord({x, y}, TILE_WIDTH, TILE_HEIGHT);
        if(position.x === 0 && position.y === 0) return;

        spawnPlayer(position.x, position.y);
    });

    input.onKeyPress((keys) => keys.has("W"), () => {
        movePlayer(Directions.Up);
    });

    input.onKeyPress((keys) => keys.has("X"), () => {
        catchMonster();
    });

    input.onKeyPress((keys) => keys.has("S"), () => {
        movePlayer(Directions.Down);
    });

    input.onKeyPress((keys) => keys.has("A"), () => {
        movePlayer(Directions.Left);
    });

    input.onKeyPress((keys) => keys.has("D"), () => {
        movePlayer(Directions.Right);
    });

    defineEnterSystem(world, [Has(Position)], ({ entity }) => {
        const playerObj = objectPool.get(entity, "Rectangle");

        playerObj.setComponent({
            id: 'animation',
            once: (rect) => {
                rect.setSize(20,20);
                rect.setFillStyle(0xff0000);
            }
        })
    });

    defineExitSystem(world, [Has(Position)], ({entity}) => {
        objectPool.remove(entity);
    });

    defineSystem(world, [Has(Position)], ({entity}) => {
        const position = getComponentValueStrict(Position, entity);
        const pixelPosition = tileCoordToPixelCoord(position, TILE_WIDTH, TILE_HEIGHT);

        const playerObj = objectPool.get(entity, "Rectangle");

        playerObj.setComponent({
            id: 'animation',
            once: (rect) => {
                rect.setPosition(pixelPosition.x, pixelPosition.y);
            }
        })
    });
}