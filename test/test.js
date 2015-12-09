'use strict';

var test = require('tape');
var after = require('after');
var spawn = require('tape-spawn');
var fs = require('fs');
var path = require('path');

var spawnOpts = { cwd: path.join(__dirname, '..') };
var spawnOptsNoEnd = { cwd: path.join(__dirname, '..'), end: false };
var usageText = fs.readFileSync(path.join(__dirname, '..', 'bin', 'usage.txt'), 'utf8');
var readmePath = path.join(__dirname, '..', 'README.md');
var readmeText = fs.readFileSync(readmePath, 'utf8');

test('show usage when no args are supplied', function (t) {
  var st = spawn(t, 'node bin/filetran', spawnOpts);
  st.stdout.match(usageText);
  st.stderr.empty();
  st.fails();
  st.end();
});

test('show usage when no file is supplied', function (t) {
  var st = spawn(t, 'node bin/filetran send -p 1234', spawnOpts);
  st.stdout.match(usageText);
  st.stderr.empty();
  st.fails();
  st.end();
});

test('show usage when receive is misspelled', function (t) {
  var st = spawn(t, 'node bin/filetran recieve derp', spawnOpts);
  st.stdout.match(usageText);
  st.stderr.empty();
  st.fails();
  st.end();
});

test('sender as server, receiver as client', function (t) {
  var transferredReadmePath = path.join(__dirname, '_readme1.md');
  var next = after(2, function () {
    var transferredReadmeText = fs.readFileSync(transferredReadmePath, 'utf8');
    t.equal(readmeText, transferredReadmeText);
    fs.unlinkSync(transferredReadmePath);
    t.end();
  });

  var st1 = spawn(t, 'node bin/filetran send README.md', spawnOptsNoEnd);
  st1.stdout.empty();
  st1.stderr.empty();
  st1.succeeds();
  st1.end(next);

  var st2 = spawn(t, 'node bin/filetran receive -h localhost "' + transferredReadmePath + '"', spawnOptsNoEnd);
  st2.stdout.empty();
  st2.stderr.empty();
  st2.succeeds();
  st2.end(next);
});

test('receiver as server, sender as client', function (t) {
  var transferredReadmePath = path.join(__dirname, '_readme2.md');
  var next = after(2, function () {
    var transferredReadmeText = fs.readFileSync(transferredReadmePath, 'utf8');
    t.equal(readmeText, transferredReadmeText);
    fs.unlinkSync(transferredReadmePath);
    t.end();
  });

  var st1 = spawn(t, 'node bin/filetran receive "' + transferredReadmePath + '"', spawnOptsNoEnd);
  st1.stdout.empty();
  st1.stderr.empty();
  st1.succeeds();
  st1.end(next);

  var st2 = spawn(t, 'node bin/filetran send -h localhost README.md', spawnOptsNoEnd);
  st2.stdout.empty();
  st2.stderr.empty();
  st2.succeeds();
  st2.end(next);
});
