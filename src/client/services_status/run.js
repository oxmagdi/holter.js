const check_status = require('./check_status');
const read_filesname = require('./read_filesname');
const read_conf = require('./read_conf');


 let interval = setInterval(function(){ 
    
    read_filesname().then(fielsname => {
        if(fielsname.length > 0){
            fielsname.forEach((filename, index, array) => {
                read_conf(filename).then(conf => {
                    const opt = {
                        method: 'HEAD', 
                        host: conf.host, 
                        port: parseInt(conf.port), 
                        path: conf.path
                    };
                    check_status(opt, (err) => {
                        // console.log(err)
                        if(err) console.error(conf.name + ' :: Dead');
                        else console.log(conf.name + ' :: Alive')
                    });

                }).catch(error => console.error(error.message));
            });
        }
    }).catch(error => console.error(error.message));

    }, 5000);