'use strict';

var fs = require('fs');
var zlib = require('zlib');

module.exports = function recv(file) {
  return function onStream(stream) {
    var gunzip = zlib.createGunzip();
    stream.pipe(gunzip).pipe(fs.createWriteStream(file));
  };
};
