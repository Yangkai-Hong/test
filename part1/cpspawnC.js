var cp = require('child_process');
//var cat = cp.spawn('cat', ['file.txt']);
var sort = cp.spawn('sort');
var uniq = cp.spawn('uniq');
var fs = require('fs');

//cat.stdout.pipe(sort.stdin);
var stream = fs.createReadStream('./file.txt')
    .pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);