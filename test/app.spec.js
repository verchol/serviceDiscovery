
describe('run as extenrnal package', ()=>{

    var Index = require('../index');
    afterEach(()=>{
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

    it.only('get Model', (done)=>{

        Index.watch('./tmp/container-map', (err, data)=>{
         console.log('getting model');

         var model = Index.model();
         console.log(`model ${JSON.stringify(model)}`);
         assert(model);
        done();
      })

    })
})
