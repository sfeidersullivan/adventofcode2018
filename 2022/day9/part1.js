import { input } from "./input.js"

/**
 *
 */

const test = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const commands = input.split("\n");
// const commands = test.split("\n");
const h = { x: 0, y: 0};
const t = { x: 0, y: 0};
const hash = (x,y) => `${x}-${y}`;
const been = new Set([hash(0,0)]);

for (var command of commands) {
    const [direction, countStr] = command.split(" ");

    // move
    const count = parseInt(countStr);
    for (var i = 0; i < count; i++) {
        const tempH = {...h}
        if (direction === "R") {
            h.x++;
        }
        if (direction === "L") {
            h.x--;
        }
        if (direction === "U") {
            h.y++;
        }
        if (direction === "D") {
            h.y--;
        }

        const isOneAway = ((((h.x-t.x)**2)+((h.y-t.y)**2))**0.5) < 1.5
        if (!isOneAway) {
            t.x = tempH.x;
            t.y = tempH.y;
            been.add(hash(t.x, t.y))
        }
    }
}


console.log(been.size)