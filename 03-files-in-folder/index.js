const fs = require('fs');
const path = require('node:path'); 

fs.readdir(path.resolve(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => { 
      if (err) 
        console.log(err); 
      else { 
        files.forEach(file => {
          if (file.isFile()) {
            fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (err, stats) => {
              if (err) {
                console.error(err);
              }
              const fileNameAndType = file.name.split('.');
              const fileSize = stats.size / 1000;
              console.log(`${fileNameAndType[0]} - ${fileNameAndType[1]} - ${fileSize}kb`);
            });
          }
        }) 
      } 
    }
) 




