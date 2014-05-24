'use strict';

var net = require('net');
var fs = require('fs');
var zlib = require('zlib');

module.exports = function send(file, host, port) {
  var s = new net.Socket();
  var gzip = zlib.createGzip();
  s.connect(port, host);

  fs.createReadStream(file).pipe(gzip).pipe(s);
};

