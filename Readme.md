
What the package does :
 Wait till the service discovery file is upto date and then execute callback
 
How ot use


var serviceDiscover = require('serviceDiscovery');
serviceDiscover.watch('./tmp/test', (err, data)=>{
  if (err){
   console.log('failed')
   return;
 }
 console.log(data);
})
