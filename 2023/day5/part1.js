import { input } from "./input.js"

const test = `seeds: 79 14 55 13
--
seed-to-soil map:
50 98 2
52 50 48
--
soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15
--
fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4
--
water-to-light map:
88 18 7
18 25 70
--
light-to-temperature map:
45 77 23
81 45 19
68 64 13
--
temperature-to-humidity map:
0 69 1
1 0 69
--
humidity-to-location map:
60 56 37
56 93 4`

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

const seeds = seedStr.match(/\d+/g).map(numStr => Number(numStr));
const maps = mapStrs.map(map => makeMap(map))

const locations = seeds.map(seed => {
    console.log("------- seed: ", seed)
    const location = maps.reduce((value, m) => {
        // find map line
        const mapLine = m.find(line => {
            const [, source, length] = line;
            if (value >= source && value <= source + length) {
                return true;
            }
            return false;
        })

        // values not in the map map to themselves
        if (!mapLine) {
            return value;
        }

        // calc dest value
        const [dest, source] = mapLine;
        const newValue = dest + (value - source);
        return newValue;
    }, seed)

    return location;
})

console.log(locations)
console.log("min location: ", Math.min(...locations)) // 462648396