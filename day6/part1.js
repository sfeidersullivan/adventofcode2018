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
const xMin = Math.min(...xs);
const yMin = Math.min(...ys);
const xMax = Math.max(...xs);
const yMax = Math.max(...ys);
console.log(`${xMin},${yMin} ${xMax},${yMax}`);

const manhattanDist = (pointA, pointB) => Math.abs(pointB.x - pointA.x) + Math.abs(pointB.y - pointA.y);
const minCoord = (point) => {
  const coord = undefined;
  const withDist = coords.map(coord => ({
    ...coord,
    dist: manhattanDist(point,coord),
  }));
  const sorted = withDist.sort((a,b) => a.dist - b.dist);
  // index 0 is the same point
  let index = 0;
  if (sorted[index].dist === 0) index++
  if (sorted[index].dist === sorted[index + 1].dist) return undefined;
  return sorted[index];
}

const areaMap = {};
const disqualifyMap = {};
for (let x = xMin; x <= xMax; x++) {
  for (let y = yMin; y <= yMax; y++) {
    const point = {x,y};
    const hash = `${x},${y}`;
    const minPoint = minCoord(point);
    if (!minPoint) continue;
    const minHash = `${minPoint.x},${minPoint.y}`;
    if (x === xMin || x === xMax || y === yMin || y === yMax) {
      disqualifyMap[hash] = minHash;
    } else {
      areaMap[hash] = minHash;
    }
  }
}

const keys = Object.keys(areaMap);
const groups = _.groupBy(keys, key => areaMap[key])
const groupsSorted = Object.keys(groups).sort((a,b) => groups[b].length - groups[a].length);
console.log(groupsSorted.map(id => groups[id].length));
console.log('..end..');
