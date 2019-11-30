var cheerio = require('cheerio');
var fs = require('fs');

// fs.readFile('./public/index.html', 'utf8', (err, html) => {
//     var $ = cheerio.load(html);
//     var releases = $('.r');
//     releases.each(function(i) {
//         console.log('New release:', this.children[0].data);
//     });
// });

var https = require('https');
var options = {
    host: 'www.google.com'
  };
  
  https.get(options, function(res) {
    console.log("Got response: " + res.statusCode);
    res.on("data", (html) => {
        //console.log(html.toString());
        let $ = cheerio.load(html);
        let cs = $('.gbsbb');
        cs.each(() => {
            console.log(Object.keys(this), this.outputData);
        })
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });