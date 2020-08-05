const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', (line: string) => {
  console.log(line.split('').reverse().join(''));
});
