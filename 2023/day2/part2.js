import { input } from "./input.js"

const lines = input.split("\n")
const sum = lines.reduce((accum, line) => {
    const matches = line.match(/(\d+)\s(blue|red|green)/g);
    const colorMap = new Map()
    matches.map(match => {
        const [numStr, color] = match.split(" ");
        if (colorMap.has(color)) colorMap.set(color, Math.max(colorMap.get(color), Number(numStr)))
        else colorMap.set(color, Number(numStr))
    })
    const power = [...colorMap.values()].reduce((p, val) => p * val, 1)
    return accum + power
}, 0)


console.log(sum) // 