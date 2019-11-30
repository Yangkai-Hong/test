var http = require('http');
var makePool = require(__dirname + '/pooler');
var rubJob = makePool(__dirname + '/worker');

http.createServer((req, res) => {
    rubJob('some dummy job', (err, data) => {
        if(err) return res.end('got an error:' + err.message);
        res.end(data);
    });
}).listen(3000);