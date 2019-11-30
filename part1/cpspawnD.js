var cp = require('child_process');

var child = cp.spawn('node', ['test'], {detached: true});

child.on('error', console.error);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);