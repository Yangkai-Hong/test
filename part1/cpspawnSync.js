var sp = require('child_process').spawnSync;
var ps = sp('ps', ['aux']); // process status
//console.log('ps: ', ps);
var grep = sp('grep', ['node'], {
    input: ps.stdout,
    encoding: 'utf8'
});
console.log(grep);