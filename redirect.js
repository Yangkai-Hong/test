var http = require('http')
var https = require('https');
var url = require('url');
var request;

function Request() {
    this.maxRedirects = 10;
    this.redirects = 0;
}

Request.prototype.get = function (href, cb) {
    var uri = url.parse(href);
    var options = {host: uri.host, path: uri.path};
    var httpGet = uri.protocol === 'http:' ? http.get : https.get;

    //console.log('GET:', href);

    function processResponse(res) {
        if(res.statusCode >= 300 && res.statusCode < 400) {
            if(this.redirects >= this.maxRedirects) {
                this.error = new Error('Too many redirects for: ' + href);
            } else {
                this.redirects++;
                //console.log(res.headers)
                href = url.resolve(options.host, res.headers.location);
                //console.log(href);
                return this.get(href, cb);
            }
        }

        res.url = href;
        res.redirects = this.redirects;

        //console.log('Redirected:', href);

        function end() {
            console.log('Connected ended');
            cb(this.error, res);
        }

        res.on('data', (data) => {
            console.log('Got data, length:', data.length);
        })

        res.on('end', end.bind());

        // res.on('end', () => {
        //     console.log('Connected ended');
        //     cb(this.error, res);
        // })
    }

    httpGet(options, processResponse.bind(this))
        .on('error', (err) => {
            cb(err);
        })
}

// request = new Request();

// request.get('http://baidu.com', (err, res) => {
//     if(err) {
//         console.error(err);
//     } else {
//         console.log('Fetched URL:', res.url, 'with', res.redirects, 'redirects');
//         process.exit();
//     }
// });

module.exports = new Request();