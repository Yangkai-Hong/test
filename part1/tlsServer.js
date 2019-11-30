var fs = require('fs');
var tls = require('tls');

var options = {
    key: fs.readFileSync('server.pem'),
    cert: fs.readFileSync('server-cert.pem'),
    ca: [fs.readFileSync('client-cert.pem')],
    requestCert: true
};

var server = tls.createServer(options, (cleartextStream) => {
    var authorized = cleartextStream.authorized ? 'authorized' : 'unauthorized';
    console.log('Connected:', authorized);
    cleartextStream.write('Welcome!\n');
    cleartextStream.setEncoding('utf8');
    cleartextStream.pipe(cleartextStream);
})

server.listen(8000, () => {
    console.log('Server listening');
})