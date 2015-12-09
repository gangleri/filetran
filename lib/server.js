'use strict';

var net = require('net');

module.exports = function recv(port, cb) {
  var server = net.createServer(function(stream) {
    if (cb) {
      cb(stream);
      cb = null;
    }

    stream.on('end', function() {
      server.close();
    });
  });

  server.listen(port);
};
