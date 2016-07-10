var assert = require('assert');
describe('parser test', ()=>{
   var Parser = require('../Parser');
   var testData = [
     "codefresh_app_410ud7ywb_8080=http://192.168.99.100:32786",
     "codefresh_app_410ud7ywb_9000=http://192.168.99.100:22351",
     "codefresh_ms_4jozej0jx_3000=http://192.168.99.100:27017",
     "default=codefresh_app_410ud7ywb_8080",
     "self=codefresh_app_410ud7ywb"]

     it('parse flow', ()=>{
        var p = new Parser(testData);
         p.parse(testData);
        console.log(JSON.stringify(p.hosts));

        //assert.equal(p.hosts["8080"], "http://192.168.99.100:32786");
     })


   it('parse single entry', ()=>{
      var p = new Parser(testData);
       p.parse(testData).parseEntry(p.hosts.entries[0]);
      console.log('hosts:'  + JSON.stringify(p.hosts));
      assert(p.hosts.self.portMapping["8080"]);
      assert.equal(p.hosts.self.portMapping["8080"], "http://192.168.99.100:32786");
   });
   it('parse self entries', ()=>{

       var p = new Parser(testData);
       p.parse(testData).parseSelfEntries();
       console.log('portMapping:'  + JSON.stringify(p.hosts.self.portMapping));
       assert(p.hosts.self.portMapping["8080"]);
       assert.equal(p.hosts.self.portMapping["8080"], "http://192.168.99.100:32786");
   });


})
