var express = require('express');
var WebSocketServer = require('ws').Server;
var parseCookie = express.cookieParser('some secret');
var MemoryStore = express.session.MemoryStore;
var store = new MemoryStore();

var app = express();
var server = app.listen(process.env.PORT || 3000);
var webSocketServer;

app.use(parseCookie);
app.use(express.session({store: store, secret: 'some secret'}));
app.use(express.static(__dirname + '/public'));

app.get('/random', (req, res) => {
    req.session.random = Math.random().toString();
    res.send(200);
});

webSocketServer = new WebSocketServer({server: server});

webSocketServer.on('connection', (ws) => {
    var session;

    ws.on('message', (data, flags) => {
        var message = JSON.parse(data);
        
        if(message.type === 'getSession') {
            parseCookie(ws.upgradeReq, null, (err) => {
                var sid = ws.upgradeReq.signedCookies['connect.sid'];

                store.get(sid, (err, loadedSession) => {
                    if(err) console.error(err);
                    session = loadedSession;
                    ws.send('session.random: ' + session.random, {
                        mask: false
                    });
                });
            });
        } else {
            ws.send('Unknown command');
        }
    })
})
