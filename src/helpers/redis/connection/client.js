const envConfigs = require('../../../config/conf')
const redis = require("redis")
let client = null;

module.exports = function() {
    if(client == null){

         let client_config = {
                host   : envConfigs.redis.host ? envConfigs.redis.host : '127.0.0.1' ,
                port   : envConfigs.redis.port ? envConfigs.redis.port : '6379',
                prefix : envConfigs.redis.prefix ? envConfigs.redis.prefix : 'h:' 
         }
          
         client = redis.createClient(client_config);
         return {client, redis};

    } else 
         return {client, redis};
};    