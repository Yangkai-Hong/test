var ex = require('child_process').execFileSync;
var stdout = ex('echo', ['hello', 'kane']).toString();
console.log(stdout);