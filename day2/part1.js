'use strict'
const input = require('./input.js');

const frequencies = input.split(`\n`);
let contains2Sum = 0;
let contains3Sum = 0;

console.log('..start..')
frequencies.forEach(item => {
  const charHash = {};
  const itemArray = item.split("");
  itemArray.forEach(char => charHash[char] = (charHash[char] ? charHash[char] + 1 : 1));
  const counts = Object.values(charHash);
  const contains2 = counts.includes(2);
  const contains3 = counts.includes(3);
  if (contains2) contains2Sum++;
  if (contains3) contains3Sum++;
})
console.log('contains2Sum: ', contains2Sum);
console.log('contains3Sum: ', contains3Sum);
console.log('product: ', contains2Sum * contains3Sum);
console.log('..end..');
