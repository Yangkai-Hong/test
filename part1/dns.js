var dns = require('dns');

dns.resolve('www.baidu.com', (err, address) => {
    if(err) console.error(err);
    console.log(address);
})
