var fs    = require('fs');
var path  = require('path');

describe('read and parse file', ()=>{
  it('readFileContext', (done)=>{
    var url = path.resolve(__dirname, './container-map');
     fs.readFile(url, (err, data)=>{
       if (err)
         return done(err);

        console.log(data);
        var b = new Buffer('')
        done();
        //var lines = data.split(/\r?\n/);

     } )
  });
  it.only('readStream', (done)=>{
    const data = [];
    var buffer = new Buffer(256);
    var url = path.resolve(__dirname, './big');

    var readStream = fs.createReadStream(url);
    readStream.on('data', function (chunk) {
       console.log('reading a new chunk:' + chunk.toString('utf8'));
       data.push(chunk);
       chunk.forEach((byte)=>{
         //console.log(byte);
         buffer.push(byte);
       })

    })
    .on('end', function () {
      console.log('end os stream');
      console.log(`data len = ${data.length} data:` + buffer.toString('utf8'));
      done();
    });
  });
  it('readBigFile', (done)=>{
    var url = path.resolve(__dirname, './big');
     fs.readFile(url, (err, data)=>{
       if (err)
          return done(err);
         console.log('reading attempt');

  })
});
});
