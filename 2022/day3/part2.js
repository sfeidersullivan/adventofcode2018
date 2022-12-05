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
const groups = []
for (var i=0; i<bags.length; i++) {
    const bag = bags[i]
    if (i % 3 === 0) {
        groups.push([bag])
    } else {
        groups.push([...groups.pop(), bag])
    }
}

const sum = groups.reduce((sum, group) => {
    const [a,b,c] = group;
    const B = b.split("")
    const C = c.split("")
    const intersection = a.split("").find(char => B.includes(char) && C.includes(char))
    return sum + charVal(intersection)
}, 0)

console.log(sum)