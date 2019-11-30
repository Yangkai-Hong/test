var fs = require('fs');
var os = require('os');
var tls = require('tls');

var options = {
    key: fs.readFileSync('client.pem'),
    cert: fs.readFileSync('client-cert.pem'),
    ca: [fs.readFileSync('server-cert.pem')],
    servername: 'localhost'
};

var cleartextStream = tls.connect(8000, options, () => {
    var authorized = cleartextStream.authorized ? 'authorized' : 'unauthorized';
    console.log('Connected:', authorized);
    //process.stdin.pipe(cleartextStream);
});

cleartextStream.setEncoding('utf8');

cleartextStream.on('data', (data) => {
    console.log(data);
})