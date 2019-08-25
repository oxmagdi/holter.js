// init env object
require('./src/init/env');

// init dirname if not exist
require('./src/init/servcies_conf_dirname');

// see the status
require('./src/client/services_status/run');

// require('./src/client/services-config/read_services_conf').find_all().then(s => {
//     console.log(s);
// }).catch(error => {
//     console.error(error);
// })


const {client, redis} = require('./src/lib/redis-connection/client')({});

const port = process.env.PORT || 3001;
const app = require('express')();

var http = require('http');

client.on("error", function (error) {
    throw error;
});

client.on("connect", function () {
    app.listen(port, () => {
        console.log(`~holter.js~ running on port [:${port}]`);
    });
});

    // client.hmset("s1", 
    //           "name", "books", 
    //           "addr", "http://127.0.0.1:3001", 
    //           "status", "active", 
    //           function (err, res) {
    //          if(err) throw err;
    //          console.log(res);
    //          client.hgetall("s1", (err, obj) => {
    //                if(err) throw err;
    //                console.log(obj)
    //                client.del('s1')
    //          });

    // });
    
    // client.HMSET('s1', {
    //     name : "abcdefghij", // NOTE: key and value will be coerced to strings
    //     addr : "a type of value"
    // }, (err, res) => {
    //     console.log(res)
    //     client.hgetall('s1', (err, res) => {
    //         console.log(res)
    //     })
    // });

