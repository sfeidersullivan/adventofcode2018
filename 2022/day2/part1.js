import { input } from "./input.js"

/**
 * A for Rock, B for Paper, and C for Scissors
 * X for Rock, Y for Paper, and Z for Scissors
 * (1 for Rock, 2 for Paper, and 3 for Scissors)
 * (0 if you lost, 3 if the round was a draw, and 6 if you won)
 */

const pairLooky = {
    "A X": 4,
    "A Y": 8,
    "A Z": 3,
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 7,
    "C Y": 2,
    "C Z": 6,
}

const points = input.split("\n").reduce((sum, pair) => sum + pairLooky[pair], 0)

console.log(points)