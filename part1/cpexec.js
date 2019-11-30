var cp = require('child_process');

cp.exec('cat file.txt | sort | uniq', (err, stdout, stderr) => {
    console.log(stdout);
})