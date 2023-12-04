import { input } from "./input.js"

const specialChars = new Set(["+", "-", "@", "#", "/", "*", "$", "=", "%", "&"])

const lines = input.split("\n")

const hasAdjacentChar = (lineIndex, charStartIndex, charEndIndex) => {
    const cordsToCheck = [
        [lineIndex, charStartIndex - 1],
        [lineIndex, charEndIndex + 1],
    ]
    for (let i = charStartIndex - 1; i <= charEndIndex + 1; i++) {
        cordsToCheck.push([lineIndex - 1, i])
        cordsToCheck.push([lineIndex + 1, i])
    }
    return cordsToCheck.some(coord => {
        const [x,y] = coord;
        if (x < 0 || x >= lines.length) return false;
        const line = lines[x];
        if (y < 0 || y >= line.length) return false;

        return specialChars.has(line[y])
    })
}

const sum = lines.reduce((accum, line, lineIndex) => {
    let lineSum = 0;
    const matches = line.matchAll(/\d+/gm)
    for (const match of matches) {
        const numStr = match[0];
        const start = match.index;
        const end = start + numStr.length - 1;

        // Has char adjacent
        const hasSpecChar = hasAdjacentChar(lineIndex, start, end)
        if (hasSpecChar) {
            lineSum += Number(numStr)
        }
    }

    return accum + lineSum;
}, 0)

console.log(sum) // 535351