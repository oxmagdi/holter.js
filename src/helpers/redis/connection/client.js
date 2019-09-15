const envConfigs = require('../../../../config/conf')
const redis = require("redis")
let client = null;

module.exports = function(args) {
    if(client == null){

         let client_config = args.constructor === Object ? args : {
                host   : envConfigs.redis.host ? envConfigs.redis.host : '127.0.0.1' ,
                port   : envConfigs.redis.port ? envConfigs.redis.port : '6379',
                prefix : envConfigs.redis.prefix ? envConfigs.redis.prefix : 'holter:' 
         }
          
         client = redis.createClient(client_config);
         return {client, redis};

    } else 
         return {client, redis};
};    