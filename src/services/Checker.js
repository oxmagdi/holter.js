const http = require('http')
const NodeModel = require('../models/NodeModel')
const logger = require('../helpers/logger/logger')

class Checker {
    constructor() {}

    async check () {
      let interval = setInterval( async () => {
          const nodes = await NodeModel.getAll()
          for (const node of nodes) {
              try {
                  await this.seeStatus({
                    method: 'HEAD', 
                    host: node.host, 
                    port: parseInt(node.port), 
                    path: node.path
                  })
                  logger.info(`[${node.cluster}:${node.node}] : ALIVE`)
              } catch (error) {
                  // this node in critical case
                  logger.error(`[${node.cluster}:${node.node}] : ${error.message}`)
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