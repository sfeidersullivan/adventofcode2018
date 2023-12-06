import { input } from "./input.js"

const test = `Time:      7  15   30
Distance:  9  40  200`;

const lines = input.split("\n")
const [times, distances] = lines.map(line => line.match(/\d+/g).map(num => Number(num)));
const races = times.map((value, index) => ({ time: value, distance: distances[index]}))


// distance = speed * time
// speed = holdTime
// time = 55 - holdTime

// distance = (55 - time) * time = -t^2 + 55t - 401

const quad = (a, b, c) => {
    const result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a); 
    const result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    return [result, result2]
}

const winCounts = races.map(race => {
    console.log(race)
    const [low, high] = quad(-1, race.time, -1*race.distance)
    console.log(low, high)

    const winCount = Math.ceil(high) - Math.floor(low) - 1;
    console.log(winCount)

    return winCount;
})

const winCount = winCounts.reduce((product, count) => product * count, 1)

console.log(winCount) // 2374848