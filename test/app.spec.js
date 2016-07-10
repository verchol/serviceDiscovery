describe('run as extenran package', ()=>{
  it('watch', (done)=>{
    var Index = require('../index');
    Index.watch('./tmp/container-map', (err, data)=>{
      console.log(data);
      done();
    })
  })
})
