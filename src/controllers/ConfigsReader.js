
const envConfigs = require('../config/conf')
const logger = require('../libs/logger/logger')
const fs = require('fs')
const NodeModel = require('../models/node')

/***************** */

function ConfigsReader(dirname_param){
    this.dirname = dirname_param
}

ConfigsReader.prototype.setConfigs = async function() {

    let r = await NodeModel.clear()
    await logger.info(`redis reset with status ${r}...`)

    let files_name = await this.getFilesNames()
    console.log(files_name)
    let configs = []

    for(let fname of files_name) {
        console.log(fname[0])
        let conf = await this.getFileContent(fname)
        await configs.push(conf)
        await NodeModel.addOne(conf)
    }

    return configs
    
}


ConfigsReader.prototype.getFileContent = function ($file_name) {
    return new Promise((resolve, reject) => {
        try {
            const full_path = this.dirname + $file_name
            console.log(full_path)
            const content = JSON.parse(fs.readFileSync(full_path))
            if(
                content.node && 
                content.host &&
                content.port &&
                content.path &&
                content.interval
            ){
                resolve(content)
            } else {
                reject(new Error('FORMAT FILE ERROR!'))
            }
        } catch (error) {
           reject(error)
        }
    })
}

ConfigsReader.prototype.getFilesNames = function() {
    return new Promise((resolve, reject) => {
        try {
                
            // console.log(this.dirname)
            // console.log(envConfigs.dirname)

            const filenames = fs.readdirSync(this.dirname)

            if (filenames.length > 0) resolve(filenames) 
            else reject(new Error('NO FILES FOUND IN DIRNAME!'))

        } catch (error) {
           reject(error)
        }
    })
}


// make instance object of this class
let cr = new ConfigsReader(envConfigs.dirname)
// export an object of this class
module.exports = cr

