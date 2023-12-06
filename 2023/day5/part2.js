import { input } from "./input.js"

const [
    seedStr,
    ...mapStrs
] = input.split("--");

const makeMap = (mapStr) =>
    mapStr
    .split(":")[1]
    .trim()
    .split("\n")
    .map(line => line
        .match(/\d+/g)
        .map(numStr => Number(numStr))
        )

const seedRanges = seedStr.match(/\d+\s+\d+/g).map(range => range.match(/\d+/g).map(num => Number(num)));

const seedInRange = (seed) => seedRanges.some(range => {
        const [start, length] = range;
        return seed >= start && seed <= start + length;
    })

const maps = mapStrs.map(map => makeMap(map))
maps.reverse()

const findSeed = (location) => {
    const seed = maps.reduce((value, m) => {
        // find map line
        const mapLine = m.find(line => {
            const [dest, source, length] = line;
            if (value >= dest && value <= dest + length) {
                return true;
            }
            return false;
        })

        if (mapLine) {
            // calc source value
            const [dest, source] = mapLine;
            const newValue = source + (value - dest);
            return newValue;
        }

        // value is not in the map, maps to same value
        return value;
    }, location)

    return seed;
}

// probably don't need to start at 0
let found = false;
let location = 0;
while (!found) {
    const seed = findSeed(location);
    if (seedInRange(seed)) {
        found = true;
        break;
    }
    location++;
}

console.log("first location: ", location) // 2520479