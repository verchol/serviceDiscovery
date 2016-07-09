var chokidar     = require('chokidar');
var util         = require('util');
var EventEmitter = require('events');
var debug        = require('debug')('Hosts');
var fs           = require('fs');

function Hosts(fileToWatch){
  EventEmitter.call(this);
  this.fileToWatch = fileToWatch ||  '/opt/codefresh/container-map';
  console.log(`{file to watch}`, fileToWatch);
}
util.inherits(Hosts, EventEmitter);
Hosts.prototype.getData = function(){
  debug(`getData ${data}`);
  return this.data;
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
Hosts.prototype.watchFile = function (period){
  console.log(`start watching ${this.fileToWatch}`);
  const self = this;
  this.data = undefined;

  var p = new Promise((resolve , reject)=>{
      if (self.data)
        return resolve(data);
      chokidar.watch(this.fileToWatch , {ignored: /[\/\\]\./}).on('add', (path) => {

        debug(`onReady event triggered: ${path}`);
        fs.readFile(path, (err, data)=>{
          debug(`read added file err stattus = ${err}`);
          if (err)
            return reject(err);
            var data = data.toString('utf8');
            self.data = data;
            var lines = data.split(/\r?\n/);
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

Hosts.prototype.convertToEnvars = ()=>{

}

module.exports = Hosts;
