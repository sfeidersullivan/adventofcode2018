import { input } from "./input.js"

/**
 *
 */

const commands = input.split("\n");
const mappedCommands = [];
for (var command of commands) {
    if (command === "noop") {
        mappedCommands.push(0);
    }
    const [c, num] = command.split(" ");
    if (c === "addx") {
        mappedCommands.push(0);
        mappedCommands.push(parseInt(num));
    }
}

let xReg = 1;
const crt = new Array(6).fill(undefined).map(row => new Array(40).fill(undefined).map(row => "."));
for (var i = 0; i<mappedCommands.length; i++) {
    const crtPosition = i;
    const column = crtPosition%40;
    if ([xReg - 1, xReg, xReg + 1].includes(column)) {
        const row = Math.floor(crtPosition/40)
        crt[row][column] = "#";
    }
    
    // for next cycle
    const num = mappedCommands[i];
    xReg += num;
}

console.log(crt.map(row => row.join("")))
