var fs = require('fs');
var chokidar = require('chokidar');
var file = process.env.FileToWatch  || '/opt/codefresh/container-map';
console.log(`{file to watch}`, file);

chokidar.watch(file , {ignored: /[\/\\]\./}).on('all', (event, path) => {
  console.log(event, path);
});
