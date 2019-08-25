const dirname = process.env.SERVICES_CONF_DIRENAME;
const fs = require('fs');

// get all files name in the directory
function get_files_name () {
   return new Promise( function (resolve, reject) {
       try {
           const filenames = fs.readdirSync(dirname);
           resolve(filenames);
       } catch (error) {
          reject(error);
       }
   });
}

module.exports = get_files_name