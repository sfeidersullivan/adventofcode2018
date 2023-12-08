import { input } from "./input.js"

const test = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const lines = input.split("\n")
const [command, blank, ...rest] = lines;
let commandMap = new Map();
rest.map(line => {
    const [key, left, right] = line.match(/[A-Z]+/g)
    commandMap.set(key, { left, right })
})

console.log(commandMap)

let steps = 0;
let key = "AAA";
while (key !== "ZZZ") {
    const char = command[(steps) % command.length]
    console.log("key: ", key, "char: ", char)
    const { left, right } = commandMap.get(key);
    if (char === "L") {
        key = left;
    }
    if (char === "R") {
        key = right;
    }
    steps++
}

console.log(steps) // 12083
