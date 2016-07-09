describe('Hosts unit tests' , ()=>{
  var Hosts = require('../hosts');
  const fileToWatch   = './tmp/container-map';
  afterEach((done)=>{
    console.log('afterEach start');
    var fs = require('fs');
    fs.unlink(fileToWatch, (err)=>{
      if (err)
      return done(err);

      Hosts.reset();
      done();
    });
    console.log('afterEach end ');
  })

  it('watch file ', (done)=>{

    Hosts.watchFile(fileToWatch);
    Hosts.onReady(function listener(event){
      console.log(`a new hosts is here ${Hosts.data}`);
      Hosts.removeListener('onReady',listener);
      done();
    });
  })

  it('getData by using promise', (done)=>{

      Hosts.watchFile(fileToWatch).then((data)=>{
        console.log(data);
        return done()
      }, done);
  })


})
