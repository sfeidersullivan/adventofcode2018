import { input } from "./input.js"

const startKeys = ["FSA", "JVA", "QXA", "KNA", "AAA", "FXA"]

const lines = input.split("\n")
const [command, blank, ...rest] = lines;
let commandMap = new Map();
rest.map(line => {
    const [key, left, right] = line.match(/[A-Z0-9]+/g)
    commandMap.set(key, { left, right })
})

const endsInZ = key => key[2] === "Z"

let steps = 0;
const occuranceMap = new Map();
while (occuranceMap.size < 6) {
    const char = command[(steps) % command.length]

    for (let index in startKeys) {
        const key = startKeys[index];
        const { left, right } = commandMap.get(key);
        const nextKey = char === "L" ? left : right
        if (endsInZ(nextKey)) {
            const occurances = occuranceMap.get(index) || []
            occuranceMap.set(index, [...occurances, steps + 1])
        }
        startKeys[index] = nextKey;
    }
    steps++
}

console.log(occuranceMap)

// 7,919,945,007,455,272,960 too high
console.log(steps) // LCM of occuranceMap 13,385,272,668,829
