describe('Hosts unit tests' , ()=>{
  var Hosts = require('../hosts');
  const fileToWatch   = './tmp/container-map';
  afterEach((done)=>{
    var fs = require('fs');
    fs.unlink(fileToWatch, done);
  })
  it('watch file ', (done)=>{

    var hosts = new Hosts(fileToWatch);
    hosts.watchFile();
    hosts.onReady((event)=>{
      console.log(`a new hosts is here ${event.data}`);
      done();
    });
  })

  it.only('getData by using promise', (done)=>{
      var hosts = new Hosts(fileToWatch);
      hosts.watchFile().then((data)=>{
        console.log(data);
        done()
      }, done);
  })


})
