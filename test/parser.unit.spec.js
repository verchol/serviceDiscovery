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
       var obj = p.parse(testData).parseEntry(p.hosts.entries[0]);
      console.log('hosts:'  + JSON.stringify(p.hosts));
      console.log('hosts:'  + JSON.stringify(obj));
      assert(obj);
      assert.equal(obj.internalPort, "8080");
      assert.equal(obj.publicUrl, "http://192.168.99.100:32786");
      assert.equal(obj.serviceName, "app");
   });


   it('parse self entries', ()=>{

       var p = new Parser(testData);
       p.parse(testData).parseEntries();
       console.log('self portMapping:'  + JSON.stringify(p.hosts.self.portMapping));

       assert(p.hosts.self.portMapping["8080"]);
       assert.equal(p.hosts.self.portMapping["8080"], "http://192.168.99.100:32786");

   });

   it('parse other entries', ()=>{

       var p = new Parser(testData);

       p.parse(testData).parseEntries();

       assert(p.hosts.others.portMapping["3000"]);
       console.log('other portMapping:'  + JSON.stringify(p.hosts.others.portMapping));
       assert.equal(p.hosts.others.portMapping["3000"], "http://192.168.99.100:27017");

   });

   it.only('parse and validate all property', ()=>{

       var p = new Parser(testData);

       p.parse(testData).parseEntries();

       assert(p.hosts.all);
       console.log(`all:${JSON.stringify(p.hosts.all)}`)
       assert.equal(p.hosts.all.length, p.hosts.entries.length);

   });

  it('events->onEntry', (done)=>{
      var p = new Parser(testData);

      p.on('entry', (entry)=>{
        console.log('inside events->onEntry handler');
        console.log(`entry: ${JSON.stringify(entry)}`);
        assert(entry);
        done();
      });
       console.log("COUNT is" + p.listenerCount('test'));
       assert.equal(p.listenerCount('entry'), 1);
       p.parse(testData).parseEntry(p.hosts.entries[0]);


  })

})
