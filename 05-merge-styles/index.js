const fs = require('fs');
const path = require('node:path');

const bundleFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

function bundleCreator() {
  fs.readdir(path.resolve(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => { 
      if (err) 
        console.log(err); 
      else {
        files.forEach(file => {
          if (file.isFile() && path.extname(`${file.name}`) === '.css') {
            const styleData = fs.createReadStream(path.join(__dirname, 'styles', `${file.name}`), {encoding: 'utf8'});
            styleData.on('data', (chunk) => bundleFile.write(chunk));
          }
        })
      } 
    }
  )
}

bundleCreator();


