var signals = require('signals')
var myObject = {
    started: new signals.Signal()
}

function onStarted(param1, param2) {
    console.log(param1, param2)
}

myObject.started.add(onStarted)
myObject.started.dispatch('hello', 'world')