var fs     = require('fs');
var path   = require('path');
var Runner = require('../Runner');
var assert = require('assert');
var _      = require('lodash');
describe('read and parse file', ()=>{
  it('test lines to env', (done)=>{
      var envs = ["codefresh_app_410ud7ywb_8080=http://192.168.99.100:32786",
                  "codefresh_app_410ud7ywb_9000=http://192.168.99.100:22351"]

       var runner = new Runner(envs);
       console.log(runner.envs);
       assert(runner.envs);
       done();
     } )

     it.only('run and succeed after 1 sec', (done)=>{
        var port = "PORT=" + _.random(1111,9999);
         var envs = [port,
                     "codefresh_app_410ud7ywb_8080=http://192.168.99.100:32786",
                     "codefresh_app_410ud7ywb_9000=http://192.168.99.100:22351"]

          var runner = new Runner('node ./bin/www', envs);
          runner.run().then(done , done);

        })
 });
