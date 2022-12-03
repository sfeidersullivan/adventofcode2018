'use strict'
console.log('..start..')

const input = require('./input.js');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
alphabet.split("").forEach(letter => {
  const newInput = input.replace(new RegExp(letter, 'gi'), "");

  let parse = true;
  let remainder = newInput;
  while (parse) {
    let next = '';
    for (let i = 0; i < remainder.length - 1; i++) {
      const a = remainder[i];
      const b = remainder[i+1];
      if (a.toLowerCase() === b.toLowerCase()
        && ((a === a.toUpperCase() && b === b.toLowerCase())
        || (a === a.toLowerCase() && b === b.toUpperCase()))
      ) i++;
      else {
        next += a;
        if (i === remainder.length - 2) next += b;
      }
    }
    if (next.length === remainder.length) parse = false;
    else remainder = next;
  }
  console.log(`${letter}: ${remainder.length}`);
})


console.log('..end..');
