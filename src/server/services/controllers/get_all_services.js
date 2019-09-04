const read_filesname = require('../../../client/services_status/read_filesname.js')
const read_conf = require('../../../client/services_status/read_conf.js')

function get_all () {
	return new Promise (function(resolve, reject) {
        read_filesname().then(fielsname => {
	        if(fielsname.length > 0){
	        	let services = []
	            fielsname.forEach((filename, index, array) => {
	                read_conf(filename).then(conf => {
	                  
                       services.push(conf.name)

                       if(index == array.length -1 ) resolve(services)
	                }).catch(error => reject(error));
	            });
	        } else {
	        	reject(new Error('no files fouds!'))
	        }
       }).catch(error => reject(error));
	});
}

module.exports.get_all = get_all;