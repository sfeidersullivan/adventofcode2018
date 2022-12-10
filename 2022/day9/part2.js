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
const test2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

const commands = input.split("\n");
// const commands = test2.split("\n");
const trail = [
    [ 0, 0 ], [ 0, 0 ],
    [ 0, 0 ], [ 0, 0 ],
    [ 0, 0 ], [ 0, 0 ],
    [ 0, 0 ], [ 0, 0 ],
    [ 0, 0 ], [ 0, 0 ]
  ];
const hash = ([x,y]) => `${x}-${y}`;
const been = new Set([hash([0,0])]);

const isOneAway = (a,b) => {
    const [x1,y1] = a
    const [x2,y2] = b
    return ((((x1-x2)**2)+((y1-y2)**2))**0.5) < 1.5
}

for (var command of commands) {
    const [direction, countStr] = command.split(" ");
    console.log(command)

    // move
    const count = parseInt(countStr);
    for (var c = 0; c < count; c++) {
        // move head
        if (direction === "R") {
            trail[0][0]++;
        }
        if (direction === "L") {
            trail[0][0]--;
        }
        if (direction === "U") {
            trail[0][1]++;
        }
        if (direction === "D") {
            trail[0][1]--;
        }

        for (var i = 1; i < trail.length; i++) {
            const knot = trail[i];
            const ahead = trail[i-1];
            if (isOneAway(knot, ahead)) {
                continue;
            }


            // relocate
            // same column
            if (knot[0] === ahead[0]) {
                if (ahead[1] > knot[1]) {
                    knot[1]++
                }
                if (ahead[1] < knot[1]) {
                    knot[1]--
                }
                continue;
            }
            // same row
            if (knot[1] === ahead[1]) {
                if (ahead[0] > knot[0]) {
                    knot[0]++
                }
                if (ahead[0] < knot[0]) {
                    knot[0]--
                }
                continue;
            }

            // diagnal
            // go right
            if (ahead[0] > knot[0]) {
                knot[0]++;
            }
            // go left
            if (ahead[0] < knot[0]) {
                knot[0]--;
            }
            // go up
            if (ahead[1] > knot[1]) {
                knot[1]++;
            }
            // go down
            if (ahead[1] < knot[1]) {
                knot[1]--;
            }
        }

        // log tail
        been.add(hash(trail[9]))
    }
}


console.log(been.size)