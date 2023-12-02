import { input, test } from "./input.js"

/**
 *
 */

const monkeys = input.split("\n\n");

const monkeyMap = {};
const monkeyInspectCountMap = {};

for (var count = 0; count <= 10000; count++) {
    // console.log(monkeyMap)
    // each monkey
    for (var monkey of monkeys) {
        const [monkeyStr, itemsStr, operation, test, ifTrue, ifFalse] = monkey.split("\n")
        
        // Number
        const monkeyNum = parseInt(monkeyStr.split(" ")[1]);
        // console.log("monkey: ", monkeyNum)
        
        // Items
        if (count === 0) {
            // seed map
            monkeyMap[monkeyNum] = itemsStr.split(": ")[1].split(", ").map(str => BigInt(str));
            continue;
        }
        const items = monkeyMap[monkeyNum]

        // Test
        const divisibleNum = BigInt(test.split(" ")[3])

        // True
        const throwToTrue = parseInt(ifTrue.split(" ")[7]);
        const throwToFalse = parseInt(ifFalse.split(" ")[7]);

        // log number of items inspected
        monkeyInspectCountMap[monkeyNum] = (monkeyInspectCountMap[monkeyNum] || 0) + items.length;

        // move items
        for (var item of items) {
            let newVal;
            // operation
            if (operation.includes("old * old")) {
                newVal = item * item;
            } else if (operation.includes("+")) {
                const end = BigInt(operation.split("+")[1])
                newVal = item + end;
            } else if (operation.includes("*")) {
                const end = BigInt(operation.split("*")[1])
                newVal = item * end;
            }
            // console.log(newVal)

            // check divisible 
            const isDivis = (newVal % divisibleNum) === BigInt(0);
            const moveTo = isDivis ? throwToTrue : throwToFalse;
            
            // keep small
            if (isDivis) {
                newVal = newVal / divisibleNum
            }

            // move
            monkeyMap[moveTo] = [...monkeyMap[moveTo], newVal];
        }

        // remove items from current monkey
        monkeyMap[monkeyNum] = [];
    }
}

console.log(monkeyMap)
// too low 17562697279
// too low 19589359235
const vals = Object.values(monkeyInspectCountMap);
vals.sort((a,b) => b-a)
console.log(vals[0]*vals[1])