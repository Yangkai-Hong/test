var fs = require('fs');
var cp = require('child_process');

var outFd = fs.openSync('./test.out', 'a');
var errFd = fs.openSync('./test.err', 'a');

var child = cp.spawn('node', ['test'], {
    detached: true,
    stdio: ['ignore', outFd, errFd]
})

child.unref();
