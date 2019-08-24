// init env object
require('./src/init/env');

// init dirname if not exist
require('./src/init/servcies_conf_dirname');

require('./src/client/services-config/services_conf').find_all().then(s => {
    console.log(s);
}).catch(error => {
    console.error(error);
})
// const {client, redis} = require('./src/lib/redis-connection/client')({});

// const port = process.env.PORT || 3001;
// const app = require('express')();


// client.on("error", function (error) {
//     throw error;
// });

// client.on("connect", function () {
//     app.listen(port, () => {
//         console.log(`~holter.js~ running on port [:${port}]`);
//     });
// });