var _       = require('lodash')
var debug   = require('debug')('parser');
var assert  = require('assert');


function Parser(){
 this.hosts = {entries: [], self: {}};
}

Parser.prototype.whoami = function(){
  var data = this.data;
  _.forEach(data, (d)=>{
    var entries = d.split('/=');
    if (d === "self")
    self.hosts.self = entries[1];
  })
  return this;
}
Parser.prototype.parseSelfEntries = function(){
  var self = this;
  var selfEntry = this.hosts.self.entry;
  debug('Entries' + this.hosts.entries);
  var selfEntries = _.filter(this.hosts.entries, (d)=>{
    debug(`parseSelfEntries-> entry ${d}`);
    var entries = d.split('=');
    if (entries[0].indexOf(selfEntry) === -1)
         return false;

    return true;
  });
  debug(`selfService : `  + JSON.stringify(selfEntries));
  this.hosts.selfEntries = selfEntries;
  _.forEach(selfEntries,(se) =>{
    debug(`self entry ${se} about to be parsed`);
    self.parseEntry(se);
  })
  return this;
}

Parser.prototype.parseEntry = function(entry){
  debug(`entry:${entry}`);
  var keys = entry.split("=");
  assert(keys.length === 2);

  var publicUrl = keys[1];
  var leftParts = keys[0].split("_");
  var internaPort = _.last(leftParts);
  var onlyName = keys.slice(1, keys.length - 1);
  var name= keys[0];
  _.forEach(onlyName , (n)=>{
    name = name + "_" +  n;
  });
  if (!_.get(this, "hosts.self.portMapping"))
  this.hosts.self.portMapping  = {};
  this.hosts.self.portMapping[internaPort] = publicUrl;

  return this;
}
Parser.prototype.parse = function(data){
    var self = this;
  _.forEach(data, (d)=>{
    var entries = d.split('=');
    debug(`entry is ${d}`);
    if (entries[0] === "self"){

      debug(`self is ${entries[1]}`);
      self.hosts.self.entry = entries[1];

    }else {
      this.hosts.entries.push(d);
    }
  })

  debug('end of parse');
  return this;
}

module.exports = Parser;
