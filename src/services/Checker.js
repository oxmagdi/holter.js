const http = require('http')
const NodeModel = require('../models/NodeModel')
const logger = require('../helpers/logger/logger')
const configReader = require('./ConfigsReader')

class Checker {
    constructor() {}

    async check () {
      let interval = setInterval( async () => {
          const nodes = await NodeModel.getAll()
          if(nodes.length > 0) console.log()
          for (const node of nodes) {
              try {
                  await this.seeStatus({
                    method: 'HEAD', 
                    host: node.host, 
                    port: parseInt(node.port), 
                    path: node.path
                  })
                //   logger.info(node)
                  logger.info(`[${node.cluster}:${node.node}] : ALIVE [${node.domain}:${node.port}]`)
                  
              } catch (error) {
                  // this node in critical case
                  logger.error(`[${node.cluster}:${node.node}] : DIED [${error.message}]`)
              }
          }
      }, 3000)
    }

    seeStatus ( opt ) {
       return new Promise( (resolve, reject) => {
            // console.log(opt)
            var options = opt,
            request = http.request(options, function(req) {
                resolve()
            })

            request.on('error', function(error) {
                // Handle error
                reject(error)
            })

            request.end()
       })
    }
}

const checker = new Checker()
module.exports = checker