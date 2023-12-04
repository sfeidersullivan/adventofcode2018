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
    const specCoord = cordsToCheck.find(coord => {
        const [x,y] = coord;
        if (x < 0 || x >= lines.length) return false;
        const line = lines[x];
        if (y < 0 || y >= line.length) return false;

        return specialChars.has(line[y])
    })

    return specCoord || false;
}

const gearMap = new Map();
lines.map((line, lineIndex) => {
    const matches = line.matchAll(/\d+/gm)
    for (const match of matches) {
        const numStr = match[0];
        const start = match.index;
        const end = start + numStr.length - 1;

        // Has char adjacent
        const hasSpecChar = hasAdjacentChar(lineIndex, start, end)
        if (hasSpecChar) {
            const [x,y] = hasSpecChar
            const char = lines[x][y]
            if (char === "*") {
                const coordHash = `${x},${y}`
                const existing = gearMap.get(coordHash) || []
                gearMap.set(coordHash, [...existing, Number(numStr)])
            }
        }
    }
})

const gearSum = [...gearMap.values()].reduce((accum, val) => {
    if (val.length !== 2) {
        return accum;
    }
    const [a,b] = val;
    return accum + (a*b);
}, 0)

console.log(gearSum) // 87287096