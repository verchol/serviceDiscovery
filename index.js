var Hosts = require('./hosts');
 

Hosts.watchFile(process.env.FILE_TO_WATCH).then((data)=>{
  console.log(data);
  require('./bin/www');
})
