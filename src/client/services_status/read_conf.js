const dirname = process.env.SERVICES_CONF_DIRENAME;
const fs = require('fs');

// get all file content 
function get_file_content ($file_name) {
    return new Promise( function (resolve, reject) {
        try {
            const full_path = dirname + $file_name;
            const content = JSON.parse(fs.readFileSync(full_path));
            if(
                content.name && 
                content.host &&
                content.port &&
                content.path
            ){
                resolve(content);
            } else {
                reject(new Error('FORMAT FILE ERROR'));
            }
        } catch (error) {
           reject(error);
        }
    });
 }

module.exports = get_file_content