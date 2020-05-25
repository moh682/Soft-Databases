import { readFile, createReadStream } from 'fs';
import TSV = require('tsv');

function tsvJSON(tsv) {
  const lines = tsv.split('\n');
  const headers = lines.shift().split('\t');
  return lines.map(line => {
    const data = line.split('\t');
    return headers.reduce((obj, nextKey, index) => {
      obj[nextKey] = data[index];
      return obj;
    }, {});
  });
}

console.log(TSV);
const getData = (): Promise<string[]> => {
  const data: string[] = [];
  return new Promise(resolve => {
    createReadStream(__dirname + '/group_membership.tsv', 'utf8')
      .on('data', line => {
        data.push(tsvJSON(line));
      })
      .on('end', () => {
        console.log(data.slice(0, 10));
        resolve(data);
      });
  });
};

getData();
