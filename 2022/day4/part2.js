import { input } from "./input.js"

/**
 * # of any overlaps
 */

const pairs = input.split("\n")

const sum = pairs.reduce((sum, pair) => {
    const [range1, range2] = pair.split(",");
    const [r1start, r1end] = range1.split("-").map(num => parseInt(num))
    const [r2start, r2end] = range2.split("-").map(num => parseInt(num))
    if (r1end < r2start || r1start > r2end) return sum
    return sum + 1;
}, 0)

console.log(sum)