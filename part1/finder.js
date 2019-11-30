var fs = require('fs')
var join = require('path').join;

exports.find = function(nameRe, startPath, cb) {
    var results = [];
    var asyncOps = 0;
    var errored = false;

    function error (err) {
        if(!errored) cb(err);
        errored = true;
    }

    function finder (path) {
        asyncOps++;
        fs.readdir(path, function(err, files) {
            if(err) return error(err);

            files.forEach((file) => {
                var fpath = join(path, file);

                asyncOps++;
                fs.stat(fpath, (err, stats) => {
                    if(err) return error(err);

                    if(stats.isDirectory()) finder(fpath);
                    if(stats.isFile() && nameRe.test(file)) results.push(fpath);

                    asyncOps--;
                    if(asyncOps == 0) cb(null, results);
                })
            })

            // for(let i = 0; i < files.length; i++) {
            //     var file = files[i], 
            //         fpath = join(path, file);

            //     asyncOps++;
            //     fs.stat(fpath, (err, stats) => {
            //         if(err) return error(err);

            //         if(stats.isDirectory()) finder(fpath);
            //         if(stats.isFile() && nameRe.test(file)) results.push(fpath);

            //         asyncOps--;
            //         if(asyncOps == 0) cb(null, results);
            //     })
            // }

            asyncOps--;
            if(asyncOps == 0) cb(null, results);
        })
    }

    finder(startPath);
}