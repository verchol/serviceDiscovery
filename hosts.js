var chokidar     = require('chokidar');
var util         = require('util');
var EventEmitter = require('events');
var debug        = require('debug')('Hosts');
var fs           = require('fs');
var path         = require('path');
var mkdirp       = require('mkdirp');

var _Hosts;
function Hosts(fileToWatch){
  if (_Hosts){
    return _Hosts;
  }

  EventEmitter.call(this);
  this.fileToWatch = fileToWatch ||  '/opt/codefresh/container-map';
  debug(`{fileToWatch}`, fileToWatch);
}
util.inherits(Hosts, EventEmitter);
Hosts.prototype.getData = function(){
  debug(`getData ${data}`);
  return this.data;
}
Hosts.prototype.wait = function(){
  this.on('onReady', ()=>{

  })

}
Hosts.prototype.isReady = function(){
  return this.data && this.data.length > 0;
}
Hosts.prototype.retry = function(times)
{
  var p = new Promise((resolve , reject)=>{
   watchFile().then(resolve, reject);

   setTimeout(()=>{
    //  watchFile().
   })
 })

}
Hosts.prototype.watchFile = function (fileToWatch){

  this.fileToWatch =  fileToWatch || '/opt/codefresh/container-map';
  var dirToWatch = path.dirname(this.fileToWatch);
  if (!fs.existsSync(dirToWatch)){
    debug(`created folder to watch: ${dirToWatch}`);
    mkdirp.sync(dirToWatch);
  }
  console.log(`start watching ${this.fileToWatch}`);
  const self = this;
  this.data = undefined;

  var p = new Promise((resolve , reject)=>{
      if (self.data)
        return resolve(data);
      self.watcher = chokidar.watch(this.fileToWatch , {ignored: /[\/\\]\./});
      self.watcher.on('change', (path) => {

        debug(`onReady event triggered: ${path}`);
        fs.readFile(path, (err, data)=>{
          debug(`read added file err stattus = ${err}`);
          if (err)
            return reject(err);
            var data = data.toString('utf8');

            var lines = data.split(/\r?\n/);
            self.data = lines;
            debug(`lines = ${lines}`);

            self.emit('onReady', {path: path, data:lines});
            return resolve(data);
        })
    });
 });

 return p;
}
Hosts.prototype.onReady = function(callback){
  debug('subscribe to onReady');
  this.on('onReady', callback);
}
Hosts.prototype.reset = function(){

  debug('unwatching');
  this.data = undefined;
  this.watcher.unwatch(this.fileToWatch);
  this.fileToWatch = undefined;
  debug('unwatched');

}
Hosts.prototype.convertToEnvars = ()=>{

}
_Hosts = new Hosts();
module.exports = _Hosts;
