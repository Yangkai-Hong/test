var dgram = require('dgram');
var assert = require('assert');
var fs = require('fs');
var port = 41234;
var defaultSize = 16;

function Client(name, remoteIp) {
    var socket = dgram.createSocket('udp4');
    var readline = require('readline');
    var rl = readline.createInterface(process.stdin, process.stdout);

    socket.send(new Buffer('<' + name + '>'), 0, 2 + name.length, port, remoteIp);

    rl.setPrompt('Message> ');
    rl.prompt();

    rl.on('line', (line) => {
        sendData(line);
    }).on('close', () => {
        process.exit(0);
    });

    socket.on('message', (msg, rinfo) => {
        console.log('\n<' + rinfo.address + '>', msg.toString());
        rl.prompt();
    })

    let sendData = (message) => {
        socket.send(new Buffer(message), 0, message.length, port, remoteIp, (err, bytes) => {
            console.log('Sent:', message);
            rl.prompt();
        })
    }
}

function Server() {
    var clients = {};
    var socket = dgram.createSocket('udp4');

    socket.on('message', (msg, rinfo) => {
        msg =  msg.toString();

        if(msg.match(/^</)) {
            let name = msg.replace('<', '').replace('>', '');
            console.log('New client name:', name);
            clients[name] = rinfo.address + ':' + rinfo.port; 
            return;
        }

        let toInfo = clients[msg.split(',')[0]].split(':'),
            toAddress = toInfo[0],
            toPort = toInfo[1];

        socket.send(new Buffer(msg), 0, msg.length, toPort, toAddress, (err, bytes) => {
            if(err) console.error(err);
            console.log('Bytes sent:', bytes);
        });
    });

    socket.on('listening', () => {
        console.log('Server ready:', socket.address());
    })

    socket.bind(port);
}

module.exports = {
    Client: Client,
    Server: Server
}

if(!module.parent) {
    switch(process.argv[2]) {
        case 'client':
            new Client(process.argv[3], process.argv[4]);
            break;
        case 'server':
            new Server();
            break;
        default:
            console.log('Unknown option');
    }
}