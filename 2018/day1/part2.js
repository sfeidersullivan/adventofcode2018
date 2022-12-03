const input = require('./input.js');

const frequencies = input.split(`\n`);
let sum = 0;
let index = 0;
const sumHash = {};
const indexLength = frequencies.length;
console.log('..start..', sum)
while(!sumHash[sum]) {
  sumHash[sum] = true;
  const frequency = frequencies[(index % indexLength)];
  index++;
  const modifier = frequency.substr(0,1);
  const number = Number(frequency.substr(1));
  if (modifier === '+') {
    sum += number;
  } else {
    sum -= number;
  }
};
console.log('duplicate frequency: ', sum);
console.log('..end..');
