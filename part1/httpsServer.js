var fs = require('fs');
var https = require('https');

var options = {
    key: fs.readFileSync('server.pem'),
    cert: fs.readFileSync('server-cert.pem'),
    ca: fs.readFileSync('client-cert.pem'),
    requestCert: true
};

var server = https.createServer(options, (req, res) => {
    var authorized = req.socket.authorized ? 'authorized' : 'unauthorized';
    res.writeHead(200);
    res.write('Welcome! You are ' + authorized + '\n');
    res.end();
});

server.listen(8000, () => {
    console.log('Server listening');
});