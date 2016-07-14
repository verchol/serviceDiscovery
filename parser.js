var _       = require('lodash')
var debug   = require('debug')('parser');
var assert  = require('assert');
var EventEmitter = require('events');
var util    = require('util');

function Parser(){
 EventEmitter.call(this);
 this.hosts = {entries: [], self: {}};
 _.set(this.hosts, "self.portMapping", {});
 _.set(this.hosts, "others.portMapping", {});
 _.set(this.hosts, "all", []);

}
util.inherits(Parser, EventEmitter);


Parser.prototype.whoami = function(){
  var data = this.data;
  _.forEach(data, (d)=>{
    var entries = d.split('/=');
    if (d === "self")
    self.hosts.self = entries[1];
  })
  return this;
}
Parser.prototype.parseEntries = function(){

  var self = this;
  var selfEntry = this.hosts.self.entry;
  debug('Entries' + this.hosts.entries);


  //this.hosts.selfEntries = selfEntries;
  _.forEach(this.hosts.entries,(se) =>{
    debug(`self entry ${se} about to be parsed`);
    var entries = se.split('=');
    if (entries[0] === "self"){
    debug('no need to parse self entry');
    return;
    }

    var obj = self.parseEntry(se);

    if (entries[0].indexOf(selfEntry) === -1){
       this.hosts.others.portMapping[obj.internalPort] = obj.publicUrl;
    }else
      this.hosts.self.portMapping[obj.internalPort] = obj.publicUrl;
    
      this.hosts.all.push(obj);

  })

  debug(`finished parsing all entries , self.mappings : ${JSON.stringify(this.hosts.self.portMapping)}`)
  return this;
}
//TODO : validate the entry
function validate(entry){}
Parser.prototype.parseEntry = function(entry){
  debug(`parseEntry->entry:${entry}`);


  var keys = entry.split("=");
  assert(keys.length === 2);

  var publicUrl = keys[1];
  var leftParts = keys[0].split("_");
  var internalPort = _.last(leftParts);
  var onlyName = keys.slice(1, keys.length - 1);
  var serviceName = leftParts[1];




  var obj = {entry: entry};
  obj.internalPort  = internalPort;
  obj.publicUrl = publicUrl;
  obj.serviceName = serviceName;

  debug(`obj ${JSON.stringify(obj)}`);
  this.emit('entry', obj);
  return obj;



 }
Parser.prototype.parse = function(data){
    var self = this;
  _.forEach(data, (d)=>{
    var entries = d.split('=');
    debug(`entry is ${d}`);
    if (entries[0] === "default"){
       return;
    }
    if (entries[0] === "self"){

      debug(`self is ${entries[1]}`);
      self.hosts.self.entry = entries[1];

    }else {
      if(d === "" || d.length === 0){
        return;
      }

      this.hosts.entries.push(d);
    }
  })

  debug(`end of parse : ${JSON.stringify(this.hosts.entries)})`);
  return this;
}

module.exports = Parser;
