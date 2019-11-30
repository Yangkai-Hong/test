var cp = require('child_process');

var child = cp.fork('./child');

child.on('message', (msg) => {
    console.log('Got a msg from child: ', msg);
    child.disconnect();
})

child.send({a: 'obj'});