var request = require('request');  
var argv = require('yargs').argv;

var findLocation = function(ip, callback) {  
    var path;
    if (typeof(ip) === 'function' || !ip) path = 'json';
    else path = ip;

    request('http://ipinfo.io/' + path, function(error, response, body) {
        var json = JSON.parse(body);
        callback(null, json.city + ', ' + json.region);
    });
};

var cli = function() {
  var yargs = require('yargs')
  .usage('Usage: $0 [ip]')
  .command('[ip]', 'Get location info for a given ip')
  .example('$0', 'Get location info for your IP address')
  .example('$0 8.8.8.8', 'Get location info for ip:8.8.8.8')
  .help('help')
  .alias('h', 'help')
  .epilog('Copyright 2018 Felipe Santos');
  
  var argv = yargs.argv;
  if (argv._[0]) {
    findLocation(argv._[0], function(err, location) {
      console.log('Server location: ' + location);
    });    
  }else{
    findLocation(null,function(err, location) {
      console.log('Server location: ' + location);
    });
  }
}


module.exports = findLocation;
module.exports.cli = cli;