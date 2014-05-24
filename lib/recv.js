'use strict';

var net = require('net');
var fs = require('fs');
var zlib = require('zlib');

module.exports = function recv(port, file, cb) {
  var server = net.createServer(function(c) {
    var gunzip = zlib.createGunzip();
    cb = cb  || function(){};

    c.pipe(gunzip).pipe(fs.createWriteStream(file));

    c.on('end', function() {
      console.log('closiing');
      server.close();
    });

  });

  console.log('listen');
  server.listen(port, cb);
};

