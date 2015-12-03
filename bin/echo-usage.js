'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function echoUsage() {
  var stream = fs.createReadStream(path.join(__dirname, 'usage.txt'));
  stream.pipe(process.stdout);
  stream.on('close', function () {
    process.exit(1);
  });
};
