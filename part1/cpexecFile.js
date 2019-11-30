var cp = require('child_process');

// cp.execFile('echo', ['hello world'], (err, stdout, stderr) => {
//     if(err) console.error(err);
//     console.log('stdout', stdout);
//     console.log('stderr', stderr);
// });

// cp.execFile('ls', ['non-existent'], (err, stdout) => {
//     console.log(err.code);
//     //console.log(stderr);
// })

cp.execFile('./hello', ['billy'], (err, stdout) => {
    console.log(stdout);
})