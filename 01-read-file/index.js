const fs = require('fs');
const { stdin, stdout } = require('node:process');

const read = fs.createReadStream(
  '01-read-file/text.txt', {encoding: 'utf8'});

read.on('data', (chunk) => process.stdout.write(chunk))


