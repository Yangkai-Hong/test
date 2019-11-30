process.on('message', (job) =>  {
    for(let i = 0; i < 1000000000; i++);
    process.send('finished: ' + job);
})