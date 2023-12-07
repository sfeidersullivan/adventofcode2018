import { input } from "./input.js"

const test = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const charValue = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
}

const getHandScore = hand => {
    const charMap = {};
    for (let char of hand) {
        charMap[char] = (charMap[char] || 0) + 1;
    }
    const counts = Object.values(charMap);
    if (counts.includes(5)) {
        return 7;
    }
    if (counts.includes(4)) {
        return 6;
    }
    const includes3 = counts.includes(3)
    const includes2 = counts.includes(2)
    if (includes3 && includes2) {
        return 5;
    }
    if (includes3) {
        return 4;
    }
    if (includes2 && counts.length === 3) {
        return 3;
    }
    if (includes2) {
        return 2;
    }
    return 1;
}

const lines = input.split("\n").map(line => {
    const [hand, num] = line.split(" ");
    return ({
        hand,
        bid: Number(num),
        score: getHandScore(hand),
    })
})

lines.sort((a,b) => {
    if (a.score > b.score) return 1;
    if (a.score < b.score) return -1;
    const [a1,a2,a3,a4,a5] = a.hand;
    const [b1,b2,b3,b4,b5] = b.hand;
    if (charValue[a1] > charValue[b1]) return 1;
    if (charValue[a1] < charValue[b1]) return -1;
    if (charValue[a2] > charValue[b2]) return 1;
    if (charValue[a2] < charValue[b2]) return -1;
    if (charValue[a3] > charValue[b3]) return 1;
    if (charValue[a3] < charValue[b3]) return -1;
    if (charValue[a4] > charValue[b4]) return 1;
    if (charValue[a4] < charValue[b4]) return -1;
    if (charValue[a5] > charValue[b5]) return 1;
    if (charValue[a5] < charValue[b5]) return -1;
    return 0;
})

const sum = lines.reduce((accum, line, index) => accum + (line.bid * (index + 1)), 0)

console.log(sum)