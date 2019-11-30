var assert = require('assert');
var http = require('http');

var server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello, world.\r\n');
    res.end();
})

server.listen(8000, () => {
    console.log('Listening on port 8000');
})

var req = http.request({port: 8000}, (res) => {
    console.log('HTTP headers:', res.headers);
    res.on('data', (data) => {
        console.log('Body:', data.toString());
        assert.equal('Hello, world.\r\n', data.toString());
        assert.equal(200, res.statusCode);
        server.unref();
    })
})

req.end();