const check_status = require('./check_status');
const read_filesname = require('./read_filesname');
const read_conf = require('./read_conf');
const serviceEventEmitter = require('../../server/services/controllers/events/service_event')
const logger = require('../../libs/logger/logger')



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
                        if(err){
                             logger.info(`${ conf.name }  :: Dead`);
                             serviceEventEmitter.emit('sicc', {node: conf.name, alive: false})
                        } else {
                             logger.info(`${conf.name} :: Alive`)    
                        }
                    });

                }).catch(error => logger.error(error.message));
            });
        }
    }).catch(error => logger.error(error.message));

    }, 10000);