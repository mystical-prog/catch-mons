import { Has, defineEnterSystem, defineSystem, defineExitSystem ,getComponentValueStrict } from "@latticexyz/recs";
import { PhaserLayer } from "../createPhaserLayer";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { TILE_HEIGHT, TILE_WIDTH, generateRandomX, generateRandomY } from "../constants";

export function createMonsterSystem(layer : PhaserLayer) {
    const {
        world,
        networkLayer: {
            components: {
                Monsters,
            },
            systemCalls: {
                spawnMonster,
            }
        },
        scenes: {
            Main: {
                objectPool,
                input,
            }
        }
    } = layer;

    input.pointerdown$.subscribe((_event) => {
        spawnMonster(generateRandomX(), generateRandomY());
    });

    input.onKeyPress((keys) => keys.has("W"), () => {
        spawnMonster(generateRandomX(), generateRandomY());
    });

    input.onKeyPress((keys) => keys.has("X"), () => {
        spawnMonster(generateRandomX(), generateRandomY());
    });

    input.onKeyPress((keys) => keys.has("S"), () => {
        spawnMonster(generateRandomX(), generateRandomY());
    });

    input.onKeyPress((keys) => keys.has("A"), () => {
        spawnMonster(generateRandomX(), generateRandomY());
    });

    input.onKeyPress((keys) => keys.has("D"), () => {
        spawnMonster(generateRandomX(), generateRandomY());
    });

    defineEnterSystem(world, [Has(Monsters)], ({ entity }) => {
        const playerObj = objectPool.get(entity, "Rectangle");

        playerObj.setComponent({
            id: 'animation',
            once: (rect) => {
                rect.setSize(20,20);
                rect.setFillStyle(0x00ff00);
            }
        })
    });

    defineExitSystem(world, [Has(Monsters)], ({ entity} ) => {
        objectPool.remove(entity);
    });

    defineSystem(world, [Has(Monsters)], ({entity}) => {
        const position = getComponentValueStrict(Monsters, entity);
        const x = position.x;
        const y = position.y;
        const pixelPosition = tileCoordToPixelCoord({x , y}, TILE_WIDTH, TILE_HEIGHT);

        const playerObj = objectPool.get(entity, "Rectangle");

        playerObj.setComponent({
            id: 'animation',
            once: (rect) => {
                rect.setPosition(pixelPosition.x, pixelPosition.y);
            }
        })

    });
}