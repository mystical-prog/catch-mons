import { Has, defineEnterSystem, defineSystem, getComponentValueStrict } from "@latticexyz/recs";
import { PhaserLayer } from "../createPhaserLayer";
import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { TILE_HEIGHT, TILE_WIDTH } from "../constants";

export function createPlayerSystem(layer : PhaserLayer) {
    const {
        world,
        networkLayer: {
            components: {
                Position,
            },
            systemCalls: {
                spawnPlayer,
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