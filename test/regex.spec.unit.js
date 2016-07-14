var assert = require('assert');

describe('service name regex', ()=> {
  it('retrieve service name ', (done)=>{

    //  var regex = new RegExp("codefresh_(?<service>\w+)_(?<port>\w+)=(\w+)");
    //  var regex = /codefresh_([A-Za-z0-9]+)_([A-Za-z0-9]+)=([A-Za-z0-9]+)/g;
      var regex = /([A-Za-z0-9]+)(=*)([A-Za-z0-9:..//]+)/ig;
      var regexGroups = { service: 1, port: 2 };
      //var m = regex.exec("codefresh_ms_4jozej0jx_3000=http://192.168.99.100:27017");
      var m = "codefresh_ms_4jozej0jx_3000=http://192.168.99.100:27017".match(regex);
      if (!m){
       done(m);
      }
      console.log(m);
      //var service = m[regexGroups.service];
      assert(m);

      done();
  })

})
