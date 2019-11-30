var locker = require('./locker')

locker.lock(function(err) {
    if(err) throw err;

    locker.unlock(function() { });
})