
const envConfigs = require('../../config/conf')
const fs = require('fs')
const NodeModel = require('../models/NodeModel')

class ConfigsReader {

    constructor(dirname) { this.dirname = dirname }

    setConfigs () {
        return new Promise((resolve, reject) => {
            this.getFilesNames().then(fielsname => {
                let configs = []
                fielsname.forEach((filename, index, array) => {
                    this.getFileContent(filename).then(conf => {
                        configs.push(conf)
                        NodeModel.addOne(conf).then(reply => {

                        }).catch(error => reject(error) )

                        if (index == array.length -1) resolve(configs)
                        // const opt = {
                        //     method: 'HEAD', 
                        //     host: conf.host, 
                        //     port: parseInt(conf.port), 
                        //     path: conf.path
                        // }    
                    }).catch(error => reject(error))
                })
            }).catch(error => reject(error))
        })
    }

    getFileContent ($file_name) {
        return new Promise( (resolve, reject) => {
            try {
                const full_path = this.dirname + $file_name
                const content = JSON.parse(fs.readFileSync(full_path))
                if(
                    content.node && 
                    content.host &&
                    content.port &&
                    content.path &&
                    content.interval &&
                    content.onfailer
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

     getFilesNames () {
        return new Promise( (resolve, reject) => {
            try {

                const filenames = fs.readdirSync(this.dirname)

                if (filenames.length > 0) resolve(filenames) 
                else reject(new Error('NO FILES FOUND IN DIRNAME!'))

            } catch (error) {
               reject(error)
            }
        })
     }

}

// export the class
// module.exports = ConfigsReader


// make instance object of this class
let configsReader = new ConfigsReader(envConfigs.dirname)

// export an object of this class
module.exports = configsReader

