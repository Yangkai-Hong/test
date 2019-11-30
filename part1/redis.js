var redis = require('redis'),
    client1 = redis.createClient(),
    client2 = redis.createClient(),
    msg_count = 0;

client1.on('subscribe', function(channel, count) {
    client2.publish('channel', 'hello world')
})

client1.on('message', function(channel, message) {
    console.log('client1 channel' + channel + ':' + message);
    client1.unsubscribe();
    client1.flushall();
    client2.flushall();
})

client1.subscribe('channel')