'use strict'
const input = require('./input.js');

const frequencies = input.split(`\n`);
const frequencyLength = frequencies[0].length;
const answers = [];

console.log('..start..')
frequencies.forEach(item1 => {
  const array1 = item1.split("");
  frequencies.forEach(item2 => {
    const array2 = item2.split("");
    let sum = "";
    array1.forEach((char, index) => {
      if (char === array2[index]) sum += char;
    });
    if (sum.length === frequencyLength - 1) answers.push(sum);
  })
})
console.log('answers: ', answers);
console.log('..end..');
