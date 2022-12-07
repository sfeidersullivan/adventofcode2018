import { input } from "./input.js"

/**
 * map a dir from cli commands, come on day 7
 */

// helpers
const parts = command => command.split(" ");
const makeNode = name => ({
    name,
    size: 0,
    dirs: {},
})

// split input
const commands = input.trim().split("\n")
commands.shift() // skip the home dir

// root dir
const dir = makeNode("/")
// pointer to current node
let pointer = dir;

// Good ol while loop
while (true) {
    // grab the next command
    const next = commands.shift();

    // This is the end of the commands
    if (!next) {
        break;
    }

    // get the parts of the command, c may be undefined
    const [a, b, c] = parts(next);

    // commands
    if (a === "$") {
        // change dir
        if (b === "cd") {
            if (c === ".." && pointer.parent) {
                // move up to parent
                pointer = pointer.parent;
                continue;
            }
            if (pointer.dirs[c]) {
                // move down to child
                pointer = pointer.dirs[c]
                continue;
            }
        }
        // list files
        if (b === "ls") {
            // do nothing
            continue;
        }
    }

    // a dire
    if (a === "dir") {
        const newNode = makeNode(b)
        newNode.parent = pointer;
        pointer.dirs[b] = newNode;
        continue;
    }

    // else, a files
    pointer.size += parseInt(a)
    continue;
}

let part1Total = 0;
let possibleDirs = []; // to delete

// recursive func to count dir sizes
const countSizes = (node) => {
    const dirs = Object.values(node.dirs)
    const sum = node.size + dirs.reduce((accum, dir) => accum + countSizes(dir), 0);

    // sum all the dirs <= 100000
    if (sum <= 100000) {
        part1Total += sum;
    }
    // collect all the dirs larger than what we need to delete
    if (sum >= 528671) {
        possibleDirs.push(sum)
    }
    return sum;
}

// console.log("root dir: ", dir)
console.log("root dir size", countSizes(dir))
// available = 70000000 - 40528671 = 29471329
// space needed = 30000000 - 29471329 = 528671
console.log("part 1 total: ", part1Total)
console.log("smallest dir to delete: ", Math.min(...possibleDirs))
