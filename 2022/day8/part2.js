import { input } from "./input.js"

/**
 * find highest tree score
 */

const matrix = input.split("\n");
const matrixY = matrix.length;
const matrixX = matrix[0].length;
const visableHashMap = new Map();

for (var y = 0; y < matrixY; y++) {
    for (var x = 0; x < matrixX; x++) {
        const height = matrix[y][x];
        const hash = `${x}-${y}`;
        visableHashMap.set(hash, visableHashMap.get(hash) || 1);

        // edges are always 0
        if (x <= 0 || x >= matrixX-1 || y <= 0 || y >= matrixY-1) {
            visableHashMap.set(hash, 0);
            continue;
        }

        // look all 4 directions for the next highest tree
        let distance = 1;
        let leftDone;
        let rightDone;
        let upDone;
        let downDone;
        while (!leftDone || !rightDone || !upDone || !downDone) {
            // left
            if (!leftDone) {
                if (x-distance === 0 || matrix[y][x-distance] >= height) {
                    visableHashMap.set(hash, visableHashMap.get(hash) * distance);
                    leftDone = true;
                }
            }
            // right
            if (!rightDone) {
                if (x+distance === matrixX-1 || matrix[y][x+distance] >= height) {
                    visableHashMap.set(hash, visableHashMap.get(hash) * distance);
                    rightDone = true;
                }
            }
            // up
            if (!upDone) {
                if (y-distance === 0 || matrix[y-distance][x] >= height) {
                    visableHashMap.set(hash, visableHashMap.get(hash) * distance);
                    upDone = true;
                }
            }
            // down
            if (!downDone) {
                if (y+distance === matrixY-1 || matrix[y+distance][x] >= height) {
                    visableHashMap.set(hash, visableHashMap.get(hash) * distance);
                    downDone = true;
                }
            }

            distance++;
        }
    }
}

// max of all the scores
console.log(Math.max(...Array.from(visableHashMap.values())))