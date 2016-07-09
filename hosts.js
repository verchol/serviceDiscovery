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

Hosts.prototype.readFile = function (){
  console.log(`start watching ${this.fileToWatch}`);
  const self = this;
  chokidar.watch(this.fileToWatch , {ignored: /[\/\\]\./}).on('all', (event, path) => {
    console.log(event, path);
    debug(`onReady event triggered: ${event}`);
    fs.readFile(path, (err, data)=>{
      if (err)
        return done(err);
        var data = data.toString('utf8');
        var lines = data.split(/\r?\n/);
        self.emit('onReady', {event:event, path: path, data:data});
    })

  });


}
Hosts.prototype.onReady = function(callback){
  debug('subscribe to onReady');
  this.on('onReady', callback);
}

Hosts.prototype.convertToEnvars = ()=>{

}

module.exports = Hosts;
