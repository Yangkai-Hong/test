var assert = require('assert')
var net = require('net');

var clients = 0;
var expectedAssertions = 2;

var server = net.createServer(function(client) {
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

    runTest(1, function() {
        runTest(2, function() {
            console.log('Tests finished');
            assert.equal(0, expectedAssertions);
            server.close();
        })
    })
})

function runTest(expectedId, cb) {
    var client = net.connect(8000);

    client.on('data', (data) => {
        var expected = 'Welcome client: ' + expectedId + '\r\n';
        assert.equal(data.toString(), expected);
        expectedAssertions--;
        client.end();
    });

    client.on('end', cb);
}