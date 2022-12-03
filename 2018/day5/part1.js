'use strict'
console.log('..start..')

const input = require('./input.js');

let parse = true;
let remainder = input;
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
console.log('result: ', remainder.length);

console.log('..end..');
