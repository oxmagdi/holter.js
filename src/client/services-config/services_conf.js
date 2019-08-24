const fs = require('fs');

const dirname = process.env.SERVICES_CONF_DIRENAME;

module.exports.find_all = function () {
   return new Promise( function (resolve, reject) {
       let services = [];

        fs.readdir(dirname, function(error, filenames) {
            if (error) {
               reject(error);
            }
            filenames.forEach(function(filename, index, array) {
                fs.readFile(dirname + filename, 'utf-8', function(error, content) {
                    if (error) {
                        reject(error);
                    }
                    services.push({filename, content,});
                    if (index == array.length -1) resolve(services);
                });
            });
        });
   });
};