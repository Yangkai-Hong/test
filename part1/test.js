var url = require('url')

setTimeout(function() {
    console.log(url.parse('http://baidu.com'))
}, 10000);