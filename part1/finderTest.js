var finder = require('./finder')

finder.find(/redis.*/, __dirname, function(err, results) {
    if(err) return console.error(err);
    console.log(results);
})