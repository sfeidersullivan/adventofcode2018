import { input } from "./input.js"

/**
 * find all trees visible from edges
 */

const rows = input.split("\n");
const visableHashSet = new Set();

const parseMatrix = (matrix) => {
    // left - right
    for (var y = 0; y < matrix.length; y++) {
        let forwardMax = -1;
        let backwardsMax = -1;
        const row = matrix[y];
        for (var x = 0; x < row.length; x++) {
            const forwardX = x;
            const backwardsX = row.length - 1 - x;
            const forwardHeight = row[forwardX];
            const backwardsHeight = row[backwardsX];

            if (forwardHeight > forwardMax) {
                forwardMax = forwardHeight;
                visableHashSet.add(`${forwardX}-${y}`)
            }
            if (backwardsHeight > backwardsMax) {
                backwardsMax = backwardsHeight;
                visableHashSet.add(`${backwardsX}-${y}`)
            }
        }
    }

    // up - down
    for (var x = 0; x < matrix[0].length; x++) {
        let forwardMax = -1;
        let backwardsMax = -1;
        for (var y = 0; y < matrix.length; y++) {
            const forwardY = y;
            const backwardsY = matrix.length - 1 - y;
            const forwardHeight = matrix[forwardY][x];
            const backwardsHeight = matrix[backwardsY][x];

            if (forwardHeight > forwardMax) {
                forwardMax = forwardHeight;
                visableHashSet.add(`${x}-${forwardY}`)
            }
            if (backwardsHeight > backwardsMax) {
                backwardsMax = backwardsHeight;
                visableHashSet.add(`${x}-${backwardsY}`)
            }
        }
    }
}

parseMatrix(rows);

// number of visible trees
console.log(visableHashSet.size)