'use strict'
var _ = require('lodash');

console.log('..start..')

// aaaaa.cccc
// aAaaa.cccc
// aaaddecccc
// aadddeccCc
// ..dDdeeccc
// bb.deEeecc
// bBb.eeee..
// bbb.eeefff
// bbb.eeffff
// bbb.ffffFf

const input = require('./input.js');
// const input = `1, 1
// 1, 6
// 8, 3
// 3, 4
// 5, 5
// 8, 9`;
const logs = input.split(`\n`);
const coords = logs.map(item => {
  const xy = item.split(', ');
  const x = Number(xy[0]);
  const y = Number(xy[1]);
  return {x, y};
})
const { xs, ys } = coords.reduce((accum, {x,y}) => {
  accum.xs.push(x);
  accum.ys.push(y);
  return accum;
}, ({ xs:[], ys:[] }));
const buffer = 10000;
const xMin = Math.min(...xs) - buffer;
const yMin = Math.min(...ys) - buffer;
const xMax = Math.max(...xs) + buffer;
const yMax = Math.max(...ys) + buffer;
console.log(`${xMin},${yMin} ${xMax},${yMax}`);

const manhattanDist = (pointA, pointB) => Math.abs(pointB.x - pointA.x) + Math.abs(pointB.y - pointA.y);
const totalDist = (point) => {
  const coord = undefined;
  let distSum = 0;
  const withDist = coords.map(coord => {
    const dist = manhattanDist(point,coord);
    distSum += dist;
    return { ...coord, dist };
  });
  return distSum;
}

const areaMap = {};
const disqualifyMap = {};
for (let x = xMin; x <= xMax; x++) {
  for (let y = yMin; y <= yMax; y++) {
    const point = {x,y};
    const hash = `${x},${y}`;
    const dist = totalDist(point);
    if (dist < 10000) areaMap[hash] = true;
  }
}

const keys = Object.keys(areaMap);
console.log(keys.length);
console.log('..end..');
