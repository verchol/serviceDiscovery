var express = require('express');
var router = express.Router();
var Hosts  = require('../hosts');
var path   = require('path');

var debug = require('debug')('route->index');
var _     = require('lodash');
/* GET home page. */
router.get('/hosts', function(req, res, next) {
  if (Hosts.isReady())
  {
    return res.render('index', { title: Hosts.data });
  }

  return res.send (400);

});
router.get('/ls', function(req, res, next) {
   var shelljs = require('shelljs');
   var files = "";
   debug(path.dirname(Hosts.fileToWatch));
   shelljs.ls(path.dirname(Hosts.fileToWatch)).forEach(function(file) {
     files = files + "\n" + file;
   });
  return res.send (files);

});
router.get('/cat', function(req, res, next) {
   var shelljs = require('shelljs');
 
   debug(path.dirname(Hosts.fileToWatch));
   var output = shelljs.cat(Hosts.fileToWatch)
  return res.send (output);

});
router.get('/watch', (req, res, next)=>{
  hosts.watchFile(1000).then((data)=>{
    var port = "PORT=" + _.random(1111,9999);
     /*var envs = [port,
                 "codefresh_app_410ud7ywb_8080=http://192.168.99.100:32786",

               "codefresh_app_410ud7ywb_9000=http://192.168.99.100:22351"]*/
      debug('running app');
      data.push(port);
      var runner = new Runner('node ./bin/www', data);
      runner.run().then(done , done);
  }).catch((e)=>{
    debug(e);
    next(e);
  })

    return res.send('stared watch on ' + process.env.FILE_TO_WATCH);
});
router.get('/', function(req, res, next) {
   return res.render('index', { title: 'oleg' });
});

module.exports = router;
