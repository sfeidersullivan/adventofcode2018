'use strict'
const input = require('./input.js');

const claims = input.split(`\n`);
const map = {};

console.log('..start..')
claims.forEach(claim => {
  const parts = claim.split(" ");
  const claimId = parts[0]; // #123
  const position = parts[2].slice(0,-1); // 123,123
  const size = parts[3]; // 123x123

  const coords = position.split(',');
  const xCoord = Number(coords[0]);
  const yCoord = Number(coords[1]);

  const dimensions = size.split('x');
  const width = Number(dimensions[0]);
  const height = Number(dimensions[1]);
  for (let x = 1; x <= width; x++) {
    for (let y = 1; y <= height; y++) {
      const newPosition = `${xCoord + x},${yCoord + y}`;
      const existingValue = map[newPosition];
      map[newPosition] = existingValue ? existingValue + 1 : 1;
    }
  }
})
const sum = Object.entries(map).filter(kvp => kvp[1] === 1);
console.log('sum: ', sum.length);

claims.forEach(claim => {
  const parts = claim.split(" ");
  const claimId = parts[0]; // #123
  const position = parts[2].slice(0,-1); // 123,123
  const size = parts[3]; // 123x123

  const coords = position.split(',');
  const xCoord = Number(coords[0]);
  const yCoord = Number(coords[1]);

  const dimensions = size.split('x');
  const width = Number(dimensions[0]);
  const height = Number(dimensions[1]);
  let stop = false;
  for (let x = 1; x <= width; x++) {
    for (let y = 1; y <= height; y++) {
      const newPosition = `${xCoord + x},${yCoord + y}`;
      if (map[newPosition] !== 1) stop = true;
      if (stop) break;
    }
    if (stop) break;
  }
  if (!stop) console.log('found: ', claimId);
})
console.log('..end..');
