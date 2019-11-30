var rabbitHub = require('rabbitmq-nodejs-client')
var subHub = rabbitHub.create({task: 'sub', channel: 'myChannel'});
var pubHub = rabbitHub.create({task: 'pub', channel: 'myChannel'})

subHub.on('connection', function(hub) {
    hub.on('message', function(msg) {
        console.log(msg);
    }.bind(this));
})

pubHub.on('connection', function(hub) {
    hub.send('hello world')
    console.log('hi')
})

subHub.connect();
pubHub.connect();