const fs = require('fs');
const path = require('node:path');

const css = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

function pageBuilder() {
  fs.mkdir(path.join(__dirname, 'project-dist'),
  { recursive: true },
  (err) => {
    if (err) {
        return console.error(err);
    }
    htmlTemplateCopy();
    stylesBundler();
    makeCopy();
  });  
}

function stylesBundler() {
  fs.readdir(path.resolve(__dirname, 'styles'),
    { withFileTypes: true },
    (err, files) => { 
        if (err) 
          console.log(err); 
        else {
          files.forEach(file => {
            if (file.isFile() && path.extname(`${file.name}`) === '.css') {
              const styleData = fs.createReadStream(path.join(__dirname, 'styles', `${file.name}`), {encoding: 'utf8'});
              styleData.on('data', (chunk) => css.write(chunk));
            }
          })
        } 
      }
    )
}

function copyAlert(err) {
  if (err) throw err;
  // console.log('file was copped');
}

function makeCopy() {
  fs.readdir(path.resolve(__dirname, 'assets'),
  { withFileTypes: true,
    recursive: true },
  (err, dirs) => { 
      if (err) 
        console.log(err); 
      else {
        dirs.forEach(dir => {
          fs.readdir(path.resolve(__dirname, 'assets', `${dir.name}`),
          { withFileTypes: true,
            recursive: true },
            (err, files) => { 
              if (err) 
                console.log(err); 
              else {
                fs.mkdir(path.join(__dirname, 'project-dist', 'assets', `${dir.name}`),
                { recursive: true },
                (err) => {
                  if (err) {
                      return console.error(err);
                  }
                  files.forEach(file => {
                    fs.copyFile(path.join(__dirname, 'assets', `${dir.name}`, `${file.name}`), path.join(__dirname, 'project-dist', 'assets', `${dir.name}`, `${file.name}`), copyAlert); 
                    }); 
                });  
              } 
            }
          )
        })
      } 
    }
  )
}

function htmlTemplateCopy() {
  fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), copyAlert);
}

pageBuilder()