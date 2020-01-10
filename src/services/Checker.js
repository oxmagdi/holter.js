const http = require('http')
const NodeModel = require('../models/NodeModel')
const logger = require('../helpers/logger/logger')
const configReader = require('./ConfigsReader')
const critical = require('./Critical')

/*******************/

function Checker(){}

Checker.prototype.check = async function() {
    let interval = setInterval( async () => {
        const nodes = await NodeModel.getAll()
        if(nodes.length > 0) console.log()
        for (const node of nodes) {
            let redisKey = `:${node.cluster}:${node.node}`
            try {
                await this.seeStatus({
                  method: 'HEAD', 
                  host: node.host, 
                  port: parseInt(node.port), 
                  path: node.path
                })

                await NodeModel.upStatus(redisKey, 1)
              //   logger.info(typeof node)
              //   logger.info(node)
                logger.info(`[${node.cluster}:${node.node}] : ALIVE [${node.domain}:${node.port}]`)
                
            } catch (error) {
                // this node in critical case
                const status = await NodeModel.getStatus(redisKey)
                if(status == -1 || status == 1) {
                    await NodeModel.upStatus(redisKey, 0)
                    await critical.screech(node)
                    logger.error(`[${node.cluster}:${node.node}] : DIED [${error.message}]`)
                } else {
                   logger.error(`[${node.cluster}:${node.node}] : DIED [${error.message}]`)
                }
            }
        }
    }, 4500)
}

Checker.prototype.seeStatus = function(opt) {
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

module.exports = new Checker()