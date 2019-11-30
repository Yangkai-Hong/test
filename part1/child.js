process.on('message', (msg) => {
    process.send(typeof msg);
})