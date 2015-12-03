'use strict';

var net = require('net');

module.exports = function client(host, port, cb) {
  var stream = new net.Socket();
  stream.connect(port, host);
  cb(stream);
};
