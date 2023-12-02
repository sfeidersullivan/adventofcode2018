import { input } from "./input.js"

const lines = input.split("\n")

let sum = 0;
const numbers = lines.map(line => {
    let first, last
    let i = 0;
    while (!first || !last) {
        const head = line[i];
        const tail = line[line.length - 1 - i];
        if (!first && !isNaN(head)) first = head;
        if (!last && !isNaN(tail)) last = tail;
        i++;
    }
    const numStr = first + last;
    const num = Number(numStr)
    sum += num;

    return numStr
})

console.log(sum) // 55712