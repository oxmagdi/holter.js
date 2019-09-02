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

const ServicesRoute = require('./src/server/services/routes/services_route');

const {client, redis} = require('./src/lib/redis-connection/client')({});

const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 4600;
const express = require('express');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//static file path
app.use(express.static(path.join(__dirname, '/src/ui/assets/')));

//static file path
// app.use(express.static(require("./_config_").project.images_path));

// view engine setup
app.set('views', [
  path.join(__dirname, '/src/ui/views')
]);

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


//  redis client connection events 

client.on("error", function (error) {
    throw error;
});

client.on("connect", function () {
    app.listen(port, () => {
        console.log(`~holter.js~ running on port [::${port}]`);
    });

    app.use('/', ServicesRoute);
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

