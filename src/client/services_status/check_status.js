const http = require('http');

function see_status (opt, cb) {
    // console.log(opt)
    var options = opt,
    request = http.request(options, function(req) {

        cb();
    });

    request.on('error', function(error) {
        // Handle error
            cb(error);
    });
    request.end();
}

module.exports = see_status;