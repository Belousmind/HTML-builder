const fs = require('fs');
const path = require('node:path');

function pageBuilder() {
  fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    htmlTemplateCopy();
    stylesBundler();
    copyAssets();
  });
}

function stylesBundler() {
  const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

  fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach(file => {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const input = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf8');
        input.pipe(output);
      }
    });
  });
}

function copyAssets() {
  const src = path.join(__dirname, 'assets');
  const dest = path.join(__dirname, 'project-dist', 'assets');

  function copyDirectory(srcDir, destDir) {
    fs.mkdir(destDir, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      fs.readdir(srcDir, { withFileTypes: true }, (err, entries) => {
        if (err) {
          console.error(err);
          return;
        }

        entries.forEach(entry => {
          const srcPath = path.join(srcDir, entry.name);
          const destPath = path.join(destDir, entry.name);

          if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
          } else {
            fs.copyFile(srcPath, destPath, (err) => {
              if (err) console.error(err);
            });
          }
        });
      });
    });
  }

  copyDirectory(src, dest);
}

function htmlTemplateCopy() {
  const templatePath = path.join(__dirname, 'template.html');
  const outputPath = path.join(__dirname, 'project-dist', 'index.html');

  fs.readFile(templatePath, 'utf8', (err, template) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      let pending = files.length;

      files.forEach(file => {
        if (file.isFile() && path.extname(file.name) === '.html') {
          const componentName = `{{${path.basename(file.name, '.html')}}}`;
          fs.readFile(path.join(__dirname, 'components', file.name), 'utf8', (err, componentContent) => {
            if (err) {
              console.error(err);
              return;
            }

            template = template.replace(new RegExp(componentName, 'g'), componentContent);
            pending--;

            if (pending === 0) {
              fs.writeFile(outputPath, template, 'utf8', (err) => {
                if (err) console.error(err);
              });
            }
          });
        } else {
          pending--;
        }
      });

      if (pending === 0) {
        fs.writeFile(outputPath, template, 'utf8', (err) => {
          if (err) console.error(err);
        });
      }
    });
  });
}

pageBuilder();