import { input } from "./input.js"

const lines = input.split("\n")

const numMap = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
}
const numKeys = Object.keys(numMap)

let sum = 0;
const numbers = lines.map(line => {
    let first, last
    let cutStr = line;
    while (!first || !last) {
        if (cutStr.length <= 0) break;

        const head = cutStr[0];
        const tail = cutStr[cutStr.length - 1]
        if (!first) {
            const num = numMap[numKeys.find(key => cutStr.startsWith(key))]
            if (!isNaN(head)) {
                first = head;
            } else if (!isNaN(num)){
                first = num
            } else {
                cutStr = cutStr.slice(1)
            }
        }
        if (!last) {
            const num = numMap[numKeys.find(key => cutStr.endsWith(key))]
            if (!isNaN(tail)) {
                last = tail;
            } else if (!isNaN(num)){
                last = num
            } else {
                cutStr = cutStr.slice(0, -1)
            }
        }
    }
    const numStr = first + last;
    const num = Number(numStr)
    sum += num;

    return numStr
})

console.log(sum) // 55413