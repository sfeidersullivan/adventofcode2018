'use strict'
console.log('..start..')

const input = require('./input.js');

const logs = input.split(`\n`);
const logsMapped = logs.map(log => {
  const time = log.match(/\[(.+)\]/)[1];
  const date = new Date(time);
  const idMatch = log.match(/\#(\d+)/);
  const id = idMatch ? idMatch[1] : undefined;
  const split = log.split(" ")
  const command = `${split.pop()}`;
  return { date, id, command }
});
const logsSorted = logsMapped.sort((a, b) => {
  return a.date - b.date;
})

let lastId = undefined;
let startSleep = undefined;

const map = {};
logsSorted.forEach(log => {
  const { date, id, command } = log;
  switch (command) {
    case 'shift':
      lastId = id;
      if (!map[id]) map[id] = {};
      break;
    case 'up':
      const startMin = startSleep.getMinutes();
      const endMin = date.getMinutes();
      for(let i = startMin; i < endMin; i++) map[lastId][i] = map[lastId][i] ? map[lastId][i] + 1 : 1;
      startSleep = undefined;
      break;
    case 'asleep':
      startSleep = startSleep || date;
      break;
    default:
      break;
  }
});

const longestSleeper = Object.entries(map).sort((a,b) => {
  const aSum = Object.values(a[1]).reduce((c, d) => c + d, 0);
  const bSum = Object.values(b[1]).reduce((c, d) => c + d, 0);
  return bSum - aSum;
})

console.log(longestSleeper[0]);

console.log('..end..');
