import { input } from "./input.js"

/**
 *
 */

const charVal = char => {
    const charCode = char.charCodeAt();
    if (charCode < 91) return charCode - 38;
    return charCode - 96;
}


const bags = input.split("\n")
const errors = bags.map(bag => {
    const halfway = bag.length/2;
    const bagSet = new Set();
    for (var i = 0; i < bag.length; i++) {
        const item = bag[i];
        if (i < halfway) {
            bagSet.add(item)
            continue;
        }
        if(bagSet.has(item)) {
            return item;
        }
    }
})
const sum = errors.reduce((sum, char) => sum + charVal(char), 0)

console.log(sum)