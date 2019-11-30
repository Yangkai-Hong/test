var finder = require('./finderSync')

try {
    var results = finder.findSync(/test.*/, __dirname);
    console.log(results);
} catch (err) {
    console.error(err);
}