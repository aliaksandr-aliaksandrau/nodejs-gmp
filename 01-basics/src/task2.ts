import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import csv from 'csvtojson';

const csvFilePath = './csv/nodejs-hw1-ex1.csv';
const writeFilePath = './csv/nodejs-hw1-ex1.txt';

const filedsToEscape = ['Amount'];

function parseNumber(val: string): string | number {
  const parsed = Number.parseFloat(val);
  return isNaN(parsed) ? val : parsed;
}

function transformBook(jsonObj: any): void {
  Object.keys(jsonObj).forEach(k => {
    if (filedsToEscape.includes(k)) {
      delete jsonObj[k];
    } else {
      delete Object.assign(jsonObj, { [k.toLowerCase()]: parseNumber(jsonObj[k]) })[k];
    }
  })
}

pipeline(
  createReadStream(csvFilePath),
  csv().subscribe(transformBook),
  createWriteStream(writeFilePath),
  (error: any) => {
    if (error) {
      console.error('Error: ', error)
    } else {
      console.log('Reading / writing is finished');
    }
  }
);
