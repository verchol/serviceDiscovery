describe('Hosts unit tests' , ()=>{
  var Hosts = require('../hosts');
  const fileToWatch   = './tmp/container-map';
  afterEach((done)=>{
    var fs = require('fs');
    fs.unlink(fileToWatch, done);
  })
  it('watch file ', (done)=>{

    var hosts = new Hosts(fileToWatch);
    hosts.readFile();
    hosts.onReady((event)=>{
      console.log(`a new hosts is here ${event.data}`);
      done();
    });


  })


})
