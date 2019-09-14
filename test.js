const configReader = require('./src/services/ConfigsReader').configsReader

configReader.getConfigs()
.then(confs => {
    console.log(confs)
}).catch(error => console.error(error))