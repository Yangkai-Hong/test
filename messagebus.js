var EventEmitter = require('events').EventEmitter;
var util = require('util');

function MessageBus(options) {
    //EventEmitter.call(this, options);
    this.on('message', this.messageReceived.bind(this));
    // this.on('message', (msg) => {
    //     this.messageReceived(msg);
    // })
}

util.inherits(MessageBus, EventEmitter);

MessageBus.prototype.messageReceived = function(msg) {
    console.log('RX: ', msg);
}

//var messageBus = new MessageBus();
//messageBus.emit('message', 'Hello world');

module.exports = MessageBus;