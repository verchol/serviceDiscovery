
describe('run as extenrnal package', ()=>{

    var Index = require('../index');
    afterEach(()=>{
        console.log('afterEach');
        Index.unwatch();
    })
    it('watch', (done)=>{


      Index.watch('./tmp/container-map',  (err, data)=>{
        console.log('triggered watch event');
        //console.log(data);

        console.log('test succesfully finished');
        done();
      })

    })

    it.skip('watch and start', (done)=>{

      var Index = require('../index');
      Index.watch('./tmp/container-map','./test/testStarter' , (err, data)=>{
        console.log(data);
        done();
      })

    })

    it('get Model', (done)=>{
        var assert = require('assert');
         console.log('starat getting model test');
        Index.watch('./tmp/container-map', (err, data)=>{
         console.log('getting model');
         var model = Index.model();
        // console.log(`model ${JSON.stringify(model)}`);
         assert(model);
         //codefresh_app_410ud7ywb_9000=http://192.168.99.100:22351
          if (model.all["app_9000"]!="http://192.168.99.100:22351")
            return done(model.all["app_9000"]);
         console.log(model.all["app_9000"]);
         console.log(`all: ${JSON.stringify(model.all)})`);

          console.log('done');
          done();

      })

    })
})
