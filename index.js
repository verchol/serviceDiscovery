var Hosts = require('./hosts');
console.log(process.env.SkipWatcher);
if (process.env.SkipWatcher)
return require('./bin/www');

if (process.env.NotBlockingWatcher)
    require('./bin/www')

Hosts.watchFile(process.env.FILE_TO_WATCH).then((data)=>{
  console.log(data);
  process.env.NotBlockingWatcher || require('./bin/www');
})
