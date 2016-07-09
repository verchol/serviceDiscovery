var express = require('express');
var router = express.Router();
var Hosts  = require('../hosts');
var hosts = new Hosts(process.env.FILE_TO_WATCH);

/* GET home page. */
router.get('/hosts', function(req, res, next) {
  if (hosts.isReady())
  {
    return res.render('index', { title: hosts.data });
  }

  return res.send('No data still created');

});
router.get('/watch', (req, res, next)=>{
  hosts.watchFile(1000).then((data)=>{

  }).catch((e)=>{
    next(e);
  })

    return res.render('watch', {});
});
router.get('/', function(req, res, next) {
   return res.render('index', { title: 'oleg' });
});

module.exports = router;
