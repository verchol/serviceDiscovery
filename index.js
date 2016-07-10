var Hosts = require('./hosts');

module.exports.watch  = function (fileToWatch, startFile, callback){

console.log(process.env.SkipWatcher);
console.log(process.env.NotBlockingWatcher);

if (process.env.SkipWatcher)
return require('./bin/www');

if (process.env.NotBlockingWatcher)
    require('./bin/www')

Hosts.watchFile(process.env.FILE_TO_WATCH | fileToWatch).then((data)=>{
  console.log(data);
  process.env.NotBlockingWatcher || require(process.env.START_FILE || startFile);
  callback(null ,data);
}, callback);

}
