var fs = require('fs');
var https = require('https');
var os = require('os');

var options = {
    key: fs.readFileSync('client.pem'),
    cert: fs.readFileSync('client-cert.pem'),
    ca: [fs.readFileSync('server-cert.pem')],
    hostname: 'localhost',
    port: 8000,
    path: '/',
    method: 'GET'
}

var req = https.request(options, (res) => {
    res.on('data', (d) => {
        process.stdout.write(d);
    })
})

req.end();

req.end('error', (e) => {
    console.error(e);
})