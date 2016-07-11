var Hosts   = require('./hosts');
var debug   = require('debug')('serviceDiscovery->Index');
var _       = require('lodash');
var Parser  = require('./parser');


module.exports.unwatch = function(){
  Hosts.reset();
}
module.exports.model = function(){
  debug(`get model : ${JSON.stringify(model)}`);
  p = new Parser(Hosts.data);
  debug(`Data: ${Hosts.data}`);
  var model = p.parse(Hosts.data).parseSelfEntries();
  return model.hosts.self.portMapping;
}
module.exports.watch  = function (fileToWatch, startFile, callback){
debug('typeof callback ' + typeof callback);
debug('in watch function')
if (arguments.length === 0)
throw new Error('no callback provided');

if (!callback)
callback = _.last(arguments);

//console.log(process.env.SkipWatcher);
//console.log(process.env.NotBlockingWatcher);

if (process.env.SkipWatcher)
return require('./bin/www');

if (process.env.NotBlockingWatcher)
    require('./bin/www')

Hosts.watchFile(process.env.FILE_TO_WATCH || fileToWatch).then((data)=>{
  debug('file exists')
  console.log(data);
  callback.call(null, null ,data);
  process.env.NotBlockingWatcher || require(process.env.START_FILE || startFile);

}, callback);

}
