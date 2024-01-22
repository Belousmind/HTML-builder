const fs = require('fs');
const { stdin, stdout, exit } = require('node:process');
const newFile = fs.createWriteStream('02-write-file/new-file.txt');

stdout.write('Hey! Write something here:\n')

function endProg() {
  stdout.write('Complete! All information is saved');
  exit();
}

stdin.on('data', (chunk) => {
  chunk = chunk.toString().trim(); 
  // console.log(typeof chunk)
  if (chunk === 'exit') {
    endProg();
  }
  newFile.write(chunk);
})

process.on('SIGINT', endProg);