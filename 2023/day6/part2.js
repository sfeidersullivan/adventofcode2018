import { input } from "./input.js"

// distance = speed * time
// speed = holdTime
// time = 55 - holdTime

// distance = (55 - time) * time = -t^2 + 55t - 401

const quad = (a, b, c) => {
    const result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a); 
    const result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    return [result, result2]
}

const testrace = {
    time: 71530,
    distance: 940200,
}
const race = {
    time: 55999793,
    distance: 401148522741405,
}
console.log(race)

const [low, high] = quad(-1, race.time, -1*race.distance)
console.log(low, high)

const winCount = Math.ceil(high) - Math.floor(low) - 1;
console.log(winCount) // 39132886