var assert = require('assert');

describe('Hosts unit tests' , ()=>{
  var Hosts = require('../hosts');
  const fileToWatch   = './tmp/container-map';
  afterEach((done)=>{
    console.log('afterEach start');
    var fs = require('fs');
    Hosts.reset();

    done();

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
        debug(`get model : ${JSON.stringify(model)}`);
        return done()
      }, done);
  })

  it.only('get Model ', (done)=>{
    Hosts.watchFile(fileToWatch).then((data)=>{

      console.log('triggered watch');
      assert(Hosts.data);
      var Parser = require('../parser');
      p = new Parser(Hosts.data);
      console.log('----------------------');
      console.log(`Data: ${Hosts.data}`);
      console.log('----------------------');

      var model = p.parse(Hosts.data).parseSelfEntries();
      console.log('----------------------');
      console.log(`get model : ${JSON.stringify(p.hosts.self.portMapping)}`);
      console.log('----------------------');


      assert(model);
      return done()
    }, done).catch((e)=>{
      console.log(e);
      done(e);
    });

  })
});
