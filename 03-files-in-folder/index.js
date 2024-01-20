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
            console.log(file);
          }
        }) 
      } 
    }
) 

// file.isFile(), file.size
// example - txt - 128.369kb



