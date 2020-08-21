import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin
});

rl.on('line', (line: string) => {
  console.log(`${line.split('').reverse().join('')}\n`);
});
