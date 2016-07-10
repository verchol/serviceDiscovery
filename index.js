var Hosts = require('./hosts');
var debug = require('debug')('serviceDiscovery->Index');

module.exports.watch  = function (fileToWatch, startFile, callback){
debug('typeof callback ' + typeof callback);
debug('in watch function')
if (arguments.length === 0)
throw new Error('no callback provided');

if (!callback)
callback = arguments.slice(-1)[0];
//console.log(process.env.SkipWatcher);
//console.log(process.env.NotBlockingWatcher);

if (process.env.SkipWatcher)
return require('./bin/www');

if (process.env.NotBlockingWatcher)
    require('./bin/www')

Hosts.watchFile(process.env.FILE_TO_WATCH || fileToWatch).then((data)=>{
  console.log(data);
  process.env.NotBlockingWatcher || require(process.env.START_FILE || startFile);
  callback(null ,data);
}, callback);

}
