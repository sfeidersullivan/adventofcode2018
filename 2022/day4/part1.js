import { input } from "./input.js"

/**
 * # of full overlaps
 */

const pairs = input.split("\n")

const sum = pairs.reduce((sum, pair) => {
    const [range1, range2] = pair.split(",");
    const [r1start, r1end] = range1.split("-").map(num => parseInt(num))
    const [r2start, r2end] = range2.split("-").map(num => parseInt(num))
    if (r1start <= r2start && r1end >= r2end) return sum + 1
    if (r2start <= r1start && r2end >= r1end) return sum + 1
    return sum;
}, 0)

console.log(sum)