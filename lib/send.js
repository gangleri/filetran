'use strict';

var fs = require('fs');
var zlib = require('zlib');

module.exports = function send(file) {
  return function onStream(stream) {
    var gzip = zlib.createGzip();
    fs.createReadStream(file).pipe(gzip).pipe(stream);
  };
};
