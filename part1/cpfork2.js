var cp = require('child_process');

function doWork(job, cb) {
    var child = cp.fork('./worker');
    var cbTriggered = false;

    child.once('error', (err) => {
        if(!cbTriggered) {
            cb(err);
            cbTriggered = true;
        }
        child.kill();
    })
    .once('exit', (code, signal) => {
        if(!cbTriggered) {
            cb(new Error('Child exited with code: ' + code));
        }
    })
    .once('message', (result) => {
        cb(null, result);
        cbTriggered = true;
        child.disconnect();
    })
    .send(job);
}

doWork({x: 3, y: 4}, (err, res) => {
    if(err) console.log(err);
    console.log(res);
})