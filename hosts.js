var chokidar = require('chokidar');

function Hosts(){
  EventEmitter(this);
  var file = process.env.FileToWatch  || '/opt/codefresh/container-map';
  console.log(`{file to watch}`, file);
}

Hosts.prototype.readFile = ()=>{
  chokidar.watch(file , {ignored: /[\/\\]\./}).on('all', (event, path) => {
    console.log(event, path);
    emit('onReady', {event:event, path: path});
  });


}
Hosts.prototype.onReady = (callback)=>{
  this.on('onReady', callback);
}

Hosts.prototype.convertToEnvars = ()=>{

}
