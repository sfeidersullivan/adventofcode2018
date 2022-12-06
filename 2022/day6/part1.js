import { input } from "./input.js"

/**
 * find the index of the char with 4 trailing unique chars
 */

const trail = [];
for (var i=0; i<input.length; i++) {
    const char = input[i];

    // push the next char onto the end
    trail.push(char)

    // if length is not yet 4
    if (trail.length < 4) {
        continue;
    }

    // use set to test if array contains unique chars
    const trailSet = new Set(trail)
    if (trailSet.size === trail.length) {
        // char count, not 0 based index
        console.log(i+1)
        break;
    }

    // shift the first out
    trail.shift()
}
