const chokidar = require('chokidar');
const fs = require('fs-extra')
const path = require('path');

// copy assets

chokidar.watch(path.resolve('./src/assets')).on('all', (event, _path) => {
    const srcDir = path.resolve('./src/assets');
    const destDir = path.resolve('./dist/assets');

    console.log(srcDir , destDir)
    fs.copySync(srcDir, destDir, {
        overwrite: true
      }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("success!");
        }
      });
});