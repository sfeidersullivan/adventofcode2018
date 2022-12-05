import { input } from "./input.js"

/**
 *                 [M]     [V]     [L]
 * [G]             [V] [C] [G]     [D]
 * [J]             [Q] [W] [Z] [C] [J]
 * [W]         [W] [G] [V] [D] [G] [C]
 * [R]     [G] [N] [B] [D] [C] [M] [W]
 * [F] [M] [H] [C] [S] [T] [N] [N] [N]
 * [T] [W] [N] [R] [F] [R] [B] [J] [P]
 * [Z] [G] [J] [J] [W] [S] [H] [S] [G]
 *  1   2   3   4   5   6   7   8   9 
 */

// bottom -> top
const stacks = {
    1: ['Z','T','F','R','W','J','G'],
    2: ['G','W','M'],
    3: ['J','N','H','G'],
    4: ['J','R','C','N','W'],
    5: ['W','F','S','B','G','Q','V','M'],
    6: ['S','R','T','D','V','W','C'],
    7: ['H','B','N','C','D','Z','G','V'],
    8: ['S','J','N','M','G','C'],
    9: ['G','P','N','W','C','J','D','L']
}

const commands = input.split("\n")
commands.forEach(command => {
    const [_a, _move, _b, _from, _c, _to] = command.split(" ")
    const [move, from, to] = [_move, _from, _to].map(str => parseInt(str))
    const temp = []
    for(var i=0; i<move; i++) {
        temp.unshift(stacks[from].pop());
    }
    stacks[to] = stacks[to].concat(temp)
})

const tops = Object.values(stacks).reduce((str, stack) => str + stack.pop(), "")


console.log(tops)