let redis = require("redis"),
    client = null;

module.exports = function(args) {
    if(client == null){

         let client_config = args.constructor === Object ? args : {};
         client = redis.createClient(client_config);
         return {client, redis};

    } else 
         return {client, redis};
};    