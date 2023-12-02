import { input } from "./input.js"

const maxCounts = {
    "red": 12,
    "green": 13,
    "blue": 14,
}

const lines = input.split("\n")
const sum = lines.reduce((accum, line) => {
    const [,gameNum] = line.match(/Game (\d+)/)
    const matches = line.match(/(\d+)\s(blue|red|green)/g);
    const invalid = matches.some(match => {
        const [numStr, color] = match.split(" ");
        return Number(numStr) > maxCounts[color];
    })
    return invalid ? accum : accum + Number(gameNum);
}, 0)


console.log(sum) // 