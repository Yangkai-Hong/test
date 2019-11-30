var net = require('net');
var clients = 0;

var server = net.createServer(function (client) {
    clients++;
    var clientId = clients;
    console.log('Client connected:', clientId);

    client.on('end', () => {
        console.log('Client disconnected:', clientId);
    })

    client.write('Welcome client: ' + clientId + '\r\n');
    client.pipe(client);
})

server.listen(8000, () => {
    console.log('Server started on port 8000');
})