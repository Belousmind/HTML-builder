const fs = require('fs');
const path = require('node:path'); 

const dir = path.join(__dirname, 'files');

function copyAlert(err) {
    if (err) throw err;
    console.log('file was copped');
  }

function makeCopy(dir) {
    fs.readdir(dir,
        { withFileTypes: true },
        (err, files) => { 
            if (err) 
              console.log(err); 
            else {
                fs.mkdir(path.join(__dirname, 'files-copy'),
                { recursive: true },
                (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    files.forEach(file => {
                        fs.copyFile(path.join(__dirname, 'files', `${file.name}`), path.join(__dirname, 'files-copy', `${file.name}`), copyAlert); 
                    }); 
                });  
            } 
          }
      ) 
}

makeCopy(dir);
