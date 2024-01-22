const fs = require('fs');
const { stdin, stdout } = require('node:process');
const newFile = fs.createWriteStream('02-write-file/new-file.txt');

stdout.write('Hey! Write something here: ')

stdin.on('data', (chunk) => {
  newFile.write(chunk);
  if (chunk === 'exit') {
    stdout.write('Stream is end');
    exit()
  }
})


