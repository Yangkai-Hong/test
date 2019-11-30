var net = require('net');
var server = net.createServer(function(c) {
    c.setNoDelay(true);
    c.write('377375042377373001', 'utf8');
    console.log('server connected');

    c.on('end', () => {
        console.log('server disconnected');
        server.unref();
    });
    c.on('data', (data) => {
        process.stdout.write(data.toString());
        c.write(data.toString());
    })
})

server.listen(8000, () => {
    console.log('server bound')
})