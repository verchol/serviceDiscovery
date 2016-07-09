var _= require('lodash');
var debug = require('debug')('->runner');
var assert = require('assert');

function Runner(cmd, lines){
    this.options = {env : {}};
    this.env = this.options.env;
    this.cmd =  cmd || process.env.DOCKER_CMD;
    assert(this.cmd);
     _.map(lines, (line)=>{
       debug(`line: ${line} of type ${typeof line}`);

       var values = line.split('=');
       assert(values.length === 2);
       this.env[values[0]] = values[1];
      //debug(`line=${line}`);
   });
   debug('envs = ' + JSON.stringify(this.env));
}
Runner.prototype.ls = function(){

   
}
Runner.prototype.run = function(){
  const exec = require('child_process').exec;
  var self = this;
  var p = new Promise ((resolve , reject)=>{
      exec(self.cmd, self.options , (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject(error);
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      stdout.on('data', (err, data)=>{
        console.log(data);
      })
      setTimeout(()=>{
        resolve()}, 5000);

    });
});

return p;

}

module.exports = Runner;
